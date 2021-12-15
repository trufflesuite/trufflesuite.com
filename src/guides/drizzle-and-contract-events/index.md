---
title: Drizzle and Contract Events
hide:
  - navigation
---

# Drizzle and Contract Events

Drizzle is ideal for synchronizing contract state with a user interface, but as dapps grow in complexity we foresee growing demand for coordination with off-chain services.

The code in this guide may be small, but it opens up a powerful mechanism to enable that coordination. Imagine your dapp needs to send a message whenever a contract event is generated. Lets see how to make this happen.

This tutorial demonstrates how to use Drizzle to subscribe to smart contract events.

<iframe width="560" height="315" src="https://www.youtube.com/embed/jGIY_l8oWTQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<p class="font-italic text-center">The finished dapp.</p>

## Getting Started

We'll use [`react-toastify`](https://github.com/fkhadra/react-toastify) to alert the user whenever a SimpleStorage contract event is emitted. We have to declare a <ToastContainer /> component and invoke `toast.success()` when an event is detected. We'll touch `MyComponent` and the
event reducer respectively.

**A Complete example is available at the following [repo](https://github.com/trufflesuite/drizzle-event-demo).**

<div class="alert alert-info">
  <i class="far fa-info-circle"></i> <strong>Prerequisite</strong>: You should be familiar with Truffle, Drizzle, React and Redux. If you need an introduction please consult the following resources:

  <ol class="mt-3">
    <li><a href="/docs/truffle/quickstart">Truffle Quickstart</a></li>
    <li><a href="/guides/getting-started-with-drizzle-and-react">Getting Started with Drizzle and React</a></li>
    <li><a href="https://reactjs.org/tutorial/tutorial.html">Tutorial: Intro to React</a></li>
    <li><a href="https://redux.js.org/basics/basic-tutorial">Redux Basic Tutorial</a></li>
    <li><a href="https://redux-saga.js.org/">Redux Saga</a></li>
    <li><a href="https://redux.js.org/advanced/middleware#middleware">Redux Middleware</a></li>
  </ol>
</div>


## Unbox Drizzle

Let's use `truffle unbox` to bootstrap a project and then wire up a contract event to a display component by creating a reducer and hook it up to Drizzle's `EVENT_FIRED` action.

<p class="alert alert-info">
  <i class="far fa-info-circle"></i> <strong>Note</strong>: More Drizzle actions are listed in our <a href="/docs/drizzle/reference/drizzle-actions">Drizzle Actions documentation</a>.
</p>

First create an empty directory, navigate to it, and `unbox` Drizzle.

```bash
// In the project directory...
$ truffle unbox drizzle
```

Now let's start the `truffle develop` console (which runs a Ganache test blockchain in the background):

```
$ truffle develop
```

Finally, in our Truffle develop console, let's compile and migrate our smart contracts.

```shell
truffle(develop)> compile

# some output here...

truffle(develop)> migrate
```

Now that we have a test chain running and our smart contracts deployed, let's add a toast notification to the UI.

## Listen for Contract Events

We want to listen for the `SimpleStorage` contract's `StorageSet` event and show a toast notification once it fires.

The front end code is located under the `app` folder. Lets add the notification library `react-toastify` to simulate an external interaction From the project directory:

```shell
$ cd app
$ npm install react-toastify
```

For the sake of simplicity, we will work in one file, `./app/src/middleware/index.js`.

```shell
$ mkdir ./src/middleware
$ touch ./src/middleware/index.js
```

In `./app/src/middleware/index.js`, import `EventActions` and `generateStore` from Drizzle as well as
toast from `react-toastify`, and `drizzleOptions`.

```javascript
// ./app/src/middleware/index.js
import { generateStore, EventActions } from '@drizzle/store'
import drizzleOptions from '../drizzleOptions'
import { toast } from 'react-toastify'
```

The action `EventActions.EVENT_FIRED` is emitted whenever a contract event is detected in a Block. We will gain access to it by registering a custom middleware with the Redux store. As you may know, Redux middleware comprises a set of functions, executed in a sequence, that process each dispatched action before passing it to Reducers. Add the following:

```javascript
const contractEventNotifier = store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    const contract = action.name
    const contractEvent = action.event.event
    const message = action.event.returnValues._message
    const display = `${contract}(${contractEvent}): ${message}`

    toast.success(display, { position: toast.POSITION.TOP_RIGHT })
  }
  return next(action)
}
```

Now lets register this middleware with Drizzle. `generateStore` will return a Redux store that you can use anywhere you can use a store. We will export it to be used by `DrizzleProvider`. Add the following:

```javascript
const appMiddlewares = [ contractEventNotifier ]

export default generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false  // enable ReduxDevTools!
})
```

Your completed `./app/src/middleware/index.js` file should look something like this:

```javascript
import { generateStore, EventActions } from '@drizzle/store'
import drizzleOptions from '../drizzleOptions'
import { toast } from 'react-toastify'

const contractEventNotifier = store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    const contract = action.name
    const contractEvent = action.event.event
    const message = action.event.returnValues._message
    const display = `${contract}(${contractEvent}): ${message}`

    toast.success(display, { position: toast.POSITION.TOP_RIGHT })
  }
  return next(action)
}

const appMiddlewares = [ contractEventNotifier ]

export default generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false  // enable ReduxDevTools!
})
```

## Connect the Store

The first thing we need to do is send the `store` as a prop to `DrizzleProvider`. Add the following to `./app/src/App.js`:

```javascript
// ./app/src/App.js
...
import store from './middleware'
...
const drizzle = new Drizzle(drizzleOptions, store);
...
```

You completed `App.js` file should looks something like this:
```javascript
import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import MyComponent from "./MyComponent";
import "./App.css";
import store from "./middleware";

const drizzle = new Drizzle(drizzleOptions, store);

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
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

## Hook up Display

Next we need to modify `./app/src/MyComponent.js` to import `ReactToastify.css` and configure `ToastContainer`

```javascript
...
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
...

export default ({ accounts }) => (
  <div className="App">
    <ToastContainer />
  ...
  </div>
```

Your completed `MyComponent.js` should look something like:

```javascript
import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState, accounts }) => {
  // destructure drizzle and drizzleState from props
  return (
    <div className="App">
      <ToastContainer />
      <div>
        <img src={logo} alt="drizzle-logo" />
        <h1>Drizzle Examples</h1>
        <p>
          Examples of how to get started with Drizzle in various situations.
        </p>
      </div>

      <div className="section">
        <h2>Active Account</h2>
        <AccountData
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={0}
          units="ether"
          precision={3}
        />
      </div>

      <div className="section">
        <h2>SimpleStorage</h2>
        <p>
          This shows a simple ContractData component with no arguments, along
          with a form to set its value.
        </p>
        <p>
          <strong>Stored Value: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SimpleStorage"
            method="storedData"
          />
        </p>
        <ContractForm drizzle={drizzle} contract="SimpleStorage" method="set" />
      </div>

      ...

    </div>
  );
};

```

## A Quick Test
  * Things often go south during development so a pretest check is in order.
    1. MetaMask should NOT be on Main net! Do not run this if you're on main
       net!
    2. Is MetaMask listening on the correct port defined above? Metamask should
       have ETH funds. Something is amiss if it doesn't.
    3. Are the smart contracts deployed from the correct directory?

  * Fire up the app.
    ```shell
    $ npm run start
    ```
  * Change SimpleStorage's `stored Value`
    ![Change SimpleStorage value!](/img/tutorials/drizzle-and-contract-events/stored-value.gif)

  * You'll be rewarded with a toast notification when the transaction is completed.
    ![Toast](/img/tutorials/drizzle-and-contract-events/alert-toast.png "A
    successful Toast!")

The dapp is now a consumer of Drizzle's `EVENT_FIRED` action item and can coordinate with other services to implement its business logic.

More Drizzle actions are listed in our [Drizzle Actions documentation](/docs/drizzle/reference/drizzle-actions).
