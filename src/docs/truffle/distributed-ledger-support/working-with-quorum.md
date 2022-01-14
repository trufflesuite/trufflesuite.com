---
title: Working With Quorum
layout: docs.hbs
---
# Working With Quorum
Truffle supports development with Quorum, a version of Ethereum that adds new features on top of what Ethereum already provides. Specifically, **Quorum adds the ability to create private blockchains between select participants, and more importantly adds transaction privacy on top of normal Ethereum transactions.**

It is highly recommended you read our [tutorial on building a dapp on Quorum](/guides/building-dapps-for-quorum-private-enterprise-blockchains) before using Truffle with Quorum.

Both the tutorial and this page have been updated for *at least* version `5.0.9` of `truffle`.

## Known Issues
- Quorum support was completely broken in version `5.0.0`, and basic support was restored in `5.0.9`. Make sure you have at least `5.0.9`.
- Privacy support (via `privateFor`) has been restored in `5.0.14`. You must use at least `5.0.14` or `v4` (`npm i -g truffle@v4`) to use privacy features.

## Configuration
To use Quorum, you must modify your network in `truffle-config.js` to include a parameter `type` set to `"quorum"`. See the example below.

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 22000, // replace with quorum node port you wish to connect to
      network_id: "*",
      type: "quorum"
    }
  }
};
```

## Using Privacy Features
Privacy features have been restored in Truffle `5.0.14`. They are also available in `v4`.

Please refer to the [Quorum tutorial](/guides/building-dapps-for-quorum-private-enterprise-blockchains) to learn more about how to use the privacy features within Quorum. Here are some quick references for privacy within the tutorial:
- [Deploying contracts privately](/guides/building-dapps-for-quorum-private-enterprise-blockchains#deploying-smart-contracts-on-quorum)
- [Making transactions private](/guides/building-dapps-for-quorum-private-enterprise-blockchains/#using-quorums-privacy-features-to-make-transactions-private)
- [Interacting with your contracts privately](/guides/building-dapps-for-quorum-private-enterprise-blockchains#interacting-with-contracts-privately).
