---
title: Writing Tests in Solidity
layout: docs.hbs
---
# Writing Tests in Solidity

Solidity test contracts live alongside Javascript tests as `.sol` files. When `truffle test` is run, they will be included as a separate test suite per test contract. These contracts maintain all the benefits of the Javascript tests: namely a [clean-room environment](/docs/truffle/testing/testing-your-contracts#clean-room-environment) per test suite, direct access to your deployed contracts and the ability to import any contract dependency. In addition to these features, Truffle's Solidity testing framework was built with the following issues in mind:

* Solidity tests shouldn't extend from any contract (like a `Test` contract). This makes your tests as minimal as possible and gives you complete control over the contracts you write.
* Solidity tests shouldn't be beholden to any assertion library. Truffle provides a default assertion library for you, but you can change this library at any time to fit your needs.
* You should be able to run your Solidity tests against any Ethereum client.

## Example

Let's take a look at an example Solidity test before diving too deeply. Here's the example Solidity test provided for you by `truffle unbox metacoin`:

```solidity
pragma solidity >=0.4.25 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MetaCoin.sol";

contract TestMetaCoin {
  function testInitialBalanceUsingDeployedContract() {
    MetaCoin meta = MetaCoin(DeployedAddresses.MetaCoin());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testInitialBalanceWithNewMetaCoin() {
    MetaCoin meta = new MetaCoin();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }
}
```

This produces the following output:

```
$ truffle test

Compiling your contracts...
===========================
> Compiling ./contracts/ConvertLib.sol
> Compiling ./contracts/MetaCoin.sol
> Compiling ./contracts/Migrations.sol
> Compiling ./test/TestMetaCoin.sol



  TestMetaCoin
    ✓ testInitialBalanceUsingDeployedContract (79ms)
    ✓ testInitialBalanceWithNewMetaCoin (65ms)

  Contract: MetaCoin
    ✓ should put 10000 MetaCoin in the first account (38ms)
    ✓ should call a function that depends on a linked library (42ms)
    ✓ should send coin correctly (120ms)


  5 passing (7s)
```

From the output, you can see reports from two different test files: one
JavaScript (Contract: MetaCoin above) and one Solidity (TestMetaCoin above).
In this document we will be concerning ourselves exclusively with the
Solidity test.

## Test structure

To better understand whats happening, let's discuss things in more detail.

### Assertions

Your assertion functions like `Assert.equal()` are provided to you by the `truffle/Assert.sol` library. This is the default assertion library, however you can include your own assertion library so long as the library loosely integrates with Truffle's test runner by triggering the correct assertion events. You can find all available assertion functions in [Assert.sol](https://github.com/trufflesuite/truffle/blob/develop/packages/resolver/solidity/Assert.sol).

### Deployed addresses

The addresses of your deployed contracts (i.e., contracts that were deployed as part of your migrations) are available through the `truffle/DeployedAddresses.sol` library. This is provided by Truffle and is recompiled and relinked before each suite is run to provide your tests with Truffle's a clean room environment. This library provides functions for all of your deployed contracts, in the form of:

```solidity
DeployedAddresses.<contract name>();
```

This will return an address that you can then use to access that contract. See the example test above for usage.

In order to use the deployed contract, you'll have to import the contract code into your test suite. Notice `import "../contracts/MetaCoin.sol";` in the example. This import is relative to the test contract, which exists in the `./test` directory, and it goes outside of the test directory in order to find the MetaCoin contract. It then uses that contract to cast the address to the `MetaCoin` type.

### Test contract names

All test contracts must start with `Test`, using an uppercase `T`. This distinguishes this contract apart from test helpers and project contracts (i.e., the contracts under test), letting the test runner know which contracts represent test suites.

### Test function names

Like test contract names, all test functions must start with `test`, lowercase. Each test function is executed as a single transaction, in order of appearance in the test file (like your Javascript tests). Assertion functions provided by `truffle/Assert.sol` trigger events that the test runner evaluates to determine the result of the test. Assertion functions return a boolean representing the outcome of the assertion which you can use to return from the test early to prevent execution errors (as in, errors that [Ganache](/ganache) or Truffle Develop will expose).

### before / after hooks

You are provided many test hooks, shown in the example below. These hooks are `beforeAll`, `beforeEach`, `afterAll` and `afterEach`, which are the same hooks provided by Mocha in your Javascript tests. You can use these hooks to perform setup and teardown actions before and after each test, or before and after each suite is run. Like test functions, each hook is executed as a single transaction. Note that some complex tests will need to perform a significant amount of setup that might overflow the gas limit of a single transaction; you can get around this limitation by creating many hooks with different suffixes, like in the example below:

```solidity
import "truffle/Assert.sol";

contract TestHooks {
  uint someValue;

  function beforeEach() {
    someValue = 5;
  }

  function beforeEachAgain() {
    someValue += 1;
  }

  function testSomeValueIsSix() {
    uint expected = 6;

    Assert.equal(someValue, expected, "someValue should have been 6");
  }
}
```

This test contract also shows that your test functions and hook functions all share the same contract state. You can setup contract data before the test, use that data during the test, and reset it afterward in preparation for the next one. Note that just like your Javascript tests, your next test function will continue from the state of the previous test function that ran.

## Advanced features

Solidity tests come with a few advanced features to let you test specific use cases within Solidity.

### Testing for exceptions

You can easily test if your contract should or shouldn't raise an exception (i.e., for `require()`/`assert()`/`revert()` statements; `throw` on previous versions of Solidity).

This topic was first written about by guest writer Simon de la Rouviere in [his tutorial Testing for Throws in Truffle Solidity Tests](/guides/testing-for-throws-in-solidity-tests).  N.B. that the tutorial makes heavy use of exceptions via the deprecated keyword `throw`, replaced by `revert()`, `require()`, and `assert()` starting in Solidity v0.4.13.

Also, since Solidity v0.4.17, a function type member was added to enable you to access a function selector (e.g.: `this.f.selector`), and so, testing for throws with external calls has been made much easier:
```solidity
pragma solidity ^0.5.0;

import "truffle/Assert.sol";

contract TestBytesLib2 {
    function testThrowFunctions() public {
        bool r;

        // We're basically calling our contract externally with a raw call, forwarding all available gas, with
        // msg.data equal to the throwing function selector that we want to be sure throws and using only the boolean
        // value associated with the message call's success
        (r, ) = address(this).call(abi.encodePacked(this.IThrow1.selector));
        Assert.isFalse(r, "If this is true, something is broken!");

        (r, ) = address(this).call(abi.encodePacked(this.IThrow2.selector));
        Assert.isFalse(r, "What?! 1 is equal to 10?");
    }

    function IThrow1() public pure {
        revert("I will throw");
    }

    function IThrow2() public pure {
        require(1 == 10, "I will throw, too!");
    }
}
```

### Testing ether transactions

You can also test how your contracts react to receiving Ether, and script that interaction within Solidity. To do so, your Solidity test should have a public function that returns a `uint`, called `initialBalance`. This can be written directly as a function or a public variable, as shown below. When your test contract is deployed to the network, Truffle will send that amount of Ether from your test account to your test contract. Your test contract can then use that Ether to script Ether interactions within your contract under test. Note that `initialBalance` is optional and not required.

```solidity
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MyContract.sol";

contract TestContract {
  // Truffle will send the TestContract one Ether after deploying the contract.
  uint public initialBalance = 1 ether;

  function testInitialBalanceUsingDeployedContract() {
    MyContract myContract = MyContract(DeployedAddresses.MyContract());

    // perform an action which sends value to myContract, then assert.
    myContract.send(...);
  }

  function () {
    // This will NOT be executed when Ether is sent. \o/
  }
}
```

Note that Truffle sends Ether to your test contract in a way that does **not** execute a fallback function, so you can still use the fallback function within your Solidity tests for advanced test cases.
