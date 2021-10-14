---
hide:
  - navigation
---

# Truffle React DApp

This project is build for react dapp developing, include `solidity` contract writing and `web3.js` API using demo.

[![made-for-ethereum](https://img.shields.io/badge/made_for-ethereum-454dc3.svg)](https://www.ethereum.org/)

[![demo video](https://img.youtube.com/vi/oNT9etUkQ1g/0.jpg)](https://youtu.be/oNT9etUkQ1g)

## Installtation

1. Install Truffle

```
yarn global add truffle
```

2. Download the box with the `truffle unbox` command.

```
truffle unbox tpai/truffle-react-dapp
```

3. Lauch local blockchain server, you could use truffle develop console, or UI interface [Ganache](http://truffleframework.com/ganache/).

```
truffle develop
```

4. Compile and deploy contracts

```
truffle compile
truffle migrate
```

5. Install [metamask extension](https://metamask.io/), switch to private network first, and configure custom RPC URL `http://127.0.0.1:7545`, then use `seed phrase` to login, you will have first account logged in.
6. Start web server, visit `http://localhost:3000`, try to send some ETH and Token from current account to another account and see what happens.

```
// If this is your first time running the start command, you'll also need to run `yarn` to install the necessary dependencies.
cd client && yarn start
```
