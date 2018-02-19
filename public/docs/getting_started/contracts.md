# Interacting with your contracts

## Introduction

If you were writing raw requests to the Ethereum network yourself in order to interact with your contracts, you'd soon realize that writing these requests is clunky and cumbersome. As well, you might find that managing the state each request you've made is _complicated_. Fortunately, Truffle takes care of this complexity for you, to make interacting with your contracts a breeze.

## Reading and writing data

The Ethereum network makes a distinction between writing data to the network and reading data from it, and this distinction plays a significant part in how you write your application. In general, writing data is called a **transaction** whereas reading data is called a **call**. Transactions and calls are treated very differently, and have the following characteristics.

### Transactions

Transactions fundamentally change the state of the network. A transaction can be as simple as sending Ether to another account, or as complicated as executing a contract function or adding a new contract to the network. The defining characteristic of a transaction is that it writes (or changes) data. Transactions cost Ether to run, known as "gas", and transactions take time to process. When you execute a contract's function via a transaction, you cannot receive that function's return value because the transaction isn't processed immediately. In general, functions meant to be executed via a transaction will not return a value; they will return a transaction id instead. So in summary, transactions:

* Cost gas (Ether)
* Change the state of the network
* Aren't processed immediately
* Won't expose a return value (only a transaction id).

### Calls

Calls, on the other hand, are very different. Calls can be used to execute code on the network, though no data will be permanently changed. Calls are free to run, and their defining characteristic is that they read data. When you execute a contract function via a call you will receive the return value immediately. In summary, calls:

* Are free (do not cost gas)
* Do not change the state of the network
* Are processed immediately
* Will expose a return value (hooray!)

Choosing between a transaction and a call is as simple as deciding whether you want to read data, or write it.

## Introducing abstractions

Contract abstractions are the bread and butter of interacting with Ethereum contracts from Javascript. In short, contract abstractions are wrapper code that makes interaction with your contracts easy, in a way that lets you forget about the many engines and gears executing under the hood. Truffle uses its own contract abstraction via the [truffle-contract](https://github.com/trufflesuite/truffle-contract) module, and it is this contract abstraction that's described below.

In order to appreciate the usefulness of a contract abstraction, however, we first need a contract to talk about. We'll use the MetaCoin contract available to you through Truffle Boxes via `truffle unbox metacoin`.

```javascript
pragma solidity ^0.4.2;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function MetaCoin() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) returns(uint) {
		return balances[addr];
	}
}

```

This contract has three methods aside from the constructor (`sendCoin`, `getBalanceInEth`, and `getBalance`). All three methods can be executed as either a transaction or a call.

Now let's look at the Javascript object called `MetaCoin` provided for us by Truffle, as made available in the [Truffle console](/docs/getting_started/console):

```javascript
// Print the deployed version of MetaCoin.
// Note that getting the deployed version requires a promise, hence the .then.
MetaCoin.deployed().then(function(instance) {
  console.log(instance);
});

// outputs:
//
// Contract
// - address: "0xa9f441a487754e6b27ba044a5a8eb2eec77f6b92"
// - allEvents: ()
// - getBalance: ()
// - getBalanceInEth: ()
// - sendCoin: ()
// ...
```

Notice that the abstraction contains the exact same functions that exist within our contract. It also contains an address which points to the deployed version of the MetaCoin contract.

## Executing contract functions

Using the abstraction you can easily execute contract functions on the Ethereum network.

### Making a transaction

There are three functions on the MetaCoin contract that we can execute. If you analyze each of them, you'll see that `sendCoin` is the only function that aims to make changes to the network. The goal of `sendCoin` is to "send" some Meta coins from one account to the next, and these changes should persist.

When calling `sendCoin`, we'll execute it as a transaction. In the following example, we'll send 10 Meta coin from one account to another, in a way that persists changes on the network:

```javascript
var account_one = "0x1234..."; // an address
var account_two = "0xabcd..."; // another address

var meta;
MetaCoin.deployed().then(function(instance) {
  meta = instance;
  return meta.sendCoin(account_two, 10, {from: account_one});
}).then(function(result) {
  // If this callback is called, the transaction was successfully processed.
  alert("Transaction successful!")
}).catch(function(e) {
  // There was an error! Handle it.
})
```

There are a few things interesting about the above code:

* We called the abstraction's `sendCoin` function directly. This will result in a transaction by default (i.e, writing data) instead of call.
* When the transaction is successful, the callback function isn't fired until the transaction is processed. This makes life easy and means you don't have to check the status of the transaction yourself.
* We passed an object as the third parameter to `sendCoin`. Note that the `sendCoin` function in our Solidity contract doesn't have a third parameter. What you see above is a special object that can always be passed as the last parameter to a function that lets you edit specific details about the transaction. Here, we set the `from` address ensuring this transaction came from `account_one`.


### Making a call

Continuing with MetaCoin, notice the `getBalance` function is a great candidate for reading data from the network. It doesn't need to make any changes, as it just returns the MetaCoin balance of the address passed to it. Let's give it a shot:

```javascript
var account_one = "0x1234..."; // an address

var meta;
MetaCoin.deployed().then(function(instance) {
  meta = instance;
  return meta.getBalance.call(account_one, {from: account_one});
}).then(function(balance) {
  // If this callback is called, the call was successfully executed.
  // Note that this returns immediately without any waiting.
  // Let's print the return value.
  console.log(balance.toNumber());
}).catch(function(e) {
  // There was an error! Handle it.
})
```

What's interesting here:

* We had to execute the `.call()` function explicitly to let the Ethereum network know we're not intending to persist any changes.
* We received a return value instead of a transaction id on success. Note that since the Ethereum network can handle very large numbers, we're given a [BigNumber](https://github.com/MikeMcl/bignumber.js/) object which we then convert to a number.

**Warning:** We convert the return value to a number because in this example the numbers are small. However, if you try to convert a BigNumber that's larger than the largest integer supported by Javascript, you'll likely run into errors or unexpected behavior.

### Catching events

Your contracts can fire events that you can catch to gain more insight into what your contracts are doing. The easiest way to handle events is by processing the result object of the transaction that triggered the event, like so:

```javascript
var account_one = "0x1234..."; // an address
var account_two = "0xabcd..."; // another address

var meta;
MetaCoin.deployed().then(function(instance) {
  meta = instance;  
  return meta.sendCoin(account_two, 10, {from: account_one});
}).then(function(result) {
  // result is an object with the following values:
  //
  // result.tx      => transaction hash, string
  // result.logs    => array of decoded events that were triggered within this transaction
  // result.receipt => transaction receipt object, which includes gas used

  // We can loop through result.logs to see if we triggered the Transfer event.
  for (var i = 0; i < result.logs.length; i++) {
    var log = result.logs[i];

    if (log.event == "Transfer") {
      // We found the event!
      break;
    }
  }
}).catch(function(err) {
  // There was an error! Handle it.
});
```

### Processing transaction results

When you make a transaction, you're given a `result` object that gives you a wealth of information about the transaction. Specifically, you get the following:

* `result.tx` *(string)* - Transaction hash 
* `result.logs` *(array)* - Decoded events (logs)
* `result.receipt` *(object)* - Transaction receipt

For more information, please see the [README](https://github.com/trufflesuite/truffle-contract) in the `truffle-contract` project.

### Add a new contract to the network

In all of the above cases, we've been using a contract abstraction that has already been deployed. We can deploy our own version to the network using the `.new()` function:

```javascript
MetaCoin.new().then(function(instance) {
  // Print the new address
  console.log(instance.address);
}).catch(function(err) {
  // There was an error! Handle it.
});
```

### Use a contract at a specific address

If you already have an address for a contract, you can create a new abstraction to represent the contract at that address.

```javascript
var instance = MetaCoin.at("0x1234...");
```

### Sending ether to a contract

You may simply want to send Ether directly to a contract, or trigger a contract's [fallback function](http://solidity.readthedocs.io/en/develop/contracts.html#fallback-function). You can do so using one of the following two options.

Option 1: Send a transaction directly to a contract via `instance.sendTransaction()`. This is promisified like all available contract instance functions, and has the same API as `web3.eth.sendTransaction` but without the callback. The `to` value will be automatically filled in for you if not specified.

```javascript
instance.sendTransaction({...}).then(function(result) {
  // Same transaction result object as above.
});
```

Option 2: There's also shorthand for just sending Ether directly:

```javascript
instance.send(web3.toWei(1, "ether")).then(function(result) {
  // Same result object as above.
});
```

## Further reading

The contract abstractions provided by Truffle contain a wealth of utilities for making interacting with your contracts easy. Check out the [truffle-contract](https://github.com/trufflesuite/truffle-contract) documentation for tips, tricks and insights.
