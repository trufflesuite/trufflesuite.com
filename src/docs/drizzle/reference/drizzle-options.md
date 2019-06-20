---
title: Drizzle | Drizzle Options
layout: docs.hbs
---
# Drizzle Options

```javascript
{
  contracts,
  events: {
    contractName: [
      eventName,
      {
        eventName,
        eventOptions
      }
    ]
  },
  polls: {
    accounts: interval,
    blocks: interval
  },
  syncAlways,
  web3: {
    customProvider,
    fallback: {
      type
      url
    }
  }
}
```

### `contracts` (array)
An array of either contract artifact files or Web3 contract objects. The objects have a `contractName` and `web3Contract` key.

i.e.

```
contracts: [
  truffleArtifact, // A regular Truffle contract artifact
  {
    contractName: 'RegisteredContract',
    web3Contract: new web3.eth.Contract(abi, address, {data: 'deployedBytecode' }) // An instance of a Web3 contract
  }
]
```

### `events` (object)
An object consisting of contract names each containing an array of strings of the event names we'd like to listen for and sync with the store. Furthermore, event names may be replaced with an object containing both `eventName` and `eventOptions`, where `eventOptions` field corresponds to the [web3 Contract.events options](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#contract-events).

### `polls` (object)
An object containing key/value pairs denoting what is being polled and the interval (in ms). Possible polls are accounts and blocks. Accounts will poll for addresses and balances, blocks for new blocks. **Default**: `{ blocks: 3000 }`

### `syncAlways` (boolean)
If `true`, will replay all contract calls at every block. This is useful if your dapp uses a proxy contract which obfuscates your primary contract's address. By default Drizzle checks blocks to see if a transaction interacting with your contracts has occured. If so, it syncs that contract. **Default**: `false`

### `web3` (object)
Options regarding `web3` instantiation.

#### `customProvider` (object)
A valid web3 `provider` object. For example, you may wish to programatically create a Ganache provider for testing:

```
// Create a Ganache provider.
const testingProvider = Ganache.provider({
  gasLimit: 7000000
})

const options = {
  web3: {
    customProvider: testingProvider
  }
}

const drizzle = new Drizzle(options)
```

#### `fallback` (object)
An object consisting of the type and url of a fallback web3 provider. This is used if no injected provider, such as MetaMask or Mist, is detected.

`type` (string): The type of the fallback web3 provider. Currently the only possibility is `'ws'` (web socket). **Default**: `'ws'`

`url` (string): The full fallback web3 provider url. **Default**: `'ws://127.0.0.1:8545'`