---
title: Truffle | Tezos Quickstart
layout: docs.hbs
---

<p class="alert alert-danger">
<strong>Tezos support</strong> in Truffle is experimental. Give it a spin, and help us out by [filing issues on Github](https://github.com/trufflesuite/truffle/issues).
</p>

# Tezos Quickstart

Wanna build apps on Tezos using Truffle? You're in the right place. 

## Table of Contents

1. [Getting set up](#getting-set-up)
1. [Installing Truffle](#installing-truffle)
1. [Using the Tezos Truffle Box](#using-the-tezos-truffle-box)
1. [Writing Contracts](#writing-contracts)
1. [Deploying Contracts](#deploying-contracts)
1. [Testing Contracts](#testing-contracts)
1. [Further Resources](#further-resources)

## Getting Set Up

### Installing Docker

Before you can start developing Tezos applications with Truffle, you'll first need to ensure you have [Docker](https://www.docker.com/) installed on your machine. Installing docker let's Truffle easily use the latest LIGO compiler on any platform.

[See Docker install instructions for your platform.](https://docs.docker.com/install/)

<p class="alert alert-info">
<strong>Docker on Windows:</strong> If you're developing on Windows, you need to install the [Docker edge release](https://docs.docker.com/docker-for-windows/edge-release-notes/) instead of the mainline docker version. Trust us: This is a better experience.
</p>

### Other Requirements

* [NodeJS](https://nodejs.org/) v8.9.4 or later
* Windows, Linux or Mac OS X

## Installing Truffle

You'll need to download a special version of Truffle to use Tezos. 

    $ npm install -g truffle@tezos

If you already have Truffle installed, we recommend uninstalling truffle before running the above command.

## Using the Tezos Truffle Box

This quick start uses an already-created project to provide the base Truffle project structure and example contracts. 

In your workspace directory, run the following commands:

    $ mdkir tezos-example
    $ cd tezos-example
    $ truffle unbox tezos-example

## Writing Contracts

The example box comes with two contracts, which you can find in the `./contracts` folder:

* `Counter.ligo`
* `SimpleStorage.ligo`

You can see that these contracts end in the `.ligo` file extension. This refers to the [LIGO programming language](https://ligolang.org/). See the [Writing Tezos contracts](/docs/tezos/truffle/getting-started/writing-tezos-contracts) section for more info. 

## Deploying Contracts

For this quick start, we're going to configure your project to deploy to the [BabylonNet](https://tezos.gitlab.io/#babylonnet-test-network) test network for Tezos. This is the quickest way to get started, though as you get familiar with Tezos, you'll want to set up a local development environment. See the [example box documentation](https://github.com/truffle-box/tezos-example-box#sandbox-management) for an example on using a local flextesa sandbox.

### Configuring Truffle to point to the Babylon testnet

First, navigate to [https://faucet.tzalpha.net/](https://faucet.tzalpha.net/) to get a faucet account. This will create a new account for you on the testnet and fill it with some testnet XTZ. Download the file and save it as `faucet.json` in the root of your project.

Next, replace the box's `truffle-config.js` with the following: 

```javascript
const { mnemonic, secret, password, email } = require("./faucet.json");

module.exports = {
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  networks: {
    development: {
      host: "https://api.tez.ie/rpc/babylonnet",
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

That's it! You're all set to run the box's deployment scripts against a testnet. 

<p class="alert alert-info">
<strong>Note:</strong> The default tezos box is configured to deploy to multiple networks, including mainnet. If you'd like to deploy to those networks, you'll need to first configure the `secret`, `mnemonic`, `password`, and `email` like the above to represent an account you own that's funded with XTZ. See the [Configuring Tezos Projects](/docs/tezos/getting-started/configuring-tezos-projects) section for more info. 
</p>

<p class="alert alert-danger">
<strong>Caution!</strong> Keep your `secret`, `mnemonic` and `passphrase` safe! When not on a testnet, you can quickly lose all your tez if someone else gets ahold of them.
</p>

### Running Truffle's deployment scripts

The example box comes default with pre-written deployment scripts, found within the `./migrations` directory:

* `1_deploy_simple_storage.js`
* `2_deploy_counter.js`

Truffle will handle running these scripts when you run the following command:

    $ truffle migrate

See the [Deploying your Contracts]() section for more information on how to write and use Truffle's deployment scripts.

## Testing Contracts

The box also comes equipped with tests, showing you how to write automated tests for your Tezos contracts. You can find these tests in the `./test` directory:

* `counter.test.js`
* `simpleStorage.test.js`

See the [Test your Contracts]() section for more information on how to write tests for your LIGO congrats.

Running your tests is easy, by running following command: 

    $ truffle test

## Further Resources

If you've reached this point, you now have a Truffle project that lets you compile, test, and deploy LIGO contracts to the Babylon Tezos test network. Congrats! This is a great start, but there's still much to learn. We suggest you check out the following resources to learn more about Tezos, LIGO, and Truffle:

* [LIGO language documentation](https://ligolang.org/docs/intro/what-and-why/)
* [Tezos documentation](https://tezos.gitlab.io/)
* [Taquito communcation library](https://tezostaquito.io/)
* [Main Truffle Suite documentation](https://trufflesuite.com/docs)


