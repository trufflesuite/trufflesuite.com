Starting with Drizzle v1.x.x, we are very happy to announce official support for React Native (v0.57.7+)!

This tutorial will guide you through how to get Drizzle running on your React Native dapps. This tutorial assumes some prior knowledge about Truffle and React Native, so if you haven't already, go over the following tutorials first to set up your development environment: 

1. [Getting started with Drizzle and React](https://www.truffleframework.com/tutorials/getting-started-with-drizzle-and-react)
1. [React Native](https://facebook.github.io/react-native/docs/getting-started.html)

This tutorial will cover the following:

1. [Setting up the folder structure](#setting-up-the-folder-structure)
1. [Shimming web and node libraries on React Native](#Shimming-web-and-node-libraries-on-React-Native)
1. [Setting up some sanity tests](#Setting-up-some-sanity-tests)

## Setting up the folder structure

### Truffle

Truffle requires an empty folder to start, so let's initialize it first before our React Native project:

```shell
mkdir truffle-temp
cd truffle-temp
truffle init
```

You should have the following inside the project folder:

1. `contracts/`
1. `migrations/`
1. `test/`
1. `truffle-config.js`
1. `truffle.js`

### React Native

1. Initialize your React Native project in its own folder, separate from your Truffle project `truffle-temp`.

    ```shell
    react-native init DrizzleReactNativeTutorial
    ```

1. React Native and Truffle folders should be in root since React Native doesn't allow you to use symlinks yet, and cannot import from files outside the React Native project folder.

    Copy all the files in `truffle-temp` into the root folder of your React Native project. Your folder should look like this in the end:

    1. `android/`
    1. `contracts/`
    1. `ios/`
    1. `migrations/`
    1. `node_modules/`
    1. `test/`
    1. `yarn.lock`
    1. `App.js`
    1. `index.js`
    1. `truffle-config.js`
    1. `truffle.js`
    1. `app.json`
    1. `package.json`


## Shimming web and node libraries on React Native

React Native is missing some of the global objects that are available on other platforms such as the web or Node. We will have to provide our own (i.e. a shim) through imported libraries or in some cases our own code.

1. Install `node-libs-react-native`

    ```shell
    yarn add node-libs-react-native
    ```
1. Create a new file at `rn-cli.config.js` with the following code:

    ```js
    module.exports = {
      resolver: {
        extraNodeModules: require("node-libs-react-native")
      }
    };
    ```

    This file overrides some of the defaults used by React Native's Metro bundler. We will be coming back to it soon. You can learn more [here](https://facebook.github.io/react-native/docs/understanding-cli#cli-configs).

1. Create a new file at `shims.js` with the following code:

    ```js
    import "node-libs-react-native/globals";
    ```

1. Install `vm-browserify`:

    ```shell
    yarn add vm-browserify
    ```

    and add it to `rn-cli-config.js`. The end result should look like the following:

    ```js
    const nodeLibs = require("node-libs-react-native");
    nodeLibs.vm = require.resolve("vm-browserify");

    module.exports = {
      resolver: {
        extraNodeModules: nodeLibs
      }
    };
    ```

1. Install `Base64`:

    ```shell
    yarn add Base64
    ```

   and add it to our shims at `shims.js`
    ```js
    import "node-libs-react-native/globals";
    import { btoa } from "Base64";

    global.btoa = btoa;
    ```

1. Install and link `react-native-randombytes`

    ```shell
    yarn add react-native-randombytes
    react-native link react-native-randombytes
    ```

1. Shim `URL` using Node's `url` lib that we got from `node-libs-react-native` in `shims.js`. This is what our file should look like at the end:

    ```js
    import "node-libs-react-native/globals";
    import { btoa } from "Base64";
    import nodeUrl from 'url';

    global.btoa = btoa;
    global.URL = class URL {
        constructor(url) {
            return nodeUrl.parse(url)
        }
    }
    ```

1. Shim `Object.assign` as React Native's own polyfill has some [non-spec compliant issues on React Native development builds](https://github.com/facebook/react-native/issues/16814). 

    In `shims.js`

    ```js
    import "node-libs-react-native/globals";
    import { btoa } from "Base64";
    import nodeUrl from 'url';

    global.btoa = btoa;
    global.URL = class URL {
        constructor(url) {
            return nodeUrl.parse(url)
        }
    }

    Object.defineProperty(Object, 'assign', {
      value: function assign(target, varArgs) {
        'use strict';
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        let to = Object(target);

        for (let index = 1; index < arguments.length; index++) {
          let nextSource = arguments[index];

          if (nextSource != null) {
            for (let nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true,
    }); 
    ```

    and drop React Native's own polyfill using `rn-cli.config.js`

    ```js
    const nodeLibs = require("node-libs-react-native");
    nodeLibs.vm = require.resolve("vm-browserify");

    module.exports = {
      resolver: {
        extraNodeModules: nodeLibs
      },
      serializer: {
        // From https://github.com/facebook/react-native/blob/v0.57.7/rn-get-polyfills.js
        getPolyfills: () => [
          /**
           * We omit RN's Object.assign polyfill
           * If we don't, then node_modules will be using RN's polyfill rather than ours.
           */
          // require.resolve('react-native/Libraries/polyfills/Object.es6.js'),
          require.resolve('react-native/Libraries/polyfills/console.js'),
          require.resolve('react-native/Libraries/polyfills/error-guard.js'),
          require.resolve('react-native/Libraries/polyfills/Number.es6.js'),
          require.resolve('react-native/Libraries/polyfills/String.prototype.es6.js'),
          require.resolve('react-native/Libraries/polyfills/Array.prototype.es6.js'),
          require.resolve('react-native/Libraries/polyfills/Array.es6.js'),
          require.resolve('react-native/Libraries/polyfills/Object.es7.js'),
        ]
      }
    };
    ```
1. Finally let's import our shims in `index.js`. The very first line should be the following:
    ```js
    import "./shims"
    ```

We're finally done with replacing all the global objects and functions that Drizzle was expecting.

## Writing and migrating the smart contract

To add smart contracts we'll just follow the previous tutorial on Drizzle and React.

Do the steps from [Writing our smart contract](https://www.truffleframework.com/tutorials/getting-started-with-drizzle-and-react#writing-our-smart-contract) to (and including) [Migration](https://www.truffleframework.com/tutorials/getting-started-with-drizzle-and-react#migration).


## Running the app

1. Start React Native Metro bundler: `react-native start`
1. Start your emulator/plug in your device

## Connecting your app to your Ganache testnet

### Android

1. Start `ganache-cli`: `ganache-cli -b 3`
1. Compile and migrate contracts: `yarn run setup`
1. Install app: `react-native run-android`

### iOS

#### Simulator

1. Start `ganache-cli`: `ganache-cli -b 3`
1. Compile and migrate contracts: `truffle compile && truffle migrate`
1. Install app: Do it through Xcode

#### Physical device

1. Find your `LOCAL_MACHINE_IP` by checking your network settings on your Mac where Ganache is running
1. Start `ganache-cli`: `ganache-cli -b 3 -h LOCAL_MACHINE_IP`
1. In `./truffle.js` for `development`, point Truffle to `LOCAL_MACHINE_IP` 
1. Compile and migrate contracts: `truffle compile && truffle migrate`
1. In `./app/core/Core.js`, point Drizzle to `LOCAL_MACHINE_IP`
    ```
    const options = {
      ...
      web3: {
        fallback: {
          type: "ws",
          url: "ws://LOCAL_MACHINE_IP:8545"
        }
      }
    };
    ```
1. Install: Do it through Xcode

## Install Drizzle

```shell
yarn add drizzle
```

## Setup the Drizzle store

In `index.js`

```js
import React from "react";
import { Drizzle, generateStore } from "drizzle";
import MyStringStore from "./build/contracts/MyStringStore.json";

const options = {
  contracts: [MyStringStore]
};
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

AppRegistry.registerComponent(appName, () => () => <App drizzle={drizzle} />);
```

Your `index.js` should look like this in the end: 

```js
/** @format */
import "./shims";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

import React from "react";
import { Drizzle, generateStore } from "drizzle";
import MyStringStore from "./build/contracts/MyStringStore.json";

const options = {
  contracts: [MyStringStore]
};
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

AppRegistry.registerComponent(appName, () => () => <App drizzle={drizzle} />);

```

## Wire up the App component

This is pretty much the same as [the web tutorial](https://www.truffleframework.com/tutorials/getting-started-with-drizzle-and-react#wire-up-the-app-component), but with React Native components instead of web ones. Refer to the web tutorial for a more in-depth explanation of what's going on.

In `App.js`, your code should look like this in the end:

```js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

type Props = {};
export default class App extends Component<Props> {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <Text>Loading Drizzle...</Text>
        ) : (
          <View>
            <Text>Drizzle is ready</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
```

## Write a component to read from Drizzle

[web tutorial](https://www.truffleframework.com/tutorials/getting-started-with-drizzle-and-react#write-a-component-to-read-from-drizzle)

```js
import React from "react";
import { Text } from "react-native";

class ReadString extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.MyStringStore;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["myString"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { MyStringStore } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const myString = MyStringStore.myString[this.state.dataKey];

    // if it exists, then we display its value
    return <Text>My stored string: {myString && myString.value}</Text>;
  }
}

export default ReadString;
```

Add it to `App.js`

```js
```

Test it out

## Write a component to write to the smart contract

[web tutorial](https://www.truffleframework.com/tutorials/getting-started-with-drizzle-and-react#write-a-component-to-write-to-the-smart-contract)

```js
import React from "react";
import { Text, View, Button, TextInput } from "react-native";

class SetString extends React.Component {
  state = { stackId: null, text: "" };

  submit = () => {
    this.setValue(this.state.text);
  };

  setValue = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.MyStringStore;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["set"].cacheSend(value, {
      from: drizzleState.accounts[0]
    });

    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash].status}`;
  };

  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder="Enter some text"
        />
        <Button title="Submit" onPress={this.submit} />
        <Text>{this.getTxStatus()}</Text>
      </View>
    );
  }
}
export default SetString;
```

Add it to `App.js`

```js
```

Test it out

# The Finish Line

You've just successfully integrated the full suite of Drizzle, Truffle, and Ganache tooling with your React Native app!