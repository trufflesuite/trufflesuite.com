# Using the console

Sometimes it's nice to work with your contracts interactively for testing and debugging purposes, or for executing transactions by hand. Truffle provides you an easy way to do this via an interactive console, with your contracts available and ready to use.

## Command

To fire up the console, simply run:

```none
$ truffle console
```

This will load up a console using the `development` network, if specified. You can override this using the `--network` option. See more details in the [Networks](/docs/advanced/networks) section as well as the [command reference](/docs/advanced/commands).

When you load the console, you'll immediately see output like this:

```
$ truffle console
truffle(development)>
```

This tells you you're running within a Truffle console using the `development` network.

## Features

The console provides all the features available in the Truffle command line tool. For instance, you can type `migrate --reset` within the console, and it will be interpreted the same as if you ran `truffle migrate --reset` from outside the console. Truffle's console additionally has the following features:

* All of your compiled contracts are available and ready for use.
* After each command (such as `migrate --reset`) your contracts are reprovisioned so you can start using the newly assigned addresses and binaries immediately.
* The `web3` library is made available and is set to connect to your Ethereum client.
* All commands that return a promise will automatically be resolved, and the result printed, removing the need to use `.then()` for simple commands. e.g.,

```
truffle(default)> MyContract.at("0xabcd...").getValue.call(); 
5
```
