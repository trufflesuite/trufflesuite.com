---
hide:
  - navigation
---



# SKALE Network Box

![box-artwork](https://github.com/skalenetwork/skale-box/blob/master/truffle-skale.png?raw=true)
  
-  [Overview](#overview)
-  [Requirements](#requirements)
-  [Install](#installation)
-  [Setup](#setup)
	*  [Get a SKALE Chain](#1-get-a-skale-chain)
	*  [Get a Wallet](#2-get-a-wallet)
    	*  [Fund your Wallet with skETH](#fund-your-wallet-with-sketh)
	*  [Update Truffle Config](#3-update-truffle-config)
-  [Deploy to the SKALE Network](#deploy-to-the-skale-network)
-  [Test](#testing)
-  [SKALE Network Resource Links](#resources)
-  [Support](#support)

  ## Overview

Welcome to the SKALE Network Box! This Truffle SKALE Network box provides you with all the basics necessary to kick-start scaling your application with the SKALE Network. You can find out more information about getting started with SKALE within the [Developer Getting Started Guide](https://skale.network/docs/developers/getting-started/beginner).

This box comes with everything you need to start using smart contracts from a react app on the SKALE Network.   

The SKALE Network is fully decentralized, and is supported by a validator community represented by over 48 validator orgs running over 150 nodes. Since the network is EVM compatible, all existing tools built for Ethereum will work directly within the SKALE Network as well. For example, the SKALE Network is fully compatible with the all Ethereum native wallets. Check out the SKALE Network Dev Portal for easy integration scripts fo connecting your favorite wallet, [here](https://skale.network/docs/developers/wallets/getting-started).

For example, connecting MetaMask to SKALE in a seamless way can be seen in this document:

https://skale.network/docs/developers/wallets/metamask

**All SKALE Chains contain the following features:**

* Full EVM Support for Solidity Smart Contracts
* Interchain Messaging for managing Tokens (ETH, ERC20, ERC721, etc.)
* Decentralized Storage
* Integration Support for All Ethereum Tools
* Wallet Support for API and HSM Wallets

Lastly, the SKALE Network uses a [unique combination of several technologies](https://skale.network/blog/technical-highlights) to achieve scalability, security, interoperability, and progressive decentralization:

| Technology | Impact |
|--|--|
| Pooled Validation Proof-of-Stake | [Scalable security model across validators and delegators](https://skale.network/blog/the-skale-network-why-randomness-rotation-and-incentives-are-critical-for-secure-scaling/) |
|Hybrid Container Architecture | [Agile allocation of on-demand composable compute resources across the network](https://skale.network/blog/containerization-the-future-of-decentralized-infrastructure/) |
| Threshold Cryptography | Supermajority signature signing with ABBA consensus supports Byzantine Fault Tolerance and resolves [data-availability](https://skale.network/blog/the-data-availability-problem/) issues |
| Trusted-Execution Environment | [Fast block signing and multiple chain support using threshold cryptography](https://github.com/skalenetwork/SGXWallet) |
| Asynchronous Binary Byzantine Agreement (ABBA) Consensus | [Mathematically provable, fast-finality, leaderless, and Byzantine Fault Tolerant](https://skale.network/blog/skale-consensus/) |
| Ethereum Network | Public, open-source, and decentralized operation of the SKALE Network via SKALE Manager contracts |

## Requirements

The SKALE Network box has the following requirements:

- [Node.js](https://nodejs.org/) 12.x or later
- [NPM](https://docs.npmjs.com/cli/) version 5.2 or later
- Windows, Linux or MacOS

## Installation

```bash

$ truffle unbox skalenetwork/truffle-skale-network-box
$ npm install

```

## Setup

###  1) Get a SKALE Chain

The SKALE Network is a multichain platform, and there are many ways to get access to the SKALE Network testing environments. To obtain your SKALE Chain endpoint and Chain ID, check out the [SKALE Network getting started guide](https://skale.network/docs/developers/getting-started/beginner).

> Alternatively, for faster testing please feel free to use the available community SKALE Chains listed [here](https://forum.skale.network/t/skale-chain-sdk).

### 2) Get a Wallet
The SKALE Network works with a variety of wallet solutions. If you already have a wallet and private key to use, you can skip this step and go to the next section: [Update Truffle Config](#update-truffle-config).

You can pick and setup your favorite wallet from the documentation [here](https://skale.network/docs/developers/wallets/getting-started).

We recommend starting with MetaMask, and obtaining a wallet address and private key to use for testing from the [MetaMask wallet](https://metamask.io/).

#### Fund your Wallet with skETH
SKALE Chains enable dApps to run gasless transactions. This provides an effective way to scale your dApp not only for speed but also to scale economically. However, SKALE Chains do require skETH to conduct transactions – this skETH is SKALE Chain "fake" ETH with no economic value, but provides a way for dApps to facilitate permissive access to SKALE Chains and protects against DDoS attacks.

You can learn more about skETH [here](https://skale.network/docs/developers/skale-chain-eth).

> If you are using the community SKALE Chains, you can simply head over to the SKALE testnet faucet to obtain skETH for using your SKALE Chain. You will need both your SKALE Chain endpoint and your wallet address to obtain skETH from the faucet. 

### 3) Update Truffle Config

You can add the SKALE Chain endpoint and private key directly into the `truffle-config.js` file by replacing the following:

```
const  privateKey = process.env.PRIVATE_KEY;
const  skale = process.env.SKALE_CHAIN;
```

For example:
```
const  privateKey = "0x0000000000000000000000000000000000000000000000000000000000000000";
const  skale = "https://this-is-my-skale-chain.com:1234";
```

A more secure way would be to leave the `truffle-config.js` as is, and create a `.env` file at the root directory of your project to hold onto your private key and SKALE Chain endpoint.

Your `.env` file should look like:

```
SKALE_CHAIN=https://this-is-my-skale-chain.com:1234 
PRIVATE_KEY=0x0000000000000000000000000000000000000000000000000000000000000000
```

To learn more about using environment variables within a `.env` file plese see:

https://www.npmjs.com/package/dotenv

#### Using a mnemonic

If you'd prefer to use a mnemonic (vs a private key), you can just omit the `PRIVATE_KEY` entry in your `.env` file and include a `MNEMONIC` entry instead. Note that `HDWalletProvider` will use the first account that's generated from the mnemonic. For example:

```
SKALE_CHAIN=https://this-is-my-skale-chain.com:1234 
MNEMONIC=test test test test test test test test test test test test
```

## Deploy to the SKALE Network
You can use Truffle to compile and migrate your smart contracts to the SKALE Network. The following command will compile and migrate the smart contract(s) to SKALE:

```
truffle migrate --network skale --compile-all --config=truffle-config.skale.js
```


For more information on available Truffle commands, please see the Truffle documentation here:

https://www.trufflesuite.com/docs/truffle/reference/truffle-commands



## Testing
Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.

   ```
   // inside the truffle development console.
   test --network skale --config=truffle-config.skale.js

   // outside the truffle development console.
   truffle test --network skale --config=truffle-config.skale.js
   ```
## Resources

**SKALE Network Resources Links**
- [Website](https://skale.network)
- [Blog](https://skale.network/blog)
- [Github](https://github.com/skalenetwork)
- [Whitepaper](https://skale.network/whitepaper)
- [Developer Docs](https://skale.network/docs/developers/overview)

**SKALE Network Community Links**
- [Discord](http://skale.chat)
- [Twitter](https://twitter.com/skalenetwork)
- [Telegram](https://t.me/skaleofficial)

## Support

Support for this box is available via the Truffle community [here](https://www.trufflesuite.com/community). In addition, SKALE Network support is available [here](http://skale.chat).
