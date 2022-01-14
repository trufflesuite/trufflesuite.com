---
title: Ethereum Gas Exactimation
hide:
  - navigation
---

In Ethereum, estimating gas for a given transaction is a tricky problem to solve (especially when attempting to maintain [EIP-114](https://github.com/ethereum/EIPs/issues/114) compliance). Most of the well-known Ethereum implementations like Geth<sup>¹</sup> and Parity<sup>²</sup> use interval halving (binary search) to estimate gas by running transactions through the EVM until an approximate estimation converges.

![Ganache Logo](/img/ganache-logo-h-dark.svg)

At [Truffle](/), we decided such an approach was an unnecessarily CPU-intensive solution to the problem and set out to find a (theoretically) more performant and perfectly accurate way of estimating gas. The result? [Gas exactimation](https://github.com/trufflesuite/ganache-cli/releases/tag/v6.4.2). In this tutorial, we’ll go over gas exactimation at a high level in order to demonstrate its precision.

**Complete example available at [the following repo](https://github.com/trufflesuite/gas-exactimation-tutorial).**

**_Prerequisites: You should be familiar with Truffle, Ganache, and Solidity. If you need an introduction please consult the following resources:_**

* [Truffle Quickstart](/docs/truffle/quickstart)
* [Ganache Quickstart](/docs/ganache/quickstart)
* [Solidity Documentation](https://solidity.readthedocs.io/en/v0.5.9/index.html)

## EIP-114, or the “1/64ths rule”

[EIP-114](https://github.com/ethereum/EIPs/issues/114) mandates that certain stackdepth-creating opcodes _withhold_ 1/64th of remaining gas from the stack they create. In practice this means:

1. The gas required for a successful transaction can be greater than the actual gas spent (similar to how gas refunds behave).
2. The extra gas required for a successful transaction varies depending on the transaction’s initial `gas` amount.

A long-standing issue with [Ganache](/ganache) has been the fact that we haven’t returned EIP-114 compliant gas estimations. This has caused our gas estimates to be too low in cases where a transaction executed certain opcodes. **Gas exactimation** addresses this by considering how the gas withheld at any nested stack depth/frame affects the gas needed outside of its execution context.

Let’s see it in action.

## Create a New Truffle Project

We will use `truffle init` to create a new Truffle project and then wire up an example [Solidity](https://solidity.readthedocs.io/en/v0.5.9/index.html) smart contract and test script.

```shell
// In a new project directory...
$ truffle init
```

## Setup an Example Smart Contract

With our new project initialized, we will create an example file: `ContractFactory.sol`.

```shell
$ touch ./contracts/ContractFactory.sol
```

Our file will have two contracts, `Contract` and `ContractFactory`. `ContractFactory` will have the method `createInstance` that we will use to create a new empty `Contract`.

```
// ./contracts/ContractFactory.sol
pragma solidity ^0.5.0;

contract ContractFactory {
  function createInstance() public {
    new Contract();
  }
}

contract Contract {
  constructor() public {}
}
```

Note the `new` keyword being used to create a new `Contract`. A valid statement containing the `new` keyword gets compiled to bytecode containing the `CREATE` opcode which is subject to the [EIP-114](https://github.com/ethereum/EIPs/issues/114#issue-160782694) 1/64th gas withholding.

## Write a Test Case

Next, we will write a `ContractFactory` test case.

```shell
$ touch ./test/ContractFactory.js
```

This test case will deploy `ContractFactory` to a Ganache test network and use a gas estimate provided by Ganache to create a new `Contract`.

```
// ./test/ContractFactory.js
const ContractFactory = artifacts.require("ContractFactory");

contract("ContractFactory", () => {
  it("...should deploy and successfully call createInstance using the method's provided gas estimate", async () => {
    const contractFactoryInstance = await ContractFactory.new();

    const gasEstimate = await contractFactoryInstance.createInstance.estimateGas();

    const tx = await contractFactoryInstance.createInstance({
      gas: gasEstimate
    });
    assert(tx);
  });
});
```

## A Quick Check

Before we run our test, we’ll download the most recent version of Truffle that uses Ganache _before_ gas exactimation.

```shell
// In the project directory...
$ npm i truffle@5.0.13
```

And we’ll make sure we have the latest version of Truffle installed globally that uses Ganache _with_ gas exactimation.

```shell
$ npm i -g truffle
```

## Testing Before and After

```shell
$ npx truffle test
...
...
Error: Returned error: VM Exception while processing transaction: revert
```

And when we use gas exactimation...

```shell
$ truffle test
...
...
Contract: ContractFactory

✓ ...should deploy and successfully call createInstance using the method's provided gas estimate (130ms)

1 passing (143ms)
```

!!!!

## Testing Exactimation

But is gas exactimation actually _exact_? 🤔

We’ll open our test file and subtract exactly a single unit of gas from the `gasEstimate` before sending our test transaction.

```shell
// ./test/ContractFactory.js
const ContractFactory = artifacts.require("ContractFactory");

contract("ContractFactory", () => {
  it("...should deploy and successfully call createInstance using the method's provided gas estimate", async () => {
    const contractFactoryInstance = await ContractFactory.new();

const gasEstimate = await contractFactoryInstance.createInstance.estimateGas();

const tx = await contractFactoryInstance.createInstance({
      gas: gasEstimate - 1
    });
    assert(tx);
  });
});
```

Running our test again against Ganache with gas exactimation...

```shell
$ truffle test
...
...
Error: Returned error: VM Exception while processing transaction: revert
```

Exactimation confirmed 🚀.


Note: Since the initial release of gas exactimation, an even more performant iteration of the algorithm is currently in review here.

[1]: [https://github.com/ethereum/go-ethereum/blob/master/accounts/abi/bind/backends/simulated.go#L267](https://github.com/ethereum/go-ethereum/blob/master/accounts/abi/bind/backends/simulated.go#L267)

[2]: [https://github.com/paritytech/parity-ethereum/blob/master/ethcore/src/client/client.rs#L1658](https://github.com/paritytech/parity-ethereum/blob/master/ethcore/src/client/client.rs#L1658)
