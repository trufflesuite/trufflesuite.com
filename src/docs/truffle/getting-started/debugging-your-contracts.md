---
title: Truffle | Debugging Your Contracts
layout: docs.hbs
---
# Debugging Your Contracts

Truffle includes an integrated debugger so that you can debug transactions made against your contracts. This debugger looks and feels like existing command line debuggers available for traditional development environments.

## Overview

Debugging a transaction on the blockchain is different than debugging traditional applications (for instance, applications written in C++ or Javascript). When debugging a transaction on the blockchain, you're not running the code in real-time; instead, you're stepping over the historical execution of that transaction, and mapping that execution onto its associated code. This gives us many liberties in debugging, in that we can debug any transaction, any time, so long as we have the code and artifacts for the contracts the transaction interacted with. Think of these code and artifacts as akin to the debugging symbols needed by traditional debuggers.

In order to debug transactions, you'll need the following:

* Truffle 4.0 or above.
* The hash of a transaction on your desired blockchain.
* The source code and artifacts the transaction encounters.

Note that it's okay if your desired transaction resulted in an exception or if it ran out of gas. The transaction still exists on chain, and so you can still debug it!

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

This command allows you to step through each individual instruction evaluated by the virtual machine. This is useful if you're interested in understanding the low level bytecode created by the Solidity source code. When you use this command, the debugger will also print out the stack data at the time the instruction was evaluated.

You can also use this command with a numerical argument, to step that many times.

### (p) print instruction

This commands prints the current instruction and stack data, but does not step to the next instruction. Use this when you'd like to see the current instruction and stack data after navigating through the transaction with the logical commands described above.

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

### (+) add watch expression

This command will add a watch on a provided expression, based on the following syntax: `+:<expression>`.

### (-) remove watch expression

This command will remove a watch expression, based on the following syntax: `-:<expression>`.

### (?) list existing watch expressions and breakpoints

This command will display a list of all the current watch expressions and breakpoints.

### (v) display variables

This command will display the current variables and their values.

### (T) unload transaction

This command unloads the current transaction so you can load a new one.

### (t) load transaction

This command loads a new transaction (given by its transaction hash).  Note that if you already have a transaction loaded, you must first explicitly unload it before you can load a new one.

## Adding and removing breakpoints

Below are some examples of adding and removing breakpoints. Note the difference in case between adding (a lowercase 'b') and removing (an uppercase 'B').

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
