---
hide:
  - navigation
---

<h1 align="center">Truffle and React (create-react-app)</h1> <br>
<p align="center">
  <img alt="truffle-pig" src="https://github.com/Charterhouse/truffle-create-react-app/blob/master/box-img-lg.png?raw=true" width="240">
</p>
<p align="center">Rapid Ethereum Dapp Development</p>

<p align="center">
  <img alt="made for ethereum" src="https://img.shields.io/badge/made_for-ethereum-771ea5.svg">
  <img alt="MIT license" src="https://img.shields.io/badge/license-MIT-blue.svg">
  <a href="https://standardjs.com"><img alt="StandardJS" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"></a>
  <a href="https://travis-ci.com/Charterhouse/truffle-create-react-app"><img alt="Build Status" src="https://travis-ci.com/Charterhouse/truffle-create-react-app.svg?branch=master"></a>
</p>

---

# A Minimal Smart Contract Development Boilerplate with `create-react-app`-based frontend.

[Truffle](https://github.com/trufflesuite/truffle) is great for developing Solidity smart contracts, and [create-react-app](https://github.com/facebookincubator/create-react-app) is a great way to bootstrap a React project. Unfortunately, the official [truffle box for React](http://truffleframework.com/boxes/react) uses the _eject_ mode of the create-react-app, which may be a disadvantage to many React developers. This box provides a basic integration between truffle and React app **without** using the _eject_ mode of create-react-app.

There are two major features:

- A plain `truffle init` project is used as the base (along with a SimpleStorage example contract).

- A create-react-app based React project resides in the `web-app` directory with a symlink to the `build/contracts` folder containing ABI definitions (created after running `truffle compile`). The provided React app is intentionally minimalistic to avoid imposing any specific requirements on the developer. 

For more information on how the frontend works, go read the [README.md](https://github.com/Charterhouse/truffle-create-react-app/blob/master/web-app/README.md) located in the `web-app` directory.

## Installation

1. Install Truffle globally.
    ```bash
    yarn global add truffle
    ```

2. Download the box. This also takes care of installing the necessary dependencies.
    ```bash
    truffle unbox Charterhouse/truffle-create-react-app
    ```

3. Run the development console.
    ```bash
    truffle develop
    ```

4. Compile and migrate the smart contracts. Note that inside the development console we don't preface commands with `truffle`.
    ```bash
    compile
    migrate
    ```

5. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```bash
    # If inside the development console.
    test

    # If outside the development console..
    truffle test
    ```

6. Run the create-react-app server for the front-end. Smart contract changes must be manually recompiled and migrated.
    ```bash
    # Change directory to the front-end folder
    cd web-app
    # Serves the front-end on http://localhost:3000
    yarn start
    ```

7. We included some basic tests for our react components. You can run them from the `web-app` folder:

    ```bash
    # Change directory to the front-end folder
    cd web-app
    yarn test               # for watch mode
    CI=TRUE yarn test       # for non-watch mode
    ```

## Visual Studio Code integration

The project is ready for Visual Studio Code. Out of the box it supports integration with [standardJS](https://standardjs.com) and [vscode-jest](https://github.com/jest-community/vscode-jest).

### standardJS

The integration with standardJS is done on two levels: `settings.json` for the VSCode Workspace and the top-level `package.json`.

The workspace level options in `settings.json` are the following:

```json
"javascript.validate.enable": false,
"standard.usePackageJson": true,
"standard.autoFixOnSave": true
```

The top-level `package.json` includes the following standardJS configuration:

```json
"standard": {
  "parser": "babel-eslint",
  "ignore": [
      "build/**",
      "node_modules/**",
      "web-app/node_modules/**",
      "web-app/src/contracts"
  ],
  "envs": [
      "es6",
      "browser",
      "jest"
  ],
  "globals": [
      "artifacts",
      "contract",
      "assert"
  ]
}
```

The only thing that still remains to be performed by the user is to install the `JavaScriopt Standard Style` extension (authored by Sam Chen).

### vscode-jest

The vscode-jest extension (authored by orta and jest community) provides integration with jest test runner. Because the react project is in a subfolder, additional configuration has been added to the workspace `settings.json` file:

```json
"jest.pathToJest": "npm test --",
"jest.rootPath": "web-app",
"jest.restartJestOnSnapshotUpdate": true
```

Note, that for the very same reason, Jest extension needs to be started manually via command palette (`CMD+SHIFT+P` and then *Jest: Start Runner*).

> jest extension for VSCode only runs the tests for the web-app. You still need to run solidity tests using the truffle development console.