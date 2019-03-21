React to Contract Events
========================

This tutorial demonstrates how to modify a Drizzle box to subscribe to Contract
events.  [Here's what the finished app looks like](https://youtu.be/jGIY_l8oWTQ)

We'll use [react-toaster]() to alert the user whenever a SimpleStorage contract
event is emitted. We have to declare a <ToastContainer /> component and invoke
`toast.success()` when an event is detected. We'll touch `MyComponent` and the
event reducer respectively.

TL;DR; A Complete example is available at the following [repo](https://github.com/trufflesuite/drizzle-event-demo)

**Prerequisite**: You should be familiar with Truffle, Ganache, Drizzle, React and
Redux. If you need an introduction please consult the following resources:

1. [Truffle quickstart](https://truffleframework.com/docs/truffle/quickstart)
1. [Ganache quickstart](https://truffleframework.com/docs/ganache/quickstart)
1. [Getting started with Drizzle and React](https://www.truffleframework.com/tutorials/getting-started-with-drizzle-and-react)
1. [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)
1. [Redux basic tutorial](https://redux.js.org/basics/basic-tutorial)
1. [Redux Saga](https://redux-saga.js.org/)


Unbox drizzle
=============

Let's use `truffle unbox` to bootstrap a project and then wire up a contract
event to a display component by creating a reducer and hook it up to drizzle's
`EVENT_FIRED` action.

First fire up our ganache test chain, and unbox, compile and deploy the
contracts to ganache.

```bash
$ truffle unbox drizzle
$ truffle deploy
```

Listen for Contract events
==========================

This next will focus on connecting the parts in order to consume and act upon
contract events. In this example we will simply display a toast message.

Tap into events
---------------

The front end code is located under the `app` folder. Lets add the
notification library `react-toastify` to make a nice display.
```sh
$ cd app
$ npm install react-toastify
```

For the sake of simplicity, we will work in one file, `./app/src/reducers/index.js`.

```
$ mkdir ./src/reducers
$ touch ./src./src//reducers/index.js
```

Import `EventActions` and `generateStore` from Drizzle as well as
toast from `react-toastify`, and drizzleOptions.

```js
// ./app/reducers/index.js
import { generateStore, EventActions } from 'drizzle'
import drizzleOptions from '../drizzleOptions'
import { toast } from 'react-toastify'

```

`EventActions.FIRE_EVENT` is emitted whenever a contract event is detected on a
Block. We will gain access to it by registering a reducer with the Redux store.
As you know, a every reducer is called whenever an `action` is dispatched.
N.B. Set the initial value of the state as the default argument.

Now we filter actions for the specified event and act. In this case we will
display a toast.

```js
const eventsReducer = (state = {}, action) => {
  if (action.type === EventActions.EVENT_FIRED) {

    // extract and construct the alert message
    const contract = action.name
    const contractEvent = action.event.event
    const message = action.event.returnValues._message
    const display = `${contract}(${contractEvent}): ${message}`

    // present the alert message
    toast.success(display, { position: toast.POSITION.TOP_RIGHT })

    // if your app needs to modify it's state on this event,
    // you would put it here...and don't forget to return the new state
  }

  return state
}
```

The last step is to register with the reducer with Drizzle. `generateStore` will
return a Redux store that you can use anywhere you can use a store.

```js
// Register app reducers to be incorporated into drizzle's redux store.
const appReducers = { events: eventsReducer }

const options = {
  drizzleOptions,
  appReducers
}

export default generateStore(options)
```

Connect the store
-----------------

Send the store as a prop to DrizzleProvider

```js
// App.js
...
import store from './reducers'
...
<DrizzleProvider store={store} options={drizzleOptions} />
...

```

Hook up Display
---------------

Modify `MyComponent.js` to import ReactToastify.css and configure ToastContainer

```js
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


A quick test
------------
  * Things often go south during development so a pretest check is in order.
    1. MetaMask should NOT be on Main net! Do not run this if you're on main
       net!
    1. Is ganache running on port 7545? This is the default. If your development
       environment is different, make sure `truffle-config` points to the
       correct port.
    1. Is MetaMask listening on the correct port defined above? Metamask should
       have ETH funds. Something is amiss if it doesn't.
    1. Are the smart contracts deployed from the correct directory?

  * Fire up the app.
    ```
    $ npm run start
    ```
  * Change SimpleStorage's `stored Value`
    ![Change SimpleStorage value!](/img/tutorials/drizzle-and-contract-events/stored-value.gif)


  * You'll be rewarded with a toast notification when the transaction is completed.
    ![Toast](/img/tutorials/drizzle-and-contract-events/alert-toast.png "A
    successful Toast!")

The DApp is now a consumer of drizzle's `EVENT_FIRED` action item and invoke
appropriate business logic.
