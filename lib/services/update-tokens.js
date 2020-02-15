'use strict'

const admin = require('firebase-admin')

const updateTokens = (client) => {
  const { collRef, db, table } = client
  // handle access token refresh
  const refreshToken = require('./../methods/refresh-token')(client)

  const handleRefreshToken = row => {
    // start app authentication flux
    refreshToken(row.store_id, row.authentication_id).catch(err => {
      console.error(err)
    })
  }

  const task = () => {
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
      collRef.where('updated_at', '<', admin.firestore.Timestamp.fromDate(date))
        .get().then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            handleRefreshToken(documentSnapshot.data())
          })
        })
    }
  }

  if (process.env.ECOM_AUTH_UPDATE_INTERVAL !== 'disabled') {
    // run task with 1 hour interval
    const hour = 60 * 60 * 1000
    setInterval(task, hour)
  }
  task()
}

module.exports = updateTokens
