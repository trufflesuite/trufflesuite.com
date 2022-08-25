---
title: Installation
layout: docs.hbs
---
# Installation

## Requirements

* [Node.js v12 - v16](#install-nodejs)
* Windows, Linux, or macOS

## Install Node.js

### Linux and macOS

Node Package Manager (NPM) recommends [installing Node.js with Node Version Manager (`nvm`)](https://node.dev/post/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu)
to avoid permission errors when installing globally.

1. Use `curl` or `wget` to install `nvm`:

    === "curl"

        ```bash
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
        ```

    === "wget"

        ```bash
        wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
        ```

1. Confirm that `nvm` installed correctly. You may need to reload the terminal for
    the command to work:

    ```bash
    nvm --version
    ```
 

1. Truffle requires `node-gyp` for compiling native addon modules for Node.js.  Node-gyp in
    turn has [dependencies](https://github.com/nodejs/node-gyp) which may be missing, causing the Truffle install to fail.
    Truffle recommends installing the following to avoid getting dependency errors:

    === "macOS"

        ```bash
        xcode-select --install
        ```

    === "Linux (Ubuntu)"

        ```bash
        sudo apt install make g++
        ```

1. Use `nvm` to install a compatible version of NodeJS. For example, to install NodeJS v15, run:

    ```bash
    nvm install 15
    ```

1. Confirm that Node.js has been installed correctly by running `node --version`.

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

You may receive a list of warnings during installation. To confirm that truffle was installed correctly,
run:

```bash
truffle version
```

## Ethereum client

Truffle requires a running Ethereum client which supports the standard JSON-RPC API.
There are many to choose from, and some better than others for development. Refer to the
[Choosing an Ethereum client](../reference/choosing-an-ethereum-client.md) section for more information.