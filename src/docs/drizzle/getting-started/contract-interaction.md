---
title: Contract Interaction
layout: docs.hbs
---
# Contract Interaction

Drizzle provides helpful methods on top of the default `web3.Contract` methods to keep your calls and transactions in sync with the store.

## `cacheCall()`

Gets contract data. Calling the `cacheCall()` function on a contract will execute the desired call and return a corresponding key so the data can be retrieved from the store. When a new block is received, Drizzle will refresh the store automatically _if_ any transactions in the block touched our contract. For more information on how this works, see [How Data Stays Fresh](/docs/drizzle/reference/how-data-stays-fresh).

**Note:** We have to check that Drizzle is initialized before fetching data. A simple if statement such as below is fine for displaying a few pieces of data, but a better approach for larger dapps is to use a [loading component](https://github.com/trufflesuite/drizzle-react#recipe-loading-component). We've already built one for you in our [`drizzle-react-components` library](https://github.com/trufflesuite/drizzle-react-components) as well.
```javascript
// Assuming we're observing the store for changes.
var state = drizzle.store.getState()

// If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
if (state.drizzleStatus.initialized) {
    // Declare this call to be cached and synchronized. We'll receive the store key for recall.
    const dataKey = drizzle.contracts.SimpleStorage.methods.storedData.cacheCall()

    // Use the dataKey to display data from the store.
    return state.contracts.SimpleStorage.storedData[dataKey].value
}

// If Drizzle isn't initialized, display some loading indication.
return 'Loading...'
```

The contract instance has all of its standard web3 properties and methods. For example, you could still call as normal if you don't want something in the store:
```javascript
drizzle.contracts.SimpleStorage.methods.storedData().call()
```

## `cacheSend()`

Sends a contract transaction. Calling the `cacheSend()` function on a contract will send the desired transaction and return a corresponding transaction hash so the status can be retrieved from the store. The last argument can optionally be an options object with the typical from, gas and gasPrice keys. Drizzle will update the transaction's state in the store (pending, success, error) and store the transaction receipt. For more information on how this works, see [How Data Stays Fresh](/docs/drizzle/reference/how-data-stays-fresh).

**Note:** We have to check that Drizzle is initialized before fetching data. A simple if statement such as below is fine for displaying a few pieces of data, but a better approach for larger dapps is to use a [loading component](https://github.com/trufflesuite/drizzle-react#recipe-loading-component). We've already built one for you in our [`drizzle-react-components` library](https://github.com/trufflesuite/drizzle-react-components) as well.
```javascript
// Assuming we're observing the store for changes.
var state = drizzle.store.getState()

// If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
if (state.drizzleStatus.initialized) {
    // Declare this transaction to be observed. We'll receive the stackId for reference.
    const stackId = drizzle.contracts.SimpleStorage.methods.set.cacheSend(2, {from: '0x3f...'})

    // Use the stackId to display the transaction status.
    if (state.transactionStack[stackId]) {
        const txHash = state.transactionStack[stackId]

        return state.transactions[txHash].status
    }
}

// If Drizzle isn't initialized, display some loading indication.
return 'Loading...'
```

For more information on what's contained in transaction state, see [Drizzle State](/docs/drizzle/reference/drizzle-state).

The contract instance has all of its standard web3 properties and methods. For example, you could still send as normal if you don't want a tx in the store:
```javascript
drizzle.contracts.SimpleStorage.methods.set(2).send({from: '0x3f...'})
```

## Adding Contracts Dynamically

You can programmatically add contracts to Drizzle using either `drizzle.addContract()` or the `ADD_CONTRACT` action.

```javascript
var contractConfig = {
  contractName: "0x066408929e8d5Ed161e9cAA1876b60e1fBB5DB75",
  web3Contract: new web3.eth.Contract(/* ... */)
}
events = ['Mint']

// Using an action
dispatch({type: 'ADD_CONTRACT', contractConfig, events})

// Or using the Drizzle context object
this.context.drizzle.addContract(contractConfig, events)
```

## Removing Contracts Dynamically

You can also delete contracts using either `drizzle.deleteContract()` or the `DELETE_CONTRACT` action.

```javascript
const contractName = "MyContract"

// Using an action
dispatch({type: 'DELETE_CONTRACT', contractName})

// Or using the Drizzle context object
this.context.drizzle.deleteContract(contractName)
```
