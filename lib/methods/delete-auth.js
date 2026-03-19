'use strict'

const deleteAuth = ({ collRef }) => {
  return authenticationId => {
    return collRef.doc(authenticationId).delete()
  }
}

module.exports = deleteAuth
