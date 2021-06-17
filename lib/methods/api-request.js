'use strict'

const ecomClient = require('@ecomplus/client')

const apiRequest = client => {
  // handle new credentials
  const getAuth = require('./get-auth')(client)
  // delete no more valid authentications
  const deleteAuth = require('./delete-auth')(client)
  // handle access token refresh
  const refreshToken = require('./refresh-token')(client)

  // count per store running request
  // prevent rate limit error
  const running = {}

  return (storeId, url, method = 'GET', data = null, auth, noAuth, axiosConfig) => {
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
          data,
          ...axiosConfig
        }
        if (myId && accessToken) {
          authenticated = true
          // authenticated request to Store API
          options.authenticationId = myId
          options.accessToken = accessToken
        }

        // fallback dealing with out of date tokens
        let isRefreshingToken = false
        const askRefreshToken = () => {
          if (!isRefreshingToken) {
            refreshToken(storeId, myId).catch(console.error)
            isRefreshingToken = true
          }
        }

        // send HTTP request
        let retries = 0
        const send = () => {
          const retry = (delayMs = 5000, error) => {
            if (!process.env.ECOM_AUTH_DISABLE_API_RETRY) {
              // wait few seconds and try again
              setTimeout(send, delayMs)
              retries++
            } else {
              // end rejecting the promise
              if (!error) {
                error = new Error('Store API request failed')
                error.options = options
              }
              error.retryDisapled = true
              reject(error)
            }
          }

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

                if (status === 503) {
                  // NGINX is blocking requests for security reasons
                  if (retries < 3) {
                    const delayMin = 1000 * (retries + 1.5)
                    return retry(Math.floor(Math.random() * (delayMin * 2 - delayMin)) + delayMin, error)
                  }
                } else if (status >= 500 && !retries) {
                  // server error?
                  return retry(8500, error)
                }

                if (status === 401 && authenticated) {
                  // authentication error
                  if (data && data.error_code === 132 && !retries) {
                    // "Token was valid, but expired"
                    const delayMs = isRefreshingToken ? 2500 : 8500
                    askRefreshToken()
                    return retry(delayMs, error)
                  }

                  if (auth.row && auth.row.application_id && config) {
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
              } else if (!retries) {
                // timeout?
                return retry(options.timeout || 5000, error)
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
          let delayMs
          let delayFactor = running[storeId]
          if (typeof delayFactor !== 'number') {
            // first concurrent request with this store
            running[storeId] = delayFactor = 0
            if (auth.row && auth.row.expires) {
              const tokenTimestamp = new Date(auth.row.expires).getTime()
              if (tokenTimestamp <= Date.now() + 1000 * 60 * 10) {
                // send token update request in advance
                askRefreshToken()
                if (tokenTimestamp <= Date.now() + 1000 * 5) {
                  delayMs = 6000
                }
              }
            }
          }
          running[storeId]++
          setTimeout(() => {
            running[storeId]--
            send()
          }, delayMs || delayFactor * 200)
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
