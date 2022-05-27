---
title: Installation
layout: docs.hbs
---
# Installation

```bash
npm install -g truffle
```

## Requirements

* NodeJS v12 or later
* Windows, Linux or macOS

### NodeJS
There are many options for installing nodejs.

For Windows it is recommended to use the installer available from the [nodejs site](https://nodejs.org/en/download/).  Make sure to check "Automatically install the necessary tools" during the install.

For macOS and Linux it is recommended that you use a node version manager as this will ensure there are no permission problems installing packages globally.  See [using a node version manager](https://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html).

### Node-gyp
Truffle depends on node-gyp which is for compiling native addon modules for Node.js.  Node-gyp in turn has [dependencies](https://github.com/nodejs/node-gyp) which may be missing causing the truffle install to fail.  For Windows make sure to check "Automatically install the necessary tools" during the install.  For macOS you will need the command line tools: "xcode-select --install".

### Ethereum client

Truffle also requires that you have a running Ethereum client which supports the standard JSON RPC API (which is nearly all of them). There are many to choose from, and some better than others for development. We'll discuss them in detail in the [Choosing an Ethereum client](/docs/truffle/reference/choosing-an-ethereum-client) section.

## Recommendations for Windows

If you're running Truffle on Windows, you may encounter some naming conflicts that could prevent Truffle from executing properly. Please see [the section on resolving naming conflicts](/docs/truffle/reference/configuration#resolving-naming-conflicts-on-windows) for solutions.
