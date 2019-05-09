---
title: Ganache | Ganache Quickstart
layout: docs.hbs
---
# Ganache Quickstart

This quickstart guide will walk you through (1.) installing Ganache and (2.) creating a personal development blockchain via our quickstart workspace.

If this isn't your first time using Ganache, or you already know you'll need custom configuration options, check out the [Creating Workspaces documentation](/docs/ganache/workspaces/creating-workspaces).

<p class="alert alert-info">
<strong>Prefer using the command line?</strong>: This page will focus only on the graphical interface. Please see the [Ganache CLI Readme](https://github.com/trufflesuite/ganache-cli/blob/master/README.md) for more information on the command line flavor of Ganache.
</p>

## 1. Install Ganache

[Download](https://github.com/trufflesuite/ganache/releases) the appropriate version for your OS:

* Windows: `Ganache-*.appx`
* Mac: `Ganache-*.dmg`
* Linux: `Ganache-*.AppImage`

Double-click on the downloaded file, follow the prompts, and you're up and running.

## 2. Create a Workspace

When you open Ganache for the first time, you'll see the home screen. On this screen you're prompted to load an existing workspace (if any exist), create a new custom workspace, or quickstart a one-click blockchain with [default options](/docs/ganache/reference/workspace-default-configuration). For now, let's go with the Quickstart workspace.

![Empty Home Screen](/img/docs/ganache/ganache-home-empty.png)

### Main Interface

Once you've created a workspace, the screen will show some details about the server, and also list out a number of accounts. **Each account is given 100 ether**. Having ether automatically in all accounts allows you to focus on developing your application.

<p class="alert alert-info">
<strong>Note</strong>: The first time you launch Ganache, you will be asked if you want to allow Google Analytics tracking. While optional, turning this on will help the development team gain more insight into how Ganache is used. This tracking is totally anonymous, and no account data or private keys will ever be shared.
</p>

![Ganache](/img/docs/ganache/ganache-accounts.png)

<p class="text-center">*Ganache Accounts*</p>

There are four pages available:

* **Accounts** shows the accounts generated and their balances. This is the default view.
* **Blocks** shows each block as mined on the blockchain, along with gas used and transactions.
* **Transactions** lists all transactions run against the blockchain.
* **Contracts** lists the contracts contained in your workspace's Truffle projects. For more information on how Ganache handles contracts, see our [Contracts Page documentation](/docs/ganache/truffle-projects/contracts-page).
* **Events** lists all events that have been triggered since this workspace's creation. Ganache will attempt to decode events triggered by contracts in your Truffle project. For more information on events, see our [Events Page documentation](/docs/ganache/truffle-projects/events-page).
* **Logs** shows the logs for the server, which is useful for debugging.

Also note that you can search for block numbers or transaction hashes from a search box at the top.

## You're Up and Running!

This guide got you started with a zero-config personal development blockchain. If you have an existing Truffle project who's contracts and events you'd like tracked in this workspace, check out the [Linking a Truffle Project documentation](/docs/ganache/truffle-projects/linking-a-truffle-project). If you just need to customize some options and save this workspace for later, check out the [Creating Workspaces documentation](/docs/ganache/workspaces/creating-workspaces#saving-the-current-quickstart-blockchain-as-a-new-workspace).
