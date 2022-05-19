---
title: Filecoin-flavored NodeJS Library
layout: docs.hbs
---
# Get Started With using the Filecoin-flavored Ganache as a NodeJS Dependency

## Requirements

Using the Filecoin-flavored Ganache NodeJS module requires [NodeJS](https://nodejs.org) version `12.13.0` or later.

You can check your current version by running:

```bash
node --version
```

## Installation

If you're using Filecoin-flavored Ganache as a NodeJS dependency, you need to make sure you install both the `ganache` package (with the `filecoin` tag) and the `@ganache/filecoin` package.

```bash
# install the base Ganache package
npm install ganache@filecoin

# install the Filecoin peer dependency package
npm install @ganache/filecoin
```

## Usage

In your code, you will `import`/`require` the `ganache` package directly to instantiate the Filecoin flavor. Below is an example on how to do that with the default [options](#startup-options).

``` javascript
import Ganache from "ganache";

const startupOptions = {
  flavor: "filecoin";
}

// Provider usage
const provider = Ganache.provider(startupOptions);
const result = await provider.send({
  jsonrpc: "2.0",
  id: "0",
  method: "Filecoin.Version",
  params: []
});

// Server usage (starts up a HTTP and WebSocket server)
const server = Ganache.server(startupOptions);
server.listen(7777, () => {
  console.log("Lotus RPC endpoint listening at http://localhost:7777/rpc/v0");
});
```

## Configuration

See the [web documentation](/docs/filecoin/ganache/getting-started/get-started-with-nodejs#configuration) for more details on the available NodeJS options.

Like the above [usage example](#usage) where `{ flavor }` was provided in `startupOptions`, the options in the web documentation are provide `flavor`. For example:

``` json5
{
  "flavor": "filecoin",
  "chain": {
    /* ... */
  },
  "database": {
    /* ... */
  },
  "logging": {
    /* ... */
  },
  "miner": {
    /* ... */
  },
  "wallet": {
    /* ... */
  }
}
```
