---
title: Using the Truffle Dashboard
layout: docs.hbs
---
# Using the Truffle Dashboard

When deploying your smart contracts you need to specify an Ethereum account that has enough funds to cover the transaction fees of the deployment. A popular method of doing this is copy-pasting your mnemonic phrase to a gitignored `.env` file so that it can be used for, e.g., the `@truffle/hdwallet-provider`. But in general it is a bad practice to copy-paste your keys, especially since we have wallets like MetaMask that can send transactions for us.

We developed the Truffle Dashboard to provide an easy way to use your existing MetaMask wallet for your deployments and for other transactions that you need to send from a command line context. Because the Truffle Dashboard connects directly to MetaMask it is also possible to use it in combination with hardware wallets like Ledger or Trezor.

## Starting a dashboard

To start a Truffle Dashboard, you need to run the `truffle dashboard` command in a separate terminal window.

```
> truffle dashboard [--port <number>] [--host <string>] [--verbose]

Truffle Dashboard running at http://localhost:24012
DashboardProvider RPC endpoint running at http://localhost:24012/rpc
```

By default, the command above starts a dashboard at `http://localhost:24012` and opens the dashboard in a new tab in your default browser. The Dashboard then prompts you to connect your wallet and confirm that you're connected to the right network. **You should double check your connected network at this point, since switching to a different network during a deployment can have unintended consequences.**

![Connect your wallet to the Truffle Dashboard](/img/docs/truffle/using-the-truffle-dashboard/truffle-dashboard-connect.png)

![Confirm your connected network](/img/docs/truffle/using-the-truffle-dashboard/truffle-dashboard-confirm.png)

The port and host can be configured through command line options, or by configuring them inside your `truffle-config.js`.

```js
module.exports = {
  // ... rest of truffle config

  dashboard: {
    port: 24012,
  }

  networks: {
    // ... network configurations, including the network named 'dashboard'
  }
}
```


## Connecting to the dashboard

To make connecting to the Truffle Dashboard easy, Truffle includes a built in network named "dashboard". This built in network automatically uses the port and host specified in the dashboard configuration or falls back to the default `http://localhost:24012`. This built in network can be used with all your deployments or scripts.

```
truffle migrate --network dashboard
truffle console --network dashboard
```

From there every Ethereum RPC request will be forwarded from Truffle to the Truffle Dashboard, where the user can inspect the RPC requests and process them with MetaMask.

![Truffle Dashboard Transaction](/img/docs/truffle/using-the-truffle-dashboard/truffle-dashboard-transaction.png)

Any additional network options or overrides can be provided by adding a network called "dashboard" to your `truffle-config.js` file and providing network options like it were a regular network.

```js
module.exports = {
  // ... rest of truffle config

  networks: {
    // ... rest of network config

    dashboard: {
      networkCheckTimeout: 120000,
    }
  }

  dashboard: {
    // ... dashboard host/port config
  }
};
```


## Usage with non-Truffle tooling

We know that not everyone uses Truffle for their smart contract development, but we believe that the Truffle Dashboard should be accessible to everyone. This is why we developed the Truffle Dashboard to be agnostic about the tools you're using, so it can also be used with other tools such as Hardhat.

When using the Truffle Dashboard with Hardhat, you need to create a network configuration inside your `hardhat.config.js` file that specifies the Truffle Dashboard's RPC URL.

```js
module.exports = {
  // ... rest of hardhat config

  networks: {
    // ... rest of network config

    'truffle-dashboard': {
      url: "http://localhost:24012/rpc"
    }
  },
};
```

From there, it can be used with any Hardhat task or tools like hardhat-deploy.

```
hardhat deploy --network truffle-dashboard
```

