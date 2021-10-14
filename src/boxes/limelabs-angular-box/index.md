---
hide:
  - navigation
---

This is a fork from Quintor:

I've added:
- SCSS instead of CSS
- Upgraded the typescript as I love async/await
- Added bootstrap 3
- Added Axios

Everything below is the same as in Quintors Box

# Truffle Box for Angular

This Truffle Box provides a base for working with the Truffle Framework and Angular.
It provides a basic working example of the MetaCoin contracts with Angular components.
This project is generated with [Angular CLI](https://cli.angular.io/).

## Building

1. Install truffle, Angular CLI and an Ethereum client. If you don't have a test environment, we recommend Ethereum TestRPC
  ```bash
  npm install -g truffle
  npm install -g @angular/cli
  npm install -g ethereumjs-testrpc
  ```

2. Download the box.
  ```bash
  truffle unbox LimelabsTech/angular-truffle-box
  ```

3. Run your Ethereum client. For TestRPC:
  ```bash
  testrpc
  ```
Note the mnemonic 12-word phrase printed on startup, you will need it later.

4. Compile and migrate your contracts.
  ```bash
  truffle compile && truffle migrate
  ```

## Running

1. Run the app using Angular CLI:
  ```bash
  ng serve
  ```
The app is now served on localhost:4200

2. Connect to it by opening it in your browser and configuring MetaMask with the 12-word phrase from TestRPC.

3. Send MetaCoins!

## Testing

1. Running the Angular component tests:
  ```bash
  ng test
  ```

2. Running the Truffle tests:
  ```bash
  truffle test
  ```

3. Running Protactor end-to-end tests

  ```bash
  ng e2e
  ```
## Releasing
Using the Angular CLI you can build a distributable of your app. Will be placed in `dist/`

  ```bash
  ng build
  ```

## FAQ

* __Where can I find more documentation?__

This Truffle box is a union of [Truffle](http://truffleframework.com/) and an Angular setup created with [Angular CLI](https://cli.angular.io/).
For solidity compilation and Ethereum related issues, try the [Truffle documentation](http://truffleframework.com/docs/).
For Angular CLI and typescript issues, refer to the [Angular CLI documentation](https://github.com/angular/angular-cli/wiki)
