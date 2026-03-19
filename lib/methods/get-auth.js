'use strict'

const getAuth = ({ collRef }) => {
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

      // working with Firestore collection
      let docOrQueryRef
      if (authenticationId) {
        docOrQueryRef = collRef.doc(authenticationId)
      } else {
        docOrQueryRef = collRef.where('store_id', '==', storeId)
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
              const doc = documentSnapshot.data()
              if (
                !data || !data.updated_at ||
                (doc.updated_at && doc.updated_at.seconds >= data.updated_at.seconds)
              ) {
                data = doc
              }
            })
          }
          if (data) {
            handleResolve(data, docOrQueryRef)
          } else {
            noAuthReject()
          }
        })
        .catch(reject)
    })
  }
}

module.exports = getAuth
