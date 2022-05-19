---
title: Deploying Tezos Contracts
layout: docs.hbs
---

<p class="alert alert-danger">
<strong>Tezos support</strong> in Truffle is experimental. Give it a spin, and help us out by <a href="https://github.com/trufflesuite/truffle/issues">filing issues on Github</a>.
</p>

# Deploying Tezos Contracts

If you're familiar with Truffle, then you already know about [Truffle's deployment framework](/docs/truffle/getting-started/running-migrations), called Migrations, used to manage deployment changes over time.

## Overview

To deploy Tezos contracts, you'll first need to write migration scripts to tell Truffle how to deploy those contracts.

For the rest of this document, we'll be referring to deployment scripts as "migrations" to keep in line with Truffle's normal lingo. Keep in mind that a "migration" is synonymous with "deployment script".

## Migrations

Migrations are JavaScript files that help you deploy contracts to a Tezos network. These files are responsible for staging and running your deployment tasks, and they're written under the assumption that your deployment needs will change over time (e.g., you'll add new scripts as time progresses, and your product matures).

## Command

To run your migrations, run the following:

```shell
$ truffle migrate
```

This will run all migrations located within your project's `migrations` directory. At their simplest, migrations are simply a set of managed deployment scripts.

## Migration files

A simple migration file looks like this:

Filename: `4_example_migration.js`

```javascript
var MyContract = artifacts.require("MyContract");

module.exports = (deployer) => {
  // deployment steps
  deployer.deploy(MyContract);
};
```

Note that the filename is prefixed with a number and is suffixed by a description. The numbered prefix is required to tell Truffle which order to run the scripts. The suffix is purely for human readability and comprehension.

### artifacts.require()

At the beginning of the migration, we tell Truffle which contracts we'd like to interact with via the `artifacts.require()` method. This method is similar to Node's `require`, but in our case it specifically returns a contract abstraction that we can use within the rest of our deployment script. The name specified should match the naem of the source file, without the `.ligo` extension.

Consider this example where two contracts are specified within the same source file:

Filename: `./contracts/SimpleStorage.ligo`
```
function main (const newValue : int;  const storedValue : int) : (list(operation) * int) is
  block { storedValue := newValue } with ((nil : list(operation)), storedValue)
```

To interact with this contract, in your deployment script, you'd use `artifacts.require()` like so:

```javascript
var SimpleStorage = artifacts.require("SimpleStorage");
```

### module.exports

All migrations must export a function via the `module.exports` syntax. The function exported of each migration should accept a `deployer` object as its first parameter. This object aides in deployment by both providing a clear syntax for deploying smart contracts as well as performing some of deployment's more mundane duties, such as saving deployed artifacts for later use. The `deployer` object is your main interface for staging deployment tasks, and its API is described at the bottom of this page.

Your migration function can accept other parameters as well. See the examples below.

### Handling default values

A full migration script using `SimpleStorage` would look like the example below. Note that a default value (`3`) is passed to the deployer's `deploy()` function in order to set the contract's initial state. Note that the type of this second parameter must represent the type of state held in the contract, and should be represented in a form that is convertable from Javascript. More details on this below.   

<p class="alert alert-warning">
<strong>Coming from Ethereum?</strong> You'll notice that LIGO contracts lack constructors. Passing in default values as part of deployment is the only way to set the initial state of a contract. Constructors may be added to LIGO at a later date.
</p>

Filename: `./migrations/2_deploy_simple_storage.js`
```javascript
const SimpleStorage = artifacts.require("SimpleStorage");

module.exports = (deployer) => {
  deployer.deploy(SimpleStorage, 3);
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

It is possible to run deployment steps conditionally based on the network being deployed to. This is an advanced feature, so see the [Networks](/docs/truffle/reference/configuration#networks) section first before continuing.

To conditionally stage deployment steps, write your migrations so that they accept a second parameter, called `network`. Example:

```javascript
module.exports = function(deployer, network) {
  if (network == "delphinet") {
    // Do something specific to the network named "delphinet".
  } else {
    // Perform a different step otherwise.
  }
}
```

## Available accounts

Migrations are also passed the list of accounts set up in your wallet, for you to use during your deployments.

```javascript
module.exports = function(deployer, network, accounts) {
  console.log(accounts);
  // => [ 'tz1iGB5P9bZkt356S2PYgAEUWCAuYEvwu152' ]

  // Example contract that takes in an owner as its default state.
  // In this case we use the same account we're using to deploy.
  deployer.deploy(OwnedContract, accounts[0]);
}
```

## Deployer API

The deployer contains many functions available to simplify your migrations.

### deployer.deploy(contract [, initialState] [, options])

Deploy a specific contract, specified by the `contract` object. This will set the address of the contract after deployment (i.e., `Contract.address` will equal the newly deployed address), and it will override any previous address stored.

This function takes an optional initial state as its second argument, that sets the state of your contract on chain when deployed. The type of data passed in this argument should match the type data stored in the state represented by the contract. We use the [Taquito library](https://tezostaquito.io/) to perform the translation from Javascript representation to types understood by Tezos. Please see [their documentation](https://tezostaquito.io/docs/quick_start) for more information.

The last argument is an optional object that can include the key named `overwrite`. If `overwrite` is set to `false`, the deployer won't deploy this contract if one has already been deployed. This is useful for certain circumstances where a contract address is provided by an external dependency.

For more information, please see the [@truffle/contract](https://github.com/trufflesuite/truffle/tree/master/packages/contract) documentation.


Examples:

```javascript
// Deploy a single contract without any initial state.
deployer.deploy(A);

// Deploy a single contract with an initial state of 3.
deployer.deploy(A, 3);

// Don't deploy this contract if it has already been deployed.
deployer.deploy(A, {overwrite: false});

// More specific example:
//
// Don't redeploy if the contract object represents an already-deployed dependency.
// If it has already been deployed to our target network, we can skip deploying it.
// This is useful for cases where we _do_ want to deploy that dependency for testing
// and development networks, but we don't want to replace it in production.
deployer.deploy(SomeDependency, {overwrite: false});
```

### deployer.then(function() {...})

Just like a promise, run an arbitrary deployment step. Use this to call specific contract functions during your migration to add, edit and reorganize contract data.

Example:

```javascript
var a, b;
deployer.then(function() {
  // Create a new version of A programatically, with 3 as the initial state.
  return A.new(3);
}).then(function(instance) {
  a = instance;
  // Get the deployed instance of B
  return B.deployed();
}).then(function(instance) {
  b = instance;
  // Send a transaction with the new instance of A's address using B's main() function.
  return b.main(a.address);
});
```
