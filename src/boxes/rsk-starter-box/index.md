---
hide:
  - navigation
---

# RSK Truffle Starter Box

This box comes with everything you need to start using Truffle on [RSK Blockchain](https://developers.rsk.co/rsk/).
It includes network configurations for Mainnet, Testnet and the SimpleStorage contract as an example to deploy.

[RSK](https://www.rsk.co/) is an open source platform for Ethereum compatible smart contracts based on the Bitcoin network.

## Requirements

1. [NPM (Node Package Manager)](https://nodejs.org/en/)
Node.js and NPM are needed, though both are usually installed at once.

Go to [Node.js](https://nodejs.org/en/) if you need to install it.

2. Truffle

Install Truffle globally

```shell
npm install -g truffle
```

## Installation

1. Create a new folder.
For example, create the folder `rsk-starter`.
Navigate to the folder in the terminal.

```shell
mkdir rsk-starter
cd rsk-starter
```

2. Run the unbox command. It can take some time, as this will install all necessary dependencies.

```shell
truffle unbox rsksmart/rsk-starter-box
```

This is the result using Windows OS:

![truffle unbox](/images/rsk-starter-box-01.png)

## Development console

Truffle has an interactive console that also spawns a development blockchain. This is very useful for compiling, deploying and testing locally.

3. Run the development console. This command is successful if you see a list of 10 accounts, a mnemonic and the command prompt is now `truffle(develop)>`

```shell
truffle develop
```

You will now be in the truffle develop REPL with seeded accounts and their associated private keys listed.

```txt
Truffle Develop started at http://127.0.0.1:9545/

Accounts:
(0) 0x4579996629f631d5221c9ea0c3552f6dcff61e9e
(1) 0x52f43fccc4ffcbb9f0a57320401139ef4088093f
(2) 0xea7e59d8403587bdb1c12758eb33f82dc9e0a451
(3) 0x9eed1b59ac18360b67b7ef2a069f8c35ad62b009
(4) 0x064874a46fc29fd15736cc0c890276fe1dfb9ecc
(5) 0x2c612c461690ab601977595028ba1ed62e98d605
(6) 0x50a317d18a78e4ad8491c0696582da35ba30b12a
(7) 0xdf68b82ac51d21c731b8aa3c9c1d65c62ffb1b75
(8) 0x018c7c87900304eeff2f852def58776b920b9da2
(9) 0xdc2fe4385c54349c0303e448333a5de1131bc88e

Private Keys:
(0) 0895ef2194a15575ac9e75c5c837853637af444442f7b64dcea60029e68df5f6
(1) 1ca9f748b4d92ca6b9ffcc4f0027a17189871f250666fa20c08bc901a6757174
(2) 97e256de57f8206741223fe20953d047429b85f8a0ed5ec00a459cbf6e5859c4
(3) 7dc0ba635a4fe0af8be559446f34be036bc2aa055a34d81337601ba929b1892c
(4) c2dc9ba56f683ba2090de3932ab991f60c6e08535d2a8ffcc4c3ddea4b9be2f8
(5) e4943ce248e556559f5b5e0cc097215a440ca2dafcaddef9fbad79bef58e028d
(6) fbe436944b525e468209299b0e35f93a287bc0c25411418f10a9c2292ccbca8f
(7) 0381515a5f83c9c97683a370383f45a4d2c8de61299d8a0e03c2313a5ace2457
(8) ed39e1a942bf3c48c744bd5282410c811c56dbbec2bd133d09c43cd005a31e7b
(9) 2dd9fbe98b5a4bad9f619e260f99db699d5b80b3081c0bc283647b576e44b89a

Mnemonic: butter mention wealth vicious fancy plastic treat title filter excess witness bus

⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
Ensure you do not use it on production blockchains, or else you risk losing funds.
```

4. Take a look at the smart contract `SimpleStorage.sol`. You can check it out in folder `contracts`.

This smart contract has:

* A variable `storedData` to store a number
* A function `get()` to return the number stored at variable `storedData`
* A function `set()` to change the number stored at variable `storedData`

5. Compile and migrate the smart contract. Note inside the development console we don't preface commands with truffle.

> To make sure you're in the development console, the command prompt must be `truffle(develop)>`

```shell
compile
```
The `compile output` should be similar to:

![truffle compile](/images/rsk-starter-box-02.png)

```shell
migrate
```

And the `migrate output` should be similar to:

![truffle migrate](/images/rsk-starter-box-03.png)

6. Running contract tests.

Our box also comes with the file `TestSimpleStorage.js` for testing the smart contract. You can check it out in the `test` folder.

Run this command in the development console:

```shell
test
```

This `test output` should be similar to:

![truffle test](/images/rsk-starter-box-04.png)

**NOTE**: This box is the starting point for the RSK tutorial [Using rsk-starter-box](https://developers.rsk.co/tutorials/truffle-boxes/rsk-starter-box/).

## Using RSK networks

Truffle makes developing on RSK easier because we can configure custom networks for RSK. The networks are already configured in the `truffle-config.js` file.

### Setup an account & get R-BTC

- Get an address using [these instructions](https://developers.rsk.co/rsk/architecture/account-based/ "Account Based RSK Addresses - RSK Developers Portal").
- For the RSK Testnet, get tR-BTC from [our faucet](https://faucet.testnet.rsk.co/).
- For the RSK Mainnet, get R-BTC from [an exchange](https://www.rsk.co/#exchanges-rsk).

Take a look `truffle-config.js` file to realize that we are using `HDWalletProvider` with RSK Networks derivations path:
- RSK Testnet dpath: `m/44’/37310’/0’/0`
- RSK Mainnet dpath: `m/44’/137’/0’/0`

For more information check [RSKIP57](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP57.md).

### Update your mnemonic

Paste the wallet mnemonic in the file `.secret`, located in the folder project, and save it.

### Setup the gas price

**Gas** is the internal pricing for running a transaction or contract. When you send tokens, interact with a contract, send R-BTC, or do anything else on the blockchain, you must pay for that computation. That payment is calculated as gas. In RSK, this is paid in **R-BTC**.
The **minimumGasPrice** is written in the block header by miners and establishes the minimum gas price that a transaction should have in order to be included in that block.

To update the **minimumGasPrice** in our project run this query using cURL:

**Testnet**

```shell
curl https://public-node.testnet.rsk.co/ -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}' \
    > .minimum-gas-price-testnet.json
```

**Mainnet**

```shell
curl https://public-node.rsk.co/ -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}' \
    > .minimum-gas-price-mainnet.json
```

This query saved the details of latest block to 
file .minimum-gas-price-testnet.json 
or .minimum-gas-price-mainnet.json, respectively.

In the `truffle-config.js`, we are reading the parameter `minimumGasPrice` in each json file.

For more information about the **Gas** and **minimumGasPrice** please go [here](https://developers.rsk.co/rsk/rbtc/gas/ "Gas - RSK Developers Portal").

### Connect to RSK network

Run the truffle console for any RSK network.

```shell
# Console for Mainnet
truffle console --network mainnet

# Console forn Testnet
truffle console --network testnet
```

### Compile and migrate the smart contracts

We will do it running the below commands directly in the terminal, without using the truffle console, this is to show you an alternative.

On any of the networks, run this commands in a terminal (not in Truffle console):

```shell
truffle compile

truffle migrate
```

## Next steps

- **Go to tutorial**

Go to the tutorial [Using rsk-starter-box](https://developers.rsk.co/tutorials/truffle-boxes/rsk-starter-box/) to learn how to interact with `SimpleStorage.sol`. Also, we covered all the steps with more details, explanations, and images.

- **Find more documentation**

Check out the [RSK developers portal](https://developers.rsk.co/).

- **Do you have questions?**

Ask in [RSK chat](https://gitter.im/rsksmart/getting-started).
