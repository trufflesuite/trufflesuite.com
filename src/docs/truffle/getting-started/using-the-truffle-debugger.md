---
title: Using the Truffle Debugger
layout: docs.hbs
---
# Using the Truffle Debugger

Truffle includes an integrated debugger so that you can debug transactions made against your contracts. This debugger looks and feels like existing command line debuggers available for traditional development environments.

## Overview

<p class="alert alert-info m-t-2">
<i class="far fa-info-circle"></i> <strong>
New in Truffle v5.1: <code>truffle test --debug</code>.
</strong>
Set breakpoints in your JavaScript tests with the new <code>debug()</code> global!
<a href="#in-test-debugging">See below</a>.
</p>

<p class="alert alert-info m-t-2">
<i class="far fa-info-circle"></i> <strong>
New in Truffle v5.1.29: <code>truffle debug --fetch-external</code>.
</strong>
Debug transactions involving contracts not in your project that are verified on <a href="https://etherscan.io/">Etherscan</a>!  (And as of v5.1.32, it works with <a href="https://github.com/ethereum/sourcify">Sourcify</a> too!)
<a href="#debugging-external-contracts-with-verified-source">See below</a>.
</p>

<p class="alert alert-info m-t-2">
<i class="far fa-info-circle"></i> <strong>
New in Truffle v5.4.26: <code>truffle debug --url &lt;provider_url&gt;</code>.
</strong>
Debug transactions without needing a Truffle project or config!
<a href="#debugging-outside-of-a-truffle-project">See below</a>.
</p>


Debugging a transaction on the blockchain is different than debugging traditional applications (for instance, applications written in C++ or Javascript). When debugging a transaction on the blockchain, you're not running the code in real-time; instead, you're stepping over the historical execution of that transaction, and mapping that execution onto its associated code. This gives us many liberties in debugging, in that we can debug any transaction, any time, so long as we have the code and artifacts for the contracts the transaction interacted with. Think of these code and artifacts as akin to the debugging symbols needed by traditional debuggers.

In order to debug transactions, you'll need the following:

* Truffle 4.0 or above.
* The hash of a transaction on your desired blockchain.  (If you are using the built-in  blockchain and trying to debug a test execution, you may obtain the hash by running `truffle develop --log`.)
* The source code and artifacts the transaction encounters.

Note that it's okay if your desired transaction resulted in an exception or if it ran out of gas. The transaction still exists on chain, and so you can still debug it!

Warning: Debugging a transaction against a contract that was compiled with optimization enabled may not work reliably.

## In-test debugging

Truffle v5.1 and above provides the `truffle test --debug` flag and associated
`debug()` global function, allowing you to interrupt tests to debug specific
operations.

Instead of capturing the transaction hash as described below, simply wrap
any contract operation with `debug()`, like so:

```javascript
it("should succeed", async function() {
  // wrap what you want to debug with `debug()`:
  await debug( myContract.myFunction(accounts[1], { from: accounts[0] }) );
  //           ^^^^^^^^^^^^^^^^^^ wrap contract operation ^^^^^^^^^^^^^^
});
```

Then, run `truffle test --debug`. Truffle will compile your sources and run
your tests as normal until reaching the operation in question. At this point,
Truffle will interrupt the normal test flow and start the debugger, allowing
you to set breakpoints, inspect Solidity variables, etc.

See [Writing tests in JavaScript](../testing/writing-tests-in-javascript)
for more information on `truffle test`, and see
[Interacting with your contracts](/docs/truffle/getting-started/interacting-with-your-contracts)
to learn about contract operations.

<p class="alert alert-warning">
<i class="far fa-exclamation-triangle"></i> <strong>Note</strong>: This feature currently doesn't work with reverted transactions;
until we fix this, you can debug those with direct use of <code>truffle debug</code>.
</p>


### Debugging read-only calls

Running the debugger from inside your JS tests allow additional functionality
beyond which `truffle debug <txHash>` can provide.

Beyond just debugging transactions, in-test debugging allows you to debug
read-only calls as well.

```javascript
it("should get latest result", async function() {
  // wrap what you want to debug with `debug()`:
  const result = await debug( myContract.getResult("latest") );
  //                          ^^^^^ read-only function ^^^^^
});
```

## Command

To use the debugger, gather the transaction you'd like to debug then run the following:

```shell
$ truffle debug <transaction hash>
```

Using a transaction starting with `0x8e5dadfb921dd...` as an example, the command would look as follows:

```shell
$ truffle debug 0x8e5dadfb921ddddfa8f53af1f9bd8beeac6838d52d7e0c2fe5085b42a4f3ca76
```

This will launch the debugging interface described below.

If you simply want to open the debugger to get it ready, so that you can debug a transaction later, you can also simply run:

```shell
$ truffle debug
```

Regardless of how you start the debugger, once it is running you are not limited to debugging only the transaction you launched it with; it is possible to unload the current transaction and load a new one, as described below.

You can specify the network you want to debug on with the `--network` option:

```shell
$ truffle debug [<transaction hash>] --network <network>
```

Also, instead of `--network`, you can use `--url` with the URL of a provider; with this option, you can use Truffle Debugger outside of a Truffle project and without a Truffle config.  This is primarily useful with the [`--fetch-external`](#debugging-external-contracts-with-verified-source) option.

```shell
$ truffle debug [<transaction hash>] --url <provider_url>
```

If you want to debug your [Solidity test contracts](../testing/writing-tests-in-solidity), you can pass the `--compile-tests` option:

```shell
$ truffle debug [<transaction hash>] --compile-tests
```

And with the `--fetch-external` option ([see below](#debugging-external-contracts-with-verified-source)), you can debug contract instances outside your project that have verified source code on [Etherscan](https://etherscan.io/) or [Sourcify](https://github.com/ethereum/sourcify).  When using this option, you must specify a transaction hash to debug, and you will not be able to switch transactions from inside the debugger.

```shell
$ truffle debug <transaction hash> --fetch-external --network <network>
```

<p class="alert alert-info m-t-2">
<i class="far fa-info-circle"></i> <strong>
Faster debugger startup:
</strong>
If your project was not compiled all at once (or under certain other
conditions), the debugger will have to do its own compile of your project on
startup.  This can be very slow.  If you compile your whole project at once,
however, the debugger can likely avoid the initial recompile, speeding up
startup greatly.
</p>

## Debugging external contracts with verified source

If you pass the `--fetch-external` option, the debugger will attempt to download verified source code off of [Etherscan](https://etherscan.io/) and [Sourcify](https://github.com/ethereum/sourcify) for any addresses involved in the transaction that it cannot find source code for in your project.  You can of course debug such transactions without this option, but when stepping through the transaction the external calls to these unrecognized contracts will simply be skipped over.

This option can also be abbreviated `-x`.

If you have an Etherscan API key, you can include it in your configuration file and the debugger will use it when downloading source from Etherscan.  Including this can speed up downloads.

Example:
```javascript
module.exports = {
  /* ... rest of truffle-config.js ... */
  etherscan: {
    apiKey: "0123456789abcdef0123456789abcdef" //replace this with your API key if you have one
  }
}
```

### Debugging outside of a Truffle project

If you are outside of a Truffle project, you can still use `truffle debug` so long as you pass the `--url` option, giving the URL of a provider to connect to.  This is primarily useful with the `--fetch-external` option [described above](#debugging-external-contracts-with-verified-source).

## Debugging interface

Starting the debugger will open an interface familiar to those that have debugged other types of applications. When it starts, you'll see the following:

* A list of addresses either transacted against or created during the course of this transaction.
* A list of available commands for using the debugger.
* And the initial entry point for the transaction, including contract source file and code preview.

The `enter` key is set to perform the last command entered. When the debugger starts, the `enter` key is set to step to the next logical source code element encountered during execution (i.e., the next expression or statement evaluated by the Ethereum virtual machine). At this point you can press `enter` to step through the transaction, or enter one of the available commands to analyze the transaction in more detail. The list of commands is detailed below.

### (o) step over

This command steps over the current line, relative to the position of the statement or expression currently being evaluated in the Solidity source file. Use this command if you don't want to step into a function call or contract creation on the current line, or if you'd like to quickly jump to a specific point in the source file.

### (i) step into

This command steps into the function call or contract creation currently being evaluated. Use this command to jump into the function and quickly start debugging the code that exists there.

### (u) step out

This command steps out of the currently running function. Use this command to quickly get back to the calling function, or end execution of the transaction if this was the entry point of the transaction.

### (n) step next

This command steps to the next logical statement or expression in the source code. For example, evaluating sub expressions will need to occur first before the virtual machine can evaluate the full expression. Use this command if you'd like to analyze each logical item the virtual machine evaluates.

### (;) step instruction

This command allows you to step through each individual instruction evaluated by the virtual machine. This is useful if you're interested in understanding the low level bytecode created by the Solidity source code. When you use this command, the debugger will also print out the stack data at the time the instruction was evaluated.  (If additional data displays have been turned on with the `p` command, those will be shown too.)

You can also use this command with a numerical argument, to step that many times.

### (p) print instruction

This commands prints the current instruction and stack data, but does not step to the next instruction. Use this when you'd like to see the current instruction and stack data after navigating through the transaction with the logical commands described above.

This command can also print locations other than the stack, if you want to view memory, storage, or calldata.  Simply type `p memory` to show memory along with the other information, `p storage` for storage, or `p calldata` for calldata.  Each of these can also be abbreviated, e.g. `p mem`; they can also be combined, e.g. `p mem sto`.

You can also add these extra locations to the default display with `+`; e.g., `p +mem` will make it so that memory will always be displayed when you enter `p` or `;`, and `p -mem` will turn this off.  You can even turn off the stack display with `p -sta`, or force it to display with `p sta`.  All of these options can again be combined.

This command also prints a group of instructions surrounding the current instruction. By default, it prints 3 instructions ahead of and 3 instructions behind the current instruction.  You can configure the number of instructions to be printed with `+` and `-`; e.g., `p +<instructions-ahead> -<instruction-back>` will make it print `instructions-ahead` instructions ahead of and `instructions-back` instructions behind the current instruction. The configured numbers are saved and used for printout afterward.

### (l) print additional source context

This command prints source context surrounding the current source line.  By default, it prints 5 lines ahead of and 3 lines behind the current source line. You can configure the number of source lines to be printed with `+` and `-`; e.g., `l +<lines-ahead> -<lines-back>` will make it print `lines-ahead` lines ahead of and `lines-back` lines behind the current line.  The configured numbers are saved and used for printout afterward.

### (g) turn on generated sources

When using Solidity 0.7.2 or later, you can use this option to allow the debugger to step into the internal assembly routines that Solidity generates.  You can always advance into these with the `;` command, but this option allows the other debugger commands (`n`, `i`, `o`, `u`) to step into these routines as well.

### (G) turn off generated sources

This command undoes the `g` command, returning the debugger to its default behavior with regard to generated sources.

Note that when generated sources are turned off, you can still advance into them with the `;` command; and if a breakpoint is placed in one, continuing with `c` will still stop on such breakpoints.  In addition, once inside such a routine, the other debugger commands (`n`, `i`, `o`, `u`) will advance as normal inside of it; they won't immediately exit it.

### (h) print this help

Print the list of available commands.

### (q) quit

Quit the debugger.

### (r) reset

Reset the debugger to the beginning of the transaction.

### (b) set a breakpoint

This command allows you to set breakpoints for any line in any of your source files (see [examples](#adding-and-removing-breakpoints) below).  These can be given by line number; by relative line number; by line number in a specified source file; or one may simply add a breakpoint at the current point in the code.

You don't need a transaction loaded to set breakpoints, although in that case you will have to specify which source file you mean to set it in.

### (B) remove a breakpoint

This command allows you to remove any of your existing breakpoints, with the same syntax as for adding them (see [example](#adding-and-removing-breakpoints) below).  Type `B all` to remove all breakpoints.

### (c) continue until breakpoint

This command will cause execution of the code to continue until the next breakpoint is reached or the last line is executed.

### (:) evaluate and print expression

This command will evaluate and print the given expression, based on the current variables and their values (see also `v`).

### (+) add watch expression

This command will add a watch on a provided expression, based on the following syntax: `+:<expression>`.

### (-) remove watch expression

This command will remove a watch expression, based on the following syntax: `-:<expression>`.

### (?) list existing watch expressions and breakpoints

This command will display a list of all the current watch expressions and breakpoints.  It will also report whether generated sources are turned on or off.

### (v) display variables

This command will display the current variables and their values, but does not step to the next instruction. Use this when you'd like to see the current variables and their values after navigating through the transaction with the logical commands described above.

This command can also remove variables and their values from the variables display. If you want to remove solidity builtins variables, global constants, contract variables, or local variables, simply type `v -builtins` to remove solidity builtins along with the other information from the display, `v -global` for global constants, `v -contract` for contract variables, or `v -local` for local variables.  Each of these can also be abbreviated, e.g. `v -bui`, `v -glo`, `v -con`, and `v -loc`; they can also be combined, e.g. `v -bui -glo`.

If variables are removed from the variables display, you can still display them without a sign; e.g., `v bui` will cause solidity builtins variables to be displayed.  You can also add these variables back in to the display with `+`; e.g., `v +bui` will make it so that solidity builtins variables will once again always be displayed when you enter `v`.  All of these options can again be combined.

### (T) unload transaction

This command unloads the current transaction so you can load a new one.  Not usable in `--fetch-external` mode.

### (t) load transaction

This command loads a new transaction (given by its transaction hash).  Note that if you already have a transaction loaded, you must first explicitly unload it before you can load a new one.  Not usable in `--fetch-external` mode.

### (y) Reset and advance to final error

This command is only usable at the end of a trace.  It resets the debugger and then advances it to the location of the final error.  If the final error is at the end of the trace, this will have no effect.

Note: The use of resetting and advancing, rather than directly jumping to the final error, is something of a stopgap due to the debugger not currently moving backwards; this will be changed in the future to jump directly back to the final error.

### (Y) Reset and advance to previous error

This command resets the debugger and then advances to the location of the previous error; unlike `y`, it can be used from anywhere in the trace.

Note: The use of resetting and advancing, rather than directly jumping to the final error, is something of a stopgap due to the debugger not currently moving backwards; this will be changed in the future to jump directly back to the final error.

## Adding and removing breakpoints

Below are some examples of adding and removing breakpoints. Note the difference in case between adding (a lowercase 'b') and removing (an uppercase 'B').  If you add a breakpoint at a place where the debugger will skip over, it will be automatically moved down to the next point that the debugger might stop.  This does not apply to removing breakpoints.  Use the `?` command to list current breakpoints.

```
MagicSquare.sol:

11:   event Generated(uint n);
12:
13:   function generateMagicSquare(uint n)
      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

debug(develop:0x91c817a1...)> b 23
Breakpoint added at line 23.

debug(develop:0x91c817a1...)> B 23
Breakpoint removed at line 23.

debug(develop:0x91c817a1...)> b SquareLib:5
Breakpoint added at line 5 in SquareLib.sol.

debug(develop:0x91c817a1...)> b +10
Breakpoint added at line 23.

debug(develop:0x91c817a1...)> b
Breakpoint added at this point in line 13.

debug(develop:0x91c817a1...)> B all
Removed all breakpoints.
```
