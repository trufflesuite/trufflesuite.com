---
title: Truffle Dashboard Debugger
layout: docs.hbs
---

# Truffle Dashboard: Debugger

Truffle’s debugger is best-in-class thanks to its codec handling vague types, ability to deal with malformed data, and supporter for older Soldiity versions. The primary method of accessing Truffle's debugger up to now has been via the CLI, but now you can enjoy a point-and-click debugging experience with Truffle Dashboard. Some developers prefer a GUI debugger as it’s easier to navigate with context and keeps things like variables and the stack close at hand.

The debugger can be initialized 2 ways: [from the signature confirmation screen](#debugging-from-a-signature-confirmation) or [by providing a transaction hash on the debugger screen](#debugging-from-a-transaction-hash). Both scenarios will result in simulating the transaction on Ganache (forked from the relevant network, if applicable) and debugging the subsequent result.

<p class="alert alert-info">
<i class="far fa-info-circle"></i> We highly recommend adding an <a href="https://etherscan.io/apis" target="_blank">Etherscan API Key</a> to speed up debugger initialization. The debugger will need to fetch and compile any contracts not included in your project, which requires a number of API calls. Supplying an Etherscan API key allows us to do this far faster thanks to higher rate limits.
</p>

## Adding an Etherscan API Key

Navigate to the debugger screen using the sidebar link. You’ll be prompted to add an Etherscan API key if you haven’t already. We’ll store this key in your browser’s local storage.

![Add your Etherscan key to Truffle Dashboard when prompted on the Debugger screen](/img/docs/truffle-dashboard/truffle-dashboard-debugger/add-etherscan-key.png)

## Deleting and Changing an Etherscan API Key

If you’ve already provided a key, you may have rotated it or wish to use a different one. To change the API key, first delete your existing key, then add the new one.

![Remove your Etherscan key from Truffle Dashboard when prompted on the Debugger screen to add a new one](/img/docs/truffle-dashboard/truffle-dashboard-debugger/delete-etherscan-key.png)

## Debugging from a Signature Confirmation

When a transaction appears in Truffle Dashboard for signature confirmation, you’ll see a Simulate button to the right of the other options on the card. Clicking this button will launch the debugger for this transaction.

![Debug a transaction from the Signature Confirmation screen by clicking the Debug button on a card](/img/docs/truffle-dashboard/truffle-dashboard-debugger/debug-button.png)

## Debugging from a Transaction Hash

You can paste any arbitrary transaction hash into the debugger rather than using the signature confirmation cards. Paste the desired transaction hash into the input at the upper-right of the debugger screen and click the debug button or press enter to start the debugger session. Note that the Debug button will be disabled until a valid transaction hash is provided.

![Debug a transaction using its hash by pasting the hash into the text input on the Debugger screen](/img/docs/truffle-dashboard/truffle-dashboard-debugger/debug-hash.png)

## The Debugger UI

The debugger UI is composed of a top menu and 4 panels.

![The Dashboard Debugger interface](/img/docs/truffle-dashboard/truffle-dashboard-debugger/debug-interface.png)

The top menu contains 6 buttons in addition to the transaction hash input:

- **Continue (Until Next Breakpoint)**: If a breakpoint is set, this continues execution until the next breakpoint is reached or the last line is executed. Note this will be inactive until you set a breakpoint.
- **Step Next**: Steps to the next logical statement or expression in the source code. For example, evaluating sub expressions will need to occur first before the virtual machine can evaluate the full expression. Use this command if you'd like to analyze each logical item the virtual machine evaluates.
- **Step Over**: Steps over the current line, relative to the position of the statement or expression currently being evaluated in the Solidity source file. Use this command if you don't want to step into a function call or contract creation on the current line, or if you'd like to quickly jump to a specific point in the source file.
- **Step Into**: Steps into the function call or contract creation currently being evaluated. Use this command to jump into the function and quickly start debugging the code that exists there.
- **Step Out**: Steps out of the currently running function. Use this command to quickly get back to the calling function, or end execution of the transaction if this was the entry point of the transaction.
- **Reset**: Reset the debugger to the beginning of the transaction. Note this will be inactive until you step in some way.

There are 4 panels:

- **Code**: Contains the smart contract code we’re stepping through. Each contract involved in this transaction is displayed in a tab. If we’re unable to get the source code of a contract, we can still debug the transaction, but that particular contract will be opaque and you’ll see an “Unknown Contract” tab noting this.
- **Variables**: Contains the current variables and their values.
- **Breakpoints**: Contains the breakpoints you’ve set. See [Managing Breakpoints](#managing-breakpoints) for more information.
- **Stack**: Contains the callstack at the current point of execution.

## Managing Breakpoints

### Setting a Breakpoint

To set a breakpoint, click the space to the left of a line number. You’ll see a red dot appear in that space and an entry added to the Breakpoints panel.

### Jumping to a Breakpoint

To jump to the contract and line containing a particular breakpoint, click the text containing the contract name and line number in the breakpoints panel.

### Removing a Breakpoint

To remove a breakpoint, click the red dot for the breakpoint you’d like to remove. You can also click the red dot next to the breakpoint in the breakpoints panel.
