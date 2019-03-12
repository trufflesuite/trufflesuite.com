---
title: Drizzle | Use Drizzle's Redux Store
layout: docs.hbs
---
# Use Drizzle's Redux Store

Drizzle is flexible about its store. It can generate a store if your app doesn't currently use redux, live alongside your current store (potentially keeping all Ethereum concerns in one place), integrate its reducers and sagas with your currently existing store, or allow you to integrate your reducers and sagas with its store.

## Delegate Store management to Drizzle

If you'd like to delegate your reducers and sagas to drizzle, pass them to `generateStore`.

```javascript
// ./state.js

import { put, takeEvery } from 'redux-saga/effects'
import { generateStore } from 'drizzle'
import drizzleOptions from './drizzleOptions'

// actions
const TODOS_FETCH = 'MY_APP/TODOS_FETCH'
const TODOS_RECEIVED = 'MY_APP/TODOS_RECEIVED'

const todosReducer = (state = [], action) => {
  if (action.type === TODOS_RECEIVED) {
    // update your state
    return action.todos
  }
  return state
}

// fetch data from service
function *fetchTodos() {
  const todos = yield fetch('https://jsonplaceholder.typicode.com/todos')
                      .then(resp => response.json())
                      .then(json => json)
  yield put({ type: TODOS_RECEIVED, todos })
}

// app root saga
function *appRootSaga() {
  yield takeEvery(TODOS_FETCH, fetchTodos)
}

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

Finally, use the store as your normally would. In this example, we're using the `<DrizzleProvider>` from `drizzle-react`.

```javascript
// ...
import store from './store'
// ...

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={HomeContainer} />
          </Route>
        </Router>
      </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
```
