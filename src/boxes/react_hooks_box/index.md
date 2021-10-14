---
hide:
  - navigation
---

# Truffle Box for React using Hooks

This Truffle Box is a base for working with the Truffle framework and React. 
It provides a working example of a simple counter contract with corresponding react components.

## Prerequisites

In order to run the Truffle box, you will need [Node.js](https://nodejs.org). Version 10.x.y works best and 
I've found it helpful to install nvm (https://github.com/nvm-sh/nvm). In order install these dependencies, you will also need [Python](https://www.python.org) (version 2.7.x) and
[git](https://git-scm.com/downloads). You will also need the [MetaMask](https://metamask.io/) plugin for Chrome.

## Building

1. Install truffle and an Ethereum client. If you don't have a test environment, I recommend ganache-cli
  ```bash
  npm install -g truffle
  npm install -g ganache-cli
  ```
2. Run your Ethereum client. For Ganache CLI:
  ```bash
  ganache-cli
  ```
  Note the mnemonic 12-word phrase printed on startup, you will need it later.
  
3. Download the box.
  ```bash
  truffle unbox BrannanC/react_hooks_box
  ```
4. Make sure `truffle-config.js` is configured to use your test environment.

5. This box is configured to automatically compile and migrate, but you may need to run the command again or
 `truffle migrate --reset` if there were any snags in the unboxing process.
```
truffle compile && truffle migrate
```


## Configuration
1. In order to connect with the Ethereum network, you will need to configure MetaMask
2. Log into the `ganache-cli` test accounts in MetaMask, using the 12-word phrase printed earlier. 
A detailed explaination of how to do this can be found [here](https://truffleframework.com/docs/truffle/getting-started/truffle-with-metamask)
3. Point MetaMask to `ganache-cli` by connecting to the network `localhost:7545` 


## Running

1. Dependencies are automatically installed with Yarn. Run the app using Yarn:
```bash
yarn start
```
The app is now served on localhost:3000

2. Making sure you have configured MetaMask, visit http://localhost:3000 in your browser.

## Testing

1. Truffle can run tests written in Solidity or JavaScript against your smart contracts.
    ```javascript
    truffle test
    ```

2. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```javascript
    // ensure you are inside the app directory when running this
    yarn run test
    ```

## Production
1. To build the application for production, use the build script. A production build will be in the `app/build` folder.
    ```javascript
    // ensure you are inside the app directory when running this
    yarn run build
    ```
## FAQ

* __Where can I find more documentation?__

    This box is a marriage of [Truffle](http://truffleframework.com/) and a React setup created with [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). Either one would be a great place to start!
