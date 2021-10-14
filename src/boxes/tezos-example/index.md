---
hide:
  - navigation
---

Tezos Example Box
=================

**Note: Experimental. Currently designed for demo purposes only.**

This box contains a `Counter` and `SimpleStorage` contract to display the basics of Tezos LIGO integration with Truffle.


## Prerequisites

- [Docker](https://docs.docker.com/v17.12/install/)
  - Used for LIGO compilations and running a local sandbox Tezos node.
- [NodeJS](https://nodejs.org/en/)
  -  v8.9.4 to v12.2.0


## Installation

1. Install Truffle globally. Make sure you install `truffle@tezos`.
  ```shell
  npm install -g truffle@tezos
  ```

2. Download the box. This also takes care of installing the necessary dependencies.
  ```shell
  truffle unbox tezos-example
  ```


## Usage

- Compiling the example smart contracts

  ```shell
  truffle compile
  ```

- Starting the local `ganache-cli` sandbox Tezos node
  ```shell
  npm run start-sandbox
  ```

- Migrating contracts
  ```shell
  truffle migrate
  ```

- Running contract tests
  ```shell
  truffle test
  ```


## Sandbox Management

An archive mode `ganache-cli` sandbox Tezos node is provided in this box with RPC exposed at port `8732` and ten accounts generously funded with 100 XTZ. For currently supported configurable options, see the `ganache-cli` [documentation](https://github.com/trufflesuite/ganache-cli/tree/tezos#options).


#### Commands

```shell
npm run start-sandbox
```


## Interacting with Live Networks

- A test faucet key can be obtained from https://faucet.tzalpha.net/. Once saved, it can be imported inside `truffle-config.js`:

  ```javascript

  const { mnemonic, secret, password, email } = require("./faucet.json");

  module.exports = {
    networks: {
      carthagenet: {
        host: "https://carthagenet.smartpy.io",
        port: 443,
        network_id: "*",
        secret,
        mnemonic,
        password,
        email,
        type: "tezos"
      }
    }
  };

  ```

- `truffle@tezos` also supports importing an activated account's secret key:

  ```javascript

  module.exports = {
    networks: {
      carthagenet: {
        host: "https://carthagenet.smartpy.io",
        port: 443,
        network_id: "*",
        secretKey: "edsk...", // private key
        type: "tezos"
      }
    }
  };
  ```

  ```shell
  truffle migrate --network carthagenet
  truffle test --network carthagenet
  ```
