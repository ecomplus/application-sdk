'use strict'
const admin = require('firebase-admin')

Date.prototype.addHours = function (value) {
  this.setHours(this.getHours() + value);
}

const updateTokens = (client) => {
  const { dbFilename, db, table } = client
  // handle access token refresh
  const refreshToken = require('./../methods/refresh-token')(client)

  const handleRefreshToken = (row) => {
    refreshToken(row.store_id, row.authentication_id).catch(err => {
      // throw err
      console.error(err)
    })
  }

  const task = () => {
    // refresh each access token every 8 hours
    if (dbFilename) {
      const query = 'SELECT authentication_id, store_id FROM ' + table +
      ' WHERE updated_at < datetime("now", "-8 hours") OR updated_at IS NULL'

      // run query and get each row object
      db.each(query, (err, row) => {
        if (!err) {
          // start app authentication flux
          handleRefreshToken(row)
        } else {
          throw err
        }
      })
    } else {
      const ref = db.collection(table)
      const queryDate = new Date()
      queryDate.addHours(-8)
      const queryFromDate = ref.where('updated_at', '<' , admin.firestore.Timestamp.fromDate(queryDate)).get()
      const queryFromNull = ref.where('updated_at', '==', null).get()
      let rows = []
      try {
        Promise.all([queryFromDate,queryFromNull]).then(values=>{
            values.map(item=>{
              rows = rows.concat(item.docs)
            })
        }) 
      } catch(err){
        throw err
      }
      if (rows && rows.length > 0) {
        rows.map(row => {
          handleRefreshToken(row.data())
        })
      }
    }
    
  }

  // run task with 1 hour interval
  const hour = 60 * 60 * 1000
  setInterval(task, hour)
  task()
}

module.exports = updateTokens
