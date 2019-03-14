---
title: Truffle | Working With Quorum
layout: docs.hbs
---
# Working With Quorum
Truffle supports development with Quorum, a version of Ethereum that adds new features on top of what Ethereum already provides. Specifically, **Quorum adds the ability to create private blockchains between select participants, and more importantly adds transaction privacy on top of normal Ethereum transactions.**

It is highly recommended that you read our [tutorial on building a dapp on Quorum](/tutorials/building-dapps-for-quorum-private-enterprise-blockchains) as it goes into more details on working with Quorum.

Both the tutorial and this page have been updated for *at least* version `5.0.9` of `truffle`.

## Known Issues
- Quorum support was completely broken in version `5.0.0`, and basic support was restored in `5.0.9`. Make sure you atleast have `5.0.9`
- The privacy support (via `privateFor`) is still broken in version `5` of Truffle. You must use version `4` (`npm i -g truffle@v4`).

## Configuration
To use Quorum, you must modify your network in `truffle-config.js` to include a parameter `type` set to `"quorum"`. See the example below.

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      type: "quorum"
    }
  }
};
```

## Using Privacy Features
Unfortunately, the privacy features are still not working in version `5` of Truffle. However, they still work in version `4`.

Please refer to the [Quorum tutorial](/tutorials/building-dapps-for-quorum-private-enterprise-blockchains) to learn more about how to use the privacy features within Quorum. Here are some quick references for privacy within the tutorial:
- [Deploying contracts privately](/tutorials/building-dapps-for-quorum-private-enterprise-blockchains#deploying-smart-contracts-on-quorum)
- [Making transactions private](/tutorials/building-dapps-for-quorum-private-enterprise-blockchains#using-quorum-39-s-privacy-features-to-make-transactions-private)
- [Interacting with your contracts privately](/tutorials/building-dapps-for-quorum-private-enterprise-blockchains#interacting-with-contracts-privately).