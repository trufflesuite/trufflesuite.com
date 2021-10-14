---
hide:
  - navigation
---

# RSK Next JS Box

This box comes with everything you need to start using smart contracts from a react app and [Next JS](https://nextjs.org/) on [RSK Blockchain](https://developers.rsk.co/rsk/).
It includes network configurations for Mainnet, Testnet and the SimpleStorage contract as an example to deploy.

## Requirements

1. [NPM (Node Package Manager)](https://nodejs.org/en/)
Node.js and NPM are needed, though both are usually installed at once.

Go to [Node.js](https://nodejs.org/en/) if you need to install it.

2. Truffle

Install Truffle globally:

```shell
npm install -g truffle
```

## Installation

1. Create a new folder.
For example, create the folder `rsk-next`.
Navigate to the folder in the terminal.

```shell
mkdir rsk-next
cd rsk-next
```

2. Run the unbox command. It can take some time, as this will install all necessary dependencies.

```shell
truffle unbox rsksmart/rsk-next-box
```

A Create-React-Next-App is generated in the `app` directory.

This is the result using Windows OS:

![truffle unbox](/images/rsk-next-box-01.png)

## Development console

Truffle has an interactive console that also spawns a development blockchain. This is very useful for compiling, deploying and testing locally.

3. Run the development console. This command is successful if you see a list of 10 accounts, a mnemonic and the command prompt is now `truffle(develop)>`

```shell
truffle develop
```

You will now be in the truffle develop REPL with seeded accounts and their associated private keys listed.

```txt
C:\RSK\rsk-next>truffle develop

Truffle Develop started at http://127.0.0.1:8545/

Accounts:
(0) 0x1056f747cf4bc7710e178b2aeed4eb8c8506c728
(1) 0x45a71c00382c2898b5d6fae69a6f7bfe6edab80c
(2) 0x1596384706dc9ac4cca7f50279a4abe591d6c3fe
(3) 0x9576d0a496b645baa64f22aceb2328e7468d4113
(4) 0xd431572eef7d77584d944c1809398a155e89f830
(5) 0x92c111839718fe0800fadccc67068b40b8524a0f
(6) 0x6da22b5a027146619bfe6704957f7f36ff029c48
(7) 0x2c3a82d8c3993f8c80dcaf91025437bd057df867
(8) 0xc43ae7a44f7deb759177b7093f06512a0a9ff5d7
(9) 0xe61bf00cd7dce248449cfe58f23a4ef7d542bc0b

Private Keys:
(0) f32f32839fe27ad906b63eafb326f26fed95c231e3c5e33c7cdd08f62db63167
(1) ebef990088f27f6ef13b5e52a77d5dcc5a76862a701908c586d01b6fe93562b3
(2) 598ccae5e4436fedeb0e798c0d254789c55a63401ebfc3ae8ddde29634ddfcde
(3) 09934b80f391e0024b8cb00cd73790fdf64c4d0509e144766414fee317cd3f4e
(4) ac745b84b6574b5738d364b43e0d471c9d5107504acc709c90f6f091b78c751b
(5) 449654cde095f2349113ef12a93e139b4302bc95adb3619d08adf53dde9b8847
(6) c217f12a89c352fc70b5f1bd5742314b4fb1bb1e35cb779fdb3c2390106355db
(7) 1d4c74dfa4e99e161130c18cc63938bb120a128cefbf1b9188efc678bf5722cb
(8) 0f44e0becf2e090db498a1b747d2a758fcc81fb0241f350d61117a9c6b1fa82e
(9) 85218c5eec657470dafeb09e6f7101f91d21bfe822fbeeecfc9275f798662a63

Mnemonic: virtual valve razor retreat either turn possible student grief engage attract fiber

⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
Ensure you do not use it on production blockchains, or else you risk losing funds.

truffle(develop)>
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

![truffle compile](/images/rsk-next-box-02.png)

```shell
migrate
```

And the `migrate output` should be similar to:

![truffle migrate](/images/rsk-next-box-03.png)

6. Running contract tests.

Our box also comes with the file `TestSimpleStorage.js` for testing the smart contract. You can check it out in the `test` folder.

Run this command in the development console:

```shell
test
```

This `test output` should be similar to:

![truffle test](/images/rsk-next-box-04.png)

Note the command varies slightly if you're in or outside of the development console.

```javascript
// inside the development console.
test

// outside the development console.
truffle test
```

## Client side application

Our box has done a front end to interact with the smart contract, built using React app and Next JS.

7. In another terminal (i.e. not in the truffle develop prompt), go to the `app` directory and run the React app.

> Do not close the other terminal, which is running the Truffle development console, because it is our Blockchain simulator.
> 
> If you close it and then open it again, you need to deploy / migrate the smart contract again too!

```shell
cd app
npm run dev
```

![npm run dev](/images/rsk-next-box-05.png)

Then go to your browser at [http://localhost:3000/](http://localhost:3000/)

![localhost port 3000](/images/rsk-next-box-06.png)

> Smart contract changes must be manually recompiled and migrated!

**NOTE**: This box is the starting point for the RSK tutorial [Using rsk-next-box](https://developers.rsk.co/tutorials/truffle-boxes/rsk-next-box/).

## Using RSK networks

### Setup an account & get R-BTC

- Get an address, learning how works the [account based RSK addresses](https://developers.rsk.co/rsk/architecture/account-based/ "Account based RSK addresses - RSK Developers Portal").
- For the RSK Testnet, get tR-BTC from [our faucet](https://faucet.testnet.rsk.co/).
- For the RSK Mainnet, get R-BTC from [an exchange](https://developers.rsk.co/rsk/rbtc/).

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

For more information about the **Gas** and **minimumGasPrice** please go to [gas page](https://developers.rsk.co/rsk/rbtc/gas/ "Gas - RSK Developers Portal").

### Connect to RSK

1. Copy your mnemonic to `truffle-config.js`

```javascript
//Put your mnemonic here, be careful not to deploy your mnemonic into production!
const mnemonic = 'A_MNEMONIC';
```

Please be aware that we are using `HDWalletProvider` with RSK Networks derivations path:
- RSK Mainnet dpath: `m/44’/137’/0’/0`
- RSK Testnet dpath: `m/44’/37310’/0’/0`

For more information check [RSKIP57](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP57.md).

2. Run the development console for any RSK network.

```shell
# Console for Testnet
truffle console --network testnet

# Console for Mainnet
truffle console --network mainnet
```

3. Migrate the smart contracts. We will do it running the below commands directly in the terminal, without using the truffle console now to show to you this alternative.

```shell
truffle migrate
```

4. Update Express JS component. 

The component located in the file `web3-util.js` uses the [web3.js](https://web3js.readthedocs.io/) library to interact with the blockchain - writing code that reads and writes data from the blockchain with smart contracts.

Choose which network you would like to connect the server to RSK Network 
and update line 15 of the file `app/utils/web3-util.js`

**Testnet**
```js    
const provider = new Web3.providers.HttpProvider("https://public-node.testnet.rsk.co");    
```

**Mainnet**
```js        
const provider = new Web3.providers.HttpProvider("https://public-node.rsk.co");
```

5. In a terminal, go to the `app` directory and run the React app.

```shell
cd app
npm run dev
```

Go to your browser at [http://localhost:3000/](http://localhost:3000/)

> Note that when you are connected to an RSK network, you do not need to leave open the Truffle console, because the app is connected via a public node, directly to the network.

## Next steps

- **Go to tutorial**

Go to the tutorial [using rsk-next-box](https://developers.rsk.co/tutorials/truffle-boxes/rsk-next-box/) to learn more about this project. We covered all the steps with more details, explanations, and images.

- **Find more documentation**

Check out the [RSK developers portal](https://developers.rsk.co/).

- **Do you have questions?**

Ask in [RSK chat](https://gitter.im/rsksmart/getting-started).
