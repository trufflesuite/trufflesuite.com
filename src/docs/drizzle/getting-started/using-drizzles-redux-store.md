---
title: Using Drizzle's Redux Store
layout: docs.hbs
---
# Using Drizzle's Redux Store

For those times when you don't want to manage your own Redux store, Drizzle has
you covered. You can pass your Redux sagas, reducers, middleware and
drizzleOptions to `generateStore` and drizzle will incorporate them in its own
Redux Store.

For an example use case see the [Drizzle and Contract
Events](/guides/drizzle-and-contract-events) guide.

Add Middleware to the Store
---------------------------

Drizzle allows you to add redux middleware to it's redux instance. This gives
you the ability to react to specific events in a meaningful way, outside of data
synchronization. For example, you may want to interact with an external service
whenever a contract event occurs.


1. Import the drizzle dependencies.

  ```javascript
  import { generateStore, EventActions } from 'drizzle'
  import drizzleOptions from '../drizzleOptions'
  ```

1. Create a custom middleware. For more information on creating middleware for Redux, see [the Redux middleware documentation](https://redux.js.org/advanced/middleware).

  ```javascript
  const contractEventNotifier = store => next => action => {
    if (action.type === EventActions.EVENT_FIRED) {
      const contract = action.name
      const contractEvent = action.event.event
      const contractMessage = action.event.returnValues._message
      const display = `${contract}(${contractEvent}): ${contractMessage}`

      // interact with your service
      console.log('Contract event fired', display)
    }
    return next(action)
  }
  ```

1. Create the store passing your Middlewares.

  ```javascript
  const appMiddlewares = [ contractEventNotifier ]

  // create the store
  export default generateStore({
    drizzleOptions,
    appMiddlewares,
    disableReduxDevTools: false  // enable ReduxDevTools!
  })
  ```

Add Reducers and Sagas to the Store
-----------------------------------

Drizzle gives you the option to add your reducers to its Redux store if you choose to use one `store` for your project.

1. Import the drizzle dependencies.

  ```javascript
  import { put, takeEvery } from 'redux-saga/effects'
  import { generateStore } from 'drizzle'
  import drizzleOptions from '../drizzleOptions'
  ```

1. Define actions, reducers and sagas

  ```javascript
  // actions
  const TODOS_FETCH = 'MY_APP/TODOS_FETCH'
  const TODOS_RECEIVED = 'MY_APP/TODOS_RECEIVED'

  // reducers
  const todosReducer = (state = [], action) => {
    if (action.type === TODOS_RECEIVED) {
      // update your state
      return action.todos
    }
    return state
  }

  // fetch data from service using sagas
  function *fetchTodos() {
    const todos = yield fetch('https://jsonplaceholder.typicode.com/todos')
    .then(resp => response.json())
    yield put({ type: TODOS_RECEIVED, todos })
  }

  // Combine all your redux concerns

  // app root saga
  function *appRootSaga() {
    yield takeEvery(TODOS_FETCH, fetchTodos)
  }
  ```

1. Create the store passing in reducers and sagas

  ```javascript
  // app Reducers and Sagas
  const appReducers = { todos: todosReducer }
  const appSagas = [appRootSaga]

  const store = generateStore({
    drizzleOptions,
    appReducers,
    appSagas
  })

  export default store
  ```
