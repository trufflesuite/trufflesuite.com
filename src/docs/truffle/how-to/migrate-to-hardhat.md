---
title: Migrate to Hardhat
layout: docs.hbs
---

# Migrate to Hardhat

Like Truffle, Hardhat is a development environment for Ethereum software. It consists of different components for
editing, compiling, debugging and deploying smart contracts and dapps.

We'll provide two methods for migrating to Hardhat:

1. [**Use the Hardhat plugin**](#use-the-hardhat-plugin): Use the Hardhat plugin to integrate with your Truffle files.
    This is essentially a partial migration that allows you to run tests and scripts written for Truffle using Hardhat.
1. [**Perform a full migration**](#perform-a-full-migration): Configure Hardhat and migrate your scripts and tests to
    run natively in Hardhat Runner.

## Use the Hardhat plugin

Use the `hardhat-truffle` plugin to use Truffle contracts in a Hardhat environment. The plugin provides a bridge between
the Truffle and Hardhat environments, allowing developers to use Truffle contracts and libraries within a Hardhat project.

The following steps outline the process for using the Hardhat plugins. Refer to the
[Hardhat instructions](https://hardhat.org/hardhat-runner/docs/other-guides/truffle-migration) for more information about
using the plugin.

### Install Hardhat and required plugins

Install Hardhat using the following command:

```bash
npm install --save-dev hardhat
```

Install the required plugins:

```bash
npm install --save-dev @nomiclabs/hardhat-truffle5 @nomiclabs/hardhat-web3 'web3@^1.0.0-beta.36'
```

### Create a Hardhat configuration file

Create a `hardhat.config.js` (or `hardhat.config.ts` if using Typescript) file that matches your Truffle configuration file
settings. Refer to [the Hardhat documentation](https://hardhat.org/hardhat-runner/docs/config) for advanced parameters.

Add the following statement to your configuration file:

=== "Javascript"

    ```javascript
    require("@nomiclabs/hardhat-truffle5");
    ```

=== "Typescript"

    ```typescript
    import "@nomiclabs/hardhat-truffle5";
    ```

### Create the hardhat-truffle fixure

If your project uses [Truffle migrations](contracts/run-migrations.md) to initialize your testing environment
(your tests call `Contract.deployed()`), then you need to adapt your migrations to become a hardhat-truffle fixture. 

Create a `test/truffle-fixture.js` file that deploys your contracts and calls the `setAsDeployed()` method on each contract
abstractions you want to test.

For example, the following file in the Truffle `migrations` folder:

```javascript
const Greeter = artifacts.require("Greeter");

module.exports = function (deployer) {
  deployer.deploy(Greeter);
};
```

Must be converted to the following in the `test/truffle-fixture.js` file:

```javascript
const Greeter = artifacts.require("Greeter");

module.exports = async () => {
  const greeter = await Greeter.new();
  Greeter.setAsDeployed(greeter);
};
```

Refer to the [Hardhat fixtures documentation](https://hardhat.org/hardhat-runner/docs/other-guides/truffle-migration#migrations-and-hardhat-truffle-fixtures)
for more information.

You can now compile, test, and deploy your contracts. 

## Perform a full migration

You can perform a full migration of your Truffle project to Hardhat. The process involves installing and configuring Hardhat, then
updating your tests and scripts. Alternatively, use the [Hardhat plugins](#use-the-hardhat-plugin) to use Truffle contracts
in a Hardhat environment.

This section provides some general steps you need to perform to fully migrate an existing Truffle project to Hardhat.

### Install Hardhat

Install Hardhat using the following command:

```bash
npm install --save-dev hardhat
```

### Update the folder structure

Update the Truffle folder structure as follows:

* Rename the `migrations` directory to `scripts`
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

### Compile, test, and deploy contracts

You may need to swap Truffle's native web3 for Hardhat's [Web3.js](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-web3) or
[ethers.js](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers) plugins to deploy your contract. Refer to
[the Hardhat documentation](https://hardhat.org/hardhat-runner/docs/guides/deploying) for more information on deploying contracts.

The process to compile, test, and deploy your contracts on Hardhat is:

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

### Run a local Ethereum network node

Testing locally is different because Ganache is not available as a local Ethereum network node. Hardhat uses
[Hardhat Network](https://hardhat.org/hardhat-network/docs/overview#hardhat-network) as its local Ethereum network node.

To run a local Ethereum test network, that exposes a JSON-RPC interface to Hardhat Network, run:

```bash
npx hardhat node
```

You configure Hardhat Network in the `hardhat.config.js` file. For example, [this configuration file](https://github.com/Consensys/migrate-truffle-to-hardhat/blob/070bed3ea8438ad6e0a896bef0e27b3950cbbfca/contracts/hardhat/hardhat.config.ts) has configured a network named `quickstart`.
You can then deploy your contract to the configured network using a command similar to:

```bash
npx hardhat run --network quickstart scripts/deploy.js
```

### Configure your wallet

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

#### Generate the wallet from a mnemonic phrase

In your code, generate the wallet from a mnemonic phrase defined in your `hardhat.config.js` file as follows:

```javascript
import {ethers} = require("ethers");
import { HDNodeWallet } from 'ethers';
let node = ethers.HDNodeWallet.fromMnemonic(words)
```

#### Connect with MetaMask

To connect to your HardHat Network using your MetaMask wallet, use the following:

```javascript
const provider = new ethers.BrowserProvider(window.ethereum)
```

#### Load a wallet from an existing private key

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
