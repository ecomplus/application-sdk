'use strict'

const deleteAuth = ({ collRef, db, table }) => {
  return authenticationId => new Promise((resolve, reject) => {
    if (!collRef) {
      const sql = 'DELETE FROM ' + table + ' WHERE authentication_id = ?'
      // run SQLite delete query
      db.run(sql, [authenticationId], err => {
        if (err) {
          // SQL error ?
          reject(err)
        }
        resolve()
      })
    } else {
      // delete Firestore document
      collRef.doc(authenticationId).delete()
        .then(resolve).catch(reject)
    }
  })
}

module.exports = deleteAuth
