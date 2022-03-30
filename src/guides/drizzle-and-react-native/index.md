---
title: Truffle Suite

---

<p class="alert alert-warning"><i class="far fa-exclamation-triangle"></i> <strong>Archived:</strong> This tutorial has been archived and may not work as expected; versions are out of date, methods and workflows may have changed. We leave these up for historical context and for any universally useful information contained. Use at your own risk!</p>

Starting with Drizzle v1.3, we are very happy to announce official support for React Native (^0.57.7)!

This tutorial will guide you through how to get Drizzle and Truffle running on your React Native dapps. This tutorial assumes some prior knowledge about Truffle, Drizzle, and React Native, so if you haven't already, go over the following tutorials first to set up your development environment:

1. [Getting started with Drizzle and React](/guides/getting-started-with-drizzle-and-react)
1. [React Native](https://facebook.github.io/react-native/docs/getting-started.html)
    - Make sure to select `Building Projects with Native Code` since we will be leveraging some native code.

This tutorial will cover the following:

1. Setting up the folder structure
1. Shimming web and node libraries on React Native
1. Setting up the smart contract
1. Connecting your app to your Ganache testnet
1. Setting up Drizzle
1. Wiring up the app component
1. Writing a component to read from Drizzle
1. Writing a component to write to the smart contract

## Setting up the folder structure

### Truffle

Truffle requires an empty folder to start, so let's initialize it first before our React Native project:

```shell
mkdir truffle-temp
cd truffle-temp
truffle init
```

You should have the following inside the project folder:

```
├── contracts
├── migrations
├── test
└── truffle-config.js
```

### React Native

1. Initialize your React Native project in its own folder, as a sibling folder of your Truffle project `truffle-temp`:

    ```shell
    react-native init DrizzleReactNativeTutorial
    ```

1. React Native and Truffle folders should be in root since React Native doesn't allow you to use symlinks yet, and cannot import from files outside the React Native project folder.

    Copy all the files in `truffle-temp` into the root folder of your React Native project. Your folder should look like this in the end:

    ```
    ├── android
    ├── contracts
    ├── ios
    ├── migrations
    ├── node_modules
    ├── test
    ├── App.js
    ├── app.json
    ├── index.js
    ├── package.json
    ├── truffle-config.js
    ├── truffle.js
    └── yarn.lock
    ```


## Shimming web and node libraries on React Native

React Native is missing some of the global objects that are available on other platforms such as the web or Node. We will have to provide our own (i.e. a shim) through imported libraries or in some cases our own code.

1. Install `node-libs-react-native`, `vm-browserify`, `Base64`, and `react-native-randombytes`:

    ```shell
    yarn add node-libs-react-native vm-browserify Base64 react-native-randombytes
    ```

1. Link the native libraries in `react-native-randombytes`:

    ```shell
    react-native link react-native-randombytes
    ```

1. Create a new file `shims.js` in the root folder with the following code:

    ```javascript
    import "node-libs-react-native/globals";
    import { btoa } from "Base64";
    import nodeUrl from 'url';

    global.btoa = btoa;
    global.URL = class URL {
        constructor(url) {
            return nodeUrl.parse(url)
        }
    }

    /**
    * From https://github.com/facebook/react-native/blob/1151c096dab17e5d9a6ac05b61aacecd4305f3db/Libraries/polyfills/Object.es6.js
    * This on RN's master branch as of Sep 11, 2018, however it has not made it into a release yet.
    *
    * The only modification made in Truffle's polyfill was to remove the check for an existing implementation.
    * RN 0.57.7 (and below I assume) uses the non-spec compliant Object.assign that breaks in dev RN builds
    * https://github.com/facebook/react-native/issues/16814
    */
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

1. Create a new file `rn-cli.config.js` in the root folder with the following code:

    ```javascript
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

    If you're wondering why we did all that in `rn-cli.config.js`, refer to [this Gist](https://gist.github.com/parshap/e3063d9bf6058041b34b26b7166fd6bd) for a great explanation.

1. Finally let's import our shims in `index.js`. The very first line should be the following:
    ```javascript
    import "./shims"
    ```

We're now done with replacing all the global objects and functions that Drizzle was expecting.

## Setting up the smart contract

To add our smart contract we'll just follow the previous tutorial on Drizzle and React.

Do the steps from [Writing our smart contract](/guides/getting-started-with-drizzle-and-react#writing-our-smart-contract) up to (and including) [Migration](/guides/getting-started-with-drizzle-and-react#migration).


## Connecting your app to your Ganache testnet

When we're Working with React Native and mobile apps, accessing the Ganache server that's running on your machine takes a bit more work than when we are building web apps. The sections below detail how to connect to the Ganache testnet with your mobile device/emulator.

### Running the app

1. Start React Native Metro bundler: `react-native start`
1. Start your emulator/plug in your device

### Android (Emulator/Physical Device)

The main thing for Android devices is that we have to reverse the ports so that we can point to `localhost` on the Android device to the Ganache server.

Make sure you've setup the [Android Debug Bridge (adb)](https://developer.android.com/studio/command-line/adb) before doing these steps.

1. Start `ganache-cli`: `ganache-cli -b 3`
1. Compile and migrate contracts: `truffle compile && truffle migrate`
1. Reverse ports: `adb reverse tcp:8545 tcp:8545`
1. Install app: `react-native run-android`

### iOS

#### Simulator

The iOS simulator will see servers on `localhost` just fine.

1. Start `ganache-cli`: `ganache-cli -b 3`
1. Compile and migrate contracts: `truffle compile && truffle migrate`
1. Install app: `react-native run-ios` (you can also do this through Xcode)

#### Physical device

iOS physical devices involve the most manual work relative to other devices. You have to look up the local IP address of your machine and manually handle it every time it changes.

1. Find your `LOCAL_MACHINE_IP` by checking your network settings on your Mac where Ganache is running
1. Start `ganache-cli`: `ganache-cli -b 3 -h LOCAL_MACHINE_IP`
1. In `truffle.js` for `development`, point Truffle to `LOCAL_MACHINE_IP`
1. Compile and migrate contracts: `truffle compile && truffle migrate`
1. In `index.js`, point Drizzle to `LOCAL_MACHINE_IP`
    ```javascript
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

## Setting up Drizzle

Install Drizzle:

```shell
yarn add drizzle
```

Set up the Drizzle store by adding the following code to `index.js`:

```javascript
import React from "react";
import { Drizzle, generateStore } from "@drizzle/store";
import MyStringStore from "./build/contracts/MyStringStore.json";

const options = {
  contracts: [MyStringStore]
};
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

AppRegistry.registerComponent(appName, () => () => <App drizzle={drizzle} />);
```

Your `index.js` should look like this in the end:

```javascript
/** @format */
import "./shims";
import { AppRegistry } from "react-native";
import App from "./app/App";
import { name as appName } from "./app.json";

import React from "react";
import { Drizzle, generateStore } from "@drizzle/store";
import MyStringStore from "./build/contracts/MyStringStore.json";

const options = {
  contracts: [MyStringStore]
};
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

AppRegistry.registerComponent(appName, () => () => <App drizzle={drizzle} />);
```

## Wiring up the App component

This is pretty much the same as [the web tutorial](/guides/getting-started-with-drizzle-and-react#wire-up-the-app-component), but with React Native components instead of web ones. Refer to the web tutorial for a more in-depth explanation of what's going on.

Let's create a folder called `app` in the root of the project. Add a file called `App.js` to it.

In `app/App.js`, your code should look like this in the end:

```javascript
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

  componentWillUnmount() {
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

Run the app, and you should see the string `Loading Drizzle...` while you wait for Drizzle to initialize. Once initialization is complete, the string `Drizzle is ready` should be visible.

## Writing a component to read from Drizzle

Once again, this is very similar to the [web tutorial](/guides/getting-started-with-drizzle-and-react#write-a-component-to-read-from-drizzle), just with React Native components.

Add `ReadString.js` to the folder `app`. `app/ReadString.js` should look like this:

```javascript
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

Add it to `App.js` by modifying the `render` method:

```javascript
import ReadString from "./ReadString";
// ...
render() {
  return (
    <View style={styles.container}>
      {this.state.loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <ReadString
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
        </View>
      )}
    </View>
  );
}
```

You should now see the string `Hello World` being rendered after Drizzle has finished loading.

## Writing a component to write to the smart contract


Once again, this is very similar to the [web tutorial](/guides/getting-started-with-drizzle-and-react#write-a-component-to-write-to-the-smart-contract), just with React Native components.

Add `SetString.js` to the folder `app`. `app/SetString.js` should look like this:

```javascript
import React from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";

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
    if (transactions[txHash] && transactions[txHash].status)
      return `Transaction status: ${transactions[txHash].status}`;

    return null;
  };

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
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


const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  }
});

export default SetString;
```

Add it to `App.js` by modifying the `render` function

```javascript
import ReadString from "./ReadString";
import SetString from "./SetString";
// ...
render() {
  return (
    <View style={styles.container}>
      {this.state.loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <ReadString
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
         <SetString
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
        </View>
      )}
    </View>
  );
}
```

Run the app, enter a new string, and press the Submit button. A transaction status of `pending` will show and change to `success` on completion. This string will persist through reloads of the app since it is connected to your Ganache testnet.

# The Finish Line

Congratulations, you've just successfully integrated the full suite of Drizzle, Truffle, and Ganache tooling into your React Native dapp!
