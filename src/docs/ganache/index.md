---
title: Ganache | Overview
layout: docs.hbs
---

<div class="text-center">
  <img style="max-width: 160px;" src="/img/ganache-logo-dark.svg" alt="Ganache Logo" />
</div>

# What is Ganache?

[Ganache](/ganache) is a personal blockchain for rapid Ethereum and Filecoin distributed application development. You can use Ganache across the entire development cycle; enabling you to develop, deploy, and test your dApps in a safe and deterministic environment.

Ganache comes in two flavors: a UI and CLI. Ganache UI is a desktop application supporting Ethereum and Filecoin technology. Our more robust command-line tool, [ganache](https://github.com/trufflesuite/ganache), is available for Ethereum development. It offers:

- `console.log` in Solidity
- Zero-config Mainnet and testnet forking
- Fork any Ethereum network without waiting to sync
- Ethereum JSON-RPC support
- Snapshot/revert state
- Mine blocks instantly, on demand, or at an interval
- Fast-forward time
- Impersonate any account (no private keys required!)
- Listens for JSON-RPC 2.0 requests over HTTP/WebSockets
- Programmatic use in Node.js
- Pending Transactions

Prefer using the command-line? This documentation will focus only on the UI flavor of Ganache. Please see the [Ganache README](https://github.com/trufflesuite/ganache#readme) for command-line documentation.

You can also check out our [interactive documentation](https://ganache.dev) if you'd like to understand how dapps communicate to nodes at the JSON-RPC level (the level at which web3.js and ethers.js communicate with Ethereum nodes).

All versions of Ganache are available for Windows, Mac, and Linux.

<script async defer src="https://buttons.github.io/buttons.js"></script>
