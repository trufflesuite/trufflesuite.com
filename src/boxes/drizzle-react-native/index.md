---
hide:
  - navigation
---

# Drizzle React Native Box

This box will get you up and running with building a dapp on React Native (Android and iOS).

## Installation

1. Install Truffle and Ganache CLI globally

    ```
    npm install -g truffle
    npm install -g ganache-cli
    ```

1. Download the box. This also takes care of installing the necessary dependencies.

    ```sh
    truffle unbox drizzle-react-native
    ```

1. Go through the [React Native tutorial](https://facebook.github.io/react-native/docs/getting-started). Make sure to select `Building Projects with Native Code` since we will be leveraging some native code.

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
    ```js
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