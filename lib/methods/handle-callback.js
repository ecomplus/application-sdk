'use strict'

const handleCallback = client => {
  const { collRef } = client
  // handle access token refresh
  const refreshToken = require('./refresh-token')(client)

  return async (storeId, reqBody) => {
    return new Promise((resolve, reject) => {
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

      // preset Firestore document common values
      const firestoreDoc = { store_id: storeId }
      let isNew, authenticationId

      if (application && reqBody.store_id === storeId) {
        // new app installed
        isNew = true
        authenticationId = authentication._id

        const { Timestamp } = require('firebase-admin').firestore
        Object.assign(firestoreDoc, {
          application_id: application._id,
          application_app_id: application.app_id,
          application_title: application.title,
          authentication_permissions: JSON.stringify(authentication.permissions),
          setted_up: false,
          created_at: Timestamp.now(),
          updated_at: new Timestamp(1500000000, 0) // Jul 13 2017
        })
      } else if (reqBody.my_id && reqBody.access_token) {
        // authenticating an already installed app
        isNew = false
        authenticationId = reqBody.my_id

        Object.assign(firestoreDoc, {
          access_token: reqBody.access_token,
          expires: reqBody.expires,
          updated_at: require('firebase-admin').firestore.Timestamp.now()
        })
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

        // run Firestore collection set
        firestoreDoc.authentication_id = authenticationId
        collRef
          .doc(authenticationId)
          .set(firestoreDoc, { merge: true })
          .then(handleResolve)
          .catch(reject)
      } else {
        reject(new Error('Can\'t set Authentication ID from request body'))
      }
    })
  }
}

module.exports = handleCallback
