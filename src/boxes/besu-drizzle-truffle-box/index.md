---
hide:
  - navigation
---

![Drizzle & Hyperledger Besu](https://github.com/EmanHerawy/-besu-io-drizzle-besu-box/blob/master/box-img-sm.png "Drizzle & Hyperledger Besu")

# Drizzle & Hyperledger Besu Truffle Box

This box gives you a boilerplate to get up and running quickly with Drizzle & Truffle on a Hyperledger Besu chain.

## Installation

First ensure you are in a new and empty directory to install our box.

1. Run the `unbox` command with `npx` and skip to step 3. This will install all necessary dependencies. Choose the installation method that works for you.
   ```
   # option 1
   npx truffle unbox EmanHerawy/besu-drizzle-truffle-box

   # option 2
   npm install -g truffle
   truffle unbox EmanHerawy/besu-drizzle-truffle-box
   ```

1. Run the development console. This will instantiate a local chain and put you in a REPL where you can test that Truffle is working properly.
   ```
   truffle develop
   ```

1. Ensure that you're able to compile, test, and migrate your contracts to your local chain.
   ```
   compile
   test
   migrate
   ```

1. If everything looks good, you can exit the Truffle console with `.exit`.

## Run  Hyperledger Besu

1. Clone Besu Quickstart Source Code  `git clone https://github.com/PegaSysEng/besu-quickstart.git`

1. Build Docker Images and Start Services and Network `./run.sh`

1. The `run.sh` script builds the images and runs the containers.

1. When the process ends, it lists the running followed by a list of the endpoints. Note the JSON-RPC HTTP endpoint for later.

1. Migrate your contracts to your Hyperledger Besu chain!
   ```
   truffle migrate --network quickstartWallet
   ```

## Connect MetaMask to your Hyperledger Besu Chain

1. In the `Networks` switcher in MetaMask, choose `Custom RPC`.

1. Find the `New Network` section, and click `Advanced Options`.

1. Enter the JSON-RPC HTTP service endpoint displayed when you started the private network.

## import Besu Accounts to MetaMask

Before sending transactions, you need to create an account or use one of the accounts below which were created during the genesis of this private test network. Please note that with MetaMask 8 you will have to give permissions to these three accounts.

- Account 1 (Miner Coinbase Account)
  - Address: 0xfe3b557e8fb62b89f4916b721be55ceb828dbd73
  - Private key : 0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63
  - Initial balance : 0xad78ebc5ac6200000 (200000000000000000000 in decimal)
- Account 2
  - Address: 0x627306090abaB3A6e1400e9345bC60c78a8BEf57
  - Private key : 0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
  - Initial balance : 0x90000000000000000000000 (2785365088392105618523029504 in decimal)
- Account 3
  - Address: 0xf17f52151EbEF6C7334FAD080c5704D77216b732
  - Private key : 0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f
  - Initial balance : 0x90000000000000000000000 (2785365088392105618523029504 in decimal

## Start Your React App

1. Open the `/app` directory and start the development server.
   ```
   export PORT=30001
   cd app && npm run start
   ```

2. The development server will open a browser at `http://localhost:30001` by default.

3. Attempt to change the `Stored Value` of `SimpleStorage` -- you should see the refresh icon until the transaction is confirmed, at which point the `Stored Value` of `SimpleStorage` should automatically update.

