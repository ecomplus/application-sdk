# application-sdk

[![CodeFactor](https://www.codefactor.io/repository/github/ecomplus/application-sdk/badge)](https://www.codefactor.io/repository/github/ecomplus/application-sdk) [![npm version](https://img.shields.io/npm/v/@ecomplus/application-sdk.svg)](https://www.npmjs.org/@ecomplus/application-sdk) [![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Abstractions for apps authentication and methods to [E-Com Plus Store API](https://developers.e-com.plus/docs/api/#/store/) with NodeJS and Firestore/SQLite.

## Getting started

```bash
npm i --save @ecomplus/application-sdk --no-optional
```

You'll also need to install the database client (depending on your environment):

```bash
npm i --save sqlite3
# OR
npm i --save firestore
```

## Environment variables

Variable                    | Default        |
---                         | ---            | ---
`ECOM_AUTH_DB`              | `./db.sqlite3` | SQLite3 database pathname (if not using Firestore).
`ECOM_AUTH_UPDATE`          | `enabled`      | Set `disabled` to prevent `update-tokens` automatic service.
`ECOM_AUTH_DEBUG`           |                | Set `true` to debug setup and background services.
`ECOM_AUTH_SETUP_TIMEOUT`   | `enabled`      | `disabled` on Google (Firebase) Cloud Functions by default.
`ECOM_AUTH_UPDATE_INTERVAL` | `enabled`      | `disabled` on Google (Firebase) Cloud Functions by default.

## Documentation

> No methods reference (TODO)
