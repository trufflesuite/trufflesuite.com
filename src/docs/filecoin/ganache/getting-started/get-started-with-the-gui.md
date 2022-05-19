---
title: Filecoin-flavored GUI
layout: docs.hbs
---
# Get Started With using Filecoin-flavored Ganache GUI

## Installation

Filecoin-flavored Ganache is included in Ganache UI starting in vTODO and later. If you don't have that version, be sure to update it using the in-app updater or [manually install the latest version](/docs/ganache/quickstart#1-install-ganache).

## Usage

First, be sure to select the **FILECOIN** flavor in the dropdown under **QUICKSTART** button on the home screen.

<img class="img-fluid" style="max-width: min(50rem, 100%);" src="/img/docs/ganache/filecoin/flavor-selection.png" alt="Filecoin Flavor Selection" />

From here, you can click the **QUICKSTART** or **NEW WORKSPACE** buttons. **QUICKSTART** is the quickest way to get started, and you can save the workspace later. You can read more about workspaces in the [dedicated documentation section](/docs/ganache/workspaces/the-quickstart-workspace).

### Accounts

Once Ganache has started, you'll be presented with the **Accounts** page. Here you can see a list of accounts generated from a random seed and prefunded with some FIL (all [configurable](#configuration)). Filecoin-flavor Ganache doesn't support mnemonics currently, but you can specify the seed in the [**Settings**](#configuration).

<img class="img-fluid" style="max-width: min(50rem, 100%);" src="/img/docs/ganache/filecoin/accounts.png" alt="Filecoin Accounts Page" />

### Tipsets

The **Tipsets** page shows you a list of the tipsets mined. You can click on a tipset row to see more details, including details of the blocks included in the tipset.

<img class="img-fluid" style="max-width: min(50rem, 100%);" src="/img/docs/ganache/filecoin/tipsets.png" alt="Filecoin Tipsets Page" />

<img class="img-fluid" style="max-width: min(50rem, 100%);" src="/img/docs/ganache/filecoin/tipset-detail.png" alt="Filecoin Tipset Detail Page" />

If you're not familiar with using Ganache, then you'll quickly learn that most of the blocks of information are clickable for more information. Clicking on a block row in the tipset detail page will bring you to the block's detail page.

<img class="img-fluid" style="max-width: min(50rem, 100%);" src="/img/docs/ganache/filecoin/block-detail.png" alt="Filecoin Block Detail Page" />

### Messages

The **Messages** page lists the most recent messages.

<img class="img-fluid" style="max-width: min(50rem, 100%);" src="/img/docs/ganache/filecoin/messages.png" alt="Filecoin Messages Page" />

You can click on a message to see the message's detail. You can also get to the message detail page from the block detail page available from the [tipset detail page](#tipsets);

<img class="img-fluid" style="max-width: min(50rem, 100%);" src="/img/docs/ganache/filecoin/message-detail.png" alt="Filecoin Message Detail Page" />

### Deals

The **Deals** page lists all of the storage deals, regardless of state. These are not clickable currently, but this page is a great place to get an overview.

<img class="img-fluid" style="max-width: min(50rem, 100%);" src="/img/docs/ganache/filecoin/deals.png" alt="Filecoin Deals Page" />

### Files

The **Files** page lists all of the pinned files within IPFS. If you're using the [Filecoin Network Inspector sample app](https://docs.filecoin.io/build/examples/network-inspector/overview/) to create storage deals, those files automatically get pinned with the `ipfs.add()` JS function it uses.

Do note that these are all of your pinned IPFS files, not just those associated with [storage deals](#deals).

<img class="img-fluid" style="max-width: min(50rem, 100%);" src="/img/docs/ganache/filecoin/files.png" alt="Filecoin Files Page" />

You can also click the **DOWNLOAD** button to save the file to your computer.

## Configuration

You can get to **Settings** page by pressing the <i class="fas fa-cog"></i> button available in the header bar.

<img class="img-fluid" style="max-width: min(50rem, 100%);" src="/img/docs/ganache/filecoin/cogwheel-highlight.png" alt="Settings Page Button" />

From here, you'll see different settings grouped by category.

- The **WORKSPACE** tab just lets you change the workspace name if you're not using the Quickstart Workspace.
- The **SERVER** tab lets you change the hosts/interfaces and ports for the Lotus and IPFS servers to listen on.
- The **ACCOUNTS & KEYS** tab lets you change the default account FIL balance, number of accounts, and random number generator seed.
- The **MINER** tab allows you to enable/disable the miner as well as set the mining interval or use automining.

<img class="img-fluid" style="max-width: min(50rem, 100%);" src="/img/docs/ganache/filecoin/settings.gif" alt="Settings Pages Overview" />
