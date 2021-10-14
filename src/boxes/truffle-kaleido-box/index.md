---
hide:
  - navigation
---

![Truffle & Kaleido](https://github.com/kaleido-io/truffle-kaleido-box/blob/master/box-img-sm.png "Truffle & Kaleido")

# Truffle & Kaleido Truffle Box

This box gives you a boilerplate to get up and running quickly with Truffle on a Kaleido chain.

## Installation

First ensure you are in a new and empty directory.

1. Run the `unbox` command with `npx` and skip to step 3. This will install all necessary dependencies.

```
npx truffle unbox kaleido-io/truffle-kaleido-box
```

2. Alternatively, you can install Truffle globally and then run the `unbox` command.

```
npm install -g truffle
truffle unbox kaleido-io/truffle-kaleido-box
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
