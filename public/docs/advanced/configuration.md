# Location

Your configuration file is called `truffle.js` and is located at the root of your project directory. This file is a Javascript file and can execute any code necessary to create your configuration. It must export an object representing your project configuration like the example below.

### Resolving Naming Conflicts on Windows

When using the Command Prompt on Windows, the default configuration file name can cause a conflict with the `truffle` executable. If this is the case, we recommend using Windows PowerShell or [Git BASH](https://git-for-windows.github.io/) as these shells do not have this conflict. Alternatively, you can rename the configuration file to `truffle-config.js` to avoid this conflict.

# Example

```javascript
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
```

The default configuration ships with configuration for a single development network, running on `localhost:8545`. There are many other configuration options, detailed below.

# General Options

### build

Build configuration of your application, if your application requires tight integration with Truffle. Most users likely will not need to configure this option. See the [Advanced Build Processes](http://localhost:9000/docs/advanced/build_processes) section for more details.

### networks

Specifies which networks are available for deployment during migrations, as well as specific transaction parameters when interacting with each network (such as gas price, from address, etc.). When compiling and running migrations on a specific network, contract artifacts will be saved and recorded for later use. When your contract abstractions detect that your Ethereum client is connected to a specific network, they'll use the contract artifacts associated that network to simplify app deployment. Networks are identified through Ethereum's `net_version` RPC call, as well as blockchain URIs.

The `networks` object, shown below, is keyed by a network name and contains a corresponding object that defines the parameters of the network. The `networks` option is required, as if you have no network configuration, Truffle will not be able to deploy your contracts. The default network configuration provided by `truffle init` gives you a development network that matches any network it connects to -- this is useful during development, but not suitable for production deployments. To configure Truffle to connect to other networks, simply add more named networks and specify the corresponding network id.

The network name is used for user interface purposes, such as when running your migrations on a specific network:

```bash
$ truffle migrate --network live
```

Example:

```javascript
networks: {
  development: {
    host: "localhost",
    port: 8545,
    network_id: "*" // match any network
  },
  live: {
    host: "178.25.19.88", // Random IP for example purposes (do not use)
    port: 80,
    network_id: 1,        // Ethereum public network
    // optional config values
    // gas
    // gasPrice
    // from - default address to use for any transaction Truffle makes during migrations
  }
}
```

For each network, if unspecified, transaction options will default to the following values:

* `gas`: Gas limit used for deploys. Default is `4712388`.
* `gasPrice`: Gas price used for deploys. Default is `100000000000` (100 Shannon).
* `from`: From address used during migrations. Defaults to the first available account provided by your Ethereum client.

### mocha

Configuration options for the [MochaJS](http://mochajs.org/) testing framework. This configuration expects an object as detailed in Mocha's [documentation](https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically#set-options).

Example:

```javascript
mocha: {
  useColors: true
}
```

# EthPM Options

### package_name

Used for EthPM package specification. Add this option if you plan to publish your contracts to EthPM.

Example:
```javascript
package_name: "adder"
```

### version

Used for EthPM package specification. Add this option if you plan to publish your contracts to EthPM.

Example:
```javascript
version: "0.0.3"
```

### description

Used for EthPM package specification. Add this option if you plan to publish your contracts to EthPM.

Example:
```javascript
description: "Simple contract to add two numbers"
```

### authors

Used for EthPM package specification. Add this option if you plan to publish your contracts to EthPM.

Example:
```javascript
authors: [
  "Tim Coulter <tim.coulter@consensys.net>"
]
```

### keywords

Used for EthPM package specification. Add this option if you plan to publish your contracts to EthPM.

Example:
```javascript
keywords: [
  "ethereum",
  "addition"
],
```

### dependencies

Used for EthPM package specification. Add this option if you plan to publish your contracts to EthPM, and your package relies on other EthPM dependencies.

Example:
```javascript
dependencies: {
  "owned": "^0.0.1",
  "erc20-token": "1.0.0"
}
```


### license

Used for EthPM package specification. Add this option if you plan to publish your contracts to EthPM.

Example:
```javascript
license: "MIT",
```
