# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.15.6](https://github.com/ecomplus/application-sdk/compare/v1.15.5...v1.15.6) (2021-11-01)


### Bug Fixes

* **deps:** fix \`firebase-admin\` semver to fit v9 and v10 ([376049f](https://github.com/ecomplus/application-sdk/commit/376049f2c681328dc152a10a220ba1683fbb6813))

### [1.15.5](https://github.com/ecomplus/application-sdk/compare/v1.15.4...v1.15.5) (2021-10-21)


### Bug Fixes

* **server-ips:** new server mods.x ips ([080b408](https://github.com/ecomplus/application-sdk/commit/080b4080cf19f4b5d444a1381a55b38cb04d97b3))

### [1.15.4](https://github.com/ecomplus/application-sdk/compare/v1.15.3...v1.15.4) (2021-06-17)


### Bug Fixes

* **api-request:** send token request in advance when token would expire in up to 30min ([bc1949e](https://github.com/ecomplus/application-sdk/commit/bc1949e337f2a3a99284b5ccdbba633ebfcd6053))

### [1.15.3](https://github.com/ecomplus/application-sdk/compare/v1.15.2...v1.15.3) (2021-06-17)


### Bug Fixes

* **handle-callback:** mfix setting `authentication_id` on firestore doc before saving ([9e536b3](https://github.com/ecomplus/application-sdk/commit/9e536b37a55237877b636ea7b9aafc4f8950c566))

### [1.15.2](https://github.com/ecomplus/application-sdk/compare/v1.15.1...v1.15.2) (2021-06-17)


### Bug Fixes

* **handle-callback:** fix assinging values to firestore doc object ([ba07685](https://github.com/ecomplus/application-sdk/commit/ba076856baf040d7348151a238cb89f0be969d56))

### [1.15.1](https://github.com/ecomplus/application-sdk/compare/v1.15.0...v1.15.1) (2021-06-17)


### Bug Fixes

* **api-request:** prevent requesting app endpoint without id ([f5277ae](https://github.com/ecomplus/application-sdk/commit/f5277ae99b9f86906f9ef4a64b719d8f4795a686))
* **handle-callback:** try to save firestore doc with application info even on token refresh ([a8b706b](https://github.com/ecomplus/application-sdk/commit/a8b706b96a1870ba36629c85e901610fa1b464f1))

## [1.15.0](https://github.com/ecomplus/application-sdk/compare/v1.14.11...v1.15.0) (2021-06-17)


### Features

* **api-request:** check token expires and send token update request in advance ([4e3be25](https://github.com/ecomplus/application-sdk/commit/4e3be251e502dc04b352d2bc745d5885fb803376))


### Bug Fixes

* **handle-callback:** on token update, merge firestore doc with store and authentication ids ([16b9e20](https://github.com/ecomplus/application-sdk/commit/16b9e20c811daa0d418c2810f8664b98abd8b6be))
* **update-tokens:** delete tokens older than 30 days only ([4b37738](https://github.com/ecomplus/application-sdk/commit/4b37738a29054e6ae3335aaeaf921d6a8396c34e))

### [1.14.11](https://github.com/ecomplus/application-sdk/compare/v1.14.10...v1.14.11) (2021-05-12)


### Bug Fixes

* **env:** get env vars inside function scope (runtime) ([6a3e4b4](https://github.com/ecomplus/application-sdk/commit/6a3e4b465d6e9381f8ab086d8fc5377da2c0d841))

### [1.14.10](https://github.com/ecomplus/application-sdk/compare/v1.14.9...v1.14.10) (2021-05-07)


### Bug Fixes

* **cloud-functions:** also check for FIREBASE_CONFIG env ([31e9bd8](https://github.com/ecomplus/application-sdk/commit/31e9bd8504f2d4ccde671fb6a3e3d31e93cc647a))

### [1.14.9](https://github.com/ecomplus/application-sdk/compare/v1.14.8...v1.14.9) (2021-05-07)


### Bug Fixes

* **cloud-functions:** check for GCP_PROJECT env ([12781e8](https://github.com/ecomplus/application-sdk/commit/12781e8d10065cef153af5cf47f66b27e37c1b46))
* **env:** get env vars inside function scope ([c7ca077](https://github.com/ecomplus/application-sdk/commit/c7ca077d96b574fe34930a70ccca4aabc5a8f216))

### [1.14.8](https://github.com/ecomplus/application-sdk/compare/v1.14.7...v1.14.8) (2021-03-08)


### Bug Fixes

* **update-tokens:** minor fix debugging queue queue positions ([a1e4f3e](https://github.com/ecomplus/application-sdk/commit/a1e4f3e7fb67a401e0e19c345a8b4c3367a2ae40))
* **update-tokens:** minor fix debugging queue queue positions ([8ea78e0](https://github.com/ecomplus/application-sdk/commit/8ea78e0035b0222140ee23e732264fab38e1f03c))

### [1.14.7](https://github.com/ecomplus/application-sdk/compare/v1.14.6...v1.14.7) (2021-03-08)


### Bug Fixes

* **update-tokens:** query up to 400 tokens, order by last updated (firestore) ([b1d8275](https://github.com/ecomplus/application-sdk/commit/b1d82750aa4893f52213482c9ae9c137e0161ab2))

### [1.14.6](https://github.com/ecomplus/application-sdk/compare/v1.14.5...v1.14.6) (2021-03-06)


### Bug Fixes

* **deps:** firebase-admin ^9.4.0 (security) ([165aaf2](https://github.com/ecomplus/application-sdk/commit/165aaf21ce3ea65d74895616f3dd6cfb47320a90))

### [1.14.5](https://github.com/ecomplus/application-sdk/compare/v1.14.4...v1.14.5) (2021-03-05)


### Bug Fixes

* **update-tokens:** ensure handling and debug queue delay ([b9a7766](https://github.com/ecomplus/application-sdk/commit/b9a776611d830652ab08799b0b55b93a47233f53))

### [1.14.4](https://github.com/ecomplus/application-sdk/compare/v1.14.3...v1.14.4) (2021-03-05)


### Bug Fixes

* **update-tokens:** ensure handling queue delay ([22405b3](https://github.com/ecomplus/application-sdk/commit/22405b396271d1864d69f5dbbee835159688e9c8))

### [1.14.3](https://github.com/ecomplus/application-sdk/compare/v1.14.2...v1.14.3) (2021-02-05)


### Bug Fixes

* **update-tokens:** fix delay to refresh token request ([b859b9f](https://github.com/ecomplus/application-sdk/commit/b859b9ff5887d1caf1ffeb407514e49a5aa1e811))

### [1.14.2](https://github.com/ecomplus/application-sdk/compare/v1.14.1...v1.14.2) (2021-02-02)


### Bug Fixes

* **handle-callback:** save 'expires' iso date to firestore doc ([af2bb68](https://github.com/ecomplus/application-sdk/commit/af2bb68a939a6e8e8fb87bf324ed79ce7aad510d))
* **update-tokens:** stop manipulating firestore timestamp, check each document 'expires' date ([7eebb2e](https://github.com/ecomplus/application-sdk/commit/7eebb2ede7b044932271bce2428b9cda7089c6f6))

### [1.14.1](https://github.com/ecomplus/application-sdk/compare/v1.14.0...v1.14.1) (2021-01-13)

## [1.14.0](https://github.com/ecomplus/application-sdk/compare/v1.13.1...v1.14.0) (2020-10-15)


### Features

* **api-request:** handling ECOM_AUTH_DISABLE_API_RETRY env, also retry for timeout or server error ([91189c8](https://github.com/ecomplus/application-sdk/commit/91189c8251e32428aa1392c14ec859197698d2ae))

### [1.13.1](https://github.com/ecomplus/application-sdk/compare/v1.13.0...v1.13.1) (2020-07-26)

## [1.13.0](https://github.com/ecomplus/application-sdk/compare/v1.12.4...v1.13.0) (2020-06-03)


### Features

* **update-tokens:** return 'updateTokens' as function on setup resolve ([1f1c7da](https://github.com/ecomplus/application-sdk/commit/1f1c7da3de8287e29a3aca5761d530d55727e6f0))

### [1.12.4](https://github.com/ecomplus/application-sdk/compare/v1.12.3...v1.12.4) (2020-05-29)


### Bug Fixes

* **deps:** update @ecomplus/utils to v1.4.1 ([8bc9bf3](https://github.com/ecomplus/application-sdk/commit/8bc9bf305ab52de5cde96662c87a8629468b54c0))

### [1.12.3](https://github.com/ecomplus/application-sdk/compare/v1.12.2...v1.12.3) (2020-05-14)

### [1.12.2](https://github.com/ecomplus/application-sdk/compare/v1.12.1...v1.12.2) (2020-05-14)

### [1.12.1](https://github.com/ecomplus/application-sdk/compare/v1.12.0...v1.12.1) (2020-05-14)

## [1.12.0](https://github.com/ecomplus/application-sdk/compare/v1.11.13...v1.12.0) (2020-05-11)


### Features

* **delete-auth:** add new 'deleteAuth' method ([c1cd7b3](https://github.com/ecomplus/application-sdk/commit/c1cd7b3b1a5ec9eeb14c61a4c0b9703ad9597bd0))


### Bug Fixes

* **get-auth:** for sqlite, get authentication by last update ([d0dede2](https://github.com/ecomplus/application-sdk/commit/d0dede24e3ba32f234a3d98c806f7c334076d02d))
* **update-tokens:** delete no more valid authentications on fail ([d9d2cbd](https://github.com/ecomplus/application-sdk/commit/d9d2cbdd026e9af02ea8c07e0ae4db134ab1d00d))

### [1.11.13](https://github.com/ecomplus/application-sdk/compare/v1.11.12...v1.11.13) (2020-04-27)


### Bug Fixes

* **handle-callback:** fix creating firestore Timestamp (must set ns) ([51dfac7](https://github.com/ecomplus/application-sdk/commit/51dfac757c4bb580a5f3adba3555aa210d53cf7c))

### [1.11.12](https://github.com/ecomplus/application-sdk/compare/v1.11.11...v1.11.12) (2020-04-27)


### Bug Fixes

* **handle-callback:** setup 'updated_at' with old date on firestore ([e6416fb](https://github.com/ecomplus/application-sdk/commit/e6416fb89889ba9d054572301d20b9ea4abfcc49))

### [1.11.11](https://github.com/ecomplus/application-sdk/compare/v1.11.10...v1.11.11) (2020-04-27)

### [1.11.10](https://github.com/ecomplus/application-sdk/compare/v1.11.9...v1.11.10) (2020-04-21)


### Bug Fixes

* **get-auth:** prevent needing to add firestore composite index ([966c3f2](https://github.com/ecomplus/application-sdk/commit/966c3f240d85bc8bc6883507b898bb9de9828017))

### [1.11.9](https://github.com/ecomplus/application-sdk/compare/v1.11.8...v1.11.9) (2020-04-08)


### Bug Fixes

* **api-request:** prefer not using promise.finnaly for node support ([5a5de46](https://github.com/ecomplus/application-sdk/commit/5a5de46970ea1cd22dc050aba47966293379f434))

### [1.11.8](https://github.com/ecomplus/application-sdk/compare/v1.11.7...v1.11.8) (2020-03-18)


### Bug Fixes

* **deps:** @ecomplus/client requires @ecomplus/utils as peer ([f2f2dee](https://github.com/ecomplus/application-sdk/commit/f2f2dee4e2871942a5927828731ad22e2354f639))

### [1.11.7](https://github.com/ecomplus/application-sdk/compare/v1.11.6...v1.11.7) (2020-03-18)


### Bug Fixes

* **api-request:** using ecomClient for better parsing and queue control ([fa3d2f2](https://github.com/ecomplus/application-sdk/commit/fa3d2f2b0a5a71c3750c7b889f0e9c15832597e8))

### [1.11.6](https://github.com/ecomplus/application-sdk/compare/v1.11.5...v1.11.6) (2020-02-18)


### Bug Fixes

* **update-tokens:** ignore interval task for cloud functions by default ([d1dcfad](https://github.com/ecomplus/application-sdk/commit/d1dcfad465d845da4f3558bf152302054fd2c6f9))

### [1.11.5](https://github.com/ecomplus/application-sdk/compare/v1.11.4...v1.11.5) (2020-02-18)


### Bug Fixes

* **get-auth:** for firestore, order by 'updated_at' desc ([dd87490](https://github.com/ecomplus/application-sdk/commit/dd87490cab9f0746cddf4665eee381c26b72b82c))

### [1.11.4](https://github.com/ecomplus/application-sdk/compare/v1.11.3...v1.11.4) (2020-02-18)


### Bug Fixes

* **setup-timeout:** ignore setup timeout for Cloud Functions by default ([5edc1fb](https://github.com/ecomplus/application-sdk/commit/5edc1fbd4ea413bee796372c307e0dc2261eac0c))

### [1.11.3](https://github.com/ecomplus/application-sdk/compare/v1.11.2...v1.11.3) (2020-02-17)

### [1.11.2](https://github.com/ecomplus/application-sdk/compare/v1.11.1...v1.11.2) (2020-02-17)

### [1.11.1](https://github.com/ecomplus/application-sdk/compare/v1.11.0...v1.11.1) (2020-02-17)

## [1.11.0](https://github.com/ecomplus/application-sdk/compare/v1.11.0-rc.1...v1.11.0) (2020-02-17)


### Bug Fixes

* **deps:** require sqlite3/firebase-admin only when needed ([af55228](https://github.com/ecomplus/application-sdk/commit/af552283a2fcf2e7e48bfe6b53e7985b3fa6df5e))
* **deps:** require sqlite3/firebase-admin only when needed ([00fd543](https://github.com/ecomplus/application-sdk/commit/00fd54338afbf8ebc862ba11ddb21cb6bfd4a3da))

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
