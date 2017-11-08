# Choosing an Ethereum client

There are many Ethereum clients to choose from. We recommend different clients depending on whether you are developing or deploying.

## When developing

### Truffle Develop

We recommend using Truffle Develop, a development blockchain built directly into Truffle. It processes transactions instantly instead of waiting for the default block time -- so you can test that your code works quickly -- and it tells you immediately when your smart contracts run into errors. It also makes a great client for automated testing, and Truffle knows how to use its special features to speed up test runtime by almost 90% compared to other clients.

Because Truffle Develop is built into Truffle, no external installation is required. To run Truffle Develop, type the following into a terminal:

```shell
truffle develop
```

This will run the client on `http://localhost:9545`. It will display the first 10 accounts and the mnemonic used to create those accounts. ([Read more about account mnemonics](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).) Truffle Develop uses the same mnemonic every time to make developing your applications as easy as possible:

```
candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```

Once launched, Truffle Develop will provide you with a console you can use to run all available Truffle commands. These commands are input by omitting the `truffle` prefix. So, for example, to compile your smart contracts, instead of typing `truffle compile`, you need to only type `compile`.

To read more about interacting with the console, please see the [Using the Console](/docs/getting_started/console) section.

### TestRPC

You can also use [EthereumJS TestRPC](https://github.com/ethereumjs/testrpc). It's a separate command-line blockchain you can use for both development and automated testing, and works well with Truffle. Check out its [README](https://github.com/ethereumjs/testrpc/blob/master/README.md) and documentation for more information.

## Deploying to live networks

There are many official and unofficial Ethereum clients available for you to use. The following is a short list:

* Geth (go-ethereum): [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum)
* WebThree (cpp-ethereum): [https://github.com/ethereum/cpp-ethereum](https://github.com/ethereum/cpp-ethereum)
* Parity: [https://github.com/paritytech/parity](https://github.com/paritytech/parity)
* More: [https://www.ethereum.org/cli](https://www.ethereum.org/cli)

These are full client implementations that include mining, networking, blocks and transaction processing. You should use these clients after you've sufficiently tested your dapp with Truffle Develop or the TestRPC and you're ready to deploy to your desired Ethereum network. Truffle can deploy to these clients without any extra configuration.

## Deploying to private networks

Private networks utilize the same technology as with live networks, but with a different configuration. So you can configure any of the Ethereum clients mentioned above to run a private network, and deploy to it in exactly the same way.
