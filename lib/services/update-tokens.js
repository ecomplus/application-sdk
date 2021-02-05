'use strict'

const updateTokens = client => {
  const { collRef, db, table, debug } = client
  // handle access token refresh
  const refreshToken = require('./../methods/refresh-token')(client)
  // delete no more valid authentications
  const deleteAuth = require('./../methods/delete-auth')(client)

  const handleRefreshToken = (row, queue = 1) => {
    setTimeout(() => {
      // start app authentication flux
      const reqPromise = refreshToken(row.store_id, row.authentication_id)
        .catch(error => {
          if (error.response) {
            // handle Store API error responses
            // https://developers.e-com.plus/docs/reference/store/#error-handling
            const { status, data } = error.response
            if (data && ((status === 403 && data.error_code >= 9270230) || status === 412)) {
              deleteAuth(row.authentication_id)
                .then(() => {
                  if (debug) {
                    debug(`DELETED AUTH ${row.authentication_id} for store #${row.store_id}`)
                  }
                })
                .catch(console.error)
              return
            }
          }
          console.error(error)
        })

      if (debug) {
        debug(`Refresh token for store #${row.store_id}`)
        reqPromise.then(() => {
          debug(`✓ Access token updated with success for store #${row.store_id}`)
        })
      }
    }, queue * 480)
  }

  const task = () => {
    let queue = 0
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
          handleRefreshToken(row, queue++)
        } else {
          throw err
        }
      })
    } else {
      // working with Firestore collection
      debug('List up to 90 tokens from auth coll')
      collRef.limit(90).get().then(querySnapshot => {
        debug(`Found ${querySnapshot.size} stored tokens`)
        if (querySnapshot.size) {
          const minDate = new Date()
          minDate.setHours(minDate.getHours() + 16)
          debug(`Filter tokens to expire in up to 16h (<= ${minDate.toISOString()})`)
          const minTimestamp = minDate.getTime()

          // check each document `expires` date
          querySnapshot.forEach(documentSnapshot => {
            const data = documentSnapshot.data()
            if (!data.expires || new Date(data.expires).getTime() <= minTimestamp) {
              handleRefreshToken(data, queue++)
            }
          })
        }
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
