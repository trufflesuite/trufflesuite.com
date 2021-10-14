---
hide:
  - navigation
---

![Drizzle & Kaleido](https://github.com/kaleido-io/drizzle-kaleido-box/blob/master/box-img-sm.png "Drizzle & Kaleido")

# Drizzle & Kaleido Truffle Box

This box gives you a boilerplate to get up and running quickly with Drizzle & Truffle on a Kaleido chain.

## Installation

First ensure you are in a new and empty directory.

1. Run the `unbox` command with `npx` and skip to step 3. This will install all necessary dependencies.

```
npx truffle unbox kaleido-io/drizzle-kaleido-box
```

2. Alternatively, you can install Truffle globally and then run the `unbox` command.

```
npm install -g truffle
truffle unbox kaleido-io/drizzle-kaleido-box
```

3. Run the development console. This will instantiate a local chain for you to test that Truffle is working properly.

```
truffle develop
```

4. Ensure that you're able to both compile, test, and finally migrate your contracts to your local chain.

```
compile
test
migrate
```

5. If everything looks good, you can exit the Truffle console with `.exit`.

## Connect to Kaleido

1. In Kaleido, select the node you want to connect to, then choose `+ Connect Node`.

2. Select `Native JSON/RPC`

3. Choose an application credential to use for this connection.

4. Choose the `Truffle Suite` connection type.

5. Copy the connection info from this panel into the respective variables inside of `truffle-config.js`. If you are using Quorum in this environment, ensure to uncomment the `type: "quorum"` property on your network object.

```
const appCred = 'yourappcred';
const connectionURL = 'nodeConnectionURL';
```
```
type: 'quorum' // Use this property for Quorum environments
```

6. Migrate your contracts to your Kaleido chain!

```
truffle migrate
```

## Connect MetaMask to your Kaleido Chain

1. In the `Networks` switcher in MetaMask, choose `Custom RPC`.

2. Find the `New Network` section, and click `Advanced Options`. Add the `MetaMask RPC URL` from the connect panel, and give your network a nickname.

## Start Your React App

1. Open the `/app` directory and start the development server.
```
cd app && npm run start
```

2. The development server will open a browser at `http://localhost:3000` by default.

3. Attempt to change the `Stored Value` of `SimpleStorage` -- you should see the refresh icon until the transaction is confirmed, at which point the `Stored Value` of `SimpleStorage` should automatically update.
