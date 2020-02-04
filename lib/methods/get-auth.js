'use strict'
const handleRejectPromise = (reject) => {
  let err = new Error('No authentication found')
  err.appWithoutAuth = true
  reject(err)
}

const handleResolvePromise = (resolve, obj) => {
  resolve({
    row: obj,
    // for Store API authentication headers
    myId: obj.authentication_id,
    accessToken: obj.access_token
  })
}
const getAuth = ({ dbFilename, db, table }) => {
  return (storeId, authenticationId) => {
    return new Promise((resolve, reject) => {
      // select authentication for specified store from database

      //if have sqlite File
      if(dbFilename){
        let query = 'SELECT * FROM ' + table + ' WHERE store_id = ? '
        let params = [ storeId ]
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
            handleResolvePromise(resolve, row)
          } else handleRejectPromise(reject)
        })
        //if dont have sqlite file, but have a firestore connection
      }else{
        let ref = db.collection(table)
        let query
        if(authenticationId){
          query = ref.doc(authenticationId)
        }else{
          query = ref.where('store_id', '==', storeId).limit(1)
        }
        
        query.get()
          .then(row => {
            if (row.empty) {
              handleRejectPromise(reject)
            }else{
              handleResolvePromise(resolve, row.docs[0].data())
            }
          })
          .catch(err => {
            reject(err)
          });
      }      
    })
  }
}

module.exports = getAuth
