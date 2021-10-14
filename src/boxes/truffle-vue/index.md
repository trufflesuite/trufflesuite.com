---
hide:
  - navigation
---

# Vue.js truffle box

A [`truffle box`](http://truffleframework.com/boxes/) to serve as the foundation of any [`Truffle`](http://truffleframework.com) and [`Vue.js`](https://vuejs.org/) dApp. Comes with [`Vue.js`](https://vuejs.org/), [`vue-router`](https://router.vuejs.org/en/), [`Vuex`](https://vuex.vuejs.org/en/intro.html) and [`sass-loader`](https://github.com/webpack-contrib/sass-loader). A minimalist user authentication smart contract is also provided.

## Directory structure

This truffle box is crafted to enforce a clean directory structure.

```
/
|
+-- build/
|   |
|   +-- contracts/
|   |   |
|   |   + truffle compiled contracts
|
+-- config/
|   |
|   +-- babel/
|   |   |
|   |   + babel config files - to come (babel does not allow to specify a custom config file path - yet - so the babel configuration occurs in the package.json file for now)
|   |
|   +-- eslint/
|   |   |
|   |   + estlint config files
|   |
|   +-- postcss/
|   |   |
|   |   + postcss config files
|   |
|   +-- vue-loader
|   |   |
|   |   + vue-loader config files
|   |   
|   +-- webpack/
|   |   |
|   |   + webpack config files
|   
+-- contracts/
|   | 
|   + solidity contracts
|
+-- migrations/
|   |
|   + truffle migrations files
|
+-- scripts/
|   |
|   + webpack scripts
|
+-- src/
|   |
|   + vue.js dapp files
|
+-- static/
|   |
|   + vue.js dapp static files
|
+-- test/
|   |
|   +-- e2e/
|   |   |
|   |   + e2e test files
|   |
|   +-- truffle/
|   |   |
|   |   + truffle test files
|   |
|   +-- unit/
|   |   |
|   |   + unit test files
```

## Installation

1. Install [Truffle](http://truffleframework.com) and an Ethereum client - like [EthereumJS TestRPC](https://github.com/ethereumjs/testrpc).
	```
	npm install -g truffle // Version 3.0.5+ required.
	npm install -g ethereumjs-testrpc
	```

2. Download this box.
	```
	truffle unbox wespr/truffle-vue
	```
3. Launch [`testrpc`](https://github.com/ethereumjs/testrpc).
	```
	testrpc <options>
	```

4. Compile and migrate the contracts.
	```
	truffle compile
	truffle migrate
	```

4. Run the webpack server for front-end hot reloading. Smart contract changes do not support hot reloading for now.
	```
	npm run start
	```
    
## Tests
This box comes with everything bundled for `unit`, `e2e` and `truffle` contracts testing.

1. `unit` and `e2e` tests.
	```
	npm run test/dapp
	```

2. `truffle` contracts tests.
	```
	npm run test/truffle
	```

3. Alternatively you can directly run `unit`, `e2e` and `truffle` contracts tests in one command.
	```
	npm run test
	```

## Build for production
To build the application for production, use the build command. A production build will be compiled in the `dist` folder.
```javascript
npm run build
```

## Issues

Please send any bug issues or proposal for improvement to [Issues](https://github.com/wespr/truffle-vue/issues).