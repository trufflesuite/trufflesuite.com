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

1. Open the `test/metacoin.js` file. This is a test file written in JavaScript which performs the same test as the Solidity file above.

1. Open the `truffle.js` file. This is the Truffle configuration file, for setting network connection information and other project-related settings. The file is blank, as there are some defaults built-in, which we will be using.

## Testing

1. On a terminal, run the Solidity test:

   ```shell
   cd test
   truffle test TestMetacoin.sol
   ```

   You will see the following output

   ```
   SOME OUTPUT
   ```

   SOME DETAILS

   <p class="alert alert-info">
   <strong>Note</strong>: If you're on Windows and encountering problems running this command, please see the documentation on [resolving naming conflicts on Windows](http://truffleframework.com/docs/advanced/configuration#resolving-naming-conflicts-on-windows).
   </p>

1. Run the JavaScript test:

   ```shell
   cd test
   truffle test metacoin.js
   ```

   You will see the following output

   ```
   SOME OUTPUT
   ```

   SOME DETAILS

## Compiling

1. Compile the smart contracts:

   ```shell
   truffle compile
   ```

   You will see the following output:

   ```
   SOME OUTPUT
   ```

   The compiled bytecode is place in the `build/` directory.

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

   You will see the following prompt:

   ```
   truffle(development)>
   ```

1. Truffle commands on the prompt can be run by omitting the `truffle` command. So to run `truffle compile` on the prompt, you type `compile`. The command to deploy your compiled contracts to the blockchain is `truffle migrate`, so at the prompt, type:

   ```shell
   migrate
   ```

   You will see the following output:

   ```
   SOME OUTPUT
   ```

   This means that your contracts have been deployed.

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

1. On the terminal, migrate the contract to the blockchain created by Ganache:

   ```shell
   truffle migrate
   ```

   You will see the following output

   ```
   SOME OUTPUT
   ```

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