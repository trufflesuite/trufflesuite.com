# Networks and app deployment

Even the smallest project will interact with at the very least two blockchains: One on the developer's machine, like [Ganache](/ganache) or Truffle Develop, and the other representing the network where the developer will eventually deploy their application (such as the main public Ethereum network or a private consortium network, for instance). Truffle provides a system for managing the compilation and deployment artifacts for each network, and does so in a way that simplifies final application deployment.

## Configuration

See the [Configuration](/docs/advanced/configuration#networks) section for more information.

## Specifying a network

Most Truffle commands will behave differently based on the network specified, and will use that network's contracts and configuration. You can specify a network using the `--network` option, like below:

```bash
$ truffle migrate --network live
```

In this example, Truffle will run your migrations on the "live" network, which -- if configured like [the example](/docs/advanced/configuration#networks) -- is associated with the public Ethereum blockchain.

## Build artifacts

As mentioned in the [Compiling contracts](/docs/getting_started/compile) section, build artifacts are stored in the `./build/contracts` directory as `.json` files. When you compile your contracts or run your migrations using a specific network, Truffle will update those `.json` files so they contain the information related to that network. When those artifacts are used later -- such as within your frontend or application via [truffle-contract](https://github.com/trufflesuite/truffle-contract) -- they'll automatically detect which network the Ethereum client is connected to and use the correct contract artifacts accordingly.

## Application deployment

Because the network is auto-detected by the contract artifacts at runtime, this means that you only need to deploy your application or frontend *once*. When your application is run, the running Ethereum client will determine which artifacts are used, and this will make your application very flexible. As an example, if you were to deploy a web application to http://mydapp.io, you could navigate to that address using your favorite wallet-browser (like MetaMask, or Mist) and your dapp would work correctly regardless of the Ethereum network the wallet-browser was connected to. If the wallet-browser was connected to the live network, your dapp would use the contracts you deployed on the live network. If on Ropsten, the contracts you deployed to Ropsten would be used.
