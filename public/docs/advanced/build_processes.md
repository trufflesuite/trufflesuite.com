# Build processes

In order to provide tight integration with Truffle for those that desire it, Truffle allows you to specify a custom build pipeline meant to bootstrap and configure your application. Truffle provides three methods of integration, described below.

## Running an external command

If you'd like Truffle to run an external command whenever it triggers a build, simply include that option as a string within your project configuration, like so:

```javascript
module.exports = {
  // This will run the `webpack` command on each build.
  //
  // The following environment variables will be set when running the command:
  // WORKING_DIRECTORY: root location of the project
  // BUILD_DESTINATION_DIRECTORY: expected destination of built assets (important for `truffle serve`)
  // BUILD_CONTRACTS_DIRECTORY: root location of your build contract files (.sol.js)
  //
  build: "webpack"
}
```

Note that you're given ample environment variables with which to integrate with Truffle, detailed above.

## Providing a custom function

You can also provide a custom build function like the one below. Note you're given a plethora of information about your project which you can use to integrate tightly with Truffle.

```javascript
module.exports = {
  build: function(options, callback) {
     // Do something when a build is required. `options` contains these values:
     //
     // working_directory: root location of the project
     // contracts_directory: root directory of .sol files
     // destination_directory: directory where truffle expects the built assets (important for `truffle serve`)
  }
}
```

## Creating a custom module

You could also create a module or object that implements the builder interface (i.e., is an object which contains a `build` function like the one above). This is great for those who want to maintain tighter integration with Truffle and publish a package to make everyone else's lives easier.

Here's an example using Truffle's default builder:

```javascript
var DefaultBuilder = require("truffle-default-builder");
module.exports = {
  build: new DefaultBuilder(...) // specify the default builder configuration here.
}
```

## Bootstrapping your application

Whether you're building an application to run in the browser, or a command line tool, a Javascript library or a native mobile application, bootstrapping your contracts is the same, and using your deployed contract artifacts follows the same general process no matter the app you're building.

When configuring your build tool or application, you'll need to perform the following steps:

1) Get all your contract artifacts into your build pipeline / application. This includes all of the `.json` files within the `./build/contracts` directory.

2) Turn those `.json` contract artifacts into contract abstractions that are easy to use, via [truffle-contract](https://github.com/trufflesuite/truffle-contract).

3) Provision those contract abstractions with a Web3 provider. In the browser, this provider might come from [Metamask](https://metamask.io/) or [Mist](https://github.com/ethereum/mist), but it could also be a custom provider you've configured to point to [Infura](http://infura.io/) or any other Ethereum client.

4) Use your contracts!

In Node, this is very easy to do. Let's take a look at an example that shows off the "purest" way of performing the above steps, since it exists outside of any build process or tool.

```javascript
// Step 1: Get a contract into my application
var json = require("./build/contracts/MyContract.json");

// Step 2: Turn that contract into an abstraction I can use
var contract = require("truffle-contract");
var MyContract = contract(json);

// Step 3: Provision the contract with a web3 provider
MyContract.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

// Step 4: Use the contract!
MyContract.deployed().then(function(deployed) {
  return deployed.someFunction();
});
```

All build processes and contract bootstrapping will follow this pattern. The key when setting up your own custom build process is to ensure you're consuming all of your contract artifacts and provisioning your abstractions correctly.
