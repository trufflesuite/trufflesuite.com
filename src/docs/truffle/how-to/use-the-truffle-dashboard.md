---
title: Use Truffle Dashboard
layout: docs.hbs
---
# Use Truffle Dashboard

When deploying your smart contracts you need to specify an Ethereum account that has enough funds to cover the transaction fees of the deployment. A popular method of doing this is copy-pasting your mnemonic phrase to a gitignored `.env` file so that it can be used for, e.g., the `@truffle/hdwallet-provider`. However, it is generally a bad practice to copy-paste your keys, especially since we have wallets like MetaMask that can send transactions for us.

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

From there, every Ethereum RPC request will be forwarded from Truffle to the Truffle Dashboard, where the user can inspect the RPC requests and process them with MetaMask.

![Truffle Dashboard Transaction](/img/docs/truffle/using-the-truffle-dashboard/truffle-dashboard-transaction.png)

Any additional network options or overrides can be provided by adding a network called "dashboard" to your `truffle-config.js` file and providing network options like you would a regular network.

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


## Decode requests

Truffle Dashboard supports decoding requests for certain RPC calls, allowing you to view a more human-friendly
representation of the messaging between your computer and the Ethereum network.

<p class="alert alert-info">
<i class="far fa-info-circle"></i> <strong>Information</strong>: The decode functionality is available
in Truffle projects for the following methods: <code>eth_sendTransaction</code>, <code>personal_sign</code>, <code>eth_signTypedData_v3</code>, and
<code>eth_signTypedData_v4</code>. We plan to support non-Truffle tooling such as Hardhat in the future.
</p>

Each time you run `truffle compile`, Truffle shares information about your contracts with Truffle Dashboard.
Later, when you call a method, Truffle Dashboard consults its repository of this compilation
information, and asks `@truffle/decoder` to translate the request into a human readable format.

For example, if you have a contract that allows you to mint 5 tokens and send it to a
user (`myaccount.eth` in this example), the low-level form would look something like:

```
0xa0e9439c000000000000000000000000627306090abab3a6e1400e9345bc60c78a8bef570000000000000000000000000000000000000000000000000000000000000005
```

Truffle Dashboard can display this in a more human-readable format, for example:

```
mint(myaccount.eth, 5)
```

## Usage with non-Truffle tooling

To make the Truffle Dashboard accessible to everyone, we developed it to be agnostic about the tools
you're using. You can use the Truffle Dashboard with non-Truffle tools such as Hardhat.

<p class="alert alert-info">
<i class="far fa-info-circle"></i> <strong>Information</strong>: Truffle Dashboard cannot decode requests
when using tools other than Truffle or Hardhat (with the plugin outlined below). We plan to add support for additional tools in the future.
</p>

### Using Truffle Dashboard with the Hardhat plugin

The plugin brings the complete Truffle Dashboard experience, including decoded transaction information, to your Hardhat projects. See the [Installation](https://github.com/trufflesuite/truffle/tree/develop/packages/dashboard-hardhat-plugin#installation) steps to get it setup for your project. The Hardhat plugin extends `npx hardhat compile` by sending the compiled artifacts to Truffle Dashboard, enabling seamless integration with your existing workflow.

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

From there, it can be used with any Hardhat task or tools like [hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

```
hardhat deploy --network truffle-dashboard
```
