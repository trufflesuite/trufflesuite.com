---
title: Drizzle | Drizzle Quickstart
layout: docs.hbs
---
# Drizzle Quickstart

## Installation

Install Drizzle via npm:
```shell
npm install --save @drizzle/store
```

<p class="alert alert-info m-t-2">
<i class="far fa-info-circle"></i> <strong>Using React?</strong>: The easiest way to get started with Drizzle is to use our <a href="https://github.com/trufflesuite/drizzle/tree/master/packages/react-plugin">official <code>@drizzle/react-plugin</code> package</a> and (optionally) its <a href="https://github.com/trufflesuite/drizzle/tree/master/packages/react-components">companion <code>@drizzle/react-components</code></a>.
</p>

## Initialization

<p class="alert alert-info m-t-2">
<i class="far fa-info-circle"></i> <strong>Note</strong>: Since Drizzle uses web3 1.0 and web sockets, be sure your development environment can support these. As a development blockchain, you'll need <code>ganache-cli</code> v6.1.0+, <code>geth</code> or <code>parity</code>.
</p>

1. Import the provider.
   ```javascript
   import { Drizzle } from '@drizzle/store'
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

   const drizzle = new Drizzle(options)
   ```

<p class="alert alert-warning m-t-2">
<i class="far fa-exclamation-triangle"></i> <strong>Note</strong>: The above assumes you have no existing redux store and generates a new one. To use your existing redux store, see <a href="./getting-started/using-drizzles-redux-store">Using an Existing Redux Store</a>.
</p>
