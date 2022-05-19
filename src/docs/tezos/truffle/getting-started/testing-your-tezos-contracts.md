---
title: Testing Your Tezos Contracts
layout: docs.hbs
---

<p class="alert alert-danger">
<strong>Tezos support</strong> in Truffle is experimental. Give it a spin, and help us out by <a href="https://github.com/trufflesuite/truffle/issues">filing issues on Github</a>.
</p>

# Testing Your Tezos Contracts

## Framework

Truffle comes standard with an automated testing framework to make testing your contracts a breeze. This framework lets you write simple and manageable tests from Javascript and Typescript.

## Location

All test files should be located in the `./test` directory. Truffle will only run test files with the following file extensions: `.js`, `.ts`, `.es`, `.es6`, and `.jsx`. All other files are ignored.

## Command

To run all tests, simply run:

```shell
$ truffle test
```

Alternatively, you can specify a path to a specific file you want to run, e.g.,

```shell
$ truffle test ./path/to/test/file.js
```

## Clean-room environment

Truffle provides a clean room environment when running your test files. When running your tests, Truffle will re-deploy all of your migrations at the beginning of every test file to ensure you have a fresh set of contracts to test against.

## Speed and reliability considerations

The above clean room environment is a trade off between speed and test maintainability, but at times can be slow. We originally built Ganache for Ethereum to make running Ethereum-based tests significantly faster, where the test framework can take advantage of testing-specific features. We hope to do the same for Tezos. Please reach out to TQ and let them know you'd like a version of Ganache for Tezos!

## Writing Tests in JavaScript

Truffle uses the [Mocha](https://mochajs.org/) testing framework and [Chai](https://chaijs.com/) for assertions to provide you with a solid framework from which to write your JavaScript tests. Let's dive in and see how Truffle builds on top of Mocha to make testing your contracts a breeze.

Note: If you're unfamiliar with writing unit tests in Mocha, please see [Mocha's documentation](https://mochajs.org/) before continuing.

## Use contract() instead of describe()

Structurally, your tests should remain largely unchanged from that of Mocha: Your tests should exist in the `./test` directory, they should end with a `.js` extension (generally), and they should contain code that Mocha will recognize as an automated test. What makes Truffle tests different from that of Mocha is the `contract()` function: This function works exactly like `describe()` except it enables Truffle's clean-room features described above. It works like this:

* Before each `contract()` function is run, your contracts are redeployed to the running Tezos client so the tests within it run with a clean contract state.
* The `contract()` function provides a list of accounts made available by your Tezos client which you can use to write tests.

Since Truffle uses Mocha under the hood, you can still use `describe()` to run normal Mocha tests whenever Truffle clean-room features are not required.

## Use contract abstractions within your tests

Contract abstractions are the basis for making contract interaction possible from JavaScript (they're basically our [flux capacitor](https://www.youtube.com/watch?v=EhU862ONFys)). Because Truffle has no way of detecting which contracts you'll need to interact with within your tests, you'll need to ask for those contracts explicitly. You do this by using the `artifacts.require()` method, a method provided by Truffle that allows you to request a usable contract abstraction for a specific Tezos contract. As you'll see in the example below, you can then use this abstraction to make sure your contracts are working properly.

For more information on using contract abstractions, see the [Interacting With Your Contracts](/docs/tezos/truffle/getting-started/interacting-with-your-tezos-contracts) section.

## Using artifacts.require()

Using `artifacts.require()` within your tests works the same way as using it within your migrations; you just need to pass the name of the contract. See the [artifacts.require() documentation](/docs/tezos/truffle/getting-started/deploying-tezos-contracts#artifactsrequire) in the Migrations section for detailed usage.

## Using the `Tezos` object

A `Tezos` object is available in each test file, provided by the [Taquito interaction library](https://tezostaquito.io/). You can find an example of its usage [here](https://tezostaquito.io/docs/quick_start/#example). You'll want to use this object for interactions with Tezos clients that aren't included by default within Truffle's contract abstraction.

## Examples

### Using `.then`

Here's an example test provided in the [Tezos Truffle Box](https://github.com/truffle-box/tezos-example-box). Note the use of the `contract()` function and our use of `artifacts.require()` for interacting directly with our contracts.

File: `./test/simpleStorage.test.js`

```javascript
const SimpleStorage = artifacts.require("SimpleStorage");

contract('SimpleStorage', () => {
  it("...should store the integer 89.", (done) => {
    var simpleStorageInstance;
    SimpleStorage.deployed().then(function(instance) {
      simpleStorageInstance = instance;
      return simpleStorageInstance.main(89);
    }).then(function(tx) {
      return simpleStorageInstance.storage();
    }).then(function(storedInt) {
      assert.equal(storedInt, 89, "The integer 89 was not stored.");
    });
  });
});
```

This test will produce the following output:

```shell
  Contract: SimpleStorage
    √ ...should store the integer 89 (283ms)

  1 passing (283ms)
```

### Using async/await

Here is a similar example, but using [async/await](https://javascript.info/async-await) notation. As you'll notice, this syntax is much more straightforward.

```javascript
const SimpleStorage = artifacts.require("SimpleStorage");

contract('SimpleStorage', () => {
  it("...should store the integer 89.", async() => {
    const simpleStorageInstance = await SimpleStorage.deployed()
    await simpleStorageInstance.main(89);
    const storedInt = await simpleStorageInstance.storage();

    assert.equal(storedInt, 89, "The integer 89 was not stored.");
  });
});
```

This test will produce identical output to the previous example.

## Specifying tests

You can limit the tests being executed to a specific file as follows:

```shell
truffle test ./test/simpleStorage.js
```

See the full [command reference](/docs/truffle/reference/truffle-commands#test) for more information.

## Advanced

Truffle gives you access to Mocha's configuration so you can change how Mocha behaves. See the [project configuration](/docs/truffle/reference/configuration#mocha) section for more details.
