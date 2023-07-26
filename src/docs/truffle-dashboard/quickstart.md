---
title: Truffle Dashboard quickstart
layout: docs.hbs
---

# Truffle Dashboard quickstart

## Installation

### As part of Truffle CLI

Truffle Dashboard comes with Truffle CLI, so if you have a global Truffle CLI installation, you can run `truffle dashboard` in the console to start a dashboard instance. If you plan to use Truffle Dashboard with Hardhat, you'll probably want to use the npx approach unless you know you want to use Truffle CLI. Otherwise, [here are the installation instructions for Truffle CLI](/docs/truffle/how-to/install/).

### Standalone with npx

To run Truffle Dashboard without having to formally install Truffle CLI, you can run `npx truffle dashboard` and dependency installation will be handled for you.

Note: Currently this approach still installs Truffle CLI in the background. We're working to remove dependencies on Truffle CLI, so in the future this command will get progressively lighter.

## Starting a dashboard

To start a Truffle Dashboard, you need to run the `truffle dashboard` command (or `npx truffle dashboard`) in a separate terminal window.

```
> truffle dashboard [--port <number>] [--host <string>] [--verbose]

Truffle Dashboard running at http://localhost:24012
DashboardProvider RPC endpoint running at http://localhost:24012/rpc
```

By default, the command above starts a dashboard at `http://localhost:24012` and opens the dashboard in a new tab in your default browser. The Dashboard then prompts you to connect your wallet and confirm that you're connected to the right network. **You should double check your connected network at this point, since switching to a different network during a deployment can have unintended consequences.**

![Connect your wallet to the Truffle Dashboard](/img/docs/truffle-dashboard/quickstart/connect-wallet.png)

![Confirm your connected network](/img/docs/truffle-dashboard/quickstart/confirm-network.png)

Truffle Dashboard can be used with Truffle or Hardhat. Please select a framework below for installation and configuration instructions.

- [Truffle](#usage-with-truffle)
- [Hardhat](#usage-with-hardhat)

## Usage with Truffle

### Connection

To make connecting to the Truffle Dashboard easy, Truffle includes a built in network named "dashboard". This built in network automatically uses the port and host specified in the dashboard configuration or falls back to the default `http://localhost:24012`. This built in network can be used with all your deployments or scripts.

```
truffle migrate --network dashboard
truffle console --network dashboard
```

From there, every Ethereum RPC request will be forwarded from Truffle to the Truffle Dashboard, where the user can inspect the RPC requests and process them with MetaMask.

![Truffle Dashboard Transaction](/img/docs/truffle-dashboard/quickstart/signature-request.png)

### Configuration

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

## Usage with Hardhat

To make the Truffle Dashboard accessible to everyone, we developed it to be agnostic about the tools
you're using. You can use the Truffle Dashboard with non-Truffle tools such as Hardhat.

<p class="alert alert-info">
<i class="far fa-info-circle"></i> <strong>Information</strong>: Truffle Dashboard cannot decode requests
when using tools other than Truffle; we plan to add support for other tools in the future.
</p>

### Configuration

When using the Truffle Dashboard with Hardhat, you need to create a network configuration inside your `hardhat.config.js` file that specifies the Truffle Dashboard's RPC URL.

```js
module.exports = {
  // ... rest of hardhat config

  networks: {
    // ... rest of network config

    "truffle-dashboard": {
      url: "http://localhost:24012/rpc",
    },
  },
};
```

### Connection

Once you've added Truffle Dashboard as a network in your `hardhat.config.js`, it can be used with any Hardhat task or tools like hardhat-deploy.

```
hardhat deploy --network truffle-dashboard
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
