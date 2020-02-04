'use strict'

const updateTokens = (client) => {
  const { dbFilename, db, table } = client
  // handle access token refresh
  const refreshToken = require('./../methods/refresh-token')(client)

  const task = () => {
    // refresh each access token every 8 hours
    if(dbFilename){
      let query = 'SELECT authentication_id, store_id FROM ' + table +
      ' WHERE updated_at < datetime("now", "-8 hours") OR updated_at IS NULL'

      // run query and get each row object
      db.each(query, (err, row) => {
        if (!err) {
          // start app authentication flux
          refreshToken(row.store_id, row.authentication_id).catch(err => {
            // throw err
            console.error(err)
          })
        } else {
          throw err
        }
      })
    }else{
      let ref = db.collection(table)
      let now = new Date()
      let query = ref.in('updated_at', [now.getHours() - 8], null).where('authentication_id', '==', authenticationId).limit(1)
      query.get()
        .then(rows => {
          if (rows.empty) {
            let err = new Error('No authentication found')
            throw err
          }else{
            rows.map(row=>{
              refreshToken(row.store_id, row.authentication_id).catch(err => {
                // throw err
                console.error(err)
              })
            })
          }
        })
        .catch(err => {
          throw err
        });
    }
    
  }

  // run task with 1 hour interval
  const hour = 60 * 60 * 1000
  setInterval(task, hour)
  task()
}

module.exports = updateTokens
