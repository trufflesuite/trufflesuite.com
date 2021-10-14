---
hide:
  - navigation
---

# Filecoin Box

![box-artwork](https://github.com/truffle-box/filecoin-box/blob/master/box-img-sm.png?raw=true)

Welcome to the Filecoin box. The goal of this box is to both get you hands-on with all the official Filecoin support available within Truffle and Ganache, and to kick-start your journey into the Filecoin ecosystem and the benefits that robust decentralized storage can bring to your DApps.

The context of the box is that of a decentralized art gallery. It comprises both [Lotus](https://docs.filecoin.io/reference/lotus-api/) and [IPFS](https://ipfs.io/) nodes (simulating the process of creating a storage deal), an Ethereum node (for the deployment of the [ERC-721](https://docs.openzeppelin.com/contracts/3.x/) based NFT contracts) and a [front-end](#gallery-ui) for viewing the gallery and the assets decentrally stored within.

## Requirements

The Filecoin box has the following requirements:

- [Node.js](https://nodejs.org/) 12.x or later
- [NPM](https://docs.npmjs.com/cli/) version 5.2 or later
- Windows, Linux or MacOS

## Installation

```bash
$ truffle unbox filecoin
$ npm install
```

## Setup

### Running Filecoin Ganache

Once installed, you can run Filecoin Ganache with the following command:

```bash
$ npx ganache filecoin
```

This creates 10 accounts, each loaded with 100 [FIL](https://docs.filecoin.io/reference/#wallets), and displays both their account addresses and associated private keys.

```bash
Available Accounts
==================
(0) t3rvcqmc5otc3sh3cngqg2ttzcu7ezpco466lbafzaoygxvnzsw7e7n2zbjwhiv5fdzhs6uxm2qckwt6lp5wga (100 FIL)
(1) t3s3la37547tijmoeiep7ktogws3tep2eqrralh7rhi2mpe46q574gceyy467356onblzvwf7ejlelo2rdsg4q (100 FIL)
(2) t3wk7a46e2dcqb7qxeuz2zq7wodwycdgtbgdpr37hhvelfilf5yvssg5xbsolgusqsumomtmtqhnobh4carhyq (100 FIL)
...
```

It also starts the Lotus and IPFS daemons running over `http` and `ws` respectively:

```bash
Lotus RPC listening on 127.0.0.1:7777
IPFS  RPC listening on 127.0.0.1:5001
```

### Optionally running the Filecoin Ganache GUI

An alternative to running Filecoin Ganache via the CLI is to use Filecoin Ganche UI. As per the screenshot below, this exposes all the core Filecoin protocol elements as tabs which is particularly useful if you're just starting out.

![filecoin-ganache-ui](https://github.com/truffle-box/filecoin-box/blob/master/screenshots/filecoin-ganache-ui.png?raw=true)

Filecoin Ganche UI can be downloaded [here](https://github.com/trufflesuite/ganache/releases/tag/v2.6.0-beta.3). 

### Running the Filecoin Network Explorer

> Note that these steps will be changing (merging branch into master / main, webpack, truffle plugin, etc).

```bash
$ git clone https://github.com/trufflesuite/filecoin-network-inspector
$ npm install
$ git checkout ganache-changes
$ npm run start
```

Assuming it's running correctly, you can open the Filecoin Network Explorer at the following: http://localhost:3000

### Running Ethereum Ganache

```bash
$ npx ganache ethereum
```

```bash
RPC Listening on 127.0.0.1:8545
```

## Creating Storage Deals

A [storage deal](https://docs.filecoin.io/store/lotus/store-data/#find-a-miner) is an agreement between a client and a storage miner to store some data in the network for a given duration. Note that while in the case of Filecoin's mainnet, a deal must be secured with a miner before data is stored, in Filecoin Ganache a deal is reached automatically.

### Via the Filecoin Network Explorer

The simplest way to store data, open the Filecoin Network Explorer and navigate to the "Market" tab. From here you can select a file by clicking "Choose File" followed by "Upload to the Filecoin Network".

### Via Truffle Preserve

[Truffle](https://www.trufflesuite.com/docs/truffle/overview) now has a `preserve` command which allows for the 'preservation' of files directly from the Truffle CLI. This is currently experimental and thus on specific branch; installation details available at [here](https://www.trufflesuite.com/blog/announcing-collaboration-with-filecoin).

Once installed, you'll be able to preserve your assets via the following command. Note that you'll need to include the `environments` object in your `truffle-config.js` to point at the respective node (although these are already preconfigured in the box).

```
$ truffle preserve --environment development ./assets/ --filecoin
```

For broader help with this command run `truffle help preserve`.

### Via Curl (or equivalent)

Lastly, you can send the following `curl` request directly to the Lotus RPC. Note that the you'll need to update both the wallet address (`t3s3la3754...`) and CID (`QmZTR5bcpQ...`).

```bash
curl -X POST \
     -H 'Content-Type: application/json' \
     -d '{"jsonrpc":"2.0","id":0,"method":"Filecoin.ClientStartDeal","params":[{"Data":{"TransferType":"graphsync","Root":{"/":"QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V"},"PieceCid":null,"PieceSize":0},"Wallet":"t3s3la37547tijmoeiep7ktogws3tep2eqrralh7rhi2mpe46q574gceyy467356onblzvwf7ejlelo2rdsg4q","Miner":"t01000","EpochPrice":"2500","MinBlocksDuration":300}]}' \
     http://localhost:7777/rpc/v0
```

## Minting an NFT

In the example below, we've already created a deal for the 3 assets (metadata, thumbnail, and the original asset respectively) that comprise our NFT. These are as follows, with their corresponding CIDs.

- metadata ([QmS4t7rFPxaaNriXvCmALr5GYRAtya5urrDaZgkfHutdCG](https://ipfs.io/ipfs/QmS4t7rFPxaaNriXvCmALr5GYRAtya5urrDaZgkfHutdCG))
- thumbnail - ([QmbAAMaGWpiSgmMWYTRtGsru382j6qTVQ4FDKX2cRTRso6](https://ipfs.io/ipfs/QmbAAMaGWpiSgmMWYTRtGsru382j6qTVQ4FDKX2cRTRso6))
- asset - ([QmUWFZQrJHfCVNHXVjjb2zeowVvH7dC6rKpbdHsTdnAgvP](https://ipfs.io/ipfs/QmUWFZQrJHfCVNHXVjjb2zeowVvH7dC6rKpbdHsTdnAgvP))

Assuming the local Ethereum Ganache node is running, you'll be able to open a console and mint a new NFT with the following steps. As the base URL is set to that of an IPFS gateway, we'll just need to pass in the CID to the asset metadata.

```bash
$ truffle console
truffle(development)> const gallery = await MyGallery.deployed()
truffle(development)> gallery.mint(accounts[0], "QmS4t7rFPxaaNriXvCmALr5GYRAtya5urrDaZgkfHutdCG")
```

In the above example the owner of the NFT is set (via `accounts[0]`) to that of the first account generated by the mnemonic. If we want to transfer it to a new owner, we'll be able to do so with the following.

### Transferring Ownership

```bash
$ truffle console
truffle(development)> gallery.transferFrom(accounts[0], accounts[1], 1)
```

## Gallery UI

A sample gallery interface is available [here](https://truffle-box.github.io/filecoin-box/).

![sample-ui](https://github.com/truffle-box/filecoin-box/blob/master/screenshots/sample-ui.png?raw=true)

You can use the following steps to run this locally...

```
$ cd ui
$ npm install
$ npm run start
```

## Support

Support for this box is available via the Truffle community available [here](https://www.trufflesuite.com/community). In addition, Filecoin support is available [here](https://filecoin.io/).