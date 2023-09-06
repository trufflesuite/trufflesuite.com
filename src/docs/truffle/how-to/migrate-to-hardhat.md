---
title: Migrate to Hardhat
layout: docs.hbs
---

# Migrate to Hardhat

Like Truffle, Hardhat is a development environment for Ethereum software. It consists of different components for
editing, compiling, debugging, and deploying smart contracts and dapps.

This topic provides some general steps you need to perform to migrate an existing Truffle project to Hardhat.

## Install Hardhat

Install Hardhat using the following command:

```bash
npm install --save-dev hardhat
```

## Update the folder structure

Update the Truffle folder structure as follows:

* Rename the `migrations` directory to `scripts`.
* Create a `hardhat.config.js` file with your network details and Solidity settings. Refer to
    [the Hardhat documentation](https://hardhat.org/hardhat-runner/docs/config) for advanced parameters.

The standard folder structure for Truffle  and Hardhat is as follows:

=== "Truffle folder structure"

    ```
    truffle
    ├── truffle-config.js       
    ├── contracts               // source files for your contracts 
    ├── migrations              // location for your scripts, for example to deploy to a chain
    ├── test                    // contract tests
    ```

=== "Hardhat folder structure"

    ```
    hardhat
    ├── hardhat.config.js       // hardhat network config
    ├── contracts               // source files for your contracts 
    ├── scripts                 // location for your scripts, for example to deploy to a chain
    ├── test                    // contract tests
    ```

## Compile, test, and deploy contracts

You may need to swap Truffle's native web3 for Hardhat's [Web3.js](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-web3) or
[ethers.js](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers) plugins to deploy your contract. Refer to
[the Hardhat documentation](https://hardhat.org/hardhat-runner/docs/guides/deploying) for more information on deploying contracts.

Use the following steps to compile, test, and deploy your contracts on Hardhat:

1. Install dependencies listed in your project's `package.json` file:

    ```bash
    npm i
    ```

2. Compile the contracts in your Hardhat project:

    ```bash
    npx hardhat compile
    ```

3. Test your contract:

    ```bash
    npx hardhat test
    ```

4. Test a contract deployment:

    ```bash
    npx hardhat run scripts/deploy.js
    ```

When Hardhat executes your tests, scripts, or tasks, an in-process Hardhat Network node is started automatically. Alternatively,
you can specify a network configured in the `hardhat.config.js` file, with the `--network` option. For example:

```bash
npx hardhat run --network <your-network> scripts/deploy.js
```

## Run a local Ethereum network node

Testing locally is different because Ganache is not available as a local Ethereum network node. Hardhat uses
[Hardhat Network](https://hardhat.org/hardhat-network/docs/overview#hardhat-network) as its local Ethereum network node.

To run a local Ethereum test network that exposes a JSON-RPC interface to Hardhat Network, run:

```bash
npx hardhat node
```

You can configure Hardhat Network in the `hardhat.config.js` file. For example, [this configuration file](https://github.com/Consensys/migrate-truffle-to-hardhat/blob/070bed3ea8438ad6e0a896bef0e27b3950cbbfca/contracts/hardhat/hardhat.config.ts) defines a network named `quickstart`.
You can then deploy your contract to the configured network using a command similar to:

```bash
npx hardhat run --network quickstart scripts/deploy.js
```

## Configure your wallet

To [use a hierarchical deterministic (HD)](https://hardhat.org/hardhat-runner/docs/config#hd-wallet-config) wallet with
Hardhat, set the `accounts` field in the `hardhat.config.js` file.

For example:

```javascript
module.exports = {
  networks: {
    sepolia: {
      url: "...",
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: "",
      },
    },
  },
};
```

You can also load accounts that you can access using the Ethers [`Signer`](https://docs.ethers.org/v6/api/providers/#Signer)
interface

```javascript
module.exports = {
  networks: {
    // in built test network to use when developing contracts
    hardhat: {
      chainId: 1337
    },
    quickstart: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
      // test accounts only, all good ;)
      accounts: [
        "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
        "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
        "0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f"
      ]
    },
  }
}
```

You can access the first 2 accounts using the following code:

```javascript
const [owner, otherAccount] = await ethers.getSigners();
```

### Generate the wallet from a mnemonic phrase

In your code, generate the wallet from a mnemonic phrase defined in your `hardhat.config.js` file as follows:

```javascript
import {ethers} = require("ethers");
import { HDNodeWallet } from 'ethers';
let node = ethers.HDNodeWallet.fromMnemonic(words)
```

### Connect with MetaMask

To connect to your HardHat Network using your MetaMask wallet, use the following:

```javascript
const provider = new ethers.BrowserProvider(window.ethereum)
```

### Load a wallet from an existing private key

You can load a wallet from an existing private key on your specified network, using the following code:

```javascript
import { ethers } from "hardhat"
const provider = new ethers.JsonRpcApiProvider("JSON-RPC-http-endpoint");
const wallet = new ethers.Wallet("0xMY_PRIVATE_KEY");
const signer = wallet.connect(provider);

# optionally with a provider directly
const wallet = new ethers.Wallet("0xMY_PRIVATE_KEY", provider);
```

## References

* [HardHat developer documentation](https://hardhat.org/tutorial)
* [Example scripts to send transactions](https://github.com/Consensys/quorum-dev-quickstart/tree/master/files/besu/smart_contracts/scripts/public)
