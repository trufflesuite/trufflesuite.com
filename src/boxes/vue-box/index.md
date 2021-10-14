---
hide:
  - navigation
---

# Vue Truffle Box

This box comes with everything you need to start using smart contracts from a vue app.

## Installation

1. Install Truffle globally.
    ```javascript
    yarn install -g truffle
    ```

2. Download the box. This also takes care of installing the necessary dependencies.
    ```javascript
    truffle unbox standup75/vue-box
    ```

3. Run the development console.
    ```javascript
    truffle develop
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

If it's the first you attempt to compile and migrate a smart contract, I learned this here: https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-2-30b3d335aa1f

5. Run the local server.
    ```javascript
    // Serves the front-end on http://localhost:3000
    yarn serve
    ```

6. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    truffle test
    ```

8. To build the application for production, use the build command. A production build will be in the build_webpack folder.
    ```javascript
    yarn build
    ```
