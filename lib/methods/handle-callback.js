'use strict'
const admin = require('firebase-admin')

const handleCallback = client => {
  const { dbFilename, db, table } = client
  // handle access token refresh
  const refreshToken = require('./refresh-token')(client)

  return async (storeId, reqBody) => {
    return new Promise((resolve, reject) => {
      let sql, values

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
      // whether new application was installed
      let isNew

      if (application && reqBody.store_id === storeId) {
        // insert application with respective authentication data
        if (!dbFilename) {
          db.collection(table).doc(authentication._id).set({
            application_id: application._id,
            application_app_id: application.app_id,
            application_title: application.title,
            authentication_id: authentication._id,
            authentication_permissions: JSON.stringify(authentication.permissions),
            store_id: storeId,
            created_at: admin.firestore.Timestamp.fromDate(new Date()),
            updated_at: null
          }, { merge: true }).catch(err => reject(err))
        } else {
          values = [
            application._id,
            application.app_id,
            application.title,
            authentication._id,
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
        // new app installed
        isNew = true
      } else if (reqBody.my_id && reqBody.access_token) {
        // authentication flux callback
        // should update access token for current authentication
        values = [
          reqBody.access_token,
          reqBody.my_id,
          storeId
        ]

        if (!dbFilename) {
          const ref = db.collection(table).doc(authentication._id)
          const token = ref.get()

          if (token && token.data() && token.data().store_id === storeId) {
            ref.set({
              access_token: reqBody.access_token,
              updated_at: admin.firestore.Timestamp.fromDate(new Date())
            }, { merge: true }).catch(err => reject(err))
          }
        } else {
          sql = 'UPDATE ' + table + ` SET
            access_token = ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE authentication_id = ? AND store_id = ?`
        }

        // authenticating an already installed app
        isNew = false
      } else {
        reject(new Error('Unexpected request body, properties not found'))
        return
      }

      // run query if exists sqlite file
      if (dbFilename) {
        db.run(sql, values, err => {
          if (!err) {
            let authenticationId
            if (isNew) {
              authenticationId = authentication._id
              // generate access token by the first time
              // start app authentication flux
              refreshToken(storeId, authenticationId)
            } else {
              authenticationId = reqBody.my_id
            }
            // success callback with handled authentication ID
            resolve({
              isNew,
              authenticationId
            })
          } else {
            reject(err)
          }
        })
      } else {
        let authenticationId
        if (isNew) {
          authenticationId = authentication._id
          // generate access token by the first time
          // start app authentication flux
          refreshToken(storeId, authenticationId)
        } else {
          authenticationId = reqBody.my_id
        }
        resolve({
          isNew,
          authenticationId
        })
      }
    })
  }
}

module.exports = handleCallback
