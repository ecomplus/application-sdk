'use strict'

// E-Com Plus server IPs for client validation
const ecomServerIps = [
  // webhooks
  '139.59.95.252',
  '2400:6180:100:d0::7ac:e001',
  // primary
  '192.241.138.93',
  '2604:a880:400:d0::58:3001',
  // secondary
  '198.199.81.173',
  '2604:a880:400:d0::13:5001',
  // modules
  '159.203.20.142',
  '2604:a880:cad:d0::928:a001',
  // mods.x
  '137.184.76.254',
  '2604:a880:400:d0::1dc5:6001',
  '159.223.106.62',
  '2604:a880:400:d0::181b:6001',
  '157.245.94.30',
  '2604:a880:400:d0::18e0:6001',
  '134.122.29.140',
  '2604:a880:400:d0::1b1c:8001'
]

// axios HTTP client
// https://github.com/axios/axios
// create an instance using the config defaults provided by the library
const axios = require('axios').create({
  // Store API host and base URI
  baseURL: 'https://api.e-com.plus/v1/',
  timeout: 60000
})
// always JSON for request with body data
;['post', 'patch', 'put'].forEach(method => {
  axios.defaults.headers[method]['Content-Type'] = 'application/json'
})

// keep returned client and promise
// optional setup constructor function
let client, setup
// try to get database filename from environtment variable
const envDbFilename = process.env.ECOM_AUTH_DB

// handle new promise
const promise = new Promise((resolve, reject) => {
  // setup database and table
  setup = (dbFilename, disableUpdates, firestoreDb) => {
    dbFilename = firestoreDb ? null : dbFilename || envDbFilename || process.cwd() + '/db.sqlite3'
    if (!client || client.dbFilename !== dbFilename) {
      const table = 'ecomplus_app_auth'

      // setup instance client object
      const debug = !process.env.ECOM_AUTH_DEBUG
        ? null
        : msg => {
          console.log(`[ECOM_AUTH] ${msg}`)
        }
      client = {
        dbFilename,
        table,
        axios,
        debug
      }
      if (debug) {
        debug(`Starting E-Com Plus App SDK with ${(firestoreDb ? 'Firestore' : 'SQLite3')}`)
      }

      // resolve promise with lib methods when DB is ready
      const ready = err => {
        if (!err) {
          const updateTokens = () => {
            require('./lib/services/update-tokens')(client)
          }
          if (disableUpdates !== true && process.env.ECOM_AUTH_UPDATE !== 'disabled') {
            // update access tokens periodically
            updateTokens()
          } else if (debug) {
            debug('Update tokens disabled')
          }

          resolve({
            getAuth: require('./lib/methods/get-auth')(client),
            handleCallback: require('./lib/methods/handle-callback')(client),
            apiRequest: require('./lib/methods/api-request')(client),
            apiApp: require('./lib/methods/api-app')(client),
            appPublicBody: require('./lib/methods/app-public-body')(client),
            refreshToken: require('./lib/methods/refresh-token')(client),
            configureSetup: require('./lib/methods/configure-setup')(client),
            saveProcedures: require('./lib/methods/save-procedures')(client),
            deleteAuth: require('./lib/methods/delete-auth')(client),
            updateTokens
          })
          if (debug) {
            debug('✓ `ecomAuth` is ready')
          }
        } else {
          reject(err)
        }
      }

      if (firestoreDb) {
        // Firestore client is supposed to be ready
        // collectionReferece as db
        client.db = client.collRef = firestoreDb.collection(table)
        ready()
      } else {
        // SQLite3 client
        // https://github.com/mapbox/node-sqlite3
        const sqlite = require('sqlite3').verbose()

        // init SQLite3 client with database filename
        // https://github.com/mapbox/node-sqlite3
        // reject all on error
        client.db = new sqlite.Database(dbFilename, err => {
          if (err) {
            reject(err)
          } else {
            // try to run first query creating table
            client.db.run('CREATE TABLE IF NOT EXISTS ' + table + ` (
              created_at                  DATETIME  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
              updated_at                  DATETIME  NULL,
              application_id              VARCHAR   NOT NULL,
              application_app_id          INTEGER   NOT NULL,
              application_title           VARCHAR   NOT NULL,
              authentication_id           VARCHAR   NOT NULL  PRIMARY KEY,
              authentication_permissions  TEXT      NULL,
              store_id                    INTEGER   NOT NULL,
              access_token                TEXT      NULL,
              setted_up                   INTEGER   NOT NULL  DEFAULT 0
            );`, ready)
          }
        })
      }
    }
    return promise
  }

  const {
    ECOM_AUTH_SETUP_TIMEOUT,
    GCP_PROJECT,
    GCLOUD_PROJECT,
    FIREBASE_CONFIG
  } = process.env

  if (
    ECOM_AUTH_SETUP_TIMEOUT !== 'disabled' &&
    // ignore setup timeout for Google (Firebase) Cloud Functions by default
    ((!GCP_PROJECT && !GCLOUD_PROJECT && !FIREBASE_CONFIG) || ECOM_AUTH_SETUP_TIMEOUT === 'enabled')
  ) {
    // timeout to handle setup
    setTimeout(() => {
      if (!client) {
        reject(new Error('You must setup E-Com Plus auth before use SDK'))
      }
    }, 4000)
  }
})

if (envDbFilename) {
  // databse filename defined by environtment variable
  // auto trigger setup
  setup()
}

module.exports = {
  setup,
  promise,
  ecomAuth: promise,
  ecomServerIps
}
