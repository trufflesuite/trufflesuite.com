# Running migrations

Migrations are JavaScript files that help you deploy contracts to the Ethereum network. These files are responsible for staging your deployment tasks, and they're written under the assumption that your deployment needs will change over time. As your project evolves, you'll create new migration scripts to further this evolution on the blockchain. A history of previously run migrations is recorded on-chain through a special `Migrations` contract, detailed below.

## Command

To run your migrations, run the following:

```none
$ truffle migrate
```

This will run all migrations located within your project's `migrations` directory. At their simplest, migrations are simply a set of managed deployment scripts. If your migrations were previously run successfully, `truffle migrate` will start execution from the last migration that was ran, running only newly created migrations. If no new migrations exists, `truffle migrate` won't perform any action at all. You can use the `--reset` option to run all your migrations from the beginning. For local testing make sure to have a test blockchain such as [Ganache](/ganache) installed and running before executing `migrate`.

## Migration files

A simple migration file looks like this:

Filename: `4_example_migration.js`

```javascript
var MyContract = artifacts.require("MyContract");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};
```

Note that the filename is prefixed with a number and is suffixed by a description. The numbered prefix is required in order to record whether the migration ran successfully. The suffix is purely for human readability and comprehension.

### artifacts.require()

At the beginning of the migration, we tell Truffle which contracts we'd like to interact with via the `artifacts.require()` method. This method is similar to Node's `require`, but in our case it specifically returns a contract abstraction that we can use within the rest of our deployment script. The name specified should match **the name of the contract definition** within that source file. Do not pass the name of the source file, as files can contain more than one contract.

Consider this example where two contracts are specified within the same source file:

Filename: `./contracts/Contracts.sol`

```javascript

contract ContractOne {
  // ...
}

contract ContractTwo {
  // ...
}
```

To use only `ContractTwo`, your `artifacts.require()` statement would look like this:

```
var ContractTwo = artifacts.require("ContractTwo");
```

To use both contracts, you will need two `artifacts.require()` statements:

```
var ContractOne = artifacts.require("ContractOne");
var ContractTwo = artifacts.require("ContractTwo");
```

### module.exports

All migrations must export a function via the `module.exports` syntax. The function exported by each migration should accept a `deployer` object as its first parameter. This object aides in deployment by both providing a clear syntax for deploying smart contracts as well as performing some of deployment's more mundane duties, such as saving deployed artifacts for later use. The `deployer` object is your main interface for staging deployment tasks, and its API is described at the bottom of this page.

Your migration function can accept other parameters as well. See the examples below.

## Initial migration

Truffle requires you to have a Migrations contract in order to use the Migrations feature. This contract must contain a specific interface, but you're free to edit this contract at will. For most projects, this contract will be deployed initially as the first migration and won't be updated again. You will also receive this contract by default when creating a new project with `truffle init`.

Filename: `contracts/Migrations.sol`

```
pragma solidity ^0.4.8;

contract Migrations {
  address public owner;

  // A function with the signature `last_completed_migration()`, returning a uint, is required.
  uint public last_completed_migration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function Migrations() {
    owner = msg.sender;
  }

  // A function with the signature `setCompleted(uint)` is required.
  function setCompleted(uint completed) restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
```

You must deploy this contract inside your first migration in order to take advantage of the Migrations feature. To do so, create the following migration:

Filename: `migrations/1_initial_migration.js`

```javascript
var Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  // Deploy the Migrations contract as our only task
  deployer.deploy(Migrations);
};
```

From here, you can create new migrations with increasing numbered prefixes to deploy other contracts and perform further deployment steps.

## Deployer

Your migration files will use the deployer to stage deployment tasks. As such, you can write deployment tasks synchronously and they'll be executed in the correct order:

```javascript
// Stage deploying A before B
deployer.deploy(A);
deployer.deploy(B);
```

Alternatively, each function on the deployer can be used as a Promise, to queue up deployment tasks that depend on the execution of the previous task:

```javascript
// Deploy A, then deploy B, passing in A's newly deployed address
deployer.deploy(A).then(function() {
  return deployer.deploy(B, A.address);
});
```

It is possible to write your deployment as a single promise chain if you find that syntax to be more clear. The deployer API is discussed at the bottom of this page.

## Network considerations

It is possible to run deployment steps conditionally based on the network being deployed to. This is an advanced feature, so see the [Networks](/docs/advanced/networks) section first before continuing.

To conditionally stage deployment steps, write your migrations so that they accept a second parameter, called `network`. Example:

```javascript
module.exports = function(deployer, network) {
  if (network == "live") {
    // Do something specific to the network named "live".
  } else {
    // Perform a different step otherwise.
  }
}
```

## Available accounts

Migrations are also passed the list of accounts provided to you by your Ethereum client and web3 provider, for you to use during your deployments. This is the exact same list of accounts returned from `web3.eth.getAccounts()`.

```javascript
module.exports = function(deployer, network, accounts) {
  // Use the accounts within your migrations.
}
```

## Deployer API

The deployer contains many functions available to simplify your migrations.

### deployer.deploy(contract, args..., options)

Deploy a specific contract, specified by the contract object, with optional constructor arguments. This is useful for singleton contracts, such that only one instance of this contract exists for your dapp. This will set the address of the contract after deployment (i.e., `Contract.address` will equal the newly deployed address), and it will override any previous address stored.

You can optionally pass an array of contracts, or an array of arrays, to speed up deployment of multiple contracts. Additionally, the last argument is an optional object that can include the key named `overwrite` as well as other transaction parameters such as `gas` and `from`. If `overwrite` is set to `false`, the deployer won't deploy this contract if one has already been deployed. This is useful for certain circumstances where a contract address is provided by an external dependency.

Note that you will need to deploy and link any libraries your contracts depend on first before calling `deploy`. See the `link` function below for more details.

For more information, please see the [truffle-contract](https://github.com/trufflesuite/truffle-contract) documentation.


Examples:

```javascript
// Deploy a single contract without constructor arguments
deployer.deploy(A);

// Deploy a single contract with constructor arguments
deployer.deploy(A, arg1, arg2, ...);

// Don't deploy this contract if it has already been deployed
deployer.deploy(A, {overwrite: false});

// Set a maximum amount of gas and `from` address for the deployment
deployer.deploy(A, {gas: 4612388, from: "0x...."});

// Deploy multiple contracts, some with arguments and some without.
// This is quicker than writing three `deployer.deploy()` statements as the deployer
// can perform the deployment as a single batched request.
deployer.deploy([
  [A, arg1, arg2, ...],
  B,
  [C, arg1]
]);

// External dependency example:
//
// For this example, our dependency provides an address when we're deploying to the
// live network, but not for any other networks like testing and development.
// When we're deploying to the live network we want it to use that address, but in
// testing and development we need to deploy a version of our own. Instead of writing
// a bunch of conditionals, we can simply use the `overwrite` key.
deployer.deploy(SomeDependency, {overwrite: false});
```

### deployer.link(library, destinations)

Link an already-deployed library to a contract or multiple contracts. `destinations` can be a single contract or an array of multiple contracts. If any contract within the destination doesn't rely on the library being linked, the contract will be ignored.

Example:

```javascript
// Deploy library LibA, then link LibA to contract B, then deploy B.
deployer.deploy(LibA);
deployer.link(LibA, B);
deployer.deploy(B);

// Link LibA to many contracts
deployer.link(LibA, [B, C, D]);
```

### deployer.then(function() {...})

Just like a promise, run an arbitrary deployment step. Use this to call specific contract functions during your migration to add, edit and reorganize contract data.

Example:

```javascript
var a, b;
deployer.then(function() {
  // Create a new version of A
  return A.new();
}).then(function(instance) {
  a = instance;
  // Get the deployed instance of B
  return B.deployed();
}).then(function(instance) {
  b = instance;
  // Set the new instance of A's address on B via B's setA() function.
  return b.setA(a.address);
});
```
