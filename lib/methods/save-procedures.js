'use strict'

const saveProcedures = client => {
  const getAuth = require('./get-auth')(client)
  // handle authenticated API requests
  const apiRequest = require('./api-request')(client)

  return (storeId, procedures, auth = null) => {
    return new Promise((resolve, reject) => {
      const request = async auth => {
        if (Array.isArray(procedures)) {
          for (let i = 0; i < procedures.length; i++) {
            const url = '/procedures.json'
            const method = 'POST'
            // mount procedure object if function
            const procedure = typeof procedures[i] === 'function'
              ? procedures[i]({
                storeId,
                applicationId: auth.row.application_id,
                authenticationId: auth.row.authentication_id
              })
              : procedures[i]

            try {
              // send API request and wait to continue
              await apiRequest(storeId, url, method, procedure, auth)
            } catch (err) {
              // reject and break loop
              reject(err)
              break
            }
          }
        }
        resolve()
      }

      if (auth && auth.row) {
        // authentication already received
        request(auth)
      } else {
        // get auth from database and start sending requests
        getAuth(storeId).then(request).catch(reject)
      }
    })
  }
}

module.exports = saveProcedures
