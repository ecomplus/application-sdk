# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.11.0-rc.1](https://github.com/ecomclub/ecomplus-app-sdk/compare/v1.11.0-rc.0...v1.11.0-rc.1) (2020-02-15)


### Features

* **debug:** handle ECOM_AUTH_DEBUG env and debug setup and services ([aaac316](https://github.com/ecomclub/ecomplus-app-sdk/commit/aaac316be4a1fda433e60824646e9d4f48b29551))

## [1.11.0-rc.0](https://github.com/ecomclub/ecomplus-app-sdk/compare/v1.11.0-beta.3...v1.11.0-rc.0) (2020-02-15)


### Bug Fixes

* **api-request:** prevent not fulfilled firestore delete promise ([03bfb77](https://github.com/ecomclub/ecomplus-app-sdk/commit/03bfb77a64652a3710f7251a1215656740ad2cb8))
* **firestore:** fix handling update tokens and get auth with firestore/cloud functions ([#6](https://github.com/ecomclub/ecomplus-app-sdk/issues/6)) ([e5c6641](https://github.com/ecomclub/ecomplus-app-sdk/commit/e5c6641fdeb050ad444ab6d73b6449172ffc511c))
* **get-auth:** fix handling query reference (when no auth id set) ([0e4e8b6](https://github.com/ecomclub/ecomplus-app-sdk/commit/0e4e8b6c74dcfaa09898b329ee87b1aaf08233dd))
* **handle-callback:** preset 'updated_at' on firestore coll ([9579f7e](https://github.com/ecomclub/ecomplus-app-sdk/commit/9579f7e5b168e10fb3cc01859da6660fa70ed533))
* **update-tokens:** fix handling firestore query, env disable interval ([c4259dc](https://github.com/ecomclub/ecomplus-app-sdk/commit/c4259dc3220c5df0108b1a5a17e046d93020bbba))

## [1.11.0-beta.3](https://github.com/ecomclub/ecomplus-app-sdk/compare/v1.11.0-beta.2...v1.11.0-beta.3) (2020-02-13)


### Bug Fixes

* **handle-callback:** fix promises with firestore and clean (dry) code ([c6ff0c0](https://github.com/ecomclub/ecomplus-app-sdk/commit/c6ff0c0a09fd0b2bc4dcca4632bb101eab94b792))

## [1.11.0-beta.2](https://github.com/ecomclub/ecomplus-app-sdk/compare/v1.11.0-beta.1...v1.11.0-beta.2) (2020-02-11)


### Bug Fixes

* **setup:** auto call ready() when firestore being used ([f8c9ac8](https://github.com/ecomclub/ecomplus-app-sdk/commit/f8c9ac8067c0b5acf3c6694e257ccaa73ca1dc6d))

## [1.11.0-beta.1](https://github.com/ecomclub/ecomplus-app-sdk/compare/v1.11.0-beta.0...v1.11.0-beta.1) (2020-02-07)


### Bug Fixes

* **setup:** requiring 'saveProcedures' method ([#5](https://github.com/ecomclub/ecomplus-app-sdk/issues/5)) ([3f1fa25](https://github.com/ecomclub/ecomplus-app-sdk/commit/3f1fa2525c8ce48452602bb73e47507286f53b16))

## [1.11.0-beta.0](https://github.com/ecomclub/ecomplus-app-sdk/compare/v1.10.1-beta.0...v1.11.0-beta.0) (2020-02-07)


### Features

* **firestore:** added support to google firestore as database ([#3](https://github.com/ecomclub/ecomplus-app-sdk/issues/3)) ([4e686b9](https://github.com/ecomclub/ecomplus-app-sdk/commit/4e686b9210d46524dae03e8a4ff9bd488f53a88e))
* **save-procedures:** added 'saveProcedures' method to re-use code ([#4](https://github.com/ecomclub/ecomplus-app-sdk/issues/4)) ([2cfdfb2](https://github.com/ecomclub/ecomplus-app-sdk/commit/2cfdfb23e2e961c73c754376f00cd3b4f2f5f586))

### [1.10.1-beta.0](https://github.com/ecomclub/ecomplus-app-sdk/compare/v1.10.0...v1.10.1-beta.0) (2020-02-07)

## [1.10.0](https://github.com/ecomclub/ecomplus-app-sdk/compare/v1.9.7...v1.10.0) (2019-10-16)


### Features

* **setup-stores:** handle array of functions as procedures ([43046c5](https://github.com/ecomclub/ecomplus-app-sdk/commit/43046c5caf4269105ce678c6b3217ff0dc31ffed))


### Bug Fixes

* **server-ips:** add public ipv6 addresses ([220c23c](https://github.com/ecomclub/ecomplus-app-sdk/commit/220c23c200b0e6520592f517171d3452e3aad008))
