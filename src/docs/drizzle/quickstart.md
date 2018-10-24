---
title: Drizzle | Drizzle Quickstart
layout: docs.hbs
---
# Drizzle Quickstart

## Installation

Install Drizzle via npm:
```
npm install --save drizzle
```

**Using React?**: The easiest way to get started with Drizzle is to use our [official `drizzle-react` package](https://github.com/trufflesuite/drizzle-react) and (optionally) its [companion `drizzle-react-components`](https://github.com/trufflesuite/drizzle-react-components).

## Initialization

<p class="alert alert-info m-t-2">
<strong>Note</strong>: Since Drizzle uses web3 1.0 and web sockets, be sure your development environment can support these. As a development blockchain, you'll need `ganache-cli` v6.1.0+, `geth` or `parity`.
</p>

1. Import the provider.
   ```javascript
   import { Drizzle, generateStore } from 'drizzle'
   ```

1. Create an `options` object and pass in the desired contract artifacts for Drizzle to instantiate. Other options are available, see [the Options section](./reference/drizzle-options).
   ```javascript
   // Import contracts
   import SimpleStorage from './../build/contracts/SimpleStorage.json'
   import TutorialToken from './../build/contracts/TutorialToken.json'

   const options = {
     contracts: [
       SimpleStorage
     ]
   }

   const drizzleStore = generateStore(this.props.options)
   const drizzle = new Drizzle(this.props.options, drizzleStore)
   ```

<p class="alert alert-info m-t-2">
<strong>Note</strong>: The above assumes you have no existing redux store and generates a new one. To use your existing redux store, see [Using an Existing Redux Store](/docs/drizzle/using-an-existing-redux-store).
</p>
