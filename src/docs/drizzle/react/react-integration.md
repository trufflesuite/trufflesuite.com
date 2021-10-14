---
title: React Integration
layout: docs.hbs
---
# React Integration

`@drizzle/react-plugin` is the official way to integrate Drizzle with your React dapp.

Check out the [Drizzle Truffle Box](https://github.com/truffle-box/drizzle-box) for a complete example or continue reading to create your own setup.

Also, check out `@drizzle/react-components` for Drizzle's [codebuilt react components](https://github.com/trufflesuite/drizzle/tree/develop/packages/react-components).

## Installation

Install Drizzle React-Plugin via npm:

```bash
npm install @drizzle/react-plugin
```

<p class="alert alert-info">
  <i class="far fa-info-circle"></i> <strong>Note</strong>: <code>@drizzle/react-plugin</code> requires Requires React v16.3+ for the Context API. You'll also need the <code>@drizzle/store</code> package, if it isn't already installed.
</p>

## Getting Started

1. Import the `DrizzleContext` provider.
  ```javascript
  import { DrizzleContext } from '@drizzle/react-plugin'
  ```

1. Create a `drizzleOptions` object and pass in the desired contract artifacts for Drizzle to instantiate. Other options are available, see [the Options section of the Drizzle docs](https://www.trufflesuite.com/docs/drizzle/reference/drizzle-options).

  ```javascript
  // Import contracts
  import SimpleStorage from './../build/contracts/SimpleStorage.json'
  import TutorialToken from './../build/contracts/TutorialToken.json'

  const drizzleOptions = {
    contracts: [
      SimpleStorage,
      TutorialToken
    ],
    events: {
      SimpleStorage: ["StorageSet"],
    },
  }
  ```

1. Import `Drizzle`.
  ```javascript
  import { Drizzle } from "@drizzle/store";
  ```

1. Create a new `drizzle` instance with the `drizzleOptions` object.
  ```javascript
  const drizzle = new Drizzle(drizzleOptions);
  ```

1. Pass the `drizzle` object to the `DrizzleContext.Provider` component.
  ```javascript
  <DrizzleContext.Provider drizzle={drizzle}></DrizzleContext.Provider>
  ```

1. Use `DrizzleContext.Consumer` to consume the drizzle context and pass `drizzle` and `drizzleState` to your component. Drizzle also provides codebuilt components via the `@drizzle/react-components`.

<p class="alert alert-info">
  <i class="far fa-info-circle"></i> <strong>Note</strong>: We have to check that Drizzle is initialized before fetching data. The <code>initialized</code> variable returns the drizzle store's initialization status.
</p>

  ```javascript
  <DrizzleContext.Provider drizzle={drizzle}>
    <DrizzleContext.Consumer>
      {drizzleContext => {
        const {drizzle, drizzleState, initialized} = drizzleContext;

        if(!initialized) {
          return "Loading..."
        }

        return (
            <MyComponent drizzle={drizzle} drizzleState={drizzleState} />
          )
        }}
    </DrizzleContext.Consumer>
  </DrizzleContext.Provider>
  ```

1. Fetch contract data by accessing contracts via `drizzle` and `drizzleState` in `props`. For more information on how this works, see [How Data Stays Fresh in the Drizzle docs](https://github.com/trufflesuite/drizzle#how-data-stays-fresh). For more info on the drizzle state, see [state tree docs.](https://github.com/trufflesuite/drizzle/tree/develop/packages/store#drizzle-state)

  The example below utilizes drizzle's `cacheCall` feature, which caches and synchronizes the call with the store. For more information on `cacheCall` and also `cacheSend`, see [Contract Interaction](https://www.trufflesuite.com/docs/drizzle/getting-started/contract-interaction).
  ```javascript
  // sample component
  import React from 'react';

  class CacheCallExample extends React.Component {
    state = { dataKey: null };

    componentDidMount() {
      const { drizzle } = this.props;
      const contract = drizzle.contracts.SimpleStorage;
      let dataKey = contract.methods["storedData"].cacheCall(); // declare this call to be cached and synchronized
      this.setState({ dataKey });
    }

    render() {
      const { SimpleStorage } = this.props.drizzleState.contracts;
      const displayData = SimpleStorage.storedData[this.state.dataKey]; // if displayData (an object) exists, then we can display the value below
      return (
        <p>Hi from Truffle! Here is your storedData: {displayData && displayData.value}</p>
      )
    }
  }

  export default CacheCallExample
  ```

  <p class="alert alert-info">
    <i class="far fa-info-circle"></i> <strong>Note</strong>: The contract instances have all the standard <code>web3</code> properties and methods.
  </p>
  
  ```javascript
  drizzle.contracts.SimpleStorage.methods.set(5).send(); // sets SimpleStorage contract's storedData state variable to uint 5.
  drizzle.contracts.SimpleStorage.methods.storedData.call(); // gets the storedData value
  ```

## Example Code Snippet

```javascript
// App.js
import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";

import SimpleStorage from "./contracts/SimpleStorage.json";
import MyComponent from "./MyComponent"; // Check out drizzle's react components at @drizzle/react-components

const drizzleOptions = {
  contracts: [SimpleStorage],
  events: {
    SimpleStorage: ["StorageSet"],
  },
};

const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const {drizzle, drizzleState, initialized} = drizzleContext;
          
          if(!initialized) {
            return "Loading..."
          }
          
          return (
            <MyComponent drizzle={drizzle} drizzleState={drizzleState} />
            )
          }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
```
