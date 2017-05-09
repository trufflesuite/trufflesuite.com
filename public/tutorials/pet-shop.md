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

```javascript
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

Solidity is a statically-typed language, meaning data types like strings, integers, arrays etc. much be defined. Solidity has a unique datatype called and **address**. Addresses are Ethereum addresses, which are stored as 20 byte values. Every account and smart contract on the Ethereum blockchain has an address and can send/receive Ether from/to this address.

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

## Testing the Smart Contract

## Creating a UI to Interact with our Smart Contract

Now that we've created the smart contract, deployed it to our local test chain and confirmed we can interact with it via the console, it's time to create a UI so the world can use this!

So you don't have to spend time on layout and stying, we've created the HTML for you, [download it here](#).

### Instantiating the Contract

## Deploying to the Ropsten TestNet

<div class="container alert alert-warning" role="alert">**NOTICE** This section requires you have a live development server.</div>

It's time to show the world your hard work! Up to this point, we've been testing our Dapp locally on a test blockchain called Ganache. To show others, we'll need to deploy to a public chain. So we don't have to spend real money, we'll deploy our smart contracts to the Ethereum test network, Ropsten.
