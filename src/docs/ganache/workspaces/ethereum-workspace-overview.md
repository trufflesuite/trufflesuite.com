---
title: Ethereum Workspace Overview
layout: docs.hbs
---

# Ethereum Workspace Overview

## Main Interface

Once you've created a workspace, the screen will show some details about the server, and also list out a number of accounts. **Each account is given 100 ether**. Having ether automatically in all accounts allows you to focus on developing your application.

![Ganache](/img/docs/ganache/ganache-accounts.png)

<p class="text-center">*Local Accounts*</p>

There are six pages available:

- **Accounts** shows the accounts generated and their balances. This is the default view.
- **Blocks** shows each block as mined on the blockchain, along with gas used and transactions.
- **Transactions** lists all transactions run against the blockchain.
- **Contracts** lists the contracts contained in your workspace's Truffle projects. For more information on how Ganache handles contracts, see our [Contracts Page documentation](/docs/ganache/truffle-projects/contracts-page).
- **Events** lists all events that have been triggered since this workspace's creation. Ganache will attempt to decode events triggered by contracts in your Truffle project. For more information on events, see our [Events Page documentation](/docs/ganache/truffle-projects/events-page).
- **Logs** shows the logs for the server, which is useful for debugging.

Also note that you can search for block numbers or transaction hashes from a search box at the top.

## You're Up and Running!

This guide got you started with a zero-config personal Ethereum development blockchain. If you have an existing Truffle project whose contracts and events you'd like tracked in this workspace, check out the [Linking a Truffle Project documentation](/docs/ganache/truffle-projects/linking-a-truffle-project). If you just need to customize some options and save this workspace for later, check out the [Creating Workspaces documentation](/docs/ganache/workspaces/creating-workspaces#saving-the-current-quickstart-blockchain-as-a-new-workspace).
