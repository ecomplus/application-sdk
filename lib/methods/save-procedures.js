'use strict'

const saveProcedures = client => {
  const getAuth = require('./get-auth')(client)
  // handle authenticated API requests
  const apiRequest = require('./api-request')(client)

  return (storeId, procedures, auth = null) => {
    return new Promise((resolve, reject) => {
      const request = async auth => {
        if (procedures) {
          for (let i = 0; i < procedures.length; i++) {
            const url = '/procedures.json'
            const method = 'POST'
            const procedure = typeof procedures[i] === 'function'
              ? procedures[i]({
                storeId,
                applicationId: auth.row.application_id,
                authenticationId: auth.row.authentication_id
              })
              : procedures[i]
            try {
              await apiRequest(storeId, url, method, procedure)
            } catch (err) {
              reject(err)
              break
            }
          }
        }
        resolve()
      }
      if (auth && auth.row) {
        request(auth)
      } else {
        getAuth(storeId).then(request).catch(reject)
      }
    })
  }
}

module.exports = saveProcedures
