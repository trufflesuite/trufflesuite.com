---
title: Add a wallet
---

# Add a wallet

If you're using a Truffle box or you've created your own project structure, and you want to use the
deployment options in the extension, you can add a wallet provider to your project.

## Steps

1. Update your project to include the required package for the wallet.
    The underlying requirement is for [truffle-hdwallet-provider](https://github.com/trufflesuite/truffle-hdwallet-provider).
    If you have an existing `package.json` as part of your project, just add the following to
    your dependencies section:

    ```json
    "truffle-hdwallet-provider": "1.0.10"
    ```

    If you don't have an existing `package.json` as part of your project, create one by running the
    following:

    ```shell
    npm init -y
    npm install truffle-hdwallet-provider@1.0.10 --save
    ```

1. Update the Truffle configuration to include the wallet provider and a native Node package to
    access the file system.
    Add this to the top of `package.json`.

    ```javascript
    const HDWalletProvider = require('truffle-hdwallet-provider');
    const fs = require('fs');
    ```

1. To deploy locally, the wallet isn't required, but a network section for development is required.
    If this isn't present in `package.json`, you can add this to the network section.

    ```json
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    }
    ```

1. To deploy to another target, no other configuration is needed.
    When selecting deploy contracts, the relevant network section is added dynamically to the Truffle
    configuration.

1. To deploy to another target that has been manually added to the Truffle configuration, the
    provider must be added manually.
    Update the network section in the configuration to use this provider:

    ```json
    provider: new HDWalletProvider(fs.readFileSync('<path to a file with a 12 work mnemonic', 'utf-8'), "<uri to rpc endpoint>")
    ```

> **Note:** Some older Truffle boxes use a Truffle configuration file named `truffle.js` instead of
`truffle-config.js`.
This is required on Windows.
