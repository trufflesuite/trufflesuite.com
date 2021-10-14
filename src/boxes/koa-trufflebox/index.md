---
hide:
  - navigation
---

# Koa-Box
A truffle box to serve as the foundation of any Truffle and Koa.js dApp.

This Box Uses NodeJS(Koa JS) to provide API endpoints to the Ethereum Blockchain smart contract so that this smart contract can be used in Android/Ios Apps as well.

- Production grade lightweight JSON based logging utility
- configurable env's based on current NODE_ENV
- Error handling middlewares
- Easily pluggable controllers and routers
- The project structure is highly modular and can be directly used or extended for production purpose

**Pre-Requisites**
1. [NodeJS](https://nodejs.org/en/)
2. [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) Or [NPM](https://www.npmjs.com/get-npm)
3. [GanacheCLI](https://github.com/trufflesuite/ganache-cli)
4. [Truffle](https://github.com/trufflesuite/truffle)

**Installation**
1. Install Truffle and Ganache CLI globally.

```
npm install -g truffle
npm install -g ganache-cli
```

2. Download the box. This also takes care of installing the necessary dependencies.

```
truffle unbox manjeet-thadani/koa-trufflebox

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


8. To run the Koa server `yarn start` or `npm start`
9. In the browser window open `http://localhost:8081/`.

**Collaborators**
1. [MANJEET THADANI](https://github.com/manjeet-thadani)
2. [CHIRAG MALIWAL](https://github.com/cmaliwal)
