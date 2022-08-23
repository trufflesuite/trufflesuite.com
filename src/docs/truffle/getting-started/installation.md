---
title: Installation
layout: docs.hbs
---
# Installation

## Requirements

* [NodeJS v12, or later](#install-nodejs)
* Windows, Linux, or macOS

## Install NodeJS

### Linux and macOS

NPM recommends [installing Node.js with a version manager (NVM)](https://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html)
to avoid permission errors when installing globally.

**Important**: Truffle requires `node-gyp` for compiling native addon modules for Node.js.  Node-gyp in
turn has [dependencies](https://github.com/nodejs/node-gyp) which may be missing, causing the Truffle install to fail.
Truffle recommends installing the following to avoid getting dependency errors:

* macOS only: `xcode-select --install`
* Linux (Ubuntu) only: `sudo apt install make g++`

### Windows

Truffle recommends using the installer available from the [nodejs site](https://nodejs.org/en/download/).

Ensure you select **Automatically install the necessary tools...** during the install to install the
required Visual Studio build tools, Python, and Chocolately package manager.

![Architecture](/img/docs/truffle/installation/windows-nodejs.png)

## Install Truffle

In a terminal, use NPM to install Truffle:

```bash
npm install -g truffle
```

## Ethereum client

Truffle requires a running Ethereum client which supports the standard JSON-RPC API.
There are many to choose from, and some better than others for development. Refer to the
[Choosing an Ethereum client](../reference/choosing-an-ethereum-client.md) section for more information.