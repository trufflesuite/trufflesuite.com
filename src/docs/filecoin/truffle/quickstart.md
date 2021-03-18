---
title: Truffle | Filecoin Quickstart
layout: docs.hbs
---

<p class="alert alert-danger">
<strong>Filecoin support</strong> in Truffle is experimental. Give it a spin, and help us out by <a href="https://github.com/trufflesuite/truffle/issues">filing issues on Github</a>.
</p>

# Filecoin Quickstart

Wanna build apps on Filecoin using Truffle? You're in the right place.

## Ganache

Looking to set up Filecoin-flavored Ganache? Head over to the [Ganache-specific documentation](../ganache/overview).

## Table of Contents

1. [Getting set up](#getting-set-up)
1. [Installing Truffle](#installing-truffle)
1. [Using the Filecoin Truffle Box](#using-the-filecoin-truffle-box)
1. [Further Resources](#further-resources)

## Getting Set Up

### Requirements

* [NodeJS](https://nodejs.org/) v12.13.0 or later
* Windows, Linux or Mac OS X

## Installing Truffle

<!-- TODO: Mike just replaced Tezos with Filecoin; Rosco/gnidan may need to update the below -->

You'll need to download a special version of Truffle to use Filecoin.

    $ npm install -g truffle@filecoin

If you already have Truffle installed, we recommend uninstalling truffle before running the above command.

## Using the Filecoin Truffle Box

This quick start uses an already-created project to provide the base Truffle project structure and example contracts.

In your workspace directory, run the following commands:

    $ mkdir filecoin-example
    $ cd filecoin-example
    $ truffle unbox filecoin

## Further Resources

<!-- TODO: Below may need some Truffle-specific modification from Rosco/gnidan -->

If you've reached this point, you now have a Truffle project that lets you interact with the Filecoin network. Congrats! This is a great start, but there's still much to learn. We suggest you check out the following resources to learn more about Filecoin, Textile, Ganache, and the entire Truffle Suite:

* [Filecoin documentation](https://docs.filecoin.io/)
* [Textile documentation](https://docs.textile.io/)
* [Filecoin-flavored Ganache documentation](../ganache/overview)
* [Main Truffle Suite documentation](https://trufflesuite.com/docs)

