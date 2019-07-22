---
title: Truffle | Ethereum Name Service
layout: docs.hbs
---
# Ethereum Name Service

Truffle has a built-in Ethereum Name Service (ENS) integration. The Ethereum Name Service is a system that allows you to map human readable names to Ethereum addresses or other resources. For more information on this, see the [ENS website](https:\/\/ens.domains). It allows you to resolve ENS names and to use them in your transactions parameters. Wherever you can use an address in your transaction parameters, you can use an ENS name as long as you are able to connect successfully to an ENS registry.

## Configuration

In your Truffle config (`truffle-config.js`) you can specify an `ens` property. To use ENS resolution you must at least set `ens.enabled` to `true`. The simplest configuration you would have is the following in your Truffle config:

```javascript
module.exports = {
  ens: {
    enabled: true
  }
}
```

With the above config, you would be able to resolve names on Mainnet, Ropsten, Rinkeby, and Goerli. Truffle connects to these "official" ENS-deployed registries if it finds them. If you need to specify a different registry, you can enter it in your config for the `ens.registryAddress` property. This would look like:

```javascript
module.exports = {
  ens: {
    enabled: true,
    registryAddress: "0x1234567890123456789012345678901234567890"
  }
}
```

It must be noted that the registry address you supply needs to agree with whatever provider is present otherwise ENS resolution will not work. In other words, if you supply a provider for Kovan, you must also supply a registry address for an ENS registry on the Kovan network. As was stated above, however, you do not need to supply a registry address for the above networks unless you want to use a custom ENS registry.

## deployer.ens.setAddress()

As part of this ENS integration, a new `ens` module is available on the deployer for Truffle. Currently there is a single method on this module named `setAddress`. If you own a domain name, you can use this method to deploy a resolver and set its address. If the resolver already exists, it will set the address that it references if it is not the same as the input address.

The signature for this method is `setAddress(<string: name>, <string|truffle contract instance: addressOrContract>, <string: from)`. A quick explanation of these parameters follows:

  - The name parameter describes the name for which to set the resolver address. This name will look something like "myName.eth".

  - The addressOrContract parameter must either be a string or a Truffle contract object that has an address property. If it is a string it must be an Ethereum address. If a Truffle contract has been deployed on the network you are using, then you can use that object as an argument. It will use that contract's address to set the resolver target.

  - The from parameter is the address that you want to send the transaction from. This must be the address that owns the domain in question. If this address does not own the domain then the transaction will fail.

## Dev mode

Another feature of this integration is that ability to deploy an ENS registry on a test network. This would be useful when developing locally and testing. If Truffle cannot connect to an ENS registry on the network you are using, it will check to see if you have "dev mode" enabled. If you do, it will attempt to deploy a new registry on the network. It will also edit permissions for that registry such that whatever name you are using for `setAddress` will be owned by the from address provided as the third parameter to `setAddress`. Currently this feature only supports domain names with one "label" like "test" or "truffle".

To enable "dev mode", you must configure it in your Truffle config. This is as simple as setting `ens.devMode` to true. An example is as follows:


```javascript
module.exports = {
  ens: {
    enabled: true,
    devMode: true
  }
}
```
