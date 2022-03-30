---
title: Debugging an Example Smart Contract

---

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

```solidity
pragma solidity ^0.8.10;

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

- Allows you to set a variable (`myVariable`) to a particular integer value
- Allows you to query that variable to get the selected value

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

   ```solidity
   pragma solidity ^0.8.10;

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

   module.exports = function (deployer) {
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
   Starting migrations...
   ======================
   > Network name:    'develop'
   > Network id:      5777
   > Block gas limit: 6721975 (0x6691b7)

   # 1_initial_migration.js

   Deploying 'Migrations'

   ---

   > transaction hash: 0xbaf1963942bd99e949a966c16d204c4786fdbfde096f5fed0ec4c82e7b85aff5
   > ...
   > total cost: 0.000497708 ETH

   > Saving migration to chain.
   > Saving artifacts

   ---

   > Total cost: 0.000497708 ETH

   # 2_deploy_contracts.js

   Deploying 'SimpleStorage'

   ---

   > transaction hash: 0xf4bf0a56cff1e1e5c121a3b1688a0103f12b8c45c4ed99818d160a1e3cc064f1
   > ...
   > total cost: 0.000251306 ETH

   > Saving migration to chain.
   > Saving artifacts

   ---

   > Total cost: 0.000251306 ETH

   # Summary

   > Total deployments: 2
   > Final cost: 0.000749014 ETH

   - Fetching solc version list from solc-bin. Attempt #1
   - Blocks: 0 Seconds: 0
   - Saving migration to chain.
   - Blocks: 0 Seconds: 0
   - Saving migration to chain.
   ```

## Interacting with the basic smart contract

The smart contract is now deployed to a test network via `truffle develop`, which launches a [console](/docs/truffle/getting-started/using-truffle-develop-and-the-console) against [Ganache](/ganache), a local development blockchain built right into Truffle.

We next want to interact with the smart contract to see how it works when working correctly. We'll interact using the `truffle develop` console.

<p class="alert alert-info">
<strong>Note</strong>: If you're wondering why we didn't need to mine to get the transaction to be secured, the Truffle Develop console already takes care of that for us. If using a different network, you'll need to make sure you mine to get the transaction on the blockchain.
</p>

1. In the console where `truffle develop` is running, run the following command:

   ```javascript
   SimpleStorage.deployed()
     .then(function (instance) {
       return instance.get.call();
     })
     .then(function (value) {
       return value.toNumber();
     });
   ```

   This command looks at the SimpleStorage contract, and then calls the `get()` function as defined inside it. It then returns the output, which is usually rendered as a string, and converts it to a number:

   ```shell
   0
   ```

   This shows us that our variable, `myVariable`, is set to `0`, even though we haven't set this variable to any value (yet). This is because **variables with integer types are automatically populated with the value of zero in Solidity**, unlike other languages where it might be `NULL` or `undefined`.

1. Now let's run a transaction on our contract. We'll do this by running the `set()` function, where we can set our variable value to some other integer. Run the following command:

   ```javascript
   SimpleStorage.deployed().then(function (instance) {
     return instance.set(4);
   });
   ```

   This sets the variable to `4`. The output shows some information about the transaction, including the transaction ID (hash), transaction receipt, and any event logs that were triggered during the course of the transaction:

   ```javascript
   {
     tx: '0x3af6c0644b34cfb60b00d352212da19ba425dd70d9175380cc709cd5020bc06b',
     receipt: {
       transactionHash: '0x3af6c0644b34cfb60b00d352212da19ba425dd70d9175380cc709cd5020bc06b',
       transactionIndex: 0,
       blockHash: '0x243abc6a762a89c526256833c38e1ce3fd166dffeaff721f55e31cff89c719d9',
       blockNumber: 5,
       from: '0x8e0128437dc799045b9c24da41eda77f0dea281b',
       to: '0x30775260f639d51a837b094cc9f66dc1426f3efb',
       gasUsed: 41602,
       cumulativeGasUsed: 41602,
       contractAddress: null,
       logs: [],
       status: true,
       logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
       rawLogs: []
     },
     logs: []
   }
   ```

   Most important to us is the transaction ID (listed here both as `tx` and as `transactionHash`). We'll need to copy that value when we start to debug.

   <p class="alert alert-info">
   <strong>Note</strong>: Your transaction IDs will likely be different from what is listed here.
   </p>

1. To verify that the variable has changed values, run the `get()` function again:

   ```javascript
   SimpleStorage.deployed()
     .then(function (instance) {
       return instance.get.call();
     })
     .then(function (value) {
       return value.toNumber();
     });
   ```

   The output should look like this:

   ```shell
   4
   ```

## Debugging errors

The above shows how the contract _should_ work. Now, we will introduce some small errors to the contract and redeploy it. We will see how the issues present themselves, and also **use Truffle's built-in debug feature to fix the issues**.

We will look at the following issues:

<!-- - An infinite loop -->

- Invalid error check
- No error, but a function isn't operating as desired

<!-- REMOVED THIS EXAMPLE UNTIL https://github.com/trufflesuite/truffle/issues/4542 IS RESOLVED -->
<!-- ### Issue #1: An infinite loop

On the Ethereum blockchain, transactions cannot be set to run forever.

A transaction can run up until its gas limit is reached. Once that happens, the transaction will error out, and an "out of gas" error will be returned.

Since gas is priced in ether, this could have real-world financial implications. So fixing an out-of-gas error is critical.

#### Introducing the error

An infinite loop is easy to create.

1. Open `Store.sol` from the `contracts/` directory in a text editor.

1. Replace the `set()` function with the following:

   ```solidity
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

   ```javascript
   SimpleStorage.deployed().then(function (instance) {
     return instance.set(4);
   });
   ```

   An error will display:

   ```
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

   ```solidity
   Gathering transaction data...

   Addresses affected:
     0x377bbcae5327695b32a1784e0e13bedc8e078c9c - SimpleStorage

   Commands:
   (enter) last command entered (step next)
   (o) step over, (i) step into, (u) step out, (n) step next
   (;) step instruction, (p) print instruction, (h) print this help, (q) quit

   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   1: pragma solidity ^0.8.10;
   2:
   3: contract SimpleStorage {
      ^^^^^^^^^^^^^^^^^^^^^^^

   debug(develop:0xe4933407...)>
   ```

   This is an interactive console. You can use the commands listed to interact with the code in different ways.

1. The most common way to interact with the code is to "step next", which steps through the code one instruction at a time. Do this by pressing `Enter` or `n`:

   The output is as follows:

   ```solidity
   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   4:   uint myVariable;
   5:
   6: function set(uint x) public {
      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   ```

   Notice that the program has moved to the next instruction, located on line 6. (The carets point to the exact part of the instruction taking place.)

1. Press `Enter` again to step to the next instruction:

   ```solidity
   Store.sol | 0x377bbcae5327695b32a1784e0e13bedc8e078c9c:

   5:
   6: function set(uint x) public {
   7:   while(true) {
        ^^^^^^^^^^^^
   ```

1. Keep pressing Enter:

   ```solidity
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

1. Type `q` to exit the debugger. -->

### Issue #1: An invalid error check


1. Type `q` to exit the debugger.

### Issue #2: An invalid error check

>>>>>>> f596fb87 (Remove merge commit artifacts)
Smart contracts can use statements like `assert()` to ensure that certain conditions are met. These can conflict with the state of the contract in ways that are irreconcilable.

Here we will introduce such a condition, and then see how the debugger can find it.

#### Introducing the error

1. Open `Store.sol` again.

1. Replace the `set()` function with the following:

   ```solidity
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

   ```javascript
   SimpleStorage.deployed().then(function (instance) {
     return instance.set(4);
   });
   ```

   You will see an error:

   ```
   Uncaught Error: Returned error: VM Exception while processing transaction: revert
    at evalmachine.<anonymous>:0:66
   ```

   This means that we have a problem on our hands.

1. In the log window, note the transaction ID with that error in the data key:

   ```shell
   data: {
     '0x51f9cce23b57b15fafb13defc52225b1da2e29c5ce15f40a8ef793d2fff1546b': {
     error: 'revert',
     program_counter: 346,
     ...
   ```

#### Debugging the issue

1. Copy the transaction ID and use it as an argument to the `debug` command:

   ```shell
   debug 0x51f9cce23b57b15fafb13defc52225b1da2e29c5ce15f40a8ef793d2fff1546b
   ```

   <p class="alert alert-info">
   <strong>Note</strong>: Again, your transaction ID will be different from what is listed here.
   </p>

   Now we are back in the debugger:

   ```solidity
   Store.sol:

   1: pragma solidity ^0.8.10;
   2:
   3: contract SimpleStorage {
      ^^^^^^^^^^^^^^^^^^^^^^^^

   debug(develop:0x51f9cce2...)>
   ```

1. Press `Enter` a few times to step through the code. Eventually, the debugger will halt with an error message:

   ```solidity
   Store.sol:

   5:
   6:   function set(uint x) public {
   7:     assert(x==0);
         ^^^^^^^^^^^^

   debug(develop:0x51f9cce2...)>
   Transaction has halted; cannot advance.
   ```

   **It is this last event that is triggering the error.** You can see that it is the `assert()` that is to blame.

### Issue #2: A function isn't operating as desired

Sometimes, an error isn't a true error, in that it doesn't cause a problem at runtime, but instead is just doing something that you don't intend it to do.

Take for example an event that would run if our variable was odd and another event that would run if our variable was even. **If we accidentally swapped this conditional so that the opposite function would run, it wouldn't cause an error; nevertheless, the contract would act unexpectedly.**

Once again, we can use the debugger to see where things go wrong.

#### Introducing the error

1. Open `Store.sol` again.

1. Replace the `set()` function with the following:

   ```solidity
   event Odd();

   event Even();

   function set(uint x) public {
     myVariable = x;
     if (x % 2 == 0) {
       emit Odd();
     } else {
       emit Even();
     }
   }
   ```

   This code introduces two dummy events, `Odd()` and `Even()` that are triggered based on a conditional that checks whether `x` is divisible by `2`.

   But notice that we have the results flipped. If `x` is divisible by `2`, the `Odd()` event will run.

#### Testing the contract

Just as before, we'll reset the contract on the blockchain.

1. In the Truffle Develop console, update the contract:

   ```shell
   migrate --reset
   ```

   You will see both the compiler output and the migration output.

1. Now we are ready to test the new transaction. Run the same command as above:

   ```javascript
   SimpleStorage.deployed().then(function (instance) {
     return instance.set(4);
   });
   ```

   **Note that there is no error here.** The response is given as a transaction ID with details:

   ```javascript
   {
     tx: '0x31d64ba6ed196d12b634b1ea7cbe0612b3dc623ee6d25f0fc59091e1e19dfe08',
     receipt: {
       transactionHash: '0x31d64ba6ed196d12b634b1ea7cbe0612b3dc623ee6d25f0fc59091e1e19dfe08',
       transactionIndex: 0,
       blockHash: '0x4ef7b0987604e6ca92382d75d16e746de2415fa482d7cfc85d9183e966d5beaf',
       blockNumber: 5,
       from: '0x8e0128437dc799045b9c24da41eda77f0dea281b',
       to: '0x30775260f639d51a837b094cc9f66dc1426f3efb',
       gasUsed: 42597,
       cumulativeGasUsed: 42597,
       contractAddress: null,
       logs: [ [Object] ],
       status: true,
       logsBloom: '0x000...',
       rawLogs: [ [Object] ]
     },
     logs: [
       {
         logIndex: 0,
         transactionIndex: 0,
         transactionHash: '0x31d64ba6ed196d12b634b1ea7cbe0612b3dc623ee6d25f0fc59091e1e19dfe08',
         blockHash: '0x4ef7b0987604e6ca92382d75d16e746de2415fa482d7cfc85d9183e966d5beaf',
         blockNumber: 5,
         address: '0x30775260F639D51a837b094Cc9f66DC1426f3EFB',
         type: 'mined',
         id: 'log_8a20539f',
         event: 'Odd',
         args: [Result]
       }
     ]
   }
   ```

   But notice the logs of the transaction show the event `Odd`. That's wrong, and so our job is to find out why that's being invoked.

#### Debugging the contract

1. Copy that transaction ID and use it as an argument with the `debug` command:

   ```shell
   debug 0x31d64ba6ed196d12b634b1ea7cbe0612b3dc623ee6d25f0fc59091e1e19dfe08
   ```

   <p class="alert alert-info">
   <strong>Note</strong>: Again, your transaction ID will be different from what is listed here.
   </p>

   You will enter the debugger as before.

1. Press `Enter` multiple times to cycle through the steps. Eventually you will see that the conditional leads to the `Odd()` event:

   ```solidity
   Store.sol:

   9:   function set(uint x) public {
   10:     myVariable = x;
   11:     if (x % 2 == 0) {
           ^^^^^^^^^^^^^^^^^

   debug(develop:0x31d64ba6...)> n

   Store.sol:

   10:     myVariable = x;
   11:     if (x % 2 == 0) {
   12:       emit Odd();
                  ^^^^^

   debug(develop:0x31d64ba6...)>

   ```

   **The problem is revealed.** The conditional is leading to the wrong event.

## Conclusion

With the ability to debug your contracts directly within Truffle, you have even more power at your hands to make your smart contracts rock-solid and ready to deploy. Make sure to read more about Truffle Develop console and the debugger in the docs. If you have any trouble, please don't hesitate to open an issue on [Github](https://github.com/trufflesuite/trufflesuite.com/issues)!

Happy debugging!
