# ecomplus-app-sdk

[![CodeFactor](https://www.codefactor.io/repository/github/ecomclub/ecomplus-app-sdk/badge)](https://www.codefactor.io/repository/github/ecomclub/ecomplus-app-sdk)
[![npm version](https://img.shields.io/npm/v/ecomplus-app-sdk.svg)](https://www.npmjs.org/ecomplus-app-sdk)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Authenticating apps to Store API with NodeJS and SQLite

## Environment variables

Variable            | Value
---                 | ---
`ECOM_AUTH_DB`      | `/dbs/ecom.sqlite3`
`ECOM_AUTH_UPDATE`  | `enabled`

- `ECOM_AUTH_DB` is **required** if you're not passing the DB filename
as argument of setup function;

- `ECOM_AUTH_UPDATE` is optional and enabled by default,
set it to `disabled` if you want to disable
the `update-tokens` automatic service.

## Documentation

> No documentation for methods yet (TODO)
