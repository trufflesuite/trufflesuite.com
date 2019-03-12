Reacting to Contract Events with Drizzle
========================================

This tutorial demonstrates how to modify a Drizzle box to subscribe to Contract events.

**Prerequisite**: You should be familiar with Truffle, Ganache, Drizzle, React and
Redux. If you need an introduction please consult the following resources:

1. [Truffle quickstart](https://truffleframework.com/docs/truffle/quickstart)
1. [Ganache quickstart](https://truffleframework.com/docs/ganache/quickstart)
1. [Getting started with Drizzle and React](https://www.truffleframework.com/tutorials/getting-started-with-drizzle-and-react)
1. [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)
1. [Redux basic tutorial](https://redux.js.org/basics/basic-tutorial)


Lets create a front end DApp that can listen to contract events.  [Here's what
the finished app looks like](https://youtu.be/jGIY_l8oWTQ) We'll use
[react-toaster]() to alert the user whenever a SimpleStorage contract event is
emitted. We have to declare a <ToastContainer /> component and invoke
`toast.success()` when an event is detected. We'll touch `MyComponent` and the
event reducer respectively.

Lets use `truffle unbox` to bootstrap a project and then wire up a contract
event to a display component by creating a reducer and hook it up to drizzle's
`EVENT_FIRED` action.

First we fire up our ganache test chain, and unbox, compile and deploy the
contracts to ganache.

```bash
$ truffle unbox drizzle
$ truffle compile && truffle compile deploy
```

Tap into events
---------------

For the sake of brevity, we will put our modification in one file,
`./app/reducers/index.js` but feel free
to separate this out.

The front end code is located under the `app` folder.

Import the EventActions as well as the generateStore function from Drizzle.

```js
import { generateStore, EventActions } from 'drizzle'
```

EventActions.FIRE_EVENT is fired whenever a contract event is detected on Block.
To be notified when this occurs, we register a reducer, to handle our state
transition. In this code, we will extract the underlying information from the
event and invoke our toast component to display an alert.

```js
const events = (state = {}, action) => {
  if (action.type === EventActions.EVENT_FIRED) {

    // build the alert message
    const contract = action.name
    const message = action.event.returnValues._message
    const display = `${contract}: ${message}`

    // present the alert message
    toast.success(display, { position: toast.POSITION.TOP_RIGHT })

    // if your app needs to modify it's state on this event,
    // you would put it here...and don't forget to return the new state
  }

  return state
}
```

Now we have to register with the Drizzle's redux state manager.

```js
// Register app reducers to be incorporated into drizzle's redux store.
const appReducers = { events }

// Set app initial state
const initialAppState = { events: {} }

export default generateStore(
  drizzleOptions,
  appReducers,
  initialAppState,
  disableReduxDevTools: false  // use reduxDevTools extension
)
```

