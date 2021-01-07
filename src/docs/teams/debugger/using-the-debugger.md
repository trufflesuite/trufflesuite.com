---
title: Teams | Using the Debugger
layout: docs.hbs
---
# Using the Debugger

In this section we'll explore both the various elements of the debugger's user interface and steps invovled in actually debugging a transaction. Below is an example of the Truffle Teams debugger interface, wherein a simple ERC721 token implementation is being debugged. 

<figure class="screenshot">
  <img class="figure-shadow mb-2 w-100" src="/img/docs/teams/debugger-transaction-01.png" alt="Teams Debugger Interface">
  <figcaption class="text-center">The Truffle Teams Debugger Interface.</figcaption>
</figure>

Using the above example as a reference, the first thing to note is the transaction hash (`0x82f668a...`) in the page header. The header includes a visual representation of whether the transaction ultimately succeeded <i class="fas fa-check-circle" style="color: #00A311"></i> or failed <i class="fas fa-times-circle" style="color: #D60000"></i>. This is a useful reference as it allows you to preemptively know whether to expect a status message when execution completes. More on this in the [Status Messages](/docs/teams/debugger/using-the-debugger#status-messages) section below.

## Debugger Control Palette

Located directly below the transaction hash is the debugger's control palette.

<figure class="screenshot">
  <img class="figure-shadow mb-2 w-50" src="/img/docs/teams/debugger-control-palette.png" alt="Teams Debugger Control Palette">
  <figcaption class="text-center">The Truffle Teams Debugger Control Palette.</figcaption>
</figure>

From left to right, the controls, with a description of their associated action, are as follows. Note that you can also hover a control to display its associated name. Note that the brackets contain the corresponding keyboard shortcuts for each command.

- <code>Continue</code> - continue until the next breakpoint is reached or the last line is executed ("c" or "F8")
- <code>Step Over</code> - steps over the current line ("o" or "F10")
- <code>Step Into</code> - steps into the function call or contract creation currently being evaluated ("i" or "F11")
- <code>Step Out</code> - steps out of the currently running function ("u" or "Shift+F11")
- <code>Restart</code> - restarts the debugger session ("r")

## Source Files

Located directly below the debugger control palette are the tabs representing all the source files that will be accessed as part of the transaction's execution path. It's worth noting that it's likely your project may contain more files than are displayed here.

<figure class="screenshot">
  <img class="figure-shadow mb-2 w-50" src="/img/docs/teams/debugger-interface-tabs.png" alt="Teams Debugger Source File Tabs">
  <figcaption class="text-center">The Truffle Teams Debugger Source File Tabs.</figcaption>
</figure>

There are two noteworthy visual cues with the debugger tabs. The first is that of an "open tab", which means that you're looking at the file's code below and is represented with a light green background. The second is that of "active tab" which is represented by an orange circle <i class="fas fa-dot-circle" style="color: #dc9e5b"></i> which indicates that the debugger is currently paused within this file.

As you use the debugger's controls to step through a transaction you will likely see the active tab update. Note that the open tab will also update when the code steps into it.

## Debugger Source Viewport

As the core of the Truffle Teams Debugger is the source viewport. This is a read-only display of the code that the transaction will be stepping through as part of its execution. An example is shown in the screenshot below.

<figure class="screenshot">
  <img class="figure-shadow mb-2 w-50" src="/img/docs/teams/debugger-source-viewport.png" alt="Teams Debugger Source Viewport">
  <figcaption class="text-center">The Truffle Teams Debugger Source Viewport.</figcaption>
</figure>

The main thing to note is the active line which is highlighted in yellow. As your step through your transaction this will update accordingly.

## Debugger Variable Inspector

Next to the source viewport is the variable inspector. This shows the variable values for the current transaction execution context, including contract state, local function, and global variables. The inspector uses a tree-like explorer enabling you to drill down by clicking on a given branch, represented by the green right-facing caret icon <i class="fas fa-caret-right" style="color: #17B89D"></i>.

<figure class="screenshot">
  <img class="figure-shadow mb-2 w-50" src="/img/docs/teams/debugger-variables.png" alt="Teams Debugger Variable Inspector">
  <figcaption class="text-center">The Truffle Teams Debugger Variable Inspector.</figcaption>
</figure>

## Status Messages

If your transaction's execution ultimately fails, a banner appear after the `REVERT` happens. An associated status message or reason string will be shown if one exists. The screenshot below provides an example.

<figure class="screenshot">
  <img class="figure-shadow mb-2 w-100" src="/img/docs/teams/debugger-status-message.png" alt="Teams Debugger Status Message">
  <figcaption class="text-center">The Truffle Teams Debugger Status Message.</figcaption>
</figure>

As shown in the above example, the transaction failed with the `ERC721: token already minted` reason string.
