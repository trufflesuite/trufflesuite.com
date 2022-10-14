---
title: Debug smart contracts
---

# Debug smart contracts

Truffle for VSCode allows you to debug smart contracts using the VSCode debugger.

## Use the debugger

Start the debugger by selecting **Truffle: Debug Transaction** in the
[command palette](../reference/command-palette.md).
Select the network to debug against.

Then, select the hash of the transaction to debug.
The VSCode debugger launches, and you can use typical debugger functions such as watch windows, view
the call stack, and step in/out/over.

When you initially deploy a contract, only constructor functions are executed.
If you don't execute the other functions prior to starting the debugger, those functions aren't
yet acted on, and the results aren't added to the ledger.
Thus, on an initial deployment, only constructor functions are available in the list of transaction
hashes to debug.

To debug the other functions (for example, `SendRequest` and `SendResponse` in the
`HelloBlockchain.sol` contract included in the [basic project](manage-smart-contracts.md)), first
execute those functions by
[using the Truffle console in a terminal window](../../truffle/getting-started/interacting-with-your-contracts.md).
