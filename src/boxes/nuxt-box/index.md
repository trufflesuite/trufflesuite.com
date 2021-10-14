---
hide:
  - navigation
---

![nuxt-box](https://storage.googleapis.com/paperchain-assets/nuxt-box-banner.png)

# Nuxt-box
Nuxt-box is a truffle box using the [Nuxt.js](https://nuxtjs.org) framework to create a [Vue.js](https://vuejs.org/) application that can interact with the smart contracts on [Ethereum](https://ethereum.org/).

## Setup & Installation
- Install [truffle](http://truffleframework.com): `npm i -g truffle`
- Download the box. This also takes care of installing the necessary dependencies: `truffle unbox Paperchain/nuxt-box`
- Install [Metamask browser extension](https://metamask.io/)

## Running the Application

    If you have MetaMask set for your browser, configure a 
    Custom RPC with address: http://localhost:9545 from Metamask Networks tab.
    
1) Open terminal and run the development server: `truffle develop`
2) Connect local-rpc account with MetaMask. Follow [this answer](https://ethereum.stackexchange.com/questions/30593/how-can-i-import-the-accounts-from-truffle-develop-into-metamask) on Ethereum StackExchange.
This account will have tokens and ether for transactions.
3) Deploy the contracts to the local-rpc: `migrate --reset`
4) Copy the token address from the terminal:

```
EIP20: 0x345ca3e014aaf5dca488057592ee47305d9b3e10
```

5) Paste the token address to **src/store/eip20.js** where it says:

```
const tokenAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10'
// insert deployed EIP20 token address here
```

6) Open a new terminal tab and run the webapp: `npm run dev`


## Web App Commands

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project using
$ npm run generate

# lint or lintfix
$ npm run lint
$ npm run lintfix
```

## Truffle Commands

``` bash
# run contract tests
$ truffle test

# run truffle development mode (run local blockchain)
$ truffle develop

# deploy contracts to local blockchain
$ truffle migrate --reset
$ migrate --reset (when in development mode)
```


## Credits

For example purposes this boilerplate uses [EIP20 token contracts made by ConsenSys](https://github.com/ConsenSys/Tokens/tree/master/contracts/eip20).
