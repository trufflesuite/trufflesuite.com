---
title: Work with Hyperledger EVM
layout: docs.hbs
---
# Work with Hyperledger EVM

As of version `5.0.27`, Truffle supports development with Hyperledger Fabric's EVM chaincode, a **permissioned** version of Ethereum.

## Configuration

To use Fabric EVM, you must modify your network in `truffle-config.js` to include a parameter `type` set to `"fabric-evm"`. See the example below.

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 5000, // default Fab3 port
      network_id: "*",
      type: "fabric-evm"
    }
  }
};
```
