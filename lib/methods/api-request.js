'use strict'

const ecomClient = require('@ecomplus/client')

const apiRequest = client => {
  // handle new credentials
  const getAuth = require('./get-auth')(client)
  // delete no more valid authentications
  const deleteAuth = require('./delete-auth')(client)

  // count per store running request
  // prevent rate limit error
  const running = {}

  return (storeId, url, method = 'GET', data = null, auth, noAuth) => {
    return new Promise((resolve, reject) => {
      const request = auth => {
        // set authentication keys
        const { myId, accessToken } = auth
        let authenticated
        // https://developers.e-com.plus/client/ecomClient.html#.store
        const options = {
          storeId,
          url,
          method,
          data
        }
        if (myId && accessToken) {
          authenticated = true
          // authenticated request to Store API
          options.authenticationId = myId
          options.accessToken = accessToken
        }

        // send HTTP request
        let retry = 0
        const send = () => {
          ecomClient.store(options).then(response => {
            // return response and used auth
            resolve({ response, auth })
          })

            .catch(error => {
              // pass auth within error object
              error.auth = auth
              // treat error response before reject
              if (error.response) {
                // handle Store API error responses
                // https://developers.e-com.plus/docs/reference/store/#error-handling
                const { config, status, data } = error.response
                if (data && ((status === 401 && data.error_code === 102) || status === 412)) {
                  // 'Authentication failed for this user ID' or no store found
                  // remove current authentication
                  // mark returned error object
                  error.appAuthRemoved = true
                  deleteAuth(myId)
                    .then(() => reject(error))
                    .catch(err => {
                      throw err
                    })
                  return
                }

                if (status === 503 && retry < 2) {
                  // NGINX is blocking requests for security reasons
                  // wait few seconds and try again
                  setTimeout(send, Math.floor(Math.random() * (6000 - 2000)) + 2000)
                  retry++
                  return
                }

                if (status === 401 && authenticated && auth.row && config) {
                  // authentication error
                  // not authorized by auth scope ?
                  // mark returned error object
                  error.appErrorLog = true

                  // try to log error on app hidden data
                  ecomClient.store({
                    ...options,
                    url: '/applications/' + auth.row.application_id + '/hidden_data.json',
                    method: 'PATCH',
                    data: {
                      last_api_error: {
                        url: config.url,
                        method: config.method,
                        response: data
                      }
                    }
                  }).then(() => {
                    error.appErrorLogged = true
                    reject(error)
                  }).catch(err => {
                    error.appErrorLog = err
                    reject(error)
                  })
                  return
                }
              }

              // unexpected error response
              // just reject the promise
              reject(error)
            })
        }

        if (!authenticated) {
          // no delay for public request
          send()
        } else {
          // control requests with delay
          let delayFactor = running[storeId]
          if (typeof delayFactor !== 'number') {
            running[storeId] = delayFactor = 0
          }
          running[storeId]++
          setTimeout(() => {
            running[storeId]--
            send()
          }, delayFactor * 200)
        }
      }

      if (noAuth === true) {
        // public API request
        if (auth) {
          request({
            ...auth,
            accessToken: null
          })
        } else {
          request({})
        }
      } else if (auth && auth.myId && auth.accessToken) {
        // authentication already received
        request(auth)
      } else {
        // get auth from database and send request
        getAuth(storeId).then(request).catch(reject)
      }
    })
  }
}

module.exports = apiRequest
