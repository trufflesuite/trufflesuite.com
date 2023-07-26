---
title: What is Truffle Dashboard?
---

<img style="max-width: 160px;" src="/img/docs/truffle-dashboard/index/truffle-dashboard-logo.svg" alt="Truffle Dashboard Logo" />

# What is Truffle Dashboard?

When deploying your smart contracts you need to specify an Ethereum account that has enough funds to cover the transaction fees of the deployment. A popular method of doing this is copy-pasting your mnemonic phrase to a gitignored .env file so that it can be used for, e.g., the @truffle/hdwallet-provider. However, it is generally a bad practice to copy-paste your keys, especially since we have wallets like MetaMask that can send transactions for us.

We developed the Truffle Dashboard to provide an easy way to use your existing MetaMask wallet for your deployments and for other transactions that you need to send from a command line context. Because the Truffle Dashboard connects directly to MetaMask it is also possible to use it in combination with hardware wallets like Ledger or Trezor.

Truffle Dashboard is a platform for dapp developers to get insights about smart contracts and their transactions.

Today it has 2 main features:

- Transaction Inspection and Signing: Developers primarily benefit from this by no longer having to manage their own private keys. By using Dashboard as their provider during development, transactions sent from their CLI, tests, and dapp frontend will be intercepted for inspection and signing with MetaMask. Inspection includes the decoded function name, supplied parameters, and more, in addition to the option to debug the transaction. This feature could be completely consumed by MetaMask.
- Transaction Debugging: Dashboard’s GUI debugger is easier to use than a CLI debugger and is conveniently integrated into the transaction signing workflow. Truffle’s debugger supports older versions of Solidity and better decoding than competing debuggers such as Tenderly’s. Importantly for us, the debugger supplies us with data to extract more readily consumable insights, like revert locations and gas usage information.
