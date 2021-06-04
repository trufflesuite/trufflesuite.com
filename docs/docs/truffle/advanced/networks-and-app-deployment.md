---
title: Networks and App Deployment
layout: docs.hbs
---
# Networks and App Deployment

Even the smallest project will interact with at the very least two blockchain nodes: One on the developer's machine, like [Ganache](/ganache) or Truffle Develop, and the other representing the network where the developer will eventually deploy their application (such as the main public Ethereum network or a private consortium network, for instance). Truffle provides a system for managing the compilation and deployment artifacts for each network, and does so in a way that simplifies final application deployment.

## Configuration

See the [Configuration](/docs/truffle/reference/configuration#networks) section for more information.

## Specifying a network

Most Truffle commands will behave differently based on the network specified, and will use that network's contracts and configuration. You can specify a network using the `--network` option, like below:

```shell
$ truffle migrate --network live
```

In this example, Truffle will run your migrations on the "live" network, which -- if configured like [the example](/docs/truffle/reference/configuration#networks) -- is associated with the public Ethereum blockchain.

## Build artifacts

As mentioned in the [Compiling contracts](/docs/truffle/getting-started/compiling-contracts) section, build artifacts are stored in the `./build/contracts` directory as `.json` files. When you compile your contracts or run your migrations using a specific network, Truffle will update those `.json` files so they contain the information related to that network. When those artifacts are used later -- such as within your frontend or application via [@truffle/contract](https://github.com/trufflesuite/truffle/tree/master/packages/contract) -- they'll automatically detect which network the Ethereum client is connected to and use the correct contract artifacts accordingly.

## Application deployment

Because the network is auto-detected by the contract artifacts at runtime, this means that you only need to deploy your application or frontend *once*. When you run your application, the running Ethereum client will determine which artifacts are used, and this will make your application very flexible. As an example, if you were to deploy a web application to http://mydapp.io, you could navigate to that address using your favorite wallet-browser (like MetaMask, or Mist) and your dapp would work correctly regardless of the Ethereum network the wallet-browser was connected to. If the wallet-browser was connected to the live network, your dapp would use the contracts you deployed on the live network. If on Ropsten, the contracts you deployed to Ropsten would be used.

## Source code verification

After deploying your application, you might want to use [Etherscan](https://etherscan.io/)'s source code verification. Etherscan is one of the most popular block explorers for Ethereum, and by verifying your smart contract source code on their platform users can see what your smart contracts do before they use your application. This helps to grow trust in your smart contracts and your application. One way to do this is the [Etherscan web form](https://etherscan.io/verifyContract), but the easiest way is using [truffle-plugin-verify](https://github.com/rkalis/truffle-plugin-verify). This plugin integrates directly with Truffle's workflow to verify your smart contracts' source code. Read more about setting up and using this plugin in the guide [*Automatically verify Truffle smart contracts on Etherscan*](https://kalis.me/verify-truffle-smart-contracts-etherscan/).
