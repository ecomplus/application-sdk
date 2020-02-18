'use strict'

const updateTokens = (client) => {
  const { collRef, db, table, debug } = client
  // handle access token refresh
  const refreshToken = require('./../methods/refresh-token')(client)

  const handleRefreshToken = row => {
    // start app authentication flux
    const reqPromise = refreshToken(row.store_id, row.authentication_id).catch(err => {
      console.error(err)
    })
    if (debug) {
      debug(`Refresh token for store #${row.store_id}`)
      reqPromise.then(() => {
        debug(`✓ Access token updated with success for store #${row.store_id}`)
      })
    }
  }

  const task = () => {
    if (debug) {
      debug('Starting `updateTokens` task')
    }

    // refresh each access token every 8 hours
    if (!collRef) {
      const query = 'SELECT authentication_id, store_id FROM ' + table +
        ' WHERE updated_at < datetime("now", "-8 hours") OR updated_at IS NULL'

      // run query and get each row object
      db.each(query, (err, row) => {
        if (!err) {
          handleRefreshToken(row)
        } else {
          throw err
        }
      })
    } else {
      // working with Firestore collection
      const date = new Date()
      date.setHours(date.getHours() - 8)

      // run collection get query
      collRef.where('updated_at', '<', require('firebase-admin').firestore.Timestamp.fromDate(date))
        .get().then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            handleRefreshToken(documentSnapshot.data())
          })
        })
    }
  }

  if (
    process.env.ECOM_AUTH_UPDATE_INTERVAL !== 'disabled' &&
    // ignore interval task for Google Cloud Functions by default
    (!process.env.GCLOUD_PROJECT || process.env.ECOM_AUTH_UPDATE_INTERVAL === 'enabled')
  ) {
    // run task with 1 hour interval
    const hour = 60 * 60 * 1000
    setInterval(task, hour)
  }
  task()
}

module.exports = updateTokens
