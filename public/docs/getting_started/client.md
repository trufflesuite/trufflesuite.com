# Choosing an Ethereum client

There are many Ethereum clients to choose from. We recommend using different clients when developing and deploying.

## Developing locally

### Truffle Develop

We recommend using Truffle Develop, an Ethereum client built directly into Truffle which contains an in-memory blockchain that runs only on your development machine.

It processes transactions instantly instead of waiting for the default block time, so you can test that your code works quickly, and it tells you immediately when your smart contracts run into errors. It also makes a great client for automated testing.

Because Truffle Develop is built into Truffle, no external installation is required. To run Truffle Develop, type the following in a terminal:

```shell
truffle develop
```

This will run the client on `http://localhost:9545`. it will display the first 10 accounts, and a deterministic mnemonic for the blockchain. Truffle Develop uses the same mnemonic upon every launch:

```
candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```

Once the Truffle Develop console is launched, you can run all of the commands you are used to, but omitting the `truffle` prefix. So, for example, to compile your smart contract, instead of typing `truffle compile` on the terminal, just type `compile` in the Truffle Develop console.

### TestRPC

You can also use [EthereumJS TestRPC](https://github.com/ethereumjs/testrpc). Like Truffle Develop, it is an in-memory blockchain that runs only on your development machine. Truffle knows how to use its special features to speed up test runtime by almost 90%.

To run the TestRPC, open a new terminal and type:

```shell
testrpc
```

The TestRPC will start with a different seed each time (and so a different mnemonic and account list), but you can run the TestRPC with a specific mnemonic in order to regenerate the same accounts:

```shell
testrpc --mnemonic word1 word2 word3 ...
```

## Deploying to live networks

* Geth (go-ethereum): [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum)
* WebThree (cpp-ethereum): [https://github.com/ethereum/cpp-ethereum](https://github.com/ethereum/cpp-ethereum)
* Parity: [https://github.com/paritytech/parity](https://github.com/paritytech/parity)
* More: [https://www.ethereum.org/cli](https://www.ethereum.org/cli)

There are many official and unofficial Ethereum clients available for you to use. You should use these clients after you've sufficiently tested your dapp with Truffle Develop or the TestRPC and you're ready to deploy to your desired Ethereum network. These are full client implementations that include mining, networking, blocks and transaction processing, and Truffle can deploy to these clients without any extra configuration.

## Deploying to private networks

Private networks utilize the same technology as with live networks, but with a different configuration. So you can configure any of the Ethereum clients mentioned above to run a private network, and deploy to it in exactly the same way.
