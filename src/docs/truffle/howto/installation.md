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
 

1. Truffle requires `node-gyp` for compiling native add-on modules for Node.js. 
    Truffle recommends installing the following `node-gyp` [dependencies](https://github.com/nodejs/node-gyp) to avoid errors when installing Truffle:

    === "macOS"

        ```bash
        xcode-select --install
        ```

    === "Linux (Ubuntu)"

        ```bash
        sudo apt install make g++
        ```

1. Use `nvm` to install a compatible version of Node.js. For example, to install Node.js v15, run:

    ```bash
    nvm install 15
    ```

1. Confirm that Node.js has been installed correctly by running `node --version`.

### Windows

Truffle recommends using the installer available from the [Node.js site](https://nodejs.org/en/download/).

Ensure you select **Automatically install the necessary tools...** during the install to install the
required Visual Studio build tools, Python, and Chocolately package manager.

![Architecture](/img/docs/truffle/installation/windows-nodejs.png)

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
[Choosing an Ethereum client](../concepts/choosing-an-ethereum-client.md) section for more information.