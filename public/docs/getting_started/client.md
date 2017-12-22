# Choosing an Ethereum client

There are many Ethereum clients to choose from. We recommend different clients depending on whether you are developing or deploying.

## When developing

### Ganache

We recommend [Ganache](/ganache), a personal blockchain for Ethereum development that runs on your desktop. Part of the Truffle Suite, Ganache simplifies dapp development by placing your contracts and transactions front and center. Using Ganache you can quickly see how your application affects the blockchain, and introspect details like your accounts, balances, contract creations and gas costs. You can also fine tune Ganache's advanced mining controls to better suit your needs. Ganache is available for Windows, Mac and Linux, and you can [download it here](/ganache).

Ganache, when launched, runs on `http://127.0.0.1:7545`. It will display the first 10 accounts and the mnemonic used to create those accounts. ([Read more about account mnemonics](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).)

By default, Ganache will use the following mnemonic:

```
candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```

This mnemonic can be changed to be randomly generated, or you can input your own.

<p class="alert alert-danger">
**Warning**: Do not use this mnemonic on the main Ethereum network (mainnet). If you send ETH to any account generated from this mnemonic, you will lose it all!
</p>

### Truffle Develop

We also recommend using Truffle Develop, a development blockchain built directly into Truffle. Truffle Develop helps you set up an integrated blockchain environment with a single command, no installation required. Run Truffle Develop by typing the following into a terminal:

```shell
truffle develop
```

This will run the client on `http://127.0.0.1:9545`. It will display the first 10 accounts and the mnemonic used to create those accounts. ([Read more about account mnemonics](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).) Truffle Develop uses the same mnemonic every time to make developing your applications as easy as possible:

```
candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```

<p class="alert alert-danger">
**Warning**: Do not use this mnemonic on the main Ethereum network (mainnet). If you send ETH to any account generated from this mnemonic, you will lose it all!
</p>

Once launched, Truffle Develop will provide you with a console you can use to run all available Truffle commands. These commands are input by omitting the `truffle` prefix. So, for example, to compile your smart contracts, instead of typing `truffle compile`, you need to only type `compile`.

To read more about interacting with the console, please see the [Using the Console](/docs/getting_started/console) section.

### Ganache CLI

Ganache also has a command-line interface for those who aren't working from a graphical environment. Great for automated testing and continuous integration environments, Ganache CLI runs headless and can be configured to serve all your development needs. Ganache CLI processes transactions instantly instead of waiting for the default block time, so you can test that your code works quickly. It also tells you immediately when your smart contracts run into errors, and integrates directly with Truffle to reduce test runtime up to 90% compared to other clients. [Learn more about Ganache CLI](https://github.com/trufflesuite/ganache-cli/).


## Deploying to live networks

There are many official and unofficial Ethereum clients available for you to use. The following is a short list:

* Geth (go-ethereum): [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum)
* WebThree (cpp-ethereum): [https://github.com/ethereum/cpp-ethereum](https://github.com/ethereum/cpp-ethereum)
* Parity: [https://github.com/paritytech/parity](https://github.com/paritytech/parity)
* More: [https://www.ethereum.org/cli](https://www.ethereum.org/cli)

These are full client implementations that include mining, networking, blocks and transaction processing. You should use these clients after you've sufficiently tested your dapp with Ganache or Truffle Develop and you're ready to deploy to your desired Ethereum network.

## Deploying to private networks

Private networks utilize the same technology as with live networks, but with a different configuration. So you can configure any of the Ethereum clients mentioned above to run a private network, and deploy to it in exactly the same way.
