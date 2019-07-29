---
title: Truffle | Ethereum Name Service
layout: docs.hbs
---
# Ethereum Name Service

Truffle has a built-in Ethereum Name Service (ENS) integration. ENS is a
mechanism that allows for the mapping of human readable names to Ethereum
addresses or other resources. With ENS enabled, Truffle allows you to use ENS
names when interacting with your contracts and it will resolve them for you.
Wherever you can use an address in your transaction parameters, you can use an
ENS name as long as you are able to connect successfully to an ENS registry.

For more information on the Ethereum Name Service, see the
[ENS website](https://ens.domains).

## Configuration

In order to use ENS features in your project, you must first enable it in your
Truffle config (`truffle-config.js`). In the config, you must specify an `ens`
property and set `ens.enabled` to `true`. The simplest configuration you would
have is the following in your Truffle config:

```javascript
module.exports = {
  ens: {
    enabled: true
  }
}
```

By default, Truffle connects to the official, ENS-deployed registries.
These four registries can be found on:

  - Mainnet

  - Ropsten

  - Rinkeby

  - Goerli

If a valid provider is supplied for one of these four networks, Truffle will
connect and use the official registry for that particular network; that is,
unless a different registry address is specified in the config. If you need
to specify a different registry, you can enter it in your config for the
`<networkName>.ens.registry.address` property. If your network name were
`myNetwork` then this might look like:

```javascript
module.exports = {
  networks: {
    myNetwork: {
      host: "localhost",
      port: 8000,
      network_id: "*",
      registry: {
        address: "0x1234567890123456789012345678901234567890"
      }
    }
  },
  ens: {
    enabled: true
  }
}
```

If you are not connected to one of the above four networks and do not supply
a registry address. Truffle will attempt to deploy a registry for you to
use. See the section below on
[automatic registry deployment](#automatic-registry-deployment) for more information.

It must be noted that the registry address you supply needs to agree with
whatever provider is present otherwise ENS resolution will not work. In
other words, if you supply a provider for Kovan, you must also supply a
registry address for an ENS registry on the Kovan network (since Kovan
does not have an official ENS registry deployment). As was stated
above, however, you do not need to supply a registry address for the [above
networks](#configuration) unless you want to use a custom ENS registry.

## deployer.ens.setAddress()

As part of this ENS integration, a new `ens` module is available on the
deployer object available during migration functions. Currently there is a
single method on this module named `setAddress`. If you own a domain name,
you can use this method to deploy a resolver and set its address. If the
resolver already exists, it will set the address that the resolver references
if it is not the same as the input address.

The signature for this method is
`setAddress(name: string, addressOrContract: string | TruffleContractInstance>, from: string)`.

A quick explanation of these parameters follows:

  - The `name` parameter describes the name for which to set the resolver
  address. This name will look something like "myName.eth".

  - The `addressOrContract` parameter must either be a string or a Truffle
  contract object that has an address property. If it is a string it must
  be an Ethereum address. If a Truffle contract has been deployed on
  the network you are using, then you can use that object as an argument.
  It will use that contract's address to set the resolver target.

  - The `from` parameter is the address that you want to send the transaction
  from. This must be the address that owns the domain in question. If this
  address does not own the domain then the transaction will fail.

## Automatic registry deployment

Another feature of this integration is the ability to deploy an ENS registry on
a network. This would be useful when developing locally and testing. If
Truffle cannot connect to an ENS registry on the network you are using, it
will check to see if you have "dev mode" enabled. If you do, it will attempt
to deploy a new registry on the network you are running a migration on. It
will also set ownership for the names used in calls to `setAddress` such
that those calls will be successful.
