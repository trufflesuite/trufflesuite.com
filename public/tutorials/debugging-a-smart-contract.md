# Debugging a smart contract

<p class="alert alert-info">
<strong>Note</strong>: This tutorial requires Truffle version 4.0 or newer.
</p>

<!-- TODO: How is the gas limit set? When/how does an out of gas error occur? -->

<!-- TODO: Link to docs -->

A smart contract in Ethereum is just code. Unlike the "paper" contracts that you find elsewhere, this contract needs to make sense in a very precise manner.

(And that's a good thing. Imagine how much clearer real-world contracts would be if they needed to "compile"?)

If our contracts are not coded correctly, our transactions may fail, which can result in the loss of ether (in the form of gas), not to mention wasted time and effort.

**Luckily, Truffle (as of version 4) has a built in debugger for stepping through your code.** So when something goes wrong, you can find out exactly what it was, and fix it promptly.

In this tutorial, we will migrate a basic contract to a test blockchain, introduce some errors into it, and solve each one through the use of the built-in Truffle debugger.



## A basic smart contract

One of the most basic, non-trivial, types of smart contract is a **simple storage contract**. (This example was adapted from the [Solidity documentation](https://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html).)

```javascript
pragma solidity ^0.4.17;

contract SimpleStorage {
  uint myVariable;

  function set(uint x) public {
    myVariable = x;
  }

  function get() constant public returns (uint) {
    return myVariable;
  }
}
```

This contract does two things:

* Allows you to set a variable (`myVariable`) to a particular integer value
* Allows you to query that variable to get the selected value

This isn't a very interesting contract, but that's not the point here. We want to see what happens when things go wrong.

First, let's set up our environment.

## Deploying the basic smart contract

1. Create a new directory where we will house our contract locally:

   ```shell
   mkdir simple-storage
   cd simple-storage
   ```

1. Create a bare Truffle project:

   ```shell
   truffle init
   ```

   This will create directories such as `contracts/` and `migrations/`, and populate them with files we will use when we deploy our contract to the blockchain.

1. Inside the `contracts/` directory, create a file called `Store.sol` with the following content:

   ```javascript
   pragma solidity ^0.4.17;

   contract SimpleStorage {
     uint myVariable;

     function set(uint x) public {
       myVariable = x;
     }

     function get() constant public returns (uint) {
       return myVariable;
     }
   }
   ```

   This is the contract that we will be debugging. While the full details of this file are beyond the scope of this tutorial, note that there is a contract named `SimpleStorage` that contains a numeric variable `myVariable` and two functions: `set()` and `get()`. The first function stores a value in that variable and the second queries that value.

1. Inside the `migrations/` directory, create a file called `2_deploy_contracts.js` and populate it with the following content:

   ```javascript
   var SimpleStorage = artifacts.require("SimpleStorage");

   module.exports = function(deployer) {
     deployer.deploy(SimpleStorage);
   };
   ```

   This file is the directive that allows us to deploy the `SimpleStorage` contract to the blockchain.

1. On the terminal, compile the smart contract:

   ```shell
   truffle compile
   ```

1. Open a second terminal and run `truffle develop` to start a development blockchain built directly into Truffle that we can use to test our contract:

   ```shell
   truffle develop
   ```

   The console will display a prompt `truffle(develop)>`. From here, unless otherwise specified, all commands will be typed on this prompt.

1. With the develop console up and running, we can now deploy our contracts to the blockchain by running our migrations:

   ```shell
   migrate
   ```

   The response should look something like below, though the specific IDs will differ:

   ```shell
    Running migration: 1_initial_migration.js
      Replacing Migrations...
      ... 0xe4f911d95904c808a81f28de1e70a377968608348b627a66efa60077a900fb4c
      Migrations: 0x3ed10fd31b3fbb2c262e6ab074dd3c684b8aa06b
    Saving successful migration to network...
      ... 0x429a40ee574664a48753a33ea0c103fc78c5ca7750961d567d518ff7a31eefda
    Saving artifacts...
    Running migration: 2_deploy_contracts.js
      Replacing SimpleStorage...
      ... 0x6783341ba67d5c0415daa647513771f14cb8a3103cc5c15dab61e86a7ab0cfd2
      SimpleStorage: 0x377bbcae5327695b32a1784e0e13bedc8e078c9c
    Saving successful migration to network...
      ... 0x6e25158c01a403d33079db641cb4d46b6245fd2e9196093d9e5984e45d64a866
    Saving artifacts... 
   ```

## Interacting with the basic smart contract

The smart contract is now deployed to a test network via `truffle develop`, which launches a [console](/docs/getting_started/console) against [Ganache](/ganache), a local development blockchain built right into Truffle.

We next want to interact with the smart contract to see how it works when working correctly. We'll interact using the `truffle develop` console.

<p class="alert alert-info">
<strong>Note</strong>: If you're wondering why we didn't need to mine to get the transaction to be secured, the Truffle Develop console already takes care of that for us. If using a different network, you'll need to make sure you mine to get the transaction on the blockchain.
</p>

1. In the console where `truffle develop` is running, run the following command:

   ```shell
   SimpleStorage.deployed().then(function(instance){return instance.get.call();}).then(function(value){return value.toNumber()});
   ```

   This command looks at the SimpleStorage contract, and then calls the `get()` function as defined inside it. It then returns the output, which is usually rendered as a string, and converts it to a number:

   ```shell
   0
   ```

   This shows us that our variable, `myVariable`, is set to `0`, even though we haven't set this variable to any value (yet). This is because **variables with integer types are automatically populated with the value of zero in Solidity**, unlike other languages where it might be `NULL` or `undefined`.

1. Now let's run a transaction on our contract. We'll do this by running the `set()` function, where we can set our variable value to some other integer. Run the following command:

   ```shell
   SimpleStorage.deployed().then(function(instance){return instance.set(4);});
   ```

   This sets the variable to `4`. The output shows some information about the transaction, including the transaction ID (hash), transaction receipt,  and any event logs that were triggered during the course of the transaction:

   ```shell
    { tx: '0x7f799ad56584199db36bd617b77cc1d825ff18714e80da9d2d5a0a9fff5b4d42',
      receipt:
       { transactionHash: '0x7f799ad56584199db36bd617b77cc1d825ff18714e80da9d2d5a0a9fff5b4d42',
         transactionIndex: 0,
         blockHash: '0x60adbf0523622dc1be52c627f37644ce0a343c8e7c8955b34c5a592da7d7c651',
         blockNumber: 5,
         gasUsed: 41577,
         cumulativeGasUsed: 41577,
         contractAddress: null,
         logs: [] },
      logs: [] }   
   ```

   Most important to us is the transaction ID (listed here both as `tx` and as `transactionHash`). We'll need to copy that value when we start to debug.

   <p class="alert alert-info">
   <strong>Note</strong>: Your transaction IDs will likely be different from what is listed here.
   </p>

1. To verify that the variable has changed values, run the `get()` function again:

   ```shell
   SimpleStorage.deployed().then(function(instance){return instance.get.call();}).then(function(value){return value.toNumber()});
   ```

   The output should look like this:

   ```shell
   4
   ```

## Debugging errors

The above shows how the contract *should* work. Now, we will introduce some small errors to the contract and redeploy it. We will see how the issues present itself, and also **use Truffle's built-in debug feature to fix the issues**.

We will look at the following issues:

* An infinite loop
* Invalid error check 
* No error, but a function isn't operating as desired


### Issue #1: An infinite loop

On the Ethereum blockchain, transactions cannot be set to run forever.

A transaction can run up until its gas limit is reached. Once that happens, the transaction will error out, and an "out of gas" error will be returned.

Since gas is priced in ether, this could have real-world financial implications. So fixing an out-of-gas error is critical.

#### Introducing the error

An infinite loop is easy to create.

1. Open `Store.sol` from the `contracts/` directory in a text editor.

1. Replace the `set()` function with the following:

   ```javascript
   function set(uint x) public {
     while(true) {
       myVariable = x;
     }
   }
   ```

   This function will never terminate, because of the `while(true)` conditional.

#### Testing the contract

The Truffle Develop console has the ability to migrate updated contracts without the need to exit and restart the console. And since the `migrate` command can compile and migrate in one step, we can reset our contract on the blockchain in one step.

1. In the Truffle Develop console, update the contract:

   ```shell
   migrate --reset
   ```

   You will see both the compiler output and the migration output.

1. In order to facilitate error hunting, we will open a second console with logging. This will allow us to, for example, see transaction IDs when a transaction fails. In another terminal window, run the following command:

   ```shell
   truffle develop --log
   ```

   Leave that window for now and return to the first console.

1. Now we are ready to run that transaction. Run the `set()` command from above.

   ```shell
   SimpleStorage.deployed().then(function(instance){return instance.set(4);});
   ```

   An error will display:

   ```shell
   Error: VM Exception while processing transaction: out of gas
   ```

   Moreover, in the console with the logs, you will see more information:

   ```shell
    develop:testrpc eth_sendTransaction +0ms
    develop:testrpc  +1s
    develop:testrpc   Transaction: 0xe493340792ab92b95ac40e43dca6bc88fba7fd67191989d59ca30f79320e883f +2ms
    develop:testrpc   Gas usage: 4712388 +11ms
    develop:testrpc   Block Number: 6 +15ms
    develop:testrpc   Runtime Error: out of gas +0ms
    develop:testrpc  +16ms   
   ```

With our failure and our transaction ID, we can now debug the transaction.

#### Debugging the issue

Truffle contains a built-in debugger. The command to launch this is `debug <Transaction ID>` from the Truffle Develop console, or `truffle debug <Transaction ID>` from the terminal. Let's launch this now.

1. In the Truffle Develop console, copy the transaction ID from the logs console and paste it as the argument in the `debug` command:

   ```shell
   debug 0xe493340792ab92b95ac40e43dca6bc88fba7fd67191989d59ca30f79320e883f
   ```

   <p class="alert alert-info">
   <strong>Note</strong>: Again, your transaction ID will be different from what is listed here.
   </p>


   You will see the following output:

   ```shell
   Gathering transaction data...

   Addresses affected:
     0x377bbcae5327695b32a1784e0e13bedc8e078c9c - SimpleStorage

   Commands:
   (enter) last command entered (step next)
   (o) step over, (i) step into, (u) step out, (n) step next
   (;) step instruction, (p) print instruction, (h) print this help, (q) quit

   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   1: pragma solidity ^0.4.17;
   2:
   3: contract SimpleStorage {
      ^^^^^^^^^^^^^^^^^^^^^^^

   debug(develop:0xe4933407...)>
   ```

   This is an interactive console. You can use the commands listed to interact with the code in different ways.

1. The most common way to interact with the code is to "step next", which steps through the code one instruction at a time. Do this by pressing `Enter` or `n`:

   The output is as follows:

   ```shell
   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   4:   uint myVariable;
   5:
   6: function set(uint x) public {
      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   ```

   Notice that the program has moved to the next instruction, located on line 6. (The carets point to the exact part of the instruction taking place.)

1. Press `Enter` again to step to the next instruction:

   ```shell
   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   5:
   6: function set(uint x) public {
   7:   while(true) {
        ^^^^^^^^^^^^
   ```

1. Keep pressing Enter:

   ```shell
   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   5:
   6: function set(uint x) public {
   7:   while(true) {
              ^^^^

   debug(develop:0xe4933407...)>

   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   5:
   6: function set(uint x) public {
   7:   while(true) {
        ^^^^^^^^^^^^

   debug(develop:0xe4933407...)>

   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   6: function set(uint x) public {
   7:   while(true) {
   8:     myVariable = x;
                       ^

   debug(develop:0xe4933407...)>

   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   6: function set(uint x) public {
   7:   while(true) {
   8:     myVariable = x;
          ^^^^^^^^^^

   debug(develop:0xe4933407...)>

   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   6: function set(uint x) public {
   7:   while(true) {
   8:     myVariable = x;
          ^^^^^^^^^^^^^^

   debug(develop:0xe4933407...)>

   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   5:
   6: function set(uint x) public {
   7:   while(true) {
        ^^^^^^^^^^^^
   ```

   Notice that the steps eventually repeat. In fact, pressing `Enter` over and over will repeat those transactions forever (or at least until the transaction runs out of gas). **This tells you where the problem is.**

1. Type `q` to exit the debugger.


### Issue #2: An invalid error check

Smart contracts can use statements like `assert()` to ensure that certain conditions are met. These can conflict with the state of the contract in ways that are irreconcilable.

Here we will introduce such a condition, and then see how the debugger can find it.

#### Introducing the error

1. Open `Store.sol` again.

1. Replace the `set()` function with the following:

   ```javascript
   function set(uint x) public {
     assert(x == 0);
     myVariable = x;
   }
   ```

   This is the same as the original version, but with an `assert()` function added, testing to make sure that `x == 0`. This will be fine until we set that value to something else, and then we'll have a problem.

#### Testing the contract

Just as before, we'll reset the contract on the blockchain.

1. In the Truffle Develop console, reset the contract on the blockchain to its initially deployed state:

   ```shell
   migrate --reset
   ```

1. Now we are ready to test the new transaction. Run the same command as above:

   ```shell
   SimpleStorage.deployed().then(function(instance){return instance.set(4);});
   ```

   You will see an error:

   ```shell
   Error: VM Exception while processing transaction: invalid opcode
   ```

   This means that we have a problem on our hands.

1. In the log window, note the transaction ID with that error.

#### Debugging the issue

1. Copy the transaction ID and use it as an argument to the `debug` command:

   ```shell
   debug 0xe493340792ab92b95ac40e43dca6bc88fba7fd67191989d59ca30f79320e883f
   ```

   <p class="alert alert-info">
   <strong>Note</strong>: Again, your transaction ID will be different from what is listed here.
   </p>


   Now we are back in the debugger:

   ```shell
   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   1: pragma solidity ^0.4.17;
   2:
   3: contract SimpleStorage {
      ^^^^^^^^^^^^^^^^^^^^^^^

   debug(develop:0xe4933407...)>
   ```

1. Press `Enter` a few times to step through the code. Eventually, the debugger will halt with an error message:

   ```shell

   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   5:
   6:   function set(uint x) public {
   7:     assert(x == 0);
          ^^^^^^^^^^^^^^

   debug(develop:0x7e060037...)>

   Transaction halted with a RUNTIME ERROR.

   This is likely due to an intentional halting expression, like 
   assert(), require() or revert(). It can also be due to out-of-gas
   exceptions. Please inspect your transaction parameters and 
   contract code to determine the meaning of this error.
   ```

   **It is this last event that is triggering the error.** You can see that it is the `assert()` that is to blame.


### Issue #3: A function isn't operating as desired

Sometimes, an error isn't a true error, in that it doesn't cause a problem at runtime, but instead is just doing something that you don't intend it to do.

Take for example an event that would run if our variable was odd and another event that would run if our variable was even. **If we accidentally swapped this conditional so that the opposite function would run, it wouldn't cause an error; nevertheless, the contract would act unexpectedly.**

Once again, we can use the debugger to see where things go wrong.

#### Introducing the error

1. Open `Store.sol` again.

1. Replace the `set()` function with the following:

   ```javascript
   event Odd();

   event Even();

   function set(uint x) public {
     myVariable = x;
     if (x % 2 == 0) {
       Odd();
     } else {
       Even();
     }
   }
   ```
   
   This code introduces two dummy events, `Odd()` and `Even()` that are trigged based on a conditional that checks whether `x` is divisible by `2`.

   But notice that we have the results flipped. If `x` is divisible by `2`, the `Odd()` event will run.

#### Testing the contract

Just as before, we'll reset the contract on the blockchain.

1. In the Truffle Develop console, update the contract:

   ```shell
   migrate --reset
   ```

   You will see both the compiler output and the migration output.

1. Now we are ready to test the new transaction. Run the same command as above:

   ```shell
   SimpleStorage.deployed().then(function(instance){return instance.set(4);});
   ```

   **Note that there is no error here.** The response is given as a transaction ID with details:

   ```shell
   { tx: '0x7f799ad56584199db36bd617b77cc1d825ff18714e80da9d2d5a0a9fff5b4d42',
     receipt:
      { transactionHash: '0x7f799ad56584199db36bd617b77cc1d825ff18714e80da9d2d5a0a9fff5b4d42',
        transactionIndex: 0,
        blockHash: '0x08d7c35904e4a93298ed5be862227fcf18383fec374759202cf9e513b390956f',
        blockNumber: 5,
        gasUsed: 42404,
        cumulativeGasUsed: 42404,
        contractAddress: null,
        logs: [ [Object] ] },
     logs:
      [ { logIndex: 0,
          transactionIndex: 0,
          transactionHash: '0x7f799ad56584199db36bd617b77cc1d825ff18714e80da9d2d5a0a9fff5b4d42',
          blockHash: '0x08d7c35904e4a93298ed5be862227fcf18383fec374759202cf9e513b390956f',
          blockNumber: 5,
          address: '0x377bbcae5327695b32a1784e0e13bedc8e078c9c',
          type: 'mined',
          event: 'Odd',
          args: {} } ] }
   ```

   But notice the logs of the transaction show the event `Odd`. That's wrong, and so our job is to find out why that's being invoked.

#### Debugging the contract

1. Copy that transaction ID and use it as an argument with the `debug` command:

   ```shell
   debug 0x7f799ad56584199db36bd617b77cc1d825ff18714e80da9d2d5a0a9fff5b4d42
   ```

   <p class="alert alert-info">
   <strong>Note</strong>: Again, your transaction ID will be different from what is listed here.
   </p>

   You will enter the debugger as before.

1. Press `Enter` multiple times to cycle through the steps. Eventually you will see that the conditional leads to the `Odd()` event:

   ```shell
   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   10:   function set(uint x) public {
   11:     myVariable = x;
   12:     if (x % 2 == 0) {
           ^^^^^^^^^^^^^^^^

   debug(develop:0x7f799ad5...)>

   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   11:     myVariable = x;
   12:     if (x % 2 == 0) {
   13:       Odd();
             ^^^^^

   debug(develop:0x7f799ad5...)>
   ```

   **The problem is revealed.** The conditional is leading to the wrong event.


## Conclusion

With the ability to debug your contracts directly within Truffle, you have even more power at your hands to make your smart contracts rock-solid and ready to deploy. Make sure to read more about Truffle Develop console and the debugger in the docs. If you have any questions, please join our [Gitter channel](https://gitter.im/ConsenSys/truffle) and ask there.

Happy debugging!
