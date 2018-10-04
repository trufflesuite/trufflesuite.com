---
title: Truffle | Truffle Quickerstart
layout: docs.hbs
---
# Truffle Quickerstart

This page will take you very briefly through the basics of creating a Truffle project and 
debugging a test execution on Truffle’s built-in blockchain.  For more details, debugging migrations, and alternative blockchains, see 
the [Quickstart](/docs/truffle/quickstart)

## Creating a project

To use most Truffle commands, you need to run them against an existing Truffle project. 
So the first step is to create a Truffle project.

We'll use the [MetaCoin box](/boxes/metacoin), which creates a token that can be transferred 
between accounts:

1. Create a new directory for your Truffle project:

   ```shell
   mkdir MetaCoin
   cd MetaCoin
   ```

1. Download ("unbox") the MetaCoin box:

   ```shell
   truffle unbox metacoin
   ```
   
1. In a second terminal window in the same directory, turn on logging:

   ```shell
   truffle develop --log
   ```

## Testing

1. In your main terminal window, enter Truffle Develop:

   ```shell
   truffle develop
   ```

1. Run the Solidity test:

   ```shell
   test
   ```

## Debugging

1. Find a transaction ID in the log window for a transaction you’re interested in.  
Search for “Transaction:”; copy the long hex number after the colon.
1. In the main terminal window, type “debug ” and paste the ID, e.g. 
(your ID will be different):

   ```shell
   debug 0xf6867abd2f69584671b39338387293bfc1983c37177a13f14254ab19b42972da
   ```
   
1. Use command-line debugger commands (`o`, `i`, `u`, `n`, `;`, `q`, etc.) to step through 
   source; see [Debugging Your Contracts](/docs/truffle/getting-started/debugging-your-contracts) 
   for details.
