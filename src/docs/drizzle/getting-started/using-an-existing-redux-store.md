---
title: Drizzle | Using an Existing Redux Store
layout: docs.hbs
---
# Using an Existing Redux Store

Drizzle is flexible about its store. It can generate a store if your app doesn't currently use redux, live alongside your current store (potentially keeping all Ethereum concerns in one place) or integrating its reducers and sagas with your currently existing store.

## Single Store

If you'd like to integrate Drizzle's reducers and sagas with your existing store, import them for use alongside your existing reducers. In this example, we already have `react-router-redux` keeping the state of `react-router` in our store.

```javascript
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { drizzleReducers } from 'drizzle'

const reducer = combineReducers({
  routing: routerReducer,
  ...drizzleReducers
})

export default reducer
```

Similarly, we can import Drizzle's sagas as well. For more information on how this works, see the example just above the "Making our code testable" section of the [`redux-saga` beginner tutorial](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html).

```javascript
import { all, fork } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'

export default function* root() {
  yield all(
    drizzleSagas.map(saga => fork(saga))
  )
}
```

Now we can use the reducers and sagas as we normally would in our store. Note that we must also generate an initial state for our contracts. Drizzle takes care of this for you with the `` function.

```javascript
// ...
import { generateContractsInitialState } from 'drizzle'
import drizzleOptions from './drizzleOptions'
// ...

const initialState = {
  contracts: generateContractsInitialState(drizzleOptions)
}

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      routingMiddleware,
      sagaMiddleware
    )
  )
)

sagaMiddleware.run(rootSaga)
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

## Multiple Stores

There are reasons you may want multiple stores in your application. If you're working with a large, existing webapp, you may want to keep the Ethereum portions of it separated. From the [Redux Documentation's Store Setup section](https://redux.js.org/faq/store-setup#can-or-should-i-create-multiple-stores-can-i-import-my-store-directly-and-use-it-in-components-myself):

> Isolating a Redux app as a component in a bigger application, in which case you might want to create a store per root component instance.

If you're using React and `drizzle-react`, you can achieve this by not passing a store to the `<DrizzleProvider>` and wrapping your existing `<Provider>` component.

```javascript
// ...
import { DrizzleProvider } from 'drizzle-react'
// ...

ReactDOM.render((
    <DrizzleProvider options={options}>
      <Provider store={store}>
        <LoadingContainer>
          <Router history={history}>
            <Route path="/" component={App}>
              <IndexRoute component={HomeContainer} />
            </Route>
          </Router>
        </LoadingContainer>
      </Provider>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
```