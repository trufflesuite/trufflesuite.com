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
      eventName
    ]
  },
  polls: {
    accounts: interval,
    blocks: interval
  },
  web3: {
    fallback: {
      type
      url
    }
  }
}
```
### `contracts` (array, required)
An array of contract artifact files.

### `events` (object)
An object consisting of contract names each containing an array of strings of the event names we'd like to listen for and sync with the store.

### `polls` (object)
An object containing key/value pairs denoting what is being polled and the interval (in ms). Possible polls are accounts and blocks. Accounts will poll for addresses and balances, blocks for new blocks. Blocks default to 3000. For example: `polls: { accounts: 1500 }`.

### `web3` (object)
Options regarding `web3` instantiation.

#### `fallback` (object)
An object consisting of the type and url of a fallback web3 provider. This is used if no injected provider, such as MetaMask or Mist, is detected.

`type` (string): The type of web3 fallback, currently `ws` (web socket) is the only possibility.

`url` (string): The full websocket url. For example: `ws://127.0.0.1:8546`.