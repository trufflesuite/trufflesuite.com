# Choosing an Ethereum client

There are many Ethereum clients to choose from. We recommend different clients depending on whether you are developing or deploying.

## When developing

### Ganache

We recommend [Ganache](/ganache), a one-click GUI blockchain you can use for development. It is designed to be interoperable with Truffle. It processes transactions instantly instead of waiting for the default block time -- so you can test that your code works quickly -- and it tells you immediately when your smart contracts run into errors. It also makes a great client for automated testing, and Truffle knows how to use its special features to speed up test runtime by almost 90% compared to other clients.

Ganache, when launched runs on `http://localhost:7545`. It will display the first 10 accounts and the mnemonic used to create those accounts. ([Read more about account mnemonics](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).)

By default, Ganache will use the following mnemonic:

```
candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```

This mnemonic can be changed to be randomly generated, or you can input your own.


### Truffle Develop

We also recommend using Truffle Develop, a development blockchain built directly into Truffle. It has many of the same features as Ganache, but in addition is built into Truffle, with no external installation required. To run Truffle Develop, type the following into a terminal:

```shell
truffle develop
```

This will run the client on `http://localhost:9545`. It will display the first 10 accounts and the mnemonic used to create those accounts. ([Read more about account mnemonics](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).) Truffle Develop uses the same mnemonic every time to make developing your applications as easy as possible:

```
candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```

Once launched, Truffle Develop will provide you with a console you can use to run all available Truffle commands. These commands are input by omitting the `truffle` prefix. So, for example, to compile your smart contracts, instead of typing `truffle compile`, you need to only type `compile`.

To read more about interacting with the console, please see the [Using the Console](/docs/getting_started/console) section.

### Ganache CLI

Ganache has a command-line interface, called [Ganache CLI](https://github.com/trufflesuite/ganache-cli/), with similar functionality to Ganache. This is useful for those who want to use Ganache but aren't working in a graphical environment. Ganache CLI is [available separately]((https://github.com/trufflesuite/ganache-cli/).

## Deploying to live networks

There are many official and unofficial Ethereum clients available for you to use. The following is a short list:

* Geth (go-ethereum): [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum)
* WebThree (cpp-ethereum): [https://github.com/ethereum/cpp-ethereum](https://github.com/ethereum/cpp-ethereum)
* Parity: [https://github.com/paritytech/parity](https://github.com/paritytech/parity)
* More: [https://www.ethereum.org/cli](https://www.ethereum.org/cli)

These are full client implementations that include mining, networking, blocks and transaction processing. You should use these clients after you've sufficiently tested your dapp with Ganache or Truffle Develop and you're ready to deploy to your desired Ethereum network. Truffle can deploy to these clients without any extra configuration.

## Deploying to private networks

Private networks utilize the same technology as with live networks, but with a different configuration. So you can configure any of the Ethereum clients mentioned above to run a private network, and deploy to it in exactly the same way.
