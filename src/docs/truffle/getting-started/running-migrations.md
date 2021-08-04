---
title: Truffle | Running Migrations
layout: docs.hbs
---
# Running Migrations

Migrations are JavaScript files that help you deploy contracts to the Ethereum network. These files are responsible for staging your deployment tasks, and they're written under the assumption that your deployment needs will change over time. As your project evolves, you'll create new migration scripts to further this evolution on the blockchain. A history of previously run migrations is recorded on-chain through a special `Migrations` contract, detailed below.

## Command

To run your migrations, run the following:

```shell
$ truffle migrate
```

This will run all migrations located within your project's `migrations` directory. At their simplest, migrations are simply a set of managed deployment scripts. If your migrations were previously run successfully, `truffle migrate` will start execution from the last migration that was run, running only newly created migrations. If no new migrations exists, `truffle migrate` won't perform any action at all. You can use the `--reset` option to run all your migrations from the beginning. Other command options are documented [here](../reference/truffle-commands#migrate). For local testing, make sure to have a test blockchain such as [Ganache](/ganache) configured and running before executing `truffle migrate`. You can also use `truffle develop` and run your migrations.


## Migration files

A simple migration file looks like this:

Filename: `4_example_migration.js`

```javascript
const MyContract = artifacts.require("MyContract");

module.exports = async function (deployer, network, accounts) {
  // deployment steps
  await deployer.deploy(MyContract);
};
```

Note that the filename is prefixed with a number and is suffixed by a description. The numbered prefix is required in order to determine the order in which to run migrations as well as to record whether the migration ran successfully. The suffix is purely for human readability and comprehension. Your migration function also may
be `async` if you wish (as written above) in order to use the `await` keyword to await your deployments.

Another thing to note is that each migration function takes 3 arguments:
1. `deployer` - the object responsible for deploying contracts
2. `network` - the name (string) of the network being used during the migration
3. `accounts` - an array of the available (unlocked) accounts during the migration

### artifacts.require()

At the beginning of the migration, we tell Truffle which contracts we'd like to interact with via the `artifacts.require()` method. This method is similar to Node's `require`, but in our case it specifically returns a contract abstraction that we can use within the rest of our deployment script. The name specified should match **the name of the contract definition** within that source file. Do not pass the name of the source file, as files can contain more than one contract.

Consider this example where two contracts are specified within the same source file:

Filename: `./contracts/Contracts.sol`

```solidity
contract ContractOne {
  // ...
}

contract ContractTwo {
  // ...
}
```

To use only `ContractTwo`, your `artifacts.require()` statement would look like this:

```javascript
const ContractTwo = artifacts.require("ContractTwo");
```

To use both contracts, you will need two `artifacts.require()` statements:

```javascript
const ContractOne = artifacts.require("ContractOne");
const ContractTwo = artifacts.require("ContractTwo");
```

### module.exports

All migrations must export a function via the `module.exports` syntax. The function exported by each migration should accept a `deployer` object as its first parameter. This object aides in deployment by both providing a clear syntax for deploying smart contracts as well as performing some of deployment's more mundane duties, such as saving deployed artifacts for later use. The `deployer` object is your main interface for staging deployment tasks, and its API is described at the bottom of this page.

Your migration function can accept other parameters as well. See the examples below.

## Initial migration

Truffle uses a Migrations contract in order to help manage the migrations feature. This contract must contain a specific interface, but you're free to edit this contract at will. For most projects, this contract will be deployed initially as the first migration and won't be updated again. You will also receive this contract by default when creating a new project with `truffle init`.

Filename: `contracts/Migrations.sol`

```solidity
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
  address public owner = msg.sender;
  
  // A function with the signature `last_completed_migration()`, returning a uint, is required.
  uint public last_completed_migration;

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }
  
  // A function with the signature `setCompleted(uint)` is required.
  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
```

You must deploy this contract inside your first migration in order to take advantage of the migrations feature.  The following migration is provided by default when creating a new project with `truffle init`:

Filename: `migrations/1_initial_migration.js`

```javascript
const Migrations = artifacts.require("Migrations");

module.exports = async function (deployer, network, accounts) {
  // Deploy the Migrations contract as our only task
  await deployer.deploy(Migrations);
};
```

From here, you can create new migrations with increasing numbered prefixes to deploy other contracts and perform further deployment steps.

## Deployer

Your migration files will use the deployer to stage deployment tasks. As such, you can write deployment tasks asynchronously (`deployer.deploy` is an asynchronous function):

```javascript
// Stage deploying A before B
deployer.deploy(A);
deployer.deploy(B);
```

Alternatively, use `async` to queue up deployment tasks that depend on the execution of the previous task:

```javascript
module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(A);
  await deployer.deploy(B);
};
```


## Network considerations

It is possible to run deployment steps conditionally based on the network being deployed to. This is an advanced feature, so see the [Networks](/docs/advanced/networks) section first before continuing.

To conditionally stage deployment steps, write your migrations so that they accept a second parameter, called `network`. Example:

```javascript
module.exports = async function (deployer, network, accounts) {
  if (network == "live") {
    // Do something specific to the network named "live".
  } else {
    // Perform a different step otherwise.
  }
};
```

```javascript
module.exports = async function (deployer, network, accounts) {
  // Use the accounts within your migrations.
}
```

## Deployer API

The deployer contains many functions available to simplify your migrations.

### deployer.deploy(contract, args..., options)

Deploy a specific contract, specified by the contract object, with optional constructor arguments.

Additionally, the last argument is an optional object that can include the key named `overwrite` as well as other transaction parameters such as `gas` and `from`. If `overwrite` is set to `false`, the deployer won't deploy this contract if one has already been deployed. This is useful for certain circumstances where a contract address is provided by an external dependency.

Note that you will need to deploy and link any libraries your contracts depend on first before calling `deploy`. See the `link` function below for more details.

For more information, please see the [@truffle/contract](https://github.com/trufflesuite/truffle/tree/master/packages/contract) documentation.


Examples:

```javascript
// Deploy a single contract without constructor arguments
await deployer.deploy(A);

// Deploy a single contract with constructor arguments
await deployer.deploy(A, arg1, arg2, ...);

// Don't deploy this contract if it has already been deployed
await deployer.deploy(A, { overwrite: false });

// Set a maximum amount of gas and `from` address for the deployment
await deployer.deploy(A, { gas: 4612388, from: "0x...." });

// Deploying multiple contracts as an array is now deprecated.
// This used to be quicker than writing three `deployer.deploy()` statements as the deployer
// can perform the deployment as a single batched request.
// deployer.deploy([
//   [A, arg1, arg2, ...],
//   B,
//   [C, arg1]
// ]);

// External dependency example:
//
// For this example, our dependency provides an address when we're deploying to the
// live network, but not for any other networks like testing and development.
// When we're deploying to the live network we want it to use that address, but in
// testing and development we need to deploy a version of our own. Instead of writing
// a bunch of conditionals, we can simply use the `overwrite` key.
await deployer.deploy(SomeDependency, { overwrite: false });
```

### deployer.link(library, destinations)

Link an already-deployed library to a contract or multiple contracts. `destinations` can be a single contract or an array of multiple contracts. If any contract within the destination doesn't rely on the library being linked, the contract will be ignored.

Example:

```javascript
// Deploy library LibA, then link LibA to contract B, then deploy B.
await deployer.deploy(LibA);
await deployer.link(LibA, B);
await deployer.deploy(B);

// Link LibA to many contracts
await deployer.link(LibA, [B, C, D]);
```

Advanced example:

```javascript
await deployer.deploy(A);     // deploy A
const a = await A.deployed(); // get the deployed instance of A
await deployer.deploy(B);     // deploy B
const b = await B.deployed(); // get the deployed instance of B
await b.setA(a.address);      // update b with new a address
});
```

### Migrations with async/await

You can also migrate your contracts using `async/await`:

Example:

```javascript
module.exports = async function(deployer) {
  // deploy a contract
  await deployer.deploy(MyContract);
  //access information about your deployed contract instance
  const instance = await MyContract.deployed();
}
```
