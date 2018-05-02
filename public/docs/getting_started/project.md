# Quickstart

This page will show you the basic tasks used when working with Truffle. In it, we will download an existing Truffle project and migrate (deploy) it to a local blockchain.

## Project creation

To use most Truffle commands, you need to run them against an existing Truffle project. So the first step is to create a Truffle project.

You can create a bare project template, but for those just getting started, you can use [Truffle Boxes](/boxes), which are example applications and project templates. We'll use the [MetaCoin box](/boxes/metacoin), which :

1. Create a new directory for your Truffle project:

   ```shell
   mkdir MetaCoin
   cd MetaCoin
   ```

1. "Unbox" the MetaCoin Truffle box:

   ```shell
   truffle unbox metacoin
   ```

   <p class="alert alert-info">
   <strong>Note</strong>: You can use the `truffle unbox <box-name>` command to download any of the other Truffle boxes.
   </p>

   <p class="alert alert-info">
   <strong>Note</strong>: To create a bare project, use `truffle init`.
   </p>

Once this operation is completed, you'll now have a project structure with the following items:

* `contracts/`: Directory for [Solidity contracts](./contracts)
* `migrations/`: Directory for [scriptable deployment files](./migrations#migration-files)
* `test/`: Directory for test files for [testing your application and contracts](./testing)
* `truffle.js`: Truffle [configuration file](/docs/advanced/configuration)

## File exploration

<p class="alert alert-info">
<strong>Note</strong>: This page is just a quickstart, so we're not going to go into much detail here. Please see the rest of the Truffle documentation to learn more.
</p>

1. Open the `contracts/MetaCoin.sol` file in a text editor. This is a smart contract whose code (written in Solidity) that generates a MetaCoin [token](https://en.wikipedia.org/wiki/ERC20). Note that this also references another Solidity file `contracts/ConvertLib.sol` in the same directory.

1. Open the `contracts/Migrations.sol` file in a text editor. This is a separate Solidity file that manages and updates the status of your deployed smart contract. This file comes with every Truffle project, and is usually not edited. 

1. Open the `migrations/1_initial_deployment.js` file. This file is the migration (deployment) script for the `Migrations` contract found in the `Migrations.sol` file.

1. Open the `migrations/2_deploy_contracts.js` file. This file is the migration script for the `MetaCoin` contract. (Migration scripts are run in order, so the file beginning with `2` will be run after the file beginning with `1`.)

1. Open the `test/TestMetacoin.sol` file. This is a test file written in Solidity which ensures that your contract is working as expected.

1. Open the `test/metacoin.js` file. This is a test file written in JavaScript which performs a similar function to the Solidity test above.

1. Open the `truffle.js` file. This is the Truffle configuration file, for setting network connection information and other project-related settings. The file is blank, as there are some defaults built-in, which we will be using.

## Testing

1. On a terminal, run the Solidity test:

   ```shell
   cd test
   truffle test TestMetacoin.sol
   ```

   You will see the following output

   ```
     Contract: MetaCoin
       √ should put 10000 MetaCoin in the first account
       √ should call a function that depends on a linked library (40ms)
       √ should send coin correctly (129ms)

     3 passing (255ms)
   ```

   <p class="alert alert-info">
   <strong>Note</strong>: If you're on Windows and encountering problems running this command, please see the documentation on [resolving naming conflicts on Windows](http://truffleframework.com/docs/advanced/configuration#resolving-naming-conflicts-on-windows).
   </p>

1. Run the JavaScript test:

   ```shell
   truffle test metacoin.js
   ```

   You will see the following output

   ```
     TestMetacoin
       √ testInitialBalanceUsingDeployedContract (71ms)
       √ testInitialBalanceWithNewMetaCoin (59ms)

     2 passing (794ms)
   ```

   SOME DETAILS

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
<strong>Note</strong>: To use [Ganache](/ganache), skip to the next section.
</p>

To deploy our smart contract, we're going to need to connect to a blockchain. Truffle has a built-in personal blockchain that can be used for testing. This blockchain is local to your system and does not interact with the main Ethereum network.

You can create this blockchain and interact with it using [Truffle Develop](LINK).

1. Run Truffle Develop.

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

1. Truffle commands on the prompt can be run by omitting the `truffle` command. So to run `truffle compile` on the prompt, you type `compile`. The command to deploy your compiled contracts to the blockchain is `truffle migrate`, so at the prompt, type:

   ```shell
   migrate
   ```

   You will see the following output:

   ```
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

   This shows the transaction IDs and addressed of your deployed contracts.

   <p class="alert alert-info">
     <strong>Note</strong>: Your transaction IDs and contract addresses will be different from the above.
   </p>

1. Interact with the contract in the following ways:

   SOME WAYS

## Alternative: Migrating with Ganache

Truffle Develop is a personal blockchain and console all-in one. But you can also use [Ganache](/ganache), a desktop application, to launch your personal blockchain. Ganache can be a more easy-to-understand tool for those new to Ethereum and the blockchain, as it displays much more information up-front.

It requires one file to be edited to be able to 

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

   IMAGE

1. On the terminal, migrate the contract to the blockchain created by Ganache:

   ```shell
   truffle migrate
   ```

   You will see the following output

   ```
   SOME OUTPUT
   ```

1. Go into Ganache and click the "Transactions" button to see that the transactions have been processed.

   IMAGE
   
1. To interact with the contract, you can use the Truffle console. The Truffle console is similar to Truffle Develop, except it connects to an existing blockchain.

   ```shell
   truffle console
   ```

   You will see the following prompt:

   ```
   truffle(development)>
   ```

 1. Interact with the contract in the following ways:

   SOME WAYS

## Continue learning

This quickstart has showed you the basics of a project lifecycle, but there is much more to learn. Please continue on with the rest of our documentation and especially our tutorials to learn more.