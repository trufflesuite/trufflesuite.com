</div><div class="text-center container">
  ![OpenZeppelin](/tutorials/images/open-zeppelin/logo-zeppelin.png)
</div><div class="container container-narrow">

# Robust Smart Contracts with OpenZeppelin

Because smart contracts in the wild deal with real money, having our Solidity code free from errors and highly secure is essential. [Zeppelin Solutions](https://zeppelin.solutions/), a smart contract auditing service, has recognized this need. Using their experience, they've put together a set of vetted smart contracts called [OpenZeppelin](https://openzeppelin.org/).

We can use and extend these contracts to create more secure dapps in less time. OpenZeppelin comes with a wide array of smart contracts for various important functions ([see them all here](https://github.com/OpenZeppelin/zeppelin-solidity)), but today we'll be focusing on their token contracts. Specifically, we'll be extending `StandardToken.sol` to create our own ERC-20 token.

## Requirements

This tutorial expects you to have some knowledge of Truffle, Ethereum, and Solidity. If you haven't gone through [our Pet Shop tutorial](/tutorials/pet-shop) yet, that's a great place to start!

For even more information on the listed topics, please see the following links:

* [Truffle documentation](/docs/)
* [Ethereum overview](https://ethereum.org/)
* [Solidity documentation](https://solidity.readthedocs.io/en/develop/)

We will primarily be using the command line for this tutorial. Ensure you have basic familiarity with opening and using the command line provided by your operating system.

## Overview

In this tutorial, you'll learn how to:

1. Unbox the front-end
2. Create the `TutorialToken` smart contract with OpenZeppelin's `StandardToken`
3. Compile and deploy our smart contract to the testrpc
4. Interact with our newly created token

## 1. Unboxing the Front-end

Today we'll be focusing on smart contract creation. To that end, we've created the front-end for you in the form of a truffle box. Open the command line and navigate to a folder where you'd like to unbox. Here, we chose the folder `oz-workspace`:

```shell
$ cd oz-workspace
$ truffle unbox tutorialtoken
```

Next, we'll install OpenZeppelin. The most recent version of OpenZeppelin can be found as an NPM package.

```shell
$ npm install zeppelin-solidity
```

## 2. Creating the TutorialToken Smart Contract

With our front-end taken care of, let's create the `TutorialToken` contract. In the `contracts` directory, create the file `TutorialToken.sol` with the following contents:

```javascript
pragma solidity ^0.4.4;
import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract TutorialToken is StandardToken {

}
```

Beyond the standard smart contract setup, we `import` the `StandardToken.sol` contract and declare our `TutorialToken`, using `is` to inherit from the `StandardToken` contract. Our contract will **inherit** all variables and functions from the `StandardToken` contract. Inherited functions and variables can be overwritten by redeclaring them in the new contract. To set our own parameters for the Tutorial Token, we'll be declaring our own `name`, `symbol`, `decimals` and `INITIAL_SUPPLY`.

```javascript
string public name = 'TutorialToken';
string public symbol = 'TT';
uint public decimals = 2;
uint public INITIAL_SUPPLY = 12000;
```

The `name` and `symbol` variables give our token a unique identity. The `decimals` variable determines the degree to which this token can be subdivided. For our example we went with 2 decimal places; similar to dollars and cents. Finally, the `INITIAL_SUPPLY` variable determines the number of tokens created when this contract is deployed. For the case of the tutorial this number is arbitrary--we chose 12000.

Finally we'll create a constructor function to set the `totalSupply` equal to our declared `INITIAL_SUPPLY` and give the entire supply to the deploying account's address:

```javascript
function TutorialToken() {
  totalSupply = INITIAL_SUPPLY;
  balances[msg.sender] = INITIAL_SUPPLY;
}
```

Using less than 15 lines of hand-coded Solidity, we've created our own ERC-20 token! Next, we'll be deploying and interacting with the token.

## 3. Compilation and Deployment

In the `/migrations` directory, create the file `2_deploy_contracts.js` with the following contents:

```javascript
var TutorialToken = artifacts.require("./TutorialToken.sol");

module.exports = function(deployer) {
  deployer.deploy(TutorialToken);
};
```

Note the `import` statement within our `TutorialToken` contract will be automatically handled by the compiler, along with any subsequent imports within `StandardToken` et. al.

Now we can simply compile and migrate!

```shell
$ truffle compile
$ truffle migrate
```

## 4. Interacting with TutorialToken

For this portion of the tutorial, we recommend using the MetaMask Chrome extension. It will allow you to switch between accounts quickly; perfect for testing the ability to transfer our newly created tokens. [Click here if you need help setting up and configuring MetaMask for use with the testrpc](http://localhost:9000/tutorials/pet-shop#using-our-dapp-in-chrome).

We've already installed `lite-server` for you, so getting the front-end up and running is as easy as executing the following command from the root `oz-workspace` directory:

```shell
$ npm run dev
```

A browser window should automatically open with the interface below:

</div><div class="text-center container">
  ![TutorialToken Wallet](/tutorials/images/open-zeppelin/tt-wallet.png)
  <p class="caption">The Tutorial Token wallet.</p><br/>
</div><div class="container container-narrow">

Our basic dapp shows the TutorialToken balance of the selected account in MetaMask.

Try transferring some tokens to a different account, here we moved 2000 TT to the second account.

</div><div class="text-center container">
  ![TutorialToken Wallet](/tutorials/images/open-zeppelin/tt-wallet-transfer.png)
  <p class="caption">2000TT moved to account 2.</p><br/>
</div><div class="container container-narrow">

## Truffle + OpenZeppelin = A Superb Development Experience

We at Truffle are excited to see companies like Zeppelin Solutions contributing to the standardization and increased security of smart contracts. With OpenZeppelin's contracts and Truffle's toolset, you have everything necessary to start creating industry standard distributed applications.

Happy coding!
