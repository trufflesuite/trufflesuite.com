---
title: Interacting with Your Contracts
layout: docs.hbs
---

<p class="alert alert-danger">
<strong>Tezos support</strong> in Truffle is experimental. Give it a spin, and help us out by <a href="https://github.com/trufflesuite/truffle/issues">filing issues on Github</a>.
</p>

# Interacting with your contracts

## Introduction

If you were writing raw requests to the Tezos network yourself in order to interact with your contracts, you'd soon realize that writing these requests is clunky and cumbersome. As well, you might find that managing the state for each request you've made is _complicated_. Fortunately, Truffle takes care of this complexity for you, to make interacting with your contracts a breeze.

## Making Transactions

Every time you call a function against a contract on the Tezos blockchain, a transaction is recorded. Each transaction will cost you XTZ, the Tezos-specific token that powers the blockchain, and will change the blockchain's state. Transactions are powerful ways to "write" to the blockchain, and make changes that power the backend of your applications. As you'll see below, all your contract's data stored on chain, colloquially called "storage", is read from the blockchain all at once.

## Introducing abstractions

Contract abstractions are the bread and butter of interacting with Tezos contracts from Javascript. In short, contract abstractions are wrapper code that makes interaction with your contracts easy, in a way that lets you forget about the many engines and gears executing under the hood. Truffle uses its own contract abstraction via the [@truffle/contract](https://github.com/trufflesuite/truffle/tree/alphaTez/packages/contract) module, extended specifically for Tezos, and it is this contract abstraction that's described below.

In order to appreciate the usefulness of a contract abstraction, however, we first need a contract to talk about. We'll use the very simple SimpleStorage contract available to you via `truffle unbox tezos-example` command.

```
function main (const newValue : int;  const storedValue : int) : (list(operation) * int) is
  block { storedValue := newValue } with ((nil : list(operation)), storedValue)
```

This contract has a single method, or "entry point", called `main()`. You'll notice that the first parameter to `main()` is an integer that gets stored in the contract's storage. The second parameter represents current state of the contract's storage at time of the function execution.

Now let's look at the Javascript object called `SimpleStorage` provided for us by Truffle, as made available in the [Truffle console](/docs/tezos/truffle/getting-started/using-the-console-with-tezos):

```javascript
truffle(development)> let instance = await SimpleStorage.deployed()
truffle(development)> instance

// outputs:
//
// Contract
// - address: "KT1AiUNZTnTEbvuSZFcjSEW1V5yB6CW44sHc"
// - main: ()
// - storage: ()
// - send: ()
// ...
```

Notice that the abstraction contains the same function you defined in your contract -- `main()`. It also contains some helper functions (`storage()` and `send()`), as well as the address of the contract on-chain.

## Multi-Entrypoint Contracts

As described in the [Writing Tezos Contracts](/docs/tezos/truffle/getting-started/writing-tezos-contracts) section, you can define contracts that have multiple entry points. When you create a contract as defined in that section, Truffle does a lot of work to make interacting with that contract easier. Let's take a look:

```
// variant defining pseudo multi-entrypoint actions
type action is
| Increment of int
| Decrement of int

function add (const a : int ; const b : int) : int is a + b

function subtract (const a : int ; const b : int) : int is a - b

// real entrypoint that re-routes the flow based on the action provided
function main (const p : action ; const s : int) : (list(operation) * int) is
  ((nil : list(operation)),
    case p of
    | Increment (n) -> add (s, n)
    | Decrement (n) -> subtract (s, n)
    end)
```

If you compile this contract and spin up the console, you'll see the following when you analyze the abstraction Truffle creates for you:

```javascript
truffle(development)> let instance = await Counter.deployed()
truffle(development)> instance

// outputs:
//
// Contract
// - address: "KT19mnZBa9KCtfv1t47gz9ieKyoxhY8JUvy8"
// - increment: ()
// - decrement: ()
// - storage: ()
// - send: ()
// ...
```

In this example, you'll notice a curious change: `main()` has been removed, and has been replaced by `increment()` and `decrement()`, which were two functions created by Truffle to make it easy to call the entry points defined in your contract.

## Executing contract functions

Whenever you call contract functions via the abstraction, say `main()`, `increment()` or `decrement()` in the above examples, a transaction request is made against the configured Tezos network. Calling these functions from Javascript will create a transaction on the Tezos blockchain, and make a state change on the blockchain itself. You should consider these functions as "writes", where executing these functions write data to the blockchain. To perform "reads", and read storage data, you'll use the `storage()` helper function described below.

### Making a transaction

Making a transaction is as easy as calling the abstraction functions Truffle provides for you.

To make things easy, let's start with the SimpleStorage contract defined above. Like before, let's get the deployed instance of it, but let's also call the `main()` function to send the transaction, and then once complete, request the contract's storage data:

```javascript
truffle(development)> let instance = await SimpleStorage.deployed()
truffle(development)> await instance.main(2)    // Make transaction against main() function
{
  tx: 'op8HbSFaHACRQrVZT7SmHjpRwqa9fDVxb6Zjwcyj57jwEgzKpcd',
  ...
} // transaction output
truffle(development)> await instance.storage()  // Get storage data
BigNumber { s: 1, e: 0, c: [ 2 ] }
```

There are a few things interesting about the above code:

* We called the abstraction's `main()` function directly.
* When calling the `main()` function, we only passed on parameter. The second (last) parameter of the `main()` function is provided by the underlying blockchain, and represents the current storage data of the contract. Because it's sent to the contract for us, we don't need to send it from the outside.
* We received a transaction response after calling `main()`, which included a transaction hash (the `tx` parameter in the response). The transaction hash describe the id of the transaction on the blockchain.
* We used the helper function, `storage()`, to get the storage data of the contract. The data of this particular contract is an integer, and in Javascript is represented by the BigNumber object, in this case with the value of `2`. This happens to be the value we sent to `main()` within our transaction!

This is all well and good. Now let's try it with a multi-entrypoint contract:


```javascript
truffle(development)> let instance = await Counter.deployed()
truffle(development)> await instance.increment(2)    // Make transaction against increment() entry point
{
  tx: 'onsbwiB8HK9heBmcJAHRvadcH435waNPpKAMMMGLsiEYXRhtqhx',
  ...
} // transaction output
truffle(development)> await instance.storage()  // Get storage data
BigNumber { s: 1, e: 0, c: [ 3 ] }
```

This is very similar to the example above, except in this case we didn't call `main()`. We instead called one of the named entry points, `increment()`, and it was treated as a transaction, exactly as if we had called `main()`.

### Reading contract data

As shown into the examples above, we can read the contract's data through the `storage()` function:

```javascript
truffle(development)> let instance = await SimpleStorage.deployed()
truffle(development)> await instance.storage()  // Get storage data
BigNumber { s: 1, e: 0, c: [ 2 ] }
```

What's interesting here:

* We received a return value. Note that since the Ethereum network can handle very large numbers, we're given a [BigNumber](https://github.com/MikeMcl/bignumber.js/) object which we can then convert to a number. The BigNumber library is used because Tezos can represent larger numbers than are allowed natively by Javascript.

<p class="alert alert-warning">
<strong>Warning</strong>: If you try to convert a BigNumber that's larger than the largest integer supported by Javascript, you'll likely run into errors or unexpected behavior. We suggest using BigNumber throughout your application.
</p>

Note that the data you get back from the `storage()` function will represent the types and structure of the underlying data stored in your contract. Let's take a new example we haven't seen yet:

```
// ExpandedStorage.ligo - much like SimpleStorage, but stores two values!
type values is record
  firstValue : int;
  secondValue : int;
end
function main (const newValues : values;  const storedValues : values) : (list(operation) * values) is
  block { storedValues := newValues } with ((nil : list(operation)), storedValues)
```

In this contract, the contract's storage is represented by a LIGO record object that contains two integers, the first named `firstValue`, and the second named `secondValue`. When you call `storage()` from the Truffle console, you'll see you're given data that respresents the same structure:

```javascript
truffle(development)> let instance = await ExpandedStorage.deployed()
truffle(development)> await instance.storage()  // Get storage data
{
  firstValue: BigNumber { s: 1, e: 0, c: [ 3 ] },
  secondValue: BigNumber { s: 1, e: 0, c: [ 3 ] }
}
```

### Add a new contract to the network

In the above cases, we've been using a contract abstraction that has already been deployed through Truffle's deployment system. You can deploy new contracts to the network within your own code by using `.new()` function provided by the top-level abstraction object:

```javascript
truffle(developmnet)> let newInstance = await SimpleStorage.new(3) // Deploy a new version of SimpleStorage
truffle(development)> newInstance.address
'KT1Rt8CozyFb1HFhdkK7BLEcURsCtMxCYs1b'
truffle(development)> await newInstance.storage()
BigNumber { s: 1, e: 0, c: [ 3 ] }
```

### Use a contract at a specific address

If you already have an address for a contract stored externally, you can create a new abstraction to represent the contract at that address, using the `at()` function provided by the top-level abstraction object:

```javascript
truffle(development)> let specificInstance = await SimpleStorage.at("KT1Rt8CozyFb1HFhdkK7BLEcURsCtMxCYs1b");
truffle(development)> await newInstance.storage()
BigNumber { s: 1, e: 0, c: [ 3 ] }
```

## Further reading

The contract abstractions provided by Truffle wouldn't have been possible without the amazing [Taquito library](https://tezostaquito.io/) that does a lot of the heavy lifing for what you see above. Check out [their documentation](https://tezostaquito.io/docs/quick_start) for more information.
