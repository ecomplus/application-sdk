'use strict'

const handleCallback = client => {
  const { collRef, db, table } = client
  // handle access token refresh
  const refreshToken = require('./refresh-token')(client)

  return async (storeId, reqBody) => {
    return new Promise((resolve, reject) => {
      let isNew, authenticationId, sql, values, firestoreDoc

      // first validation of function params
      if (typeof storeId !== 'number' || isNaN(storeId) || storeId <= 0) {
        reject(new Error('Undefined or invalid Store ID, must be a positive number'))
        return
      } else if (typeof reqBody !== 'object' || reqBody === null) {
        reject(new Error('Undefined or invalid request body'))
        return
      }

      // application and authentication objects from body if any
      const { application, authentication } = reqBody

      if (application && reqBody.store_id === storeId) {
        // new app installed
        isNew = true
        authenticationId = authentication._id

        // insert application with respective authentication data
        if (collRef) {
          const firestoreTimestamp = require('firebase-admin').firestore.Timestamp.fromDate(new Date())
          firestoreDoc = {
            application_id: application._id,
            application_app_id: application.app_id,
            application_title: application.title,
            authentication_id: authenticationId,
            authentication_permissions: JSON.stringify(authentication.permissions),
            store_id: storeId,
            created_at: firestoreTimestamp,
            updated_at: firestoreTimestamp
          }
        } else {
          values = [
            application._id,
            application.app_id,
            application.title,
            authenticationId,
            JSON.stringify(authentication.permissions),
            storeId
          ]
          sql = 'INSERT INTO ' + table + ` (
            application_id,
            application_app_id,
            application_title,
            authentication_id,
            authentication_permissions,
            store_id
          ) VALUES (?, ?, ?, ?, ?, ?)`
        }
      } else if (reqBody.my_id && reqBody.access_token) {
        // authenticating an already installed app
        isNew = false
        authenticationId = reqBody.my_id

        // authentication flux callback
        // should update access token for current authentication
        if (collRef) {
          firestoreDoc = {
            access_token: reqBody.access_token,
            updated_at: require('firebase-admin').firestore.Timestamp.fromDate(new Date())
          }
        } else {
          values = [
            reqBody.access_token,
            reqBody.my_id,
            storeId
          ]
          sql = 'UPDATE ' + table + ` SET
            access_token = ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE authentication_id = ? AND store_id = ?`
        }
      } else {
        reject(new Error('Unexpected request body, properties not found'))
        return
      }

      if (authenticationId) {
        const handleResolve = () => {
          if (isNew) {
            // generate access token by the first time
            // start app authentication flux
            refreshToken(storeId, authenticationId)
          }
          // success callback with handled authentication ID
          resolve({
            isNew,
            authenticationId
          })
        }

        if (sql) {
          // run SQLite query
          db.run(sql, values, err => {
            if (!err) {
              handleResolve()
            } else {
              reject(err)
            }
          })
        } else if (firestoreDoc) {
          // run Firestore collection set
          collRef
            .doc(authenticationId)
            .set(firestoreDoc, { merge: true })
            .then(handleResolve)
            .catch(reject)
        }
      } else {
        reject(new Error('Can\'t set Authentication ID from request body'))
      }
    })
  }
}

module.exports = handleCallback
