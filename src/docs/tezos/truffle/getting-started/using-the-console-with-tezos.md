---
title: Using Truffle Console
layout: docs.hbs
---

<p class="alert alert-danger">
<strong>Tezos support</strong> in Truffle is experimental. Give it a spin, and help us out by <a href="https://github.com/trufflesuite/truffle/issues">filing issues on Github</a>.
</p>

# Using the Truffle Console with Tezos

Sometimes it's nice to work with your contracts interactively for testing and debugging purposes, or for executing transactions by hand. Truffle provides you an easy way to do this via an interactive console, with your contracts available and ready to use.

## Command

To launch the console, run the following from your project folder:

```shell
truffle console
```

Truffle will immediately look for a network definition called `development` in the configuration, and connect to it, if available. You can override this using the `--network <name>` option or [customize](#) the `development` network settings. See more details in the [Networks](/docs/truffle/advanced/networks-and-app-deployment) section as well as the [command reference](/docs/truffle/reference/configuration#networks).

When you load the console, you'll immediately see the following prompt:

```shell
truffle(development)>
```

This tells you you're running within a Truffle console using the `development` network.

## Features

The Truffle console provides most of the features available in the Truffle command line tool. For instance, you can type `migrate --reset` within the console, and it will be interpreted the same as if you ran `truffle migrate --reset` on the command line from within your Truffle project.

Additionally, the console has the following features:

* All of your compiled contracts are available and ready for use, via objects like `SimpleStorage`, which are given the same names as your contracts.
* After each command (such as `migrate --reset`) your contracts are reprovisioned so you can start using the newly assigned addresses and binaries immediately.

## Example

Here's an example using the `SimpleStorage` contract that comes with the `tezos-example` Truffle box. In this example, we first run the deploy command, which deploys our contracts to the configured network (equivalent to running `truffle deploy` from the shell). We then use the supplied contract abstraction to get an object that represents the deployed `SimpleStorage` contract; call its `main()` function, creating a new transaction; and then get the contract's data after the transaction completed successfully.

```javascript
truffle(development)> deploy

1_deploy_simple_storage.js
==========================

   Deploying 'SimpleStorage'
   -------------------------
   > operation hash:      opNAUau1XwLzhLJud4XmabRppE81QkZaWm2EcUNeMsxjN2qnRDf
   > Blocks: 1            Seconds: 24
   ...

// truncated output

truffle(development)> let instance = await SimpleStorage.deployed()
truffle(development)> await instance.main(2)    // Make transaction against main() function
{
  tx: 'op8HbSFaHACRQrVZT7SmHjpRwqa9fDVxb6Zjwcyj57jwEgzKpcd',
  ...
} // transaction output
truffle(development)> await instance.storage()  // Get storage data
BigNumber { s: 1, e: 0, c: [ 2 ] }
```

For more information using the contract abstractions made available in the console, see the [Interacting With Your Tezos Contracts](/docs/tezos/truffle/getting-started/interacting-with-your-tezos-contracts) section.

### Commands available

You can run the following commands from within the console:

* `build`
* `compile`
* `create`
* `debug`
* `deploy`
* `exec`
* `help`
* `install`
* `migrate`
* `networks`
* `opcode`
* `publish`
* `run`
* `test`
* `version`

If a Truffle command is not available, it is because it is not relevant for an existing project (for example, `init`) wouldn't make sense (for example, `develop` or `console`).

See full [command reference](/docs/truffle/reference/truffle-commands) for more information.
