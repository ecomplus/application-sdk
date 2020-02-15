'use strict'

const getAuth = ({ collRef, db, table }) => {
  return (storeId, authenticationId) => {
    return new Promise((resolve, reject) => {
      const handleResolve = (row, docRef) => {
        resolve({
          docRef,
          row,
          // for Store API authentication headers
          myId: row.authentication_id,
          accessToken: row.access_token
        })
      }

      const noAuthReject = () => {
        const err = new Error('No authentication found')
        err.appWithoutAuth = true
        reject(err)
      }

      // select authentication for specified store from database
      if (!collRef) {
        let query = 'SELECT * FROM ' + table + ' WHERE store_id = ? '
        const params = [storeId]
        if (authenticationId) {
          // also filter by authentication ID
          query += 'AND authentication_id = ? '
          params.push(authenticationId)
        }
        // get one row only
        query += 'LIMIT 1'

        // run query and get row object
        db.get(query, params, (err, row) => {
          if (err) {
            reject(err)
          } else if (row) {
            handleResolve(row)
          } else {
            noAuthReject()
          }
        })
      } else {
        // working with Firestore collection
        let docOrQueryRef
        if (authenticationId) {
          docOrQueryRef = collRef.doc(authenticationId)
        } else {
          docOrQueryRef = collRef.where('store_id', '==', storeId).limit(1)
        }

        // run document get or query
        docOrQueryRef.get()
          .then(docOrQuerySnapshot => {
            let data
            if (docOrQuerySnapshot.data) {
              // is documentSnapshot
              data = docOrQuerySnapshot.data()
            } else if (docOrQuerySnapshot.size > 0) {
              // is querySnapshot
              docOrQuerySnapshot.forEach(documentSnapshot => {
                data = documentSnapshot.data()
              })
            }
            if (data) {
              handleResolve(data, docOrQueryRef)
            } else {
              noAuthReject()
            }
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  }
}

module.exports = getAuth
