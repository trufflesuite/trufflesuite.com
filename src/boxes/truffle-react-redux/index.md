---
hide:
  - navigation
---

# Truffle-React-Redux

[![travis](https://travis-ci.org/gasolin/truffle-react-redux.svg?branch=master)](https://travis-ci.org/gasolin/truffle-react-redux) [![](https://img.shields.io/badge/💵-Tip_Me-brightgreen.svg)](https://gitcoin.co/tip?username=gasolin)


The `truffle-react-redux` provide the template(box) for your next dapp with React (and Redux, Route, Internationalization). The template separate the concern of `contracts` and `web` frontend as sub projects and include glue scripts to bridge the both sides.

## Installation

1. Install `Truffle`, `Lerna`, `ganachi-cli` globally.
    ```sh
    npm install -g truffle lerna ganachi-cli
    ```

2. Download the box. This also takes care of installing the necessary dependencies.
    ```sh
    truffle unbox gasolin/truffle-react-redux
    ```

3. (This step will be done automatically after unbox.) Glue script can help you to install `contracts/` and `web/` project dependencies at once via [lerna bootstrap](https://github.com/lerna/lerna#bootstrap)

    ```sh
    npm run bootstrap

    # or you can install dependency modules in sub projects via separate commands
    cd contracts && npm install
    cd ../web && npm install
    ```

## Run the test chain

1. Run the test chain via

```
npm run chain
```

The test chain will always start with the same addeess/accounts. Check `Test chain detail` section for more detail.

## Contracts development

Enter `contracts/` folder

1. Run the development console.
    ```sh
    truffle develop
    ```

2. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`. Smart contract changes must be manually recompiled and migrated.
    ```sh
    compile
    migrate

    # If outside the development console..
    npm run build
    ```

3. Glue scripts can copy compiled JSON files into `web/src/lib` to access contract.

```sh
npm run deploy
```

4. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
  ```sh
  # If inside the development console.
  test

  # If outside the development console..
  truffle test

  # glue script
  npm run test
  ```

## Web development

Enter `web/` folder

1. Run the front-end hot reloading in `web/` (outside the truffle development console).
    ```sh
    // Serves the front-end on http://localhost:8080
    npm run start
    ```

2. Build the web project for production.

```sh
npm run build
```

3. Create-react-app can run tests within src/ folder.

```
npm run test
```

## What Does Truffle-React-Redux offer?

The `contracts/` sub project contain normal contracts and was bootstrapped with [truffle init](http://truffleframework.com/docs/getting_started/project) command.

The `web/` sub project  was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and have pre-configured `React` and `Redux` basic settings with `react-router` and `react-intl`. You can access the blockchain via pre-configured redux `state.web3`, `state.accounts`, `state.contracts`, `state.transactions` (via [drizzle](https://truffleframework.com/docs/drizzle/reference/drizzle-state)), or use `lib/web3utils` directly without redux state.

The template provide top level scripts so you can compile and deploy contracts via `npm run compile`, `npm run migrate` commands, or run the app in the development mode via `npm start` command without enter the sub project folders.

![Imgur](https://i.imgur.com/3KxaZ1zl.png)

The glue scripts also help manage `contracts` and  `web` sub projects by install dependency modules and copy compiled JSON into `web/src/lib` for accessing contracts.

## Dependencies

### Whole project

* [lerna](https://github.com/lerna/lerna#bootstrap) Manage `contracts/` and `web/` project.

| command | description |
|-------------|---------------|
| bootstrap | install sub project dependencies |
| chain       | run a test chain |
| compile  | compile contracts |
| migrate   | migrate contracts |
| start        | Runs the web dapp in the development mode |
| publish   | pump sub project packages version |

### Contracts sub project

* [truffle](http://truffleframework.com/): Build, debug, deploy the smart contracts.

| command | description |
|-------------|---------------|
| truffle compile  | compile contracts |
| truffle migrate   | migrate contracts |

Read more in http://truffleframework.com/docs/

### Web sub project

* [Create React App](https://github.com/facebookincubator/create-react-app): Create React apps with no build configuration.
* [Redux](https://redux.js.org/basics/usage-with-react): State management.
* [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)
* [drizzle](https://truffleframework.com/docs/drizzle/): Redux store for web3 and smart contracts. Maintains access to underlying functionality ex: Web3 and your contract's methods.
* [react-router](https://reacttraining.com/react-router/web/guides/philosophy): Declarative routing for React
* [react-intl](https://github.com/yahoo/react-intl/wiki): Internationalize React apps
* [redux-logger](https://github.com/evgenyrodionov/redux-logger) Logger (middleware) for Redux in development

| command | description |
|-------------|---------------|
| npm start | Runs the app in the development mode |
| npm test  | Launches the test runner in the interactive watch mode |
| npm test -- --coverage | Run test once and show the test coverage |

Read more in https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md


### Test chain detail

```
Available Accounts
==================
(0) 0x1d489c3f8ed5ee71325a847888b2157c9ac29c05 (~100 ETH)
(1) 0x1ce421937a6f59bf58faafe316d23aaed690da18 (~100 ETH)
(2) 0x6dbc30ff01a1066ba5af9dfa7b838f4932995b4b (~100 ETH)
(3) 0x4a6bfc37b3f0f511310e6d0e4dcbdac99f5899c5 (~100 ETH)
(4) 0xfd1f713d6e8101aab1aeaaec4aad7380442d6042 (~100 ETH)
(5) 0x4db199fefe8b4a1cd8027c546519498b75e77292 (~100 ETH)
(6) 0xba27d6c39dfa9d2a42f91aa5043817c325ec7b43 (~100 ETH)
(7) 0x35ace72f822f3adbd4cfa633358d5ed7161fa76e (~100 ETH)
(8) 0x68ad18971b17c434aa39f022451c29bdb99e19bf (~100 ETH)
(9) 0xc6b346f43e3a1a60ef3d378d07486fb518f5eb2b (~100 ETH)

Private Keys
==================
(0) 0xbea70301d065cf7946f25251c73dbfff93d4320715e43bdc0d5087553074cb64
(1) 0x8c90c6365f62ff46b3a04edc5dbae3f401f36a50ce5f6da03ba12c08d8a72478
(2) 0xfa2fe8493616350833f4e8979276e0297dab4db889e18a8a33a49c024d3888f0
(3) 0x52f3756c688192c59d372825a2a581ed685a6efe032a343116cf5ed084f7d713
(4) 0xe7ea2af66e409f10ad4e3a06496b59c230363988879a1609d8fa5414c25feb2a
(5) 0xaab4090f43e729d2d04f34c93ed441c9903be85c0a227922cb66aac705a6a0da
(6) 0x5bbd4586b26aa73bbc162e8ab9e3c13b44fd204434f5fac7d57b256bdae09ef4
(7) 0xf63ca261915e41c1f2dcb8535ce14c5b1e675f3ff01515de820819477d37812c
(8) 0xf15be1c6e435585c3b8e568167dd7067c0fc732422421e1f9f3e437ae65a6ce8
(9) 0x55b842b841e2e082d178d7a63c95288f90bb69354064e75c2e6cb7d94f7ecada

HD Wallet
==================
Mnemonic:      mandate wagon sample embrace law ghost join friend tray onion dose dynamic
Base HD Path:  m/44'/60'/0'/0/{account_index}

Gas Price
==================
20000000000

Gas Limit
==================
6721975

Listening on 127.0.0.1:8545
```

### Support Developer Team

If `truffle-react-redux` made your life easier and you like it and want to help us improve it further or if you want to speed up new features, please, support us with a tip. We appreciate all contributions!
