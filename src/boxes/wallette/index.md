---
hide:
  - navigation
---

# Wallette

Wallette is Multi-Signature Ethereum wallet that utilizes the [Magic SDK](https://docs.magic.link/) for the user authentication. This allows the user to interact with the Rinkeby (Ethereum testnet) without cumbersome passkeys or addresses. Besides Rinkeby, Magic also supports Ropsten, Kovan, and a [custom node](https://docs.magic.link/blockchains/ethereum#use-different-networks). The contract the web app interacts with is included in the contracts folder.

## Installation

Ensure that the following tools are installed:

- Node Package Manager `npm`
- [Truffle](https://www.trufflesuite.com/) `truffle` (If planning on modifying/compiling contract)

Then make a clean install of the npm modules:
```bash
yarn install
```

### `.env` Setup

Create .env file in the root folder of the project. In order to run the project you need an enviroment variable called `MagicKey`. This is where your Magic API key should go.

You can create an account and get API keys from the [Magic Dashboard](http://dashboard.magic.link/)

The .env should include:
```
MagicKey="YOUR_API_KEY"
```

# Usage

To launch on localhost:

```bash
yarn start
```

This should open a webpage at http://localhost:3000/

## Features

Wallette has the login page which authenticates using the [Magic SDK](https://docs.magic.link/). The [DID Token](https://docs.magic.link/decentralized-id) given for the session contains the information neccessary for the web app to do ether transactions.

### **Tabs**

**Assets:** displays the amount of ether that is currently stored on the smart contract that is deployed. The address of the contract is written above the table.

**Allowed List:** shows a table of all the ethereum addresses that are part of the allowed list of the smart contract. At the bottom of the page new addresses can be added along with 

**Transactions:** shows a dropdown table with all the transactions on the smart contract, with the ability to sign and view each transaction. At the bottom of the page new transactions can be started. All transactions have a approval threshold of 3 (once 3 users sign the transaction, the transactions is sent to the recipient).

# Tests

The react-scripts test tool is used for the unit testing-stack.

To run unit tests:

```bash
yarn test
```

To run a coverage test:

```bash
yarn coverage
```

# Authors and Acknowledgment

This repository was produced by students from the [University of Michigan](https://umich.edu/) in collaboration with [Fortmatic](https://fortmatic.com/) (by [Magic Labs](https://trymagic.com/)):
- Sangil Lee (iisangil) - iisangil@umich.edu
- Sai Pavan Yerra (spvyerra) - spvyerra@umich.edu
- Helen Gao (hegaoo) - hegao@umich.edu
