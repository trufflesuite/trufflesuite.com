</div><div class="text-center container">
  ![OpenZeppelin](/tutorials/images/open-zeppelin/logo-zeppelin.png)
</div><div class="container container-narrow">

# Building robust smart contracts with OpenZeppelin

Real smart contracts can deal with real money, so having our Solidity code free from errors and highly secure is essential.

[Zeppelin Solutions](https://zeppelin.solutions/), a smart contract auditing service, has recognized this need. Using their experience, they've put together a set of vetted smart contracts called [OpenZeppelin](https://openzeppelin.org/).

We can use and extend these contracts to create more secure dapps in less time. OpenZeppelin comes with a wide array of smart contracts for various important functions ([see them all here](https://github.com/OpenZeppelin/zeppelin-solidity)), but today we'll be focusing on their token contracts. Specifically, we'll be extending their `StandardToken.sol` to create our own [ERC20](https://theethereum.wiki/w/index.php/ERC20_Token_Standard)-compliant token.


## Requirements

This tutorial expects you to have some knowledge of Truffle, Ethereum, and Solidity. If you haven't gone through our [Ethereum overview](/tutorial/ethereum-overview) and our [Pet Shop tutorial](/tutorials/pet-shop) yet, those would be great places to start.

For even more information, please see the following links:

* [Truffle documentation](/docs/)
* [Ethereum](https://ethereum.org/)
* [Solidity documentation](https://solidity.readthedocs.io/en/develop/)

We will primarily be using the command line for this tutorial, so please ensure you have basic familiarity with the terminal for your operating system.

## Overview

In this tutorial we will be covering:

* Unboxing the front-end application
* Creating the "TutorialToken" smart contract
* Compiling and deploying the smart contract to the TestRPC
* Interacting with the new token

## Unboxing the front-end application

In this tutorial, we are focusing on smart contract creation. To that end, we've created the front-end for you in the form of a Truffle Box.

1. On a terminal, create a project directory and navigate to it:

   ```shell
   mkdir oz-workspace

   cd oz-workspace

   truffle unbox tutorialtoken
   ```

1. Next, we'll install OpenZeppelin. The most recent version of OpenZeppelin can be found as an npm package.

   ```shell
   npm install zeppelin-solidity
   ```

## Creating the "TutorialToken" smart contract

With our front-end taken care of, we can focus on the `TutorialToken` contract.

1. In the `/contracts` directory of your Truffle Box, create the file `TutorialToken.sol` and add the following contents:

   ```javascript
   pragma solidity ^0.4.4;
   import 'zeppelin-solidity/contracts/token/StandardToken.sol';

   contract TutorialToken is StandardToken {

   }
   ```

   Things to notice:

   * Beyond the standard smart contract setup, we import the `StandardToken.sol` contract and declare our `TutorialToken`.
   * We use `is` to inherit from the `StandardToken` contract. Our contract will inherit all variables and functions from the `StandardToken` contract. Inherited functions and variables can be overwritten by redeclaring them in the new contract.

1. To set our own parameters for the our token, we'll be declaring our own name, symbol, and other details. Add the following content block to the contract (between the curly braces):

   ```javascript
   string public name = 'TutorialToken';
   string public symbol = 'TT';
   uint public decimals = 2;
   uint public INITIAL_SUPPLY = 12000;
   ```

   Things to notice:

   * The `name` and `symbol` variables give our token a unique identity.
   * The `decimals` variable determines the degree to which this token can be subdivided. For our example we went with 2 decimal places, similar to dollars and cents.
   * The `INITIAL_SUPPLY` variable determines the number of tokens created when this contract is deployed. In this case, the number is arbitrary.

1. To finish up our contract, we'll create a constructor function to set the `totalSupply` equal to our declared `INITIAL_SUPPLY` and give the entire supply to the deploying account's address. Add this block below the content added in the previous step:

   ```javascript
   function TutorialToken() {
     totalSupply = INITIAL_SUPPLY;
     balances[msg.sender] = INITIAL_SUPPLY;
   }
   ```

Using less than 15 lines of hand-coded Solidity, we've created our own Ethereum token!

## Compiling and deploying the smart contract to the TestRPC

1. In the `/migrations` directory, create the file `2_deploy_contracts.js` and add the following content:

   ```javascript
   var TutorialToken = artifacts.require("TutorialToken");

   module.exports = function(deployer) {
     deployer.deploy(TutorialToken);
   };
   ```

   The `import` statement within our `TutorialToken` contract will be automatically handled by the compiler, along with any subsequent imports within `StandardToken`.

1. Now we can compile and migrate. In a second terminal window, run the TestRPC:

   ```shell
   testrpc
   ```

1. Back in the first terminal window, run the following commands to compile and migrate the contract to the TestRPC:

   ```shell
   truffle compile
   truffle migrate
   ```

   <p class="alert alert-info">
   <strong>Note</strong>: Recall that on Windows you may need to run the truffle commands with `truffle.cmd`, as in `truffle.cmd compile`. Read more about naming conventions on Windows in the [Configuration section of the documentation](/docs/advanced/configuration).
   </p>


## Interacting with the new token

For this portion of the tutorial, we recommend using the MetaMask extension for Chrome. It will allow you to switch between accounts quickly; perfect for testing the ability to transfer our newly created tokens. Our [Pet Shop tutorial](/tutorials/pet-shop) has more information about [configuring MetaMask with the TestRPC](/tutorials/pet-shop#interacting-with-the-dapp-in-a-browser).

1. To run a local web server containing the front-end application, run the following command from the root `oz-workspace` directory:

   ```shell
   npm run dev
   ```

A browser window should automatically open with the interface below:

</div><div class="text-center container">
  ![TutorialToken Wallet](/tutorials/images/open-zeppelin/tt-wallet.png)
  <p class="caption">TutorialToken wallet</p><br/>
</div><div class="container container-narrow">

Our basic dapp shows the TutorialToken balance of the selected account in MetaMask.

Try transferring some tokens to a different account. The TestRPC, when launched, listed 10 accounts. When MetaMask was started, it typically connects to the first (index 0) account. You can transfer some token to one of the other users. MetaMask will confirm this transaction.

To check that the transaction went ahead as planned, you can switch accounts in MetaMask to the recipient, and then reload the application in the browser. You should see the amount of token that this account was sent.

</div><div class="text-center container">
  ![TutorialToken Wallet](/tutorials/images/open-zeppelin/tt-wallet-transfer.png)
  <p class="caption">2000 TT moved to Account 2</p><br/>
</div><div class="container container-narrow">

We at Truffle are excited to see companies like Zeppelin Solutions contributing to the standardization and increased security of smart contracts. With OpenZeppelin's contracts and Truffle's tools, you have everything you need to start creating industry-standard distributed applications.

Happy coding!
