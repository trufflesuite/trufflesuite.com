---
title: Using Infura (or a custom provider)
hide:
  - navigation
---

![Infura Truffle logos](/img/tutorials/infura/infura-truffle.png)

[Infura’s API suite](https://infura.io/?&utm_source=truffle&utm_medium=referral&utm_campaign=tutorials&utm_content=truffleinfuraguide) provides instant HTTPS and WebSocket access to the Ethereum and IPFS networks. By using Infura, you can connect easily to Web 3.0 without having to spin-up and maintain your own infrastructure. Their [core service is free](https://infura.io/pricing?&utm_source=truffle&utm_medium=referral&utm_campaign=tutorials&utm_content=truffleinfuraguide) and provides everything you need to start building awesome decentralized applications today!

You may not be familiar with Infura by name, but if you've used [MetaMask](https://metamask.io) then you've used Infura, as it is the Ethereum provider that powers MetaMask.

For security reasons, Infura does not manage your private keys, which means Infura cannot sign transactions on your behalf.

However, Truffle can sign transactions through the use of its `HDWalletProvider`. This provider can handle the transaction signing as well as the connection to the Ethereum network. ([Read more about HDWalletProvider](https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider).)

This tutorial will show you how to use Infura to migrate an existing dapp to an Ethereum network supported by Infura. In this specific instance, we'll migrate to Sepolia. We'll assume that you already have a dapp to migrate. If you want a test dapp, feel free to use our [Pet Shop](/tutorial) tutorial dapp.

## Install HDWalletProvider

Truffle's `HDWalletProvider` is a separate npm package:

```shell
npm install @truffle/hdwallet-provider
```

<p class="alert alert-info">
<strong>Note</strong>: If you are on Windows and get an `MSBUILD` error, you may need to install the Windows build tools. In a terminal with Administrator rights, run `npm install -g windows-build-tools` and then try installation again.
</p>

## Register with Infura and create a new project

Before you can use Infura, you need to [register](https://app.infura.io/register). Upon registration, [this guide](https://blog.infura.io/getting-started-with-infura-28e41844cc89/?&utm_source=truffle&utm_medium=referral&utm_campaign=tutorials&utm_content=truffleinfuraguide) will walk you through creating a new project, authenticating with your new Web3 API Key, securely copying your keys and selecting the appropriate network endpoint.

## Configure your Truffle project

The next step is to edit your `truffle-config.js` file to use `HDWalletProvider` and provide all the necessary configuration for deploying to Sepolia.

1. First, define the `HDWalletProvider` object in your configuration file. Add this line at the top of your `truffle-config.js` file:

   ```javascript
   const HDWalletProvider = require("@truffle/hdwallet-provider");
   ```

2. Next, provide a reference to your mnemonic that generates your accounts. If you don't have a mnemonic, you can generate one using an [online mnemonic generator](https://iancoleman.io/bip39) or a hardware wallet such as a product from [Ledger](https://www.ledger.com).

   ```javascript
   const mnemonic = "orange apple banana ... ";
   ```

   <p class="alert alert-danger">
   <strong>Warning</strong>: In production, we highly recommend storing the mnemonic in another (secret) file, to reduce the risk of the mnemonic becoming known. If someone knows your mnemonic, they have all of your addresses and private keys!
   </p>

3. Add a Sepolia network definition:

   ```javascript
   module.exports = {
     networks: {
       sepolia: {
         provider: function() {
           return new HDWalletProvider(mnemonic, "https://sepolia.infura.io/v3/<INFURA_WEB3_API_KEY>")
         },
         network_id: 11155111
       }
     }
   };
   ```

   Things to notice:

   * While the example has only a single network defined, you can define multiple networks as normal.

   * The `provider` for the `sepolia` network definition instantiates the `HDWalletProvider`.

   * The `HDWalletProvider` takes as arguments a mnemonic and the desired network. A list of Infura-supported networks is available in the Endpoints dropdown on your Infura Project Settings page.

<figure class="screenshot">
  <img class="figure-shadow mb-2 w-100" src="/img/tutorials/infura/infura-project-details.png" alt="Infura Project Details">
</figure>

   * Make sure to replace `<INFURA_WEB3_API_KEY>` with your Infura Web3 API Key.

   * The `provider` value is wrapped in a function, which ensures that it won't get initialized until it's needed. This is especially important if connecting to multiple networks. (See the [Networks configuration](/docs/truffle/reference/configuration#networks) section of the documentation for more on this topic.)

     <p class="alert alert-info">
       <strong>Note</strong>: If you encounter issues with this construction, you can skip the function wrapper and use this instead:<br />
       `provider: new HDWalletProvider(mnemonic, "https://sepolia.infura.io/v3/<INFURA_WEB3_API_KEY>"),`
     </p>

   * Without any other arguments, the account in charge of migration will be the first one generated by the mnemonic. But if desired, you can pass in an argument to specify which account to use. As an example, to use the third account:

     ```javascript
     new HDWalletProvider(mnemonic, "https://sepolia.infura.io/v3/<INFURA_WEB3_API_KEY>", 2);
     ```

     (Recall that the index is zero-based, so `2` is the third address.)

## Use an ether faucet

Make sure you have enough ether in your account to do the deployment. You can acquire ether on the Sepolia network through a service known as a faucet. While there are multiple faucet sites out there, one service we recommend is hosted by [Infura](https://infura.io/).

1. Navigate to [Infura's Sepolia Testnet Ether Faucet](https://www.infura.io/faucet/sepolia).

1. Connect to the Sepolia Test Network using [MetaMask](https://metamask.io/).

1. The faucet will link to your first account. Click "RECEIVE ETH" to submit your request.

1. Within a short period of time, your account will be populated with the requested ether.

We are now ready to deploy to Sepolia!

## Deploy the contract

1. Compile your project, if not already done:

   ```shell
   truffle compile
   ```

1. Deploy to the Sepolia network:

   ```shell
   truffle migrate --network sepolia
   ```

   If all goes well, you should see a response that looks similar to the following:

```
Starting migrations...
======================
> Network name:    'sepolia'
> Network id:      11155111
> Block gas limit: 0x6691b7


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x166c1791caa73cca6a75fe4258866bd1f2d1bcf2cd4c3a2a1e03fab29c42829d
   > Blocks: 0            Seconds: 0
   > contract address:    0x5ccb4dc04600cffA8a67197d5b644ae71856aEE4
   ......
   ......
```

Note that your transaction hash and contract address will be different from the ones above.

<p class="alert alert-info">
   <strong>Note</strong>: If you receive an error `Error: Exceeds block gas limit
   `, you may need to manually set the gas limit for your contract. See the [Truffle Configuration](/docs/truffle/reference/configuration) documentation for details.
</p>

If you want to verify that your contract was deployed successfully, you can check this on the [Sepolia section of Etherscan](https://sepolia.etherscan.io/). In the search field, type in the transaction ID for your contract.

You should see details about the transaction, including the block number where the transaction was secured.

Congratulations! You've deployed your contract to Sepolia using the combined power of Infura and Truffle.
