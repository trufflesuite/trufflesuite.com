---
hide:
  - navigation
---

# Express-Box
To Be Used as Truffle Box Creating API Endpoints for
Ethereum Blockchain.

We use personalised blockchain for Ethereum BlockChain
Development. This personalised blockchain is made in the
GanacheCLI.

The Smart Contract Written in solidity language
is deployed on this Ethereum Blockchain. Smart Contract is
Immutable hence, once deployed it can't be changed.

A truffle box to serve as the foundation of any Truffle and Express.js dApp.

This Box Uses NodeJS(Express JS) to provide API
endpoints to the Ethereum Blockchain smart contract so that this
smart contract can be used in Android Apps as well.

**Pre-Requisites**
1. [NodeJS](https://nodejs.org/en/download/)
2. A Package Manager for NodeJS, such as [Yarn](https://yarnpkg.com/getting-started/install) or npm (comes pre-installed with NodeJS)
3. [GanacheCLI](https://github.com/trufflesuite/ganache-cli)
4. [Truffle](https://github.com/trufflesuite/truffle)

**Installation**
1. Install Truffle and Ganache CLI globally. If you prefer, the graphical version of Ganache works as well!
```
npm install -g truffle
npm install -g ganache-cli
```

2. Download the box. This also takes care of installing the necessary dependencies.

```
truffle unbox arvindkalra/express-box

```

3. Install all the node modules required by running:
```javascript
// install all the node modules using npm
npm install
```  
or if you  prefer yarn
```javascript
//install all the node modules using yarn
yarn install
```
4. Start truffle development console using
```
truffle develop
```
5. Inside the truffle console run `compile` to compile the contracts
6. You can see that a new `/build` folder has been created in the root directory which contains the compiled contracts.

7. Now these contracts need to be deployed on the Blockchain. For this, run `migrate` inside the truffle development console


8. To run the Express server `yarn start` or `npm start`
9. In the browser window open `http://localhost:3000/`.

**Collaborators**
1. [ARVIND KALRA](https://github.com/arvindkalra)
2. [PRANAV SINGHAL](https://github.com/pranav-singhal)
