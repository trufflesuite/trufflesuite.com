# Variable-level inspection: Going deeper with the Truffle Solidity debugger

<p class="alert alert-info">
<strong>Note</strong>: This tutorial requires Truffle version 4.1 or newer.
</p>

The integrated Solidity debugger in Truffle is a powerful tool for inspecting your contracts. 

When initially released, the debugger had the ability to inspect the current THING, but could not get more granular than that. VERIFY THIS.

But development has continued apace, and new functionality has been added to make your contract inspection more powerful. Specifically, **you now have the ability to do variable-level inspection on your contracts**. With this, you can know exactly the state of your variables at every given point in the instruction list, giving you a much greater ability to truly inhabit the current state of your contracts, and making debugging a breeze.

In this tutorial, we're going to take a look at a simple contract and inspect it using the Truffle Solidity debugger. We'll investigate three scenarios

1. A working contract
1. A working contract with unexpected output
1. A broken contract (exhibiting a `revert`)

## A basic smart contract

The Fibonacci sequence is an integer sequence where each successive number in the sequence is the sum of the two previous numbers.

With the first two numbers set to 1, you can determine every number in the sequence through iteration.

The Fibonacci sequence is found in certain areas of nature, such as governing the the arrangement of leaves on branches. It's related to the "golden ratio", which shows up IN ALL SORTS OF PLACES.

IMAGE

Generating the Fibonacci sequence with a smart contract can show off the debugger and its variable-level inspection without getting too boggedd down in details. Let's do it.


1. Create a new project directory called `fibonacci` and change into it.

   ```shell
   mkdir fibonacci
   cd fibonacci
   ```

1. Create a bare truffle project:

   ```shell
   truffle init
   ```

1. In the `contracts/` directory, create a file named `Fibonacci.sol` and add the following content:

   ```
   CODE
   CODE
   CODE
   CODE
   CODE
   CODE
   ```

   Let's take a look at this contract to see what's going on with it:

   * First, we see the standard `pragma` declaration, which states that the contract s compatible with any 0.4.x version of Solidity newer than 0.4.21.
   * The contract name is called "Fibonacci".
   * We're defining an array of integers called `fibseries`. This will house our Fibonacci series. Note that the variable declaration is happening *outside* of any function, and therefore the array will be saved in storage (instead of memory), provoking a transaction to occur when the contract is run.
   * The function is called `generateFib` and takes a single argument, which is the number of integers in the sequence to generate.
   * The next two commands add an element each to the array via the `.push()` METHOD. DETAILS ABOUT WHY PUSH. This starts the sequence with the number 1 twice.
   * The for loop iterates through the rest of the array (as determined by the integer `n`) filling each entry with the appropriate value.

1. Inside the `migrations/` directory of your project, create a file called `2_deploy_contracts.js` and populate it with the following content:

   ```javascript
   var SimpleStorage = artifacts.require("Fibonacci");

   module.exports = function(deployer) {
     deployer.deploy(Fibonacci);
   };
   ```

   This file allows us to deploy the `Fibonacci` contract (shown above) to the blockchain.

1. Now launch [Ganache](/ganache). This will be the personal blockchain we'll use to deploy our contract.

   <p class="alert alert-info">
     <strong>Note</strong>: You can also run this tutorial with `truffle develop` and the results will be the same.
   </p>

1. In the root of your project, open your `truffle.js` file and add the following content:

   ```javascript
   module.exports = {
     networks: {
       development: {
         host: "127.0.0.1",
         port: 7545,
         network_id: "*"
       }
     }
   };
   ```

   This allows us to connect to Ganache.

1. Launch the Truffle console: (LINK TO DOCS)

   ```shell
   truffle console
   ```

   You will see a prompt:

   ```shell
   truffle(development)>
   ```

   We'll run all of our commands from here.

1. Compile the contract:

   ```shell
   compile
   ```

   You should see the following output:

   ```shell
   Compiling .\contracts\Fibonacci.sol...
   Compiling .\contracts\Migrations.sol...
   Writing artifacts to .\build\contracts
   ```

   <p class="alert alert-info">
     <strong>Note</strong>: Make sure to examine the output for any errors or warnings.
   </p>

1. Migrate the contract to our blockchain. 

   ```shell
   migrate
   ``` 

   You will see output that looks like this, though the addresses and transaction IDs will be different:

   ```shell
   Using network 'development'.

   Running migration: 1_initial_migration.js
     Replacing Migrations...
     ... 0xd29465deee7a5d60aed89520807432ef8a2fbbb665611882277ec8ca6fc9c622
     Migrations: 0x5cc77b19b8e14e4d6074562bdbe1e13e1b793693
   Saving successful migration to network...
     ... 0xba700ad46880ab2a9bdd961e66c9313fc541f91c439243df6ab2b97920cf2c4a
   Saving artifacts...
   Running migration: 2_deploy_contracts.js
     Replacing Fibonacci...
     ... 0xed0d1b736e948d926ee31f959b013f67d71e08f294a87e86e41ccbd8a62ce908
     Fibonacci: 0xa3f4063ffbdc5cfd8ecbd99424378a5f056eb81d
   Saving successful migration to network...
     ... 0xcaeb44f5e28689c29cb3189c7b42fa1094021b4e5008f720fef2f9b867e6be23
   Saving artifacts...
   ```


## Interacting with the basic smart contract

Our contract is now on the blockchain. Ganache has automatically mined the transactions that came from the contract call and creation, as you can see by clicking the "Transactions" button in Ganache

IMAGE

Now it's time to interact with the contract. First we'll check to make sure that it's working.

1. In the Truffle console, enter the following command:

   ```shell
   Fibonacci.deployed().then(function(instance){return instance.generateFib(10);});
   ```

   Before we run the command, let's take a look at it in greater detail. Displayed in a more easily-readable manner, it reads:

   ```
   Fibonacci.deployed().then(function(instance) {
     return instance.generateFib(10);
   });
   ```

   This command uses JavaScript promises LINK, DEF ABOUT PROMISES. Specifically, the command says that given a deployed version (WRONG WORD?) of the Fibonacci contract, run an instance of that contract, and then run the `generateFib` functionfrom that contract, passing it the argument `10`.

   VERIFY THIS

1. Run the above command. A transaction will be created on the blockchain because our array that holds the generated Fibonacci sequence is in storage. Because of this, the output of the console will be the transaction details, which will look similar to this:

   ```shell
      { tx: '0x7760505a1ffeae15ff212e69e688e06a4428bd6d51a3ed3cde881f76acc9dce7',
     receipt:
      { transactionHash: '0x7760505a1ffeae15ff212e69e688e06a4428bd6d51a3ed3cde881f76acc9dce7',
        transactionIndex: 0,
        blockHash: '0xe838ed8455f8d9caa8739a35e75dc25f931eb8fda550fe6c7844671cb571f0d8',
        blockNumber: 5,
        gasUsed: 302314,
        cumulativeGasUsed: 302314,
        contractAddress: null,
        logs: [],
        status: '0x01',
        logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' },
     logs: [] }
   ```

   The important part of this output for us is the transaction ID (listed as the value of `tx:`). Because even though we've run our function, we don't actually know what happened. Did it work correctly? Did something unexpected happen? We'll need the Truffle Solidity debugger to find out.

## Debugging a transaction

You can debug a transaction in the Truffle console by typing `debug <transactionID>`. We'll now do just that.

1. Type `debug` and pass the value of `tx:` found in your transaction details. For example:

   ```shell
   debug 0x7760505a1ffeae15ff212e69e688e06a4428bd6d51a3ed3cde881f76acc9dce7
   ```
   <p class="alert alert-warning">
     <strong>Note</strong>: Your transaction ID will be different. Do not copy the above example exactly.
   </p>


   This will enter the debugger. You will see the following output:

   
   ```shell
   Gathering transaction data...

   Addresses affected:
    0xa3f4063ffbdc5cfd8ecbd99424378a5f056eb81d - Fibonacci

   Commands:
   (enter) last command entered (step next)
   (o) step over, (i) step into, (u) step out, (n) step next
   (;) step instruction, (p) print instruction, (h) print this help, (q) quit
   (b) toggle breakpoint, (c) continue until breakpoint
   (+) add watch expression (`+:<expr>`), (-) remove watch expression (-:<expr>)
   (?) list existing watch expressions
   (v) print variables and values, (:) evaluate expression - see `v`


   Fibonacci.sol:

   1: pragma solidity ^0.4.21;
   2:
   3: contract Fibonacci {
      ^^^^^^^^^^^^^^^^^^^^

   debug(development:0x7760505a...)>
   ```

   Let's examine what's going on here.

