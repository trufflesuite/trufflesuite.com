<div class="pet-shop-header">
  ![Ethereum Pet Shop](/tutorials/images/petshop.png)
</div>

# Ethereum Pet Shop

This series of tutoials will take you through building your first Dapp--a tracking system for a pet shop!

This tutorial is meant for **Dapp beginners who have knowledge of HTML, CSS and JavaScript**, but assumes you have a basic knowledge of what Ethereum and smart contracts are conceptually. You may want to check out the [Ethereum Overview](/tutorials/ethereum-overview) to get some concepts and terms down before proceeding.

In this tutorial we will be covering:

*   Setting up The Development Environment
*   Creating a Truffle project
*   Writing and Testing a Smart Contract
*   Creating a UI to Interact with our Smart Contract
*   Deploying to the Ropsten TestNet

## Setting up The Development Environment

### Installing EthereumJS TestRPC

### Installing Truffle

## Creating a Truffle Project

Truffle initializes in the current directory. So first, create a directory in your development folder of choice. We're calling ours "pet-shop-tutorial".

```shell
// Create the directory.
mkdir pet-shop-tutorial

// Navigate to within the directory.
cd pet-shop-tutorial

// Initialize Truffle.
truffle init
```

### Directory Structure

The default truffle directory structure looks like the following:

*   /contracts: Contains the Solidity source files for our smart contracts. There is an important contract in here called **Migrations.sol**, which we'll talk about later. Be sure not to delete this file!
*   /migrations: Truffle uses a migration system to handle smart contract deployments. A migration is a series of contract deployments, accompanied by an additional special smart contract to keep track of any changes in
*   /test: Contains both JavaScript and Solidity tests for our smart contracts.
*   truffle.js: Truffle's configuration file.

## Writing the Smart Contract

We'll start our Dapp by writing the smart contract that acts as its backend logic and storage.

Start by creating a new file PetShop.sol in the /contracts directory with the following contents:

```javascript
pragma solidity ^0.4.4;

contract PetShop {

}
```

A few key things to notice:

*   A smart contract's file contains a single contract which has the same name and capitalization of the file itself.
*   The minimum version of Solidity required is noted at the top of the contract: `pragma solidity ^0.4.4;`. The carat symbol (^) means "the version noted after this or higher".
*   Much like JavaScript or PHP, statements are terminated with semicolons.

### Variable Setup

Solidity is a statically-typed language, meaning data types like strings, integers, arrays etc. must be defined. Solidity has a unique datatype called and **address**. Addresses are Ethereum addresses, which are stored as 20 byte values. Every account and smart contract on the Ethereum blockchain has an address and can send/receive Ether from/to this address.

Setup the following varialbes on the next line after `contract PetShop {`.

```javascript
struct Pet {
  string name;
  string species;
  string breed;
  uint age;
  address owner;
}

mapping (uint => Pet) public pets;
```

We've defined two variables: Pet and pets. Pet is a **struct**. Structs allow you to create new, complex datatypes. Our Pet struct contains strings for the name, species and breed; along with an integer age and address owner to store the owner's address.

The pets mapping creates a...

### Your First Function: Adopting a Pet

Let's allow the pet shop staff to mark a pet as adopted. Add the following function to the smart contract, after the variables we setup above.

```javascript
function Adopt(uint pet_id) returns(bool adopted) {
  if (pets[pet_id].owner != 0x0)
  {
    throw;
  }

  pets[pet_id].owner = tx.origin;

  return true;
}
```

TODO: Explanation of this function.

## Compiling and Migrating the Smart Contract

### Compilation

Solidity is a compiled language, meaning we need to compile our Solidity to bytecode for the EVM to execute. Here we'll compile our contracts to bytecode and put that bytecode on the blockchain so we can interact with it.

Truffle comes with two example smart contracts. Let's delete them so we don't compile or migrate more than we need to. The files are ConvertLib.sol and MetaCoin.sol. DO NOT DELETE Migrations.sol, as we will need this for the next step.

Open a new console window and run the command `testrpc`. This starts a new, local blockchain instance powered by EthereumJS TestRPC. Once the TestRPC boots up, you'll see the current TestRPC version, a list of available accounts and private keys, and a section called HD Wallet. We need to copy the words from the Mnemonic section for use later in our browser.

Back in your first console window, run the command `truffle compile`. You should see the following output:

```shell
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/PetShop.sol...
Writing artifacts to ./build/contracts
```

### Migration

Now that we've successfully compiled out contracts, it's time to migrate them to the blockchain! A **migration** is...

You'll see two JavaScript files already in the migrations directory: 1_initial_migration.js and 2_deploy_contracts.js. These are executed in their enumerated order. All migration files follow the same basic structure:

*   Import the desired contract artifacts from the build folder.
*   Export a single, anonymous function taking one argument, `deployer`.
*   Order a deployment of a given contract with `deployer.deploy(<< CONTRACT_NAME >>)`.
*   If one contract depends on another, link them using: `deployer.link(<< DEPENDENCY_CONTRACT_NAME >>, << DEPENDENT_CONTRACT_NAME >>)`. Then, deploy the dependency contract using the deployer's deploy command as we did in the previous bullet. For this tutorial, we'll only be working with one contract so no linking is required.

We can leave 1_initial_migration alone; it deploys the Migrations.sol contract to keep track of our migrations so we don't double-migrate unchanged contracts in the future.

Edit the file 2_deploy_contracts.js by removing the unused code pertaining to ConvertLib and Metacoin and replacing it with:

```javascript
var PetShop = artifacts.require("./PetShop.sol");

module.exports = function(deployer) {
  deployer.deploy(PetShop);
};
```

In the same console window we ran the compile command, run `truffle migrate`. You'll see this output:

```shell
Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  Migrations: 0x75175eb116b36ff5fef15ebd15cbab01b50b50d1
Saving successful migration to network...
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying PetShop...
  PetShop: 0xb9f485451a945e65e48d9dd7fc5d759af0a89e21
Saving successful migration to network...
Saving artifacts...
```

You can see the migrations being executed in order, followed by the blockchain address of each deployed contract (NOTE: Your addresses will differ). Congratulations! You've written your first smart contract and deployed it to a locally running test blockchain. It's time to interact with our smart contrat now to make sure it does what we want.

## Testing the Smart Contract

Truffle is very flexible when it comes to smart contract testing. Tests can be written either in JavaScript or Solidity. Today we'll be writing our tests in Solidity to separate our concerns. Solidity for back-end, JavaScript for front-end.



## Creating a UI to Interact with our Smart Contract

Now that we've created the smart contract, deployed it to our local test chain and confirmed we can interact with it via the console, it's time to create a UI so the world can use this!

So you don't have to spend time on layout and stying, we've created the HTML for you, [download it here](#).

### Instantiating the Contract

## Deploying to the Ropsten TestNet

<div class="container alert alert-warning" role="alert">**NOTICE** This section requires you have a live development server.</div>

It's time to show the world your hard work! Up to this point, we've been testing our Dapp locally on a test blockchain called Ganache. To show others, we'll need to deploy to a public chain. So we don't have to spend real money, we'll deploy our smart contracts to the Ethereum test network, Ropsten.
