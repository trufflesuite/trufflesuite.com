---
title: Configuring Your Project
layout: docs.hbs
---

<p class="alert alert-danger">
<strong>Tezos support</strong> in Truffle is experimental. Give it a spin, and help us out by <a href="https://github.com/trufflesuite/truffle/issues">filing issues on Github</a>.
</p>

# Configuring your Tezos Project

## Location

Your configuration file is called `truffle-config.js` and is located at the root of your project directory. This file is a Javascript file and can execute any code necessary to create your configuration. It must export an object representing your project configuration like the example below.

```javascript
const { mnemonic, secret, password, email } = require("./faucet.json");

module.exports = {
  // see <https://trufflesuite.com/docs/tezos/truffle/reference/configuring-tezos-projects>
  // for more details on how to specify configuration options!
  networks: {
    development: {
      host: "https://delphinet.smartpy.io",
      port: 443,
      network_id: "*",
      secret,
      mnemonic,
      password,
      email,
      type: "tezos"
    }
  }
};
```

## Configuring your project to deploy to a public test network

The above configuration defines a single development network pointed at the public [Delphinet](https://tezos.gitlab.io/introduction/test_networks.html) test network. You can see how this is set up in context by following our [quickstart](/docs/tezos/truffle/quickstart).

Developing on public test nets can be limiting for a number of reasons (acquiring test net tokens, performance, and internet connectivity, among others). Fortunately, there's a local solution.

## Setting up a local test network with Flextesa

Enter Flextesa. "Flextesa" is short for [flexible test sandboxes](https://medium.com/@obsidian.systems/introducing-flextesa-robust-testing-tools-for-tezos-and-its-applications-edc1e336a209), and can help you quickly set up a Tezos environment locally.

Our [example Tezos box](https://github.com/truffle-box/tezos-example-box) comes with scripts to spin up a flextesa environment with zero-work. Check out [the documentation](https://github.com/truffle-box/tezos-example-box#sandbox-management).

If you're going to set up a flextesa environment on your own, you'll want to perform the following:

1. Run the flextesa environment via docker ([see example](https://github.com/truffle-box/tezos-example-box/blob/master/scripts/sandbox/start_sandbox.sh))
1. Configure your Truffle project to point to the flextesa environment. ([see example](https://github.com/truffle-box/tezos-example-box/blob/master/truffle-config.js#L7))
1. Import the default private key into your Truffle configuration. ([see example](https://github.com/truffle-box/tezos-example-box/blob/master/truffle-config.js#L1))


## Suported configuration options

### networks

Specifies which networks are available for deployment during migrations. When compiling and running migrations on a specific network, contract artifacts will be saved and recorded for later use. When your contract abstractions detect that your Tezos client is connected to a specific network, they'll use the contract artifacts associated that network to simplify app deployment. 

The `networks` object, shown below, is keyed by a network name and contains a corresponding object that defines the parameters of the network. The `networks` option is required, as if you have no network configuration, Truffle will not be able to deploy your contracts. The default network configuration provided by the [Tezos example Truffle box](https://github.com/truffle-box/tezos-example-box) specifies multiple available networks, including mainnet and the Babylon testnet. To configure Truffle to connect to other networks, simply add more named networks and specify the corresponding network id.

The network name is used for user interface purposes, such as when running your migrations on a specific network:

```shell
$ truffle migrate --network delphinet
```

Example:

```javascript
networks: {
  development: {
    host: "https://delphinet.smartpy.io",
    port: 443,
    network_id: "*",
    type: "tezos"
  },
  delphinet: {
    host: "https://delphinet.smartpy.io",
    port: 443,
    network_id: "*",
    type: "tezos"
  },
  mainnet: {
    host: "https://mainnet.smartpy.io",
    port: 443,
    network_id: "*",
    type: "tezos"
  },
  zeronet: {
    host: "https://zeronet.smartpy.io",
    port: 443,
    network_id: "*",
    type: "tezos"
  }
}
```

### contracts_directory

The default directory for uncompiled contracts is `./contracts` relative to the project root. If you wish to keep your contracts in a different directory you may specify a `contracts_directory` property.

Example:

To have Truffle find contracts in `./allMyStuff/someStuff/theContractFolder` (recursively) at compile time:

```javascript
module.exports = {
  contracts_directory: "./allMyStuff/someStuff/theContractFolder",
  networks: {
    // ...
  }
};
```

<p class="alert alert-info">
<i class="far fa-info-circle"></i> <strong>Note</strong>: In addition to specifying a relative path, you can also use globs/regular expressions to selectively compile contracts.
</p>

### contracts_build_directory

The default output directory for compiled contracts is `./build/contracts` relative to the project root. This can be changed with the `contracts_build_directory` key.

Examples:

To place the built contract artifacts in `./output/contracts`:

```javascript
module.exports = {
  contracts_build_directory: "./output",
  networks: {
    // ...
  }
};
```

The built contract artifacts do not need to be inside the project root:

```javascript
module.exports = {
  contracts_build_directory: "../../../output",
  networks: {
    // ...
  }
};
```

Absolute paths will also work. This is not recommended though, as an absolute path may not exist when compiled on another system. If you use absolute paths on Windows, make sure to use double backslashes for paths (example: `C:\\Users\\Username\\output`).

### migrations_directory
The default migrations directory is `./migrations` relative to the project root. This can be changed with the `migrations_directory` key.

 Example:

```javascript
module.exports = {
  migrations_directory: "./allMyStuff/someStuff/theMigrationsFolder",
  networks: {
    // ...
  }
};
```


### mocha

Configuration options for the [MochaJS](https://mochajs.org/) testing framework. This configuration expects an object as detailed in Mocha's [documentation](https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically#set-options).

Example:

```javascript
mocha: {
  useColors: true
}
```

## plugins

<p class="alert alert-warning">
<strong>Note</strong>: This feature is new and still in a barebones state. Please let us
know how we can improve it!
</p>

Provides Truffle with a list of installed third-party extensions installed as
NPM package dependencies.

Truffle plugin support is currently limited to plugins that define custom
workflow commands. For more information, see [Third-Party Plugin Commands](/docs/truffle/getting-started/writing-external-scripts#third-party-plugin-commands).
