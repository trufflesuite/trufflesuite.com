---
hide:
  - navigation
---

# tomochain-box

A truffle box to easily start with smart contract deployment on TomoChain.

Testnet and Mainnet networks as well as the 10 TOMO deployment fee are already configured.

## Installation

Install truffle and truffle HDWalletPriovider.

```
npm install -g truffle truffle-hdwallet-provider
```

Open that truffle box.

```
truffle unbox etienne-napoleone/tomochain-box
```

## Configuration

Add the mnemonic of your founded account (more than 10 TOMO) to the `.mnemonic` file.

**Attention:** A gitignore was automatically created to ignore the `.mnemonic` file.
Please be careful to never version it!

## Usage

Develop your smart contracts, migrations and tests as usual.
You can then deploy directly on the TomoChain network of your choice.

```bash
truffle test
truffle compile
truffle deploy --network testnet  # or mainnet
```
