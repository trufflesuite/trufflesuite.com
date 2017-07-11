<div class="pet-shop-header">
  ![Ethereum Pet Shop](/tutorials/images/pet-shop/petshop.png)
</div>

# Ethereum Pet Shop

This series of tutorials will take you through building your first Dapp--a tracking system for a pet shop!

This tutorial is meant for **Dapp beginners who have knowledge of HTML, CSS and JavaScript**, but assumes you have a basic knowledge of what Ethereum and smart contracts are conceptually. You may want to check out the [Ethereum Overview](/tutorials/ethereum-overview) to get some concepts and terms down before proceeding.

In this tutorial we will be covering:

*   Setting up The Development Environment
*   Creating a Truffle project
*   Writing and Testing a Smart Contract
*   Creating a UI to Interact with our Smart Contract

## Project Brief

Pete Scandlon of Pete's Pet Shop is interested in using Ethereum as an efficient way to handle their pet adoptions. The store has space for 16 pets at a given time, and they already have a database of pets. As an initial proof on concept, Pete wants to see a Dapp which associates an Ethereum address with a pet to be adopted. The website structure and styling will be supplied for you. We need to write the smart contract and front-end logic for its usage.

Let's start by setting up the development environment.

## Setting up The Development Environment

There are a few requirements before we setup the TestRPC and Truffle:

*   [Node.js v6+ LTS and NPM (comes with Node)](https://nodejs.org/en/)
*   [Git](https://git-scm.com/)

Once we have those installed, we only need two commands to install the TestRPC and Truffle:

*   `npm install -g ethereumjs-testrpc`
*   `npm install -g truffle`

**Windows users** should instead install the precompiled beta version:

*   `npm install -g ethereumjs-testrpc@beta`
*   `npm install -g truffle@beta`

## Creating a Truffle Project

Truffle initializes in the current directory. So first, create a directory in your development folder of choice. We're calling ours "pet-shop-tutorial". We'll initialize a "bare" Truffle project, meaning there will be no example contracts included.

```shell
// Create the directory.
mkdir pet-shop-tutorial

// Navigate to within the directory.
cd pet-shop-tutorial

// Initialize Truffle.
truffle init bare
```

### Directory Structure

The default truffle directory structure looks like the following:

*   /contracts: Contains the Solidity source files for our smart contracts. There is an important contract in here called **Migrations.sol**, which we'll talk about later. Be sure not to delete this file!
*   /migrations: Truffle uses a migration system to handle smart contract deployments. A migration is an additional special smart contract that keeps track of changes.
*   /test: Contains both JavaScript and Solidity tests for our smart contracts.
*   truffle.js: Truffle's configuration file.

## Writing the Smart Contract

We'll start our Dapp by writing the smart contract that acts as its backend logic and storage.

Start by creating a new file Adoption.sol in the /contracts directory with the following contents:

```javascript
pragma solidity ^0.4.4;

contract Adoption {

}
```

Two key things to notice:

*   The minimum version of Solidity required is noted at the top of the contract: `pragma solidity ^0.4.4;`. The carat symbol (^) means "the version noted after this or higher".
*   Much like JavaScript or PHP, statements are terminated with semicolons.

### Variable Setup

Solidity is a statically-typed language, meaning data types like strings, integers, arrays etc. must be defined. Solidity has a unique datatype called an **address**. Addresses are Ethereum addresses, which are stored as 20 byte values. Every account and smart contract on the Ethereum blockchain has an address and can send/receive Ether from/to this address.

Setup the following variable on the next line after `contract Adoption {`.

```javascript
address[16] public adopters;
```

We've defined a single variable: `adopters`. `adopters` is an **array** of Ethereum addresses. Arrays contain one type and can have a fixed or variable length. In this case the type is address and the length is 16. You'll also notice `adopters` is public. **Public** variables have automatic getter methods, but in the case of arrays a key is required and will only return a single value. Later, we'll write a function to return the whole array for use in our UI.

### Your First Function: Adopting a Pet

Let's allow users to make adoption requests. Add the following function to the smart contract, after the variables we setup above.

```javascript
function adopt(uint petId) public returns (uint) {
  if (petId < 0 || petId > 15) {
    throw;
  }

  adopters[petId] = msg.sender;

  return petId;
}
```

You'll noticed in Solidity the types of both the function's parameters and its output must be specified. In this case we'll be taking in a `petId` (an integer) and returning an integer.

First we check to make sure `petId` is in range of our `adopters` array. Arrays in Solidity are indexed from 0, so the ID value will need to be between 0 and 15. If the ID is out of range, we return an error by calling `throw` (as in "throw" an error).

If the ID is in range, we then add the address that made the call to our `adopters` array. To get the address of the person or smart contract who called this function, we use **msg.sender**.

Finally, we return the `petId` provided as a confirmation.

### Your Second Function: Retrieving the Adopters

Remember above we mentioned array getters return only a single value from a given key. Our UI needs to update all pets' adoption statuses and making 16 API calls is not ideal. Let's write a function to return the entire array.

Add the following function to the smart contract, after the function we added above:

```javascript
function getAdopters() public returns (address[16]) {
  return adopters;
}
```

Since `adopters` is already declared, we can simply return it. Be sure to specify the return type (in this case, it's `adopters` type) as `address[16]`.

## Compiling and Migrating the Smart Contract

### Compilation

Solidity is a compiled language, meaning we need to compile our Solidity to bytecode for the EVM to execute. Think of it as translating our human-readable Solidity into something the EVM understands. Here we'll compile our contracts to bytecode and put that on the blockchain so we can interact with it.

Open a new console window and run the command `testrpc`. This starts a new, local blockchain instance powered by EthereumJS TestRPC. Once the TestRPC boots up, you'll see the current TestRPC version, a list of available accounts and private keys, and a section called HD Wallet. We need to copy the words from the Mnemonic section for use later in our browser.

Back in your first console window, run the command `truffle compile`. You should see the following output:

```shell
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/PetShop.sol...
Writing artifacts to ./build/contracts
```

### Migration

Now that we've successfully compiled out contracts, it's time to migrate them to the blockchain! A **migration** is a deployment script meant to alter the state of your application's contracts, moving it from one state to the next. For the first migration, you might simply be deploying new code. Over time, however, other migrations might move data around or replace a contract with a new one.

You'll see one JavaScript file already in the migrations directory: 1_initial_migration.js. This handles deploying the Migrations.sol contract to observe subsequent smart contract migrations. Migrations are executed in their enumerated order and follow the same basic structure:

*   Import the desired contract artifacts from the build folder.
*   Export a single, anonymous function taking one argument, `deployer`.
*   Order the deployment of a given contract with `deployer.deploy(<< CONTRACT_NAME >>)`.

We can leave 1_initial_migration alone; it deploys the Migrations.sol contract to keep track of our migrations so we don't double-migrate unchanged contracts in the future.

Create the file 2_deploy_contracts.js with the following contents:

```javascript
var Adoption = artifacts.require("./Adoption.sol");

module.exports = function(deployer) {
  deployer.deploy(Adoption);
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
  Deploying Adoption...
  Adoption: 0xb9f485451a945e65e48d9dd7fc5d759af0a89e21
Saving successful migration to network...
Saving artifacts...
```

You can see the migrations being executed in order, followed by the blockchain address of each deployed contract (NOTE: Your addresses will differ). Congratulations! You've written your first smart contract and deployed it to a locally running test blockchain. It's time to interact with our smart contract now to make sure it does what we want.

## Testing the Smart Contract

Truffle is very flexible when it comes to smart contract testing. Tests can be written either in JavaScript or Solidity. Today we'll be writing our tests in Solidity.

Begin by creating the smart contract TestAdoption.sol in the test directory with the following contents:

```javascript
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
  Adoption adoption = Adoption(DeployedAddresses.Adoption());

}
```

We start the contract off with 3 imports:

*   `Assert.sol`: gives us various assertions to use in our tests. In testing, an **assertion** checks for things like equality, inequality or emptiness to return a pass/fail boolean from our test. [Here's a full list of the assertions included with Truffle](https://github.com/trufflesuite/truffle/blob/beta/lib/testing/Assert.sol).
*   `DeployedAddresses.sol`: When running tests, Truffle will deploy a fresh instance of the contract being tested to the TestRPC. This smart contract gets the address of the deployed contract.
*   The smart contract we want to test (`Adoption.sol`).

Then, we setup a contract-wide variable containing the smart contract to be tested, calling the DeployedAddresses smart contract to get its address.

### Testing The adopt() Function

To test the adopt function, remember that upon success it returns the given `petId`. We can ensure an ID was returned and it's correct by comparing the return value of `adopt()` to the ID we passed in.

Add the following function within the TestAdoption smart contract, after the declaration of Adoption:

```javascript
function testUserCanAdoptPet() {
  uint returnedId = adoption.adopt(8);

  uint expected = 8;

  Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recorded.");
}
```

Here we call the smart contract we declared earlier with the ID of 8. We then declare an expected value of 8 as well. Finally, we pass the actual value, the expected value and a failure message (which gets printed to the console if the test does not pass) to `Assert.equal()`.

### Testing Retrieval of a Single Pet's Owner

Remembering from above that public variables have automatic getter methods, we can retrieve the address stored by our adoption test above. Stored data will persist for the duration of our tests, so our adoption of pet 8 above can be retrieved by other tests.

```javascript
function testGetAdopterAddressByPetId() {
  address expected = this;

  address adopter = adoption.adopters(8);

  Assert.equal(adopter, expected, "Owner of pet ID 8 should be recorded.");
}
```

Since the TestAdoption contract will be sending the transaction, we set the expected value to **this**, a contract-wide variable that gets the current contract's address. From there we assert equality as we did above.

### Testing Retrieval of All Pet Owners

Since arrays can only return a single value given a single key, we created our own getter for the entire array.

```javascript
function testGetAdopterAddressByPetIdInArray() {
  address expected = this;

  address[16] memory adopters = adoption.getAdopters();

  Assert.equal(adopters[8], expected, "Owner of pet ID 8 should be recorded.");
}
```

Note the **memory** attribute on `adopters`. The memory attribute tells Solidity to temporarily store the value in memory, rather than saving it to the contract's storage. Since `adopters` is an array, and we know from the first adoption test that we adopted pet 8, we compare the testing contracts address with location 8 in the array.

### Running The Tests

Before testing your smart contracts, you'll need to have the TestRPC up and running. It's most likely still running from the migration step. If not, open a new console tab and run it with `testrpc`. You'll see some information on the screen such as the version, available accounts, private keys, wallet information and a stream of blocks will begin.

Run `truffle test`. If all the tests pass, you'll see console output like below:

```shell
Using network 'development'.

Compiling ./contracts/Adoption.sol...
Compiling ./test/TestAdoption.sol...
Compiling truffle/Assert.sol...
Compiling truffle/DeployedAddresses.sol...


  TestAdoption
    ✓ testUserCanAdoptPet (91ms)
    ✓ testGetAdopterAddressByPetId (70ms)
    ✓ testGetAdopterAddressByPetIdInArray (89ms)


  3 passing (670ms)
```

Note your completion times may be different.

## Creating a UI to Interact with our Smart Contract

Now that we've created the smart contract, deployed it to our local test chain and confirmed we can interact with it via the console, it's time to create a UI so the world can use this!

So you don't have to spend time on layout and styling, we've created the HTML, CSS and basic JavaScript for you, [download it here](/tutorials/files/pet-shop/pet-shop-static.zip). Once downloaded, unzip it in your project directory, so the file structure is `your-project-folder/src`.

The front-end does not use a build system (webpack, grunt, etc.) to be as easy to get started as possible. If you've worked with any front-end JavaScript before, you'll feel right at home. The base structure of the App is already there; we'll be filling in the functions which are unique to Ethereum. This way, you can take this knowledge and apply it to your own front-end setups.

### Instantiating Web3

Open the app.js file and have a look around. We set up a global App object to manage our application, load in the pet data in `init()` and then call the function `initWeb3()`. Web3 is a JavaScript library for interacting with the Ethereum blockchain. It can retrieve user accounts, send transactions, interact with smart contracts and more. For more information, see [the web3 GitHub page](https://github.com/ethereum/web3.js/).

Remove the multi-line comment from initWeb3 and replace it with the following:

```javascript
// Initialize web3 and set the provider to the testRPC.
if (typeof web3 !== 'undefined') {
  App.web3Provider = web3.currentProvider;
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
  web3 = new Web3(App.web3Provider);
}
```

First, we check if there's a web3 instance already active. Ethereum browsers like [Mist](https://github.com/ethereum/mist) or Chrome with the [MetaMask](https://metamask.io/) extension will inject their own web3 instances. If an injected web3 instance is present, we get its provider and use it to create our web3 object.

If no injected web3 instance is present, we create our web3 object based on the TestRPC's provider. Note this fallback is fine for development environments, but insecure and not suitable for production.

### Instantiating the Contract

Now that we can interact with Ethereum via web3, we need to instantiate our smart contract so web3 knows where to find it and how it works. Truffle has a library to help with this called `truffle-contract`. It keeps information about our contract in sync with your migrations, so you don't need to change the contract's deployed address manually.

Remove the multi-line comment from initWeb3 and replace it with the following:

```javascript
$.getJSON('Adoption.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract.
  var AdoptionArtifact = data;
  App.contracts.Adoption = TruffleContract(AdoptionArtifact);

  // Set the provider for our contract.
  App.contracts.Adoption.setProvider(App.web3Provider);

  // Use our contract to retieve and mark the adopted pets.
  return App.markAdopted();
});
```

We first retrieve the artifact file for our smart contract. **Artifacts** are information about our contract such as its deployed address and ABI. The **ABI (Application Binary Interface)** is a JavaScript object defining how to interact with the contract including its variables, functions and their parameters.

Once we have the artifacts in our callback, we pass them to `TruffleContract()`. This creates and instance of the contract we can interact with.

With our contract instantiated, we set its web3 provider using the `this.provider` value we stored earlier when setting up web3.

Finally, we call the app's `markAdopted()` function in case any pets are already adopted from a previous visit. We've encapsulated this in a separate function since we'll need to update the UI any time we make a change to the smart contract's data.

### Getting The Adopted Pets and Updating The UI

Remove the multi-line comment from `markAdopted()` and replace it with the following:

```javascript
var adoptionInstance;

App.contracts.Adoption.deployed().then(function(instance) {
  adoptionInstance = instance;

  return adoptionInstance.getAdopters.call();
}).then(function(adopters) {
  for (i = 0; i < adopters.length; i++) {
    if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
      $('.panel-pet').eq(i).find('button').text('Pending...').attr('disabled', true);
    }
  }
}).catch(function(err) {
  console.log(err.message);
});
```

In this function, we access the deployed Adoption contract, then call `getAdopters()` on that instance. We first declare the variable `adoptionInstance` outside of the smart contract calls so we can access the instance after initially retrieving it.

A **call** allows us to read data from the blockchain without having to send a full transaction; meaning we won't have to spend any Ether.

After calling `getAdopters()`, we then loop through them, checking to see if an address is stored for each pet. Since the array contains address types, Ethereum initializes the array with 16 empty addresses. This is why we check for an empty address string rather than null or another falsey value. Once a `petId` with a corresponding address is found, we disable its adopt button and change the button text to "Pending...", so the user gets some feedback.

Finally, we catch any errors which may have occurred and log them to the console.

### Handling the adopt() Function

Remove the multi-line comment from handleAdopt and replace it with the following:

```javascript
var adoptionInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;

    return adoptionInstance.adopt(petId, {from: account});
  }).then(function(result) {
    return App.markAdopted();
  }).catch(function(err) {
    console.log(err.message);
  });
});
```

First, we use web3 to get the user's accounts. In the callback, after an error check, we then select the first account.

From there, we get the deployed contract as we did above and store the instance in `adoptionInstance`. This time though, we're going to send a **transaction** instead of a call. Transactions require a "from" address and have an associated cost. This cost, paid in Ether, is called **gas**. The gas cost is the fee for performing computation and/or storing data in an Ethereum smart contract. We send the transaction by executing the `adopt()` function with both the pet's ID and an object containing the account address, which we stored earlier in `account`.

The result of sending a transaction is the transaction object. If there are no errors, we proceed to call our `markAdopted()` function to sync the UI with our newly stored data.

Now it's time to actually use our Dapp!

## Using Our Dapp in Chrome

### Installing and Configuring MetaMask

The easiest way to interact with our Dapp in a browser is to download and install the MetaMask Chrome extension. Once installed, you'll see the MetaMask fox icon next to your address bar.

Click the MetaMask icon and you'll see this screen appear:

<div class="text-center">
  ![MetaMask Unlock](/tutorials/images/pet-shop/metamask-1.png)
  <br/><br/>
</div>

If the network in the upper-left is something other than "Private Network", click it and you'll see a dropdown of possible networks. Select Localhost 8545 to use the TestRPC:

<div class="text-center">
  ![MetaMask Network Choices](/tutorials/images/pet-shop/metamask-2.png)
  <br/><br/>
</div>

Now, you'll need to get the Mnemonic the TestRPC generated when we first started it up. Remember when we mentioned copying this phrase? If you don't have it, go to the console window running the TestRPC and scroll to the top. You'll see a heading called HD Wallet and below it Mnemonic. Copy this phrase, then click I forgot my password and paste it in the first field. Now choose a password and click OK.

<div class="text-center">
  ![MetaMask Mnemonic](/tutorials/images/pet-shop/metamask-3.png)
  <br/><br/>
</div>

Now that we've connected MetaMask to the TestRPC, you'll be take to the accounts screen. Each account created by the TestRPC is given 100 Ether. You'll notice it's slightly less on the first account because that account supplied the gas to deploy the contracts.

<div class="text-center">
  ![MetaMask Account](/tutorials/images/pet-shop/metamask-4.png)
  <br/><br/>
</div>

Now that MetaMask is configured, we can start our web server and actually use the Dapp.

### Installing and Configuring lite-server

We're going to use the `lite-server` library to serve our static files. Since it's an NPM package, we'll need to initialize NPM in our project.

In the project's root directory, run `npm init`. It will ask you some questions about the project, but for now let's accept all the defaults by pressing Enter at each prompt (you can later change them if necessary).

With NPM initialized, run `npm install lite-server --save-dev`. This installs `lite-server` as a development dependency. For production we'll be deploying our Dapp to a real server, so there's no need for `lite-server` in that environment.

Next, create a file called `bs-config.json` in the project's root directory with the following contents:

```javascript
{
  "server": {
    "baseDir": ["./src", "./build/contracts"]
  }
}
```

This tells `lite-server` which files to include in our base directory. We add the `./src` directory for our website files and `./build/contracts` directory for the contract artifacts. The dot preceding the slash means "start looking for this in the current directory."

Finally, edit the `scripts` object in the `package.json` file in the project's root directory with the following contents:

```javascript
"scripts": {
  "dev": "lite-server",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

This tells NPM to run our local install of `lite-server` when we execute `npm run dev` from the console.

### Using the Dapp

Run the command `npm run dev`. The dev server will launch and automatically open a new browser tab containing your Dapp!

Now, simply click the adopt button on the pet of your choice. You'll be prompted to approve the transaction by MetaMask. Do so, and you'll see the button change to "Pending..." and become disabled, just as we specified.

<div class="text-center container">
  ![MetaMask Account](/tutorials/images/pet-shop/adoption-1.jpeg)
  <p class="caption">After clicking an Adopt button, MetaMask prompts you to review and accept the transaction.</p>
</div>

<div class="text-center container">
  ![MetaMask Account](/tutorials/images/pet-shop/adoption-2.jpeg)
  <p class="caption">Once the transaction completes, you'll see the button change to Pending...</p>
  <br/>
</div>

**CONGRATULATIONS!** You took a huge first step to becoming a full-fledged Dapp developer. For developing locally, you have all the tools you need to start making more advanced Dapps. If you'd like to make your Dapp live for others to use, stay tuned for our next tutorial on deploying to the Ropsten testnet.
