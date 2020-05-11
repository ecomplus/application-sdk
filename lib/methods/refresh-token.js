'use strict'

const refreshToken = ({ axios }) => {
  return (storeId, authenticationId) => {
    // try to force refresh token of one specific authentication
    // send POST request to Store API starting auth flux
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post('/_callback.json', {
          _id: authenticationId
        }, {
          headers: {
            'X-Store-ID': storeId
          }
        }).then(resolve).catch(reject)
      }, Math.floor(Math.random() * (150 - 5)) + 5)
    })
  }
}

module.exports = refreshToken
