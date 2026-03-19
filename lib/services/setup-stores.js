'use strict'

const setupStores = (client, options) => {
  const { collRef, debug } = client
  const { procedures, callback } = options
  // handle saving procedures list to Store API
  const saveProcedures = require('./../methods/save-procedures')(client)

  const task = async () => {
    // get one store waiting for setup process
    const snapshot = await collRef
      .where('setted_up', '==', false)
      .orderBy('created_at', 'asc')
      .limit(1)
      .get()

    if (snapshot.empty) {
      // no store to setup, schedule next check
      setTimeout(task, 1000)
      return
    }

    const doc = snapshot.docs[0]
    const row = doc.data()

    if (!row.access_token) {
      // token not ready yet, wait and retry
      setTimeout(task, 500)
      return
    }

    const storeId = row.store_id

    ;(async function loop () {
      // save procedures
      let error
      try {
        await saveProcedures(storeId, procedures)
      } catch (err) {
        error = err
      }

      // after procedures saved
      // run callback function if any
      if (typeof callback === 'function') {
        await callback(error, { storeId })
      }
      // all async process done
      // schedule next store to setup
      setTimeout(task, 200)

      if (!error) {
        // all done with success
        // remove from queue
        collRef.doc(row.authentication_id).update({ setted_up: true })
          .then(() => {
            if (debug) {
              debug(`✓ Store #${storeId} successfully setted up with procedures created`)
            }
          })
          .catch(err => { throw err })
      } else {
        // TODO: try to save error on app hidden data
      }
    }())
  }

  // start task loop
  task()
  if (debug) {
    debug('Starting `setupStores` service')
  }
}

module.exports = setupStores
