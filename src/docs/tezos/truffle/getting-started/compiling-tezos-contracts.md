---
title: Truffle | Compiling LIGO contracts | Tezos
layout: docs.hbs
---
# Compiling LIGO contracts

## Location

All of your contracts are located in your project's `contracts/` directory. Tezos contracts are written in [LIGO](https://ligolang.org/), and all files containing contracts will have a file extension of `.ligo`. 

With the example Truffle [Tezos project](/docs/tezos/truffle/quickstart) (created through `truffle unbox tezos-example`), you're given two contracts, `Counter.ligo` and `SimpleStorage.ligo`. 

<p class="alert alert-warning">
<strong>Coming from Ethereum?</strong> If you're already familiar with Truffle projects created for Ethereum, you'll notice a distinct lack of a `Migrations.ligo` contract. As of now, the migrations system isn't yet supported by Truffle for Tezos projects.
</p>

## Command

To compile a Tezos Truffle project, change to the root of the directory where the project is located and then type the following into a terminal:

```shell
truffle compile
```

Upon first run, all contracts will be compiled. Upon subsequent runs, Truffle will compile only the contracts that have been changed since the last compile. If you'd like to override this behavior, run the above command with the `--all` option.

## Build artifacts

Artifacts of your compilation will be placed in the `build/contracts/` directory, relative to your project root. (This directory will be created if it does not exist.)

These artifacts are integral to the inner workings of Truffle, and they play an important part in the successful deployment of your application. **You should not edit these files** as they'll be overwritten by contract compilation and deployment.

## All good? 

If you've gotten this far, read more about writing Tezos contracts in the [Writing LIGO Contracts](/docs/tezos/truffle/writing-ligo-contracts) section. 
