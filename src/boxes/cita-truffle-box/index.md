---
hide:
  - navigation
---

[![CITAHub](https://img.shields.io/badge/made%20for-CITAHub-blue.svg)](https://www.citahub.com/)

# CITA-Truffle-Box

English | [简体中文](./README-CN.md)

CITA-Truffle-Box is based on [truffle-box](https://github.com/truffle-box) to develop and used for  developing DApps on CITA.
Please refer to[our document](https://docs.citahub.com/en-US/cita/cita-intro) for more details about CITA.

>Notice: This project rewrite truffle migrate part of [truffle-box](https://github.com/truffle-box), please read truffle-tutorial first, especially [RUNNING MIGRATIONS ](https://truffleframework.com/docs/truffle/getting-started/running-migrations) part.

## Installation

1. Install Truffle globally

To use CITA-Truffle-Box, please install truffle.
```shell
yarn global add truffle
```

2. Download

```shell
git clone https://github.com/cryptape/cita-truffle-box.git
cd cita-truffle-box/
rm -rf .git
yarn install
```


## Configuration

You can configure your box in `truffle.js`.

The configure options are shown below.

```js
module.exports = {
  networks: {
    development: {
      host: 'ip_address', // eg. '121.196.200.225'
      port: 'port', // eg. 1337
      network_id: '*', // Use '*' to match any network id
      privateKey: 'private key', // a string, required
      // the following parameters are OPTIONAL
      // validUntilBlock: 999999, // an int,  default to (current block number)+88
      // nonce: '999', // a string, default to random int
      // quota: 999999, // an int, defaut to 999999
    }, // you can add other network after here
  },
}
```

### networks

You must use 'development' as the key for now.

* `host`[required]  
Specify the host ip_address, don't add protocol name.

* `port`[required]  
Specify the host port.

* `network_id`[required]  
In order to be compatible with truffle, you have to set this attribute, but it's meaningless here.

* `privateKey` [required]  
Your private key for sending transaction.

* `nonce` [optional]  
  Nonce is a string used to prevent double-spending, default to be a random number from 1 ~ 100.
  Note that the type of `nonce` is string.

* `quota` [optional]  
  Similar to gas in ethereum, default value is 99999.

* `validUntilBlock` [optional]  
  Similar to timeout, default to be `current block height + 88`

## Compile
Compile the smart contract.
```
truffle compile
```

## Migration

First, add your migration scripts in `/migration`, for the details, please refer [RUNNING MIGRATIONS](https://truffleframework.com/docs/truffle/getting-started/running-migrations) for more details.

Input the command to do migration. (Note that we can **NOT** use `truffle migrate` command here...)
```
yarn migrate
```
