---
title: Quickstart
---

# Ganache Quickstart

This quickstart guide will walk you through installing Ganache and creating a personal development blockchain via a quickstart workspace.

If this isn't your first time using Ganache, or you already know you'll need custom configuration options, check out the [Creating Workspaces documentation](/docs/ganache/workspaces/creating-workspaces).

<p class="alert alert-info">
<i class="far fa-info-circle"></i> <strong>Working with Ethereum and prefer using the command line?</strong>: This page will focus only on the graphical interface. Please see the <a href="https://github.com/trufflesuite/ganache-cli/blob/master/README.md">Ganache CLI Readme</a> for more information on the command line flavor of Ganache.
</p>

## 1. Install Ganache

[Download](https://github.com/trufflesuite/ganache-ui/releases) the appropriate version for your OS:

- Windows: `Ganache-*.appx`
- Mac: `Ganache-*.dmg`
- Linux: `ganache-*.AppImage`

Next, double-click on the downloaded file, follow the prompts, and you're up and running.

<p class="alert alert-info">
<i class="far fa-info-circle"></i> <strong>Note</strong>: The first time you launch Ganache, you will be asked if you want to allow Google Analytics tracking. While optional, turning this on will help the development team gain more insight into how Ganache is used. This tracking is totally anonymous, and no account data or private keys will ever be shared.
</p>

## 2. Create a Workspace

When you open Ganache for the first time, you'll see the home screen. On this screen you're prompted to load an existing workspace (if any exist), create a new custom workspace, or quickstart a one-click blockchain with [default options](/docs/ganache/reference/workspace-default-configuration). For now, let's go with a quickstart workspace. Select the desired blockchain from the `QUICKSTART` drop down; you can choose to start an Ethereum node or Corda network, then click the `QUICKSTART` button.

![Empty Home Screen](/img/docs/ganache/ganache-home-empty.png)

Now that you've got a workspace created, let's take a look at what you can do:

- **[Ethereum workspace overview](/docs/ganache/workspaces/ethereum-workspace-overview)**
- **[Corda workspace overview](/docs/ganache/corda/workspace-overview)**
