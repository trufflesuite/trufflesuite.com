![OpenZeppelin](/tutorials/images/open-zeppelin/oz-logo.png)

# Building robust smart contracts with OpenZeppelin

Smart contracts deployed to the Ethereum MainNet can deal with real money, so having our Solidity code free from errors and highly secure is essential.

[Zeppelin Solutions](https://zeppelin.solutions/), a smart contract auditing service, has recognized this need. Using their experience, they've put together a set of vetted smart contracts called [OpenZeppelin](https://openzeppelin.org/).

We can use and extend these contracts to create more secure dapps in less time. OpenZeppelin comes with a wide array of smart contracts for various important functions ([see them all here](https://github.com/OpenZeppelin/zeppelin-solidity)), but today we'll be focusing on their token contracts. Specifically, we'll be extending their `StandardToken.sol` contract to create our own [ERC20](https://theethereum.wiki/w/index.php/ERC20_Token_Standard)-compliant token.


## Requirements

This tutorial expects you to have some knowledge of Truffle, Ethereum, and Solidity. If you haven't gone through our [Ethereum overview](/tutorials/ethereum-overview) and our [Pet Shop tutorial](/tutorials/pet-shop) yet, those would be great places to start.

For even more information, please see the following links:

* [Truffle documentation](/docs/)
* [Ethereum](https://ethereum.org/)
* [Solidity documentation](https://solidity.readthedocs.io/en/develop/)

We will primarily be using the command line for this tutorial, so please ensure you have basic familiarity with your operating system's terminal.

## Overview

In this tutorial we will be covering:

* Unboxing the front-end application
* Creating the "TutorialToken" smart contract
* Compiling and deploying the smart contract
* Interacting with the new token

## Unboxing the front-end application

In this tutorial, we are focusing on smart contract creation. To that end, we've created the front-end for you in the form of a Truffle Box.

1. On a terminal, create a project directory and navigate to it:

   ```shell
   mkdir oz-workspace
   cd oz-workspace
   ```

1. Unbox the `tutorialtoken` Truffle Box. This will give us our project template.

   ```shell
   truffle unbox tutorialtoken
   ```

1. Next, we'll install OpenZeppelin. The most recent version of OpenZeppelin can be found as an npm package.

   ```shell
   npm install zeppelin-solidity
   ```

## Creating the "TutorialToken" smart contract

With our front-end taken care of, we can focus on the `TutorialToken` contract.

1. In the `contracts/` directory of your Truffle Box, create the file `TutorialToken.sol` and add the following contents:

   ```javascript
   pragma solidity ^0.4.4;

   import 'zeppelin-solidity/contracts/token/StandardToken.sol';

   contract TutorialToken is StandardToken {

   }
   ```

   Things to notice:

   * Beyond the standard smart contract setup, we import the `StandardToken.sol` contract and declare our `TutorialToken`.
   * We use `is` to inherit from the `StandardToken` contract. Our contract will inherit all variables and functions from the `StandardToken` contract. Inherited functions and variables can be overwritten by redeclaring them in the new contract.

1. To set our own parameters for the token, we'll be declaring our own name, symbol, and other details. Add the following content block to the contract (between the curly braces):

   ```javascript
   string public name = 'TutorialToken';
   string public symbol = 'TT';
   uint8 public decimals = 2;
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

## Compiling and deploying the smart contract

1. In the `migrations/` directory, create the file `2_deploy_contracts.js` and add the following content:

   ```javascript
   var TutorialToken = artifacts.require("TutorialToken");

   module.exports = function(deployer) {
     deployer.deploy(TutorialToken);
   };
   ```

   The `import` statement within our `TutorialToken` contract will be automatically handled by the compiler, along with any subsequent imports within `StandardToken`.

1. Now we are ready to compile and deploy your contract to the blockchain. We will do this using Truffle Develop, a development console that includes a development blockchain that we can use to test deploy contracts, similar to the [EthereumJS TestRPC](https://github.com/ethereumjs/testrpc). In your terminal, make sure you are in the root of your project's directory and then launch Truffle Develop:

   ```shell
   truffle develop
   ```

   <p class="alert alert-info">
     <strong>Note</strong>: If you're on Windows and encountering problems running this command, please see the documentation on [resolving naming conflicts on Windows](/docs/advanced/configuration#resolving-naming-conflicts-on-windows).
   </p>

1. Once the Truffle Develop prompt displays, run the following command to compile the contract:

   ```shell
   compile
   ```

1. Once the compile has completed, deploy the contract to the blockchain:

   ```shell
   migrate
   ```

   <p class="alert alert-info">
     <strong>Note</strong>: As an alternative to using Truffle Develop, both the `compile` and `migrate` commands can be run directly on the command line with `truffle compile` and `truffle migrate` respectively. You will need to have some other connection to a blockchain running, such as the TestRPC.
   </p>

   You will see output that looks similar to this:

   ```shell
   Using network 'develop'.

   Running migration: 1_initial_migration.js
     Deploying Migrations...
     ... 0xbb0577c172dbb3df061f9b7a87ac22883c6dc62f1423748ebf53e51db735d8b9
     Migrations: 0x3ed10fd31b3fbb2c262e6ab074dd3c684b8aa06b
   Saving successful migration to network...
     ... 0x429a40ee574664a48753a33ea0c103fc78c5ca7750961d567d518ff7a31eefda
   Saving artifacts...
   Running migration: 2_deploy_contracts.js
     Deploying TutorialToken...
     ... 0x6a37fa398faa57769360cfb7125366ef56895f8885c224312f281d2df3475f08
     TutorialToken: 0x377bbcae5327695b32a1784e0e13bedc8e078c9c
   Saving successful migration to network...
     ... 0x6e25158c01a403d33079db641cb4d46b6245fd2e9196093d9e5984e45d64a866
   Saving artifacts...
   ```

## Interacting with the new token

For this portion of the tutorial, we recommend using the [MetaMask extension for Chrome](http://metamask.io). It will allow you to switch between accounts quickly; perfect for testing the ability to transfer our newly created tokens. Our [Pet Shop tutorial](/tutorials/pet-shop) has more information about [configuring MetaMask](/tutorials/pet-shop#interacting-with-the-dapp-in-a-browser).

1. Leaving Truffle Develop running, open a second terminal in the root of your project directory and run a local web server containing the front-end application:

   ```shell
   npm run dev
   ```

   A browser window should automatically open with the interface below:

   ![TutorialToken Wallet](/tutorials/images/open-zeppelin/oz-tutorialtoken-initial.png)

   *TutorialToken wallet*

   Our basic dapp shows the TutorialToken balance of the selected account in MetaMask.

1. Now we'll transfer some TutorialToken tokens to a different account. Truffle Develop, when launched, lists 10 accounts. The first account has the token balance. Pick one of the other accounts (we recommend the second account) and enter it in the "Address" box, and also enter `2000` in the "Amount" field.

   ![TutorialToken Wallet transfer recipient](/tutorials/images/open-zeppelin/oz-transfer-address.png)

   *TutorialToken wallet transfer recipient*

   <p class="alert alert-info">
     <strong>Note</strong>: To review the list of accounts, type `web3.eth.accounts` in Truffle Develop.
   </p>

1. Click "Transfer" to initiate the token transfer. Metamask will intercept the transfer request and display a confirmation. Note that no ether is changing hands, except for the gas used to pay for the transaction.

   ![Metamask transaction confirmation](/tutorials/images/open-zeppelin/oz-metamask-transfer.png)

   *Metamask transaction confirmation*

1. Click "Submit" and the transfer will proceed. If all goes well, you will see a window saying "Transfer successful". You will also see a record of the transaction in Metamask.

1. Still in Metamask, switch from the first account to the second one (you may need to select "Create an account" if only one account is in the list.)

   ![Metamask account select](/tutorials/images/open-zeppelin/oz-metamask-account-select.png)

   *Metamask account select*

1. Now refresh the app in your browser. It will be  connected to the currently selected account in Metamask, and display the amount of tokens (in this case, 2000 TT). This shows that the transfer did in fact succeed.

   ![TutorialToken transfer success](/tutorials/images/open-zeppelin/oz-tutorialtoken-final.png)

   *TutorialToken transfer success*

1. Try sending different amount of tokens to different accounts to practice how our dapp (and Metamask) interacts with the network.

We at Truffle are excited to see companies like Zeppelin Solutions contributing to the standardization and increased security of smart contracts. With OpenZeppelin's contracts and Truffle's tools, you have everything you need to start creating industry-standard distributed applications.

Happy coding!
