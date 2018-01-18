# Configuration

## Location

Your configuration file is called `truffle.js` and is located at the root of your project directory. This file is a Javascript file and can execute any code necessary to create your configuration. It must export an object representing your project configuration like the example below.

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
```

The default configuration ships with configuration for a single development network, running on `127.0.0.1:8545`. There are many other configuration options, detailed below.


### Resolving naming conflicts on Windows

When using the Command Prompt on Windows, the default configuration file name can cause a conflict with the `truffle` executable, and so **you may not be able to run Truffle commands properly on existing projects**.

This is because of the way that command precedence works on the Command Prompt. The `truffle.cmd` executable is on the path as part of the npm package, but the `truffle.js` configuration file is in the actual directory where the `truffle` command is run. Because `.js` is an acceptable executable extension by default, `truffle.js` takes precedence over `truffle.cmd`, causing unexpected results.

Any of the following solutions will remedy this issue:

* Call the executable file explicitly using its `.cmd` extension (`truffle.cmd compile`)
* Edit the system `PATHEXT` environment variable and remove `.JS;` from the list of executable extensions
* Rename `truffle.js` to something else (`truffle-config.js`)
* Use [Windows PowerShell](https://docs.microsoft.com/en-us/powershell/) or [Git BASH](https://git-for-windows.github.io/), as these shells do not have this conflict.


## General options

### build

Build configuration of your application, if your application requires tight integration with Truffle. Most users likely will not need to configure this option. See the [Advanced Build Processes](http://truffleframework.com/docs/advanced/build_processes) section for more details.

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
    host: "127.0.0.1",
    port: 8545,
    network_id: "*" // match any network
  },
  live: {
    host: "178.25.19.88", // Random IP for example purposes (do not use)
    port: 80,
    network_id: 1,        // Ethereum public network
    // optional config values:
    // gas
    // gasPrice
    // from - default address to use for any transaction Truffle makes during migrations
    // provider - web3 provider instance Truffle should use to talk to the Ethereum network.
    //          - function that returns a web3 provider instance (see below.)
    //          - if specified, host and port are ignored.
  }
}
```

For each network, if unspecified, transaction options will default to the following values:

* `gas`: Gas limit used for deploys. Default is `4712388`.
* `gasPrice`: Gas price used for deploys. Default is `100000000000` (100 Shannon).
* `from`: From address used during migrations. Defaults to the first available account provided by your Ethereum client.
* `provider`: Default web3 provider using `host` and `port` options: `new Web3.providers.HttpProvider("http://<host>:<port>")`

For each network, you can specify either `host` / `port` or `provider`, but not both. If you need an HTTP provider, we recommend using `host` and `port`, while if you need a custom provider such as `HDWalletProvider`, you must use `provider`.

#### Managing multiple providers

As seen above, your `truffle.js` file can contain multiple network configurations, but in general you will only work with a single network at a time. While you can issue a command to migrate to a single network (`truffle migrate --network live`), a minimal network connection will nevertheless be opened to every network defined with a `provider`.

As a workaround to this, you can wrap your network's provider definition in a function call. This way, the network information is there, but Truffle will ignore it until specifically called.

For example, consider the following network list consisting of a local test network and a Infura-hosted Ropsten network, both provided by HDWalletProvider:

```javascript
networks: {
  ropsten: {
    provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"),
    network_id: '3',
  },
  test: {
    provider: new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/"),
    network_id: '*',
  },
}
```

To ensure that only one network is ever connected at a time, modify the `provider` keys as follows:

```javascript
networks: {
  ropsten: {
    provider: function() {
      return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/");
    },
    network_id: '3',
  },
  test: {
    provider: function() {
      return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/");
    },
    network_id: '*',
  },
}
```

If you specify `host` and `port` instead of `provider`, Truffle will create its own default HTTP provider using that host and port, and no minimal network connection will be opened, so there is no need to do the function wrapping workaround. That said, you wouldn't be able to use a custom provider in this case.

### contracts_build_directory

The default output directory for compiled contracts is `./build/contracts` relative to the project root. This can be changed with the `contracts_build_directory` key.

Examples:

To place the built contract artifacts in `./output/contracts`:

```javascript
module.exports = {
  contracts_build_directory: "./output",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    }
  }
};
```

The built contract artifacts do not need to be inside the project root:

```javascript
module.exports = {
  contracts_build_directory: "../../../output",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    }
  }
};
```

Absolute paths will also work. This is not recommended though, as an absolute path may not exist when compiled on another system. If you use absolute paths on Windows, make sure to use double backslashes for paths (example: `C:\\Users\\Username\\output`).

### mocha

Configuration options for the [MochaJS](http://mochajs.org/) testing framework. This configuration expects an object as detailed in Mocha's [documentation](https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically#set-options).

Example:

```javascript
mocha: {
  useColors: true
}
```

## Solidity compiler configuration

Solidity compiler settings. Supports optimizer settings for `solc`.

### solc

Configuration options to pass to the Solidity compiler.

Example:

```javascript
solc: {
  optimizer: {
    enabled: true,
    runs: 200
  }
}
```

For more information, please see the Solidity documentation on [Compiler Input and Output JSON Description](http://solidity.readthedocs.io/en/develop/using-the-compiler.html#compiler-input-and-output-json-description).


## EthPM configuration

This configuration applies to the optional `ethpm.json` file that exists alongside your `truffle.js` configuration file.

### package_name

Name of the package you're publishing. Your package name must be unique to the EthPM registry.

Example:
```javascript
package_name: "adder"
```

### version

Version of this package, using the [semver](http://semver.org/) specification.

Example:
```javascript
version: "0.0.3"
```

### description

A text description of your package for human readers.

Example:
```javascript
description: "Simple contract to add two numbers"
```

### authors

An array of authors. Can have any format, but we recommend the format below.

Example:
```javascript
authors: [
  "Tim Coulter <tim.coulter@consensys.net>"
]
```

### keywords

An array of keywords that tag this package with helpful categories.

Example:
```javascript
keywords: [
  "ethereum",
  "addition"
],
```

### dependencies

A list of EthPM packages your package depends on, using [semver](http://semver.org/) version ranges, like npm.

Example:
```javascript
dependencies: {
  "owned": "^0.0.1",
  "erc20-token": "1.0.0"
}
```


### license

License to use for this package. Strictly informative.

Example:
```javascript
license: "MIT",
```
