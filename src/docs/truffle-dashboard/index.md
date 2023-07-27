---
title: What is Truffle Dashboard?
---

<img style="max-width: 160px;" src="/img/docs/truffle-dashboard/index/truffle-dashboard-logo.svg" alt="Truffle Dashboard Logo" />

# What is Truffle Dashboard?

Truffle Dashboard is a platform for smart contract developers to safely execute and get insights about their transactions. It supports both Truffle and Hardhat. Truffle Dashboard to provides an easy way to use your existing MetaMask wallet for your deployments and for other transactions that you need to send from a command line context.

Today it has 2 main features:

- **Transaction Inspection and Signing**: By using Dashboard as your provider during development, transactions sent via a CLI (Truffle or Hardhat), tests, and/or dapp frontend will be intercepted for inspection and signing with MetaMask. Inspection includes the decoded function name, supplied parameters, and the ability to debug the transaction before execution. Because the Truffle Dashboard connects directly to MetaMask it is also possible to use it in combination with hardware wallets like Ledger or Trezor.  
  [Get started with Truffle Dashboard &raquo;](/docs/truffle-dashboard/quickstart)
- **Transaction Debugging**: Step through the execution of a transaction to diagnose errors and check for potential exploits. Dashboard’s GUI debugger is easier to use than a CLI debugger and is conveniently integrated into the transaction signing workflow--just click the Debug button on an awaiting confirmation. Truffle’s debugger supports older versions of Solidity and better decoding than competing debuggers.  
  [Learn more about debugging transactions with Truffle Dashboard &raquo;](/docs/truffle-dashboard/truffle-dashboard-debugger)
