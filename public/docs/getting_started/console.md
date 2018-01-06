# Using Truffle Develop and the console

Sometimes it's nice to work with your contracts interactively for testing and debugging purposes, or for executing transactions by hand. Truffle provides you two easy ways to do this via an interactive console, with your contracts available and ready to use.

* **Truffle console**: A basic interactive console connecting to any Ethereum client
* **Truffle Develop**: An interactive console that also spawns a development blockchain

## Why two different consoles?

Having two different consoles allows you to choose the best tool for your needs.

Reasons to use **Truffle console**:

* You have a client you're already using, such as [Ganache](/docs/ganache/using) or geth
* You want to migrate to a testnet (or the main Ethereum network)
* You want to use a specific mnemonic or account list

Reasons to use **Truffle Develop**:

* You are testing your project with no intention of immediately deploying
* You don't need to work with specific accounts (and you're fine with using default development accounts)
* You don't want to install and manage a separate blockchain client

## Commands

All commands require that you be in your project folder. You do not need to be at the root.

### Console

To launch the console:

```shell
truffle console
```

This will look for a network definition called `development` in the configuration, and connect to it, if available. You can override this using the `--network <name>` option. See more details in the [Networks](/docs/advanced/networks) section as well as the [command reference](/docs/advanced/commands).

When you load the console, you'll immediately see the following prompt:

```shell
truffle(development)>
```

This tells you you're running within a Truffle console using the `development` network.

### Truffle Develop

To launch Truffle Develop:

```shell
truffle develop
```

This will spawn a development blockchain locally on port `9545`, regardless of what your `truffle.js` configuration file calls for.

When you load Truffle Develop, you will see the following:

```shell
Truffle Develop started at http://localhost:9545/

Accounts:
(0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
(1) 0xf17f52151ebef6c7334fad080c5704d77216b732
(2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
(3) 0x821aea9a577a9b44299b9c15c88cf3087f3b5544
(4) 0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
(5) 0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
(6) 0x2191ef87e392377ec08e7c08eb105ef5448eced5
(7) 0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
(8) 0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
(9) 0x5aeda56215b167893e80b4fe645ba6d5bab767de

Private Keys:
(0) c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
(1) ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f
(2) 0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1
(3) c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c
(4) 388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418
(5) 659cbb0e2411a44db63778987b1e22153c086a95eb6b18bdf89de078917abc63
(6) 82d052c865f5763aad42add438569276c00d3d88a2d062d36b2bae914d58b8c8
(7) aa3680d5d48a8283413f7a108367c7299ca73f553735860a87b08f39395618b7
(8) 0f62d96d6675f32685bbdb8ac13cda7c23436f63efbb9d07700d8669ff12b7c4
(9) 8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5

Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```

This shows you the addresses, private keys, and mnemonic for this particular blockchain.

<p class="alert alert-info">
**Note**: The mnemonic and addresses cannot be changed. If you want to use a different mnemonic or set of addresses, we recommend using [Ganache](/docs/ganache/using).
</p>

<p class="alert alert-danger">
**Warning**: Remember to never use any of these addresses or the mnemonic on the mainnet. This is for development only.
</p>


## Features

Both Truffle Develop and the console provide most of the features available in the Truffle command line tool. For instance, you can type `migrate --reset` within the console, and it will be interpreted the same as if you ran `truffle migrate --reset` on the command line.

Additionally, both Truffle Develop and the console additionally have the following features:

* All of your compiled contracts are available and ready for use.
* After each command (such as `migrate --reset`) your contracts are reprovisioned so you can start using the newly assigned addresses and binaries immediately.
* The `web3` library is made available and is set to connect to your Ethereum client.
* All commands that return a promise will automatically be resolved, and the result printed, removing the need to use `.then()` for simple commands. For example, the following command:

  ```shell
  MyContract.at("0xabcd...").getValue.call();
  ```

  Will return something like:

  ```shell
  5
  ```

### Commands available

* `build`
* `compile`
* `create`
* `debug`
* `exec`
* `install`
* `migrate`
* `networks`
* `opcode`
* `publish`
* `test`
* `version`

If a Truffle command is not available, it is because it is not relevant for an existing project (for example, `init`) or wouldn't make sense (for example, `develop` or `console`).

See full [command reference](/docs/advanced/commands) for more information.
