---
title: Installation
layout: docs.hbs
---
# Installation

## Requirements

* [Node.js v14 - v18](#install-nodejs)
* Windows, Linux, or macOS

## Install Node.js

Note: to install the latest version of `npm`, run `npm i -g npm`

Node Package Manager (NPM) recommends installing `Node.js` and `npm` with a Node version manager to avoid permission errors when installing globally. To do so, follow the instructions for your operating system [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm).

1. Truffle requires `node-gyp` for compiling native add-on modules for Node.js. Truffle recommends installing the following `node-gyp` to avoid errors when installing Truffle. Follow the installation instructions [here](https://github.com/nodejs/node-gyp#installation).

1. Use `nvm` to install a compatible version of Node.js. For example, to install Node.js v18 on OSX or Linux, run:

    ```bash
    nvm install 18
    ```

1. Confirm that Node.js has been installed correctly by running `node --version`.

## Install Truffle

<p class="alert alert-warning">
<i class="far fa-exclamation-triangle"></i> <strong>Warning</strong>: Avoid using the <code>sudo</code> command when installing Truffle, this can cause permission errors.
</p>

In a terminal, use NPM to install Truffle:

```bash
npm install -g truffle
```

You may receive a list of warnings during installation. To confirm that Truffle was installed correctly,
run:

```bash
truffle version
```

## Ethereum client

Truffle requires a running Ethereum client which supports the standard JSON-RPC API.
There are many to choose from, and some better than others for development. Refer to the
[Ethereum client](../concepts/ethereum-client-types.md) section for more information.