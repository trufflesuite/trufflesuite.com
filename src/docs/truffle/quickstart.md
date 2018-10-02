---
title: Truffle | Truffle Quickstart
layout: docs.hbs
---
# Truffle Quickstart

This page will take you through the basics of creating a Truffle project and deploying a smart contract to a blockchain.

<p class="alert alert-info">
<strong>Note</strong>: Before you begin, make sure that you read our [Ethereum Overview](/tutorials/ethereum-overview) page.
</p>

## Table of Contents

1. [Creating a project](#creating-a-project)
1. [Exploring the project](#exploring-the-project)
1. [Testing](#testing)
1. [Compiling](#compiling)
1. [Migrating with Truffle Develop](#migrating-with-truffle-develop)
1. [Alternative: Migrating with Ganache](#alternative-migrating-with-ganache)
1. [Interacting with the contract](#interacting-with-the-contract)


## Creating a project

To use most Truffle commands, you need to run them against an existing Truffle project. So the first step is to create a Truffle project.

You can create a bare project template, but for those just getting started, you can use [Truffle Boxes](/boxes), which are example applications and project templates. We'll use the [MetaCoin box](/boxes/metacoin), which creates a token that can be transferred between accounts:

1. Create a new directory for your Truffle project:

   ```shell
   mkdir MetaCoin
   cd MetaCoin
   ```

1. Download ("unbox") the MetaCoin box:

   ```shell
   truffle unbox metacoin
   ```

   <p class="alert alert-info">
   <strong>Note</strong>: You can use the `truffle unbox <box-name>` command to download any of the other Truffle Boxes.
   </p>

   <p class="alert alert-info">
   <strong>Note</strong>: To create a bare Truffle project with no smart contracts included, use `truffle init`.
   </p>

Once this operation is completed, you'll now have a project structure with the following items:

* `contracts/`: Directory for [Solidity contracts](/docs/truffle/getting-started/interacting-with-your-contracts)
* `migrations/`: Directory for [scriptable deployment files](/docs/truffle/getting-started/running-migrations#migration-files)
* `test/`: Directory for test files for [testing your application and contracts](/docs/truffle/testing/testing-your-contracts)
* `truffle.js`: Truffle [configuration file](/docs/truffle/reference/configuration)

## Exploring the project

<p class="alert alert-info">
<strong>Note</strong>: This page is just a quickstart, so we're not going to go into much detail here. Please see the rest of the Truffle documentation to learn more.
</p>

1. Open the `contracts/MetaCoin.sol` file in a text editor. This is a smart contract (written in Solidity) that creates a MetaCoin token. Note that this also references another Solidity file `contracts/ConvertLib.sol` in the same directory.

1. Open the `contracts/Migrations.sol` file. This is a separate Solidity file that manages and updates [the status of your deployed smart contract](/docs/truffle/getting-started/running-migrations). This file comes with every Truffle project, and is usually not edited. 

1. Open the `migrations/1_initial_deployment.js` file. This file is the migration (deployment) script for the `Migrations` contract found in the `Migrations.sol` file.

1. Open the `migrations/2_deploy_contracts.js` file. This file is the migration script for the `MetaCoin` contract. (Migration scripts are run in order, so the file beginning with `2` will be run after the file beginning with `1`.)

1. Open the `test/TestMetacoin.sol` file. This is a [test file written in Solidity](/docs/truffle/testing/writing-tests-in-solidity) which ensures that your contract is working as expected.

1. Open the `test/metacoin.js` file. This is a [test file written in JavaScript](/docs/truffle/testing/writing-tests-in-javascript) which performs a similar function to the Solidity test above.

1. Open the `truffle.js` file. This is the Truffle [configuration file](/docs/truffle/reference/configuration), for setting network information and other project-related settings. The file is blank, but this is okay, as we'll be using a Truffle command that has some defaults built-in.

## Testing

1. On a terminal, start a test Ethereum network via [Ganache](/ganache)

   ```shell
   ganache-cli
   ```

1. Run the Solidity test:

   ```shell
   truffle test ./test/TestMetacoin.sol
   ```

   You will see the following output

    ```
     TestMetacoin
       √ testInitialBalanceUsingDeployedContract (71ms)
       √ testInitialBalanceWithNewMetaCoin (59ms)

     2 passing (794ms)
   ```

   <p class="alert alert-info">
   <strong>Note</strong>: If you're on Windows and encountering problems running this command, please see the documentation on [resolving naming conflicts on Windows](/docs/truffle/reference/configuration#resolving-naming-conflicts-on-windows).
   </p>

   These tree tests were run against the contract, with descriptions displayed on what the tests are supposed to do.

1. Run the JavaScript test:

   ```shell
   truffle test ./test/metacoin.js
   ```

   You will see the following output

   ```
     Contract: MetaCoin
       √ should put 10000 MetaCoin in the first account
       √ should call a function that depends on a linked library (40ms)
       √ should send coin correctly (129ms)

     3 passing (255ms)
   ```

## Compiling

1. Compile the smart contracts:

   ```shell
   truffle compile
   ```

   You will see the following output:

   ```
   Compiling .\contracts\ConvertLib.sol...
   Compiling .\contracts\MetaCoin.sol...
   Compiling .\contracts\Migrations.sol...

   Writing artifacts to .\build\contracts
   ```

## Migrating with Truffle Develop

<p class="alert alert-info">
<strong>Note</strong>: To use [Ganache](/ganache), please skip to the next section.
</p>

To deploy our smart contracts, we're going to need to connect to a blockchain. Truffle has a built-in personal blockchain that can be used for testing. This blockchain is local to your system and does not interact with the main Ethereum network.

You can create this blockchain and interact with it using [Truffle Develop](/docs/truffle/getting-started/using-truffle-develop-and-the-console#truffle-develop).

1. Run Truffle Develop:

   ```shell
   truffle develop
   ```

   You will see the following information:

   ```
   Truffle Develop started at http://127.0.0.1:9545/

   Accounts:
   (0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
   (1) 0xf17f52151ebef6c7334fad080c5704d77216b732
   (2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
   (3) 0x821aea9a577a9b44299b9c15c88cf3087f3b5544
   (4) 0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
   (5) 0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
   (6) 0x2191ef87e392377ec08e7c08eb105ef5448eced5
   (7) 0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
   (8) 0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
   (9) 0x5aeda56215b167893e80b4fe645ba6d5bab767de

   Private Keys:
   (0) c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
   (1) ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f
   (2) 0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1
   (3) c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c
   (4) 388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418
   (5) 659cbb0e2411a44db63778987b1e22153c086a95eb6b18bdf89de078917abc63
   (6) 82d052c865f5763aad42add438569276c00d3d88a2d062d36b2bae914d58b8c8
   (7) aa3680d5d48a8283413f7a108367c7299ca73f553735860a87b08f39395618b7
   (8) 0f62d96d6675f32685bbdb8ac13cda7c23436f63efbb9d07700d8669ff12b7c4
   (9) 8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5

   Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat

   ⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
   Ensure you do not use it on production blockchains, or else you risk losing funds.   

   truffle(development)>
   ```

   This shows ten accounts (and their private keys) that can be used when interacting with the blockchain.

1. On the Truffle Develop prompt, Truffle commands can be run by omitting the `truffle` prefix. For example, to run `truffle compile` on the prompt, type `compile`. The command to deploy your compiled contracts to the blockchain is `truffle migrate`, so at the prompt, type:

   ```shell
   migrate
   ```

   You will see the following output:

   ```
   Using network 'develop'.

   Running migration: 1_initial_migration.js
     Deploying Migrations...
     ... 0x63b393bd50251ec5aa3e159070609ee7c61da55531ff5dea5b869e762263cb90
     Migrations: 0x8cdaf0cd259887258bc13a92c0a6da92698644c0
   Saving successful migration to network...
     ... 0xd7bc86d31bee32fa3988f1c1eabce403a1b5d570340a3a9cdba53a472ee8c956
   Saving artifacts...
   Running migration: 2_deploy_contracts.js
     Deploying ConvertLib...
     ... 0xa59221bc26a24f1a2ee7838c36abdf3231a2954b96d28dd7def7b98bbb8a7f35
     ConvertLib: 0x345ca3e014aaf5dca488057592ee47305d9b3e10
     Linking ConvertLib to MetaCoin
     Deploying MetaCoin...
     ... 0x1cd9e2a790f4795fa40205ef58dbb061065ca235bee8979a705814f1bc141fd5
     MetaCoin: 0xf25186b5081ff5ce73482ad761db0eb0d25abfbf
   Saving successful migration to network...
     ... 0x059cf1bbc372b9348ce487de910358801bbbd1c89182853439bec0afaee6c7db
   Saving artifacts...
   ```

   This shows the transaction IDs and addresses of your deployed contracts.

   <p class="alert alert-info">
     <strong>Note</strong>: Your transaction IDs and contract addresses will be different from the above.
   </p>

<p class="alert alert-info">
<strong>Note</strong>: To see how to interact with the contract, please skip to the next section.
</p>


## Alternative: Migrating with Ganache

While Truffle Develop is an all-in-one personal blockchain and console, you can also use [Ganache](/ganache), a desktop application, to launch your personal blockchain. Ganache can be a more easy-to-understand tool for those new to Ethereum and the blockchain, as it displays much more information up-front.

The only extra step, aside from running Ganache, is that it requires editing the Truffle configuration file to point to the Ganache instance.

1. Download and install [Ganache](/ganache).

1. Open `truffle.js` in a text editor. Replace the content with the following:

   ```javascript
   module.exports = {
     networks: {
       development: {
         host: "127.0.0.1",
         port: 7545,
         network_id: "*"
       }
     }
   };
   ```

   This will allow a connection using Ganache's default connection parameters.

1. Save and close that file.

1. Launch Ganache.

   ![Ganache](/img/docs/ganache/quickstart/accounts.png)

   *Ganache*

1. On the terminal, migrate the contract to the blockchain created by Ganache:

   ```shell
   truffle migrate
   ```

   You will see the following output

   ```
   Using network 'development'.

   Running migration: 1_initial_migration.js
     Replacing Migrations...
     ... 0x63b393bd50251ec5aa3e159070609ee7c61da55531ff5dea5b869e762263cb90
     Migrations: 0xd6d1ea53b3a7dae2424a0525d6b1754045a0df9f
   Saving successful migration to network...
     ... 0xe463b4cb6a3bbba06ab36ac4d7ce04e2a220abd186c8d2bde092c3d5b2217ed6
   Saving artifacts...
   Running migration: 2_deploy_contracts.js
     Replacing ConvertLib...
     ... 0xa59221bc26a24f1a2ee7838c36abdf3231a2954b96d28dd7def7b98bbb8a7f35
     ConvertLib: 0x33b217190208f7b8d2b14d7a30ec3de7bd722ac6
     Replacing MetaCoin...
     ... 0x5d51f5dc05e5d926323d580559354ad39035f16db268b91b6db5c7baddef5de5
     MetaCoin: 0xcd2c65cc0b498cb7a3835cfb1e283ccd25862086
   Saving successful migration to network...
     ... 0xeca6515f3fb47a477df99c3389d3452a48dfe507980bfd29a3c57837d6ef55c5
   Saving artifacts...
   ```

   This shows the transaction IDs and addresses of your deployed contracts.

   <p class="alert alert-info">
     <strong>Note</strong>: Your transaction IDs and contract addresses will be different from the above.
   </p>

1. In Ganache, click the "Transactions" button to see that the transactions have been processed.
   
1. To interact with the contract, you can use the Truffle console. The Truffle console is similar to Truffle Develop, except it connects to an existing blockchain (in this case, the one generated by Ganache).

   ```shell
   truffle console
   ```

   You will see the following prompt:

   ```
   truffle(development)>
   ```

## Interacting with the contract

Interact with the contract using the console in the following ways:

<p class="alert alert-info">
<strong>Note</strong>: We're using `web3.eth.accounts[]` in these examples, which is an array of all the accounts generated by the mnemonic. So, given the addresses generated by our mnemonic above, specifying `web3.eth.accounts[0]` is equivalent to the address `0x627306090abab3a6e1400e9345bc60c78a8bef57`.
</p>

* Check the metacoin balance of the account that deployed the contract:

  ```shell
  MetaCoin.deployed().then(function(instance){return instance.getBalance(web3.eth.accounts[0]);}).then(function(value){return value.toNumber()});
  ```

* See how much ether that balance is worth (and note that the contract defines a metacoin to be worth 2 ether):

  ```shell
  MetaCoin.deployed().then(function(instance){return instance.getBalanceInEth(web3.eth.accounts[0]);}).then(function(value){return value.toNumber()});
  ```

* Transfer some metacoin from one account to another:

  ```shell
  MetaCoin.deployed().then(function(instance){return instance.sendCoin(web3.eth.accounts[1], 500);});
  ```

* Check the balance of the account that *received* the metacoin:

  ```shell
  MetaCoin.deployed().then(function(instance){return instance.getBalance(web3.eth.accounts[1]);}).then(function(value){return value.toNumber()});
  ```

* Check the balance of the account that *sent* the metacoin:

  ```shell
  MetaCoin.deployed().then(function(instance){return instance.getBalance(web3.eth.accounts[0]);}).then(function(value){return value.toNumber()});
  ```

## Continue learning

This quickstart showed you the basics of the Truffle project lifecycle, but there is much more to learn. Please continue on with the rest of our [documentation](/docs) and especially our [tutorials](/tutorials) to learn more.