---
title: Truffle | Tezos Quickstart
layout: docs.hbs
---
# Tezos Quickstart

Wanna build apps on Tezos using Truffle? You're in the right place. 

<p class="alert alert-warning">
<strong>Tezos support</strong> in Truffle is experimental. You'll need to download a special version of Truffle in order to develop with Tezos (see below).
</p>

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

    $ npm install -g truffle@alphaTez

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

You can see that these contracts end in the `.ligo` file extension. This refers to the [LIGO programming language](https://ligolang.org/). See the [Writing LIGO contracts]() section for more info. 

## Deploying Contracts

By default, the example box deploys your contracts to a public test network called [BabylonNet](https://tezos.gitlab.io/#babylonnet-test-network). You can find the following deployment scripts within the `./migrations` directory:

* `1_deploy_simple_storage.js`
* `2_deploy_counter.js`

Truffle will handle running these scripts when you run the following command:

    $ truffle migrate

See the [Deploying your Contracts]() section for more information on how to write and use Truffle's deployment scripts.

<p class="alert alert-danger">
<strong>Caution!</strong> This example box uses a default account and private key, and is given free XTZ from a faucet on the Babylon network. You should not use this account and private key when deploying your application to the production network. You will lose funds. 
</p>

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

TODO: Add links to Truffle's documentation here.





