---
title: Configuration
layout: docs.hbs
---
# Configuration

## Location

Your configuration file is called `truffle-config.js` and is located at the root of your project directory. This file is a Javascript file and can execute any code necessary to create your configuration. It must export an object representing your project configuration like the example below.

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
```

Be sure to check out the `truffle-config.js` contained by the barebones project that
`truffle init` creates. The `truffle-config.js` contains a handful of commented out
examples of some configuration options that you might specify/tweak.


### Resolving naming conflicts on Windows

<p class="alert alert-warning">
<i class="far fa-exclamation-triangle"></i> <strong>Note</strong>: This only applies to Truffle version 4 and below.
</p>


When using the Command Prompt on Windows, the default configuration file name can cause a conflict with the `truffle` executable, and so **you may not be able to run Truffle commands properly on existing projects**.

This is because of the way that command precedence works on the Command Prompt. The `truffle.cmd` executable is on the path as part of the npm package, but the `truffle.js` configuration file is in the actual directory where the `truffle` command is run. Because `.js` is an acceptable executable extension by default, `truffle.js` takes precedence over `truffle.cmd`, causing unexpected results.

Any of the following solutions will remedy this issue:

* Call the executable file explicitly using its `.cmd` extension (`truffle.cmd compile`)
* Edit the system `PATHEXT` environment variable and remove `.JS;` from the list of executable extensions
* Rename `truffle.js` to something else (`truffle-config.js`)
* Use [Windows PowerShell](https://docs.microsoft.com/en-us/powershell/) or [Git BASH](https://git-for-windows.github.io/), as these shells do not have this conflict.


## General options

### build

Build configuration of your application, if your application requires tight integration with Truffle. Most users likely will not need to configure this option. See the [Build Processes](/docs/truffle/advanced/build-processes) section for more details.

### networks

Specifies which networks are available for deployment during migrations, as well as specific transaction parameters when interacting with each network (such as gas price, from address, etc.). When compiling and running migrations on a specific network, contract artifacts will be saved and recorded for later use. When your contract abstractions detect that your Ethereum client is connected to a specific network, they'll use the contract artifacts associated that network to simplify app deployment. Networks are identified through Ethereum's `net_version` RPC call, as well as blockchain URIs.

The `networks` object, shown below, is keyed by network names and each name contains a corresponding
object that defines the parameters of the network. You will most likely want to provide
your own network names and configurations to tell Truffle what networks to connect to
for deployments and testing.

Once you have defined your networks, you can provide the names as an option for certain
commands; this is possible during testing or running migrations. You might specify a
network name during migrations as follows:

```shell
$ truffle migrate --network live
```

Note that if no `--network` option is provided when using commands
that require a network, Truffle will by default look for a network named "development" in your
`truffle-config.js`. It will then use those settings to try and connect. See the
provided examples below for some guidance on defining your networks.

Example:

```javascript
networks: {
  development: {
    host: "127.0.0.1",
    port: 8545,
    network_id: "*", // match any network
    websockets: true
  },
  live: {
    host: "178.25.19.88", // Random IP for example purposes (do not use)
    port: 80,
    network_id: 1,        // Ethereum public network
    // optional config values:
    // gas                  - use gas and gasPrice if creating type 0 transactions
    // gasPrice             - all gas values specified in wei
    // maxFeePerGas         - use maxFeePerGas and maxPriorityFeePerGas if creating type 2 transactions (https://eips.ethereum.org/EIPS/eip-1559)
    // maxPriorityFeePerGas -
    // from - default address to use for any transaction Truffle makes during migrations
    // provider - web3 provider instance Truffle should use to talk to the Ethereum network.
    //          - function that returns a web3 provider instance (see below.)
    //          - if specified, host and port are ignored.
    // skipDryRun: - true if you don't want to test run the migration locally before the actual migration (default is false)
    // confirmations: - number of confirmations to wait between deployments (default: 0)
    // timeoutBlocks: - if a transaction is not mined, keep waiting for this number of blocks (default is 50)
    // deploymentPollingInterval: - duration between checks for completion of deployment transactions
    // disableConfirmationListener: - true to disable web3's confirmation listener
  }
}
```

For each network, if unspecified, transaction options will default to the following values:

* `gas`: Gas limit used for deploys. Default is `6721975`.
* `gasPrice`: Gas price used for deploys. Default is `20000000000` (20 Gwei).
* `from`: From address used during migrations. Defaults to the first available account provided by your Ethereum client.
* `provider`: Default web3 provider using `host` and `port` options: `new Web3.providers.HttpProvider("https://<host>:<port>")`
* `websockets`: You will need this enabled to use the `confirmations` listener or to hear Events using `.on` or `.once`.  Default is `false`.
* `deploymentPollingInterval`: When a smart contract is deployed, this determines how often to check whether the transaction has been completed, specified in milliseconds. Default is `4000`. Note that this is *independent* of the polling interval that `provider` may use. See [`@truffle/hdwallet-provider` documentation](https://github.com/trufflesuite/truffle/blob/develop/packages/hdwallet-provider/README.md#instantiation) if you are using `HDWalletProvider` and wish to specify a custom `pollingInterval`.

Note that it is perfectly fine to set `disableConfirmationListener` while also setting a value for `confirmations`; this will not cause hangs during deployment.

For each network, you can specify `host` / `port`, `url`, or `provider`, but not more than one. If you need an HTTP provider, we recommend using `host` and `port`, or `url`, while if you need a custom provider such as `HDWalletProvider`, you must use `provider`.  The `url` option also supports WebSockets and SSL. `url` should include the full url; see the examples below:
- http://127.0.0.1:8545
- ws://127.0.0.1:8545
- https://sandbox.truffleteams.com/yoursandboxid
- wss://sandbox.truffleteams.com/yoursandboxid

### console

Use this option to configure the console environment. This is the environment you get when using `truffle console` or `truffle develop`.

* `require`: Use this to specify a JavaScript module that will be loaded into the console environment at startup. Your module's default
export must be an object with named keys. Each key will used as a variable name, assigned its value, and be available in the console environment.
For example, if your JavaScript is `module.exports = { myVariable: "three doughnuts please!" }` then you will have the variable `myVariable`
available in the console with the value `"three doughnuts please!"`.

You may specify this option in several ways.
1. The value of require can be a string path to the target JavaScript file to be loaded.
2. An object with a `path` property that is a string path to the JavaScript to be loaded.
3. An object with a `path` property that is a string path to the JavaScript to be loaded as well as an `as` property
that specifies the namespace where the variables loaded will be available.

The following are examples of how you can set this property in your `truffle-config.js`.

You can set `console.require` to be a string path.
```javascript
module.exports = {
  console: {
    require: "./somePath.js"
  }
}
```

You can alternatively set `console.require` to an array of objects where you specify a `path` property.
Note the use of the optional property `as` when specifying the path `"../../someOtherPath.js"`.
The values loaded from that module will be namespaced under `myVariables` in the console environment.
In other words, you will access the loaded variables from that module like `myVariables.<myVariableName>`.
```javascript
module.exports = {
  console: {
    require: [
      { path: "./somePath.js" },
      { path: "../../someOtherPath.js", as: "myVariables" }
    ]
  }
}
```


#### Providers

The following network list consists of a local test network and an Infura-hosted Ropsten network, both provided by HDWalletProvider. Make sure you wrap `@truffle/hdwallet-provider` instances in a function closure as shown below to ensure that only one network is ever connected at a time.

```javascript
networks: {
  ropsten: {
    provider: function() {
      return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/YOUR-PROJECT-ID");
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

### contracts_directory

The default directory for uncompiled contracts is `./contracts` relative to the project root. If you wish to keep your contracts in a different directory you may specify a `contracts_directory` property.

Example:

To have Truffle find contracts in `./allMyStuff/someStuff/theContractFolder` (recursively) at compile time:

```javascript
module.exports = {
  contracts_directory: "./allMyStuff/someStuff/theContractFolder",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    }
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

### migrations_directory
The default migrations directory is `./migrations` relative to the project root. This can be changed with the `migrations_directory` key.

 Example:

```javascript
module.exports = {
  migrations_directory: "./allMyStuff/someStuff/theMigrationsFolder",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    }
  }
};
```

### dashboard

Configuration options for the [Truffle Dashboard](/docs/truffle/getting-started/using-the-truffle-dashboard.html). These options will be used when running `truffle dashboard` inside the project directory and these details will be used for the built in "dashboard" network.

Example:

```javascript
module.exports = {
  port: 24012,
  host: "localhost",
  verbose: false,
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

### etherscan

Configuration options that Truffle will use when attempting to download source code from [Etherscan](https://etherscan.io/).  Has one suboption:

* `apiKey`: The API key to use when retrieving source code from Etherscan.  If omitted, source will be retrieved without an API key, which may be slower.

Example:

```javascript
etherscan: {
  apiKey: "0123456789abcdef0123456789abcdef" //replace this with your API key if you have one
}
```

### sourceFetchers

A list of verified source repositories that Truffle may attempt to download source code from, in the order it should attempt to use them.  Currently the supported repositories are `"etherscan"` (for [Etherscan](https://etherscan.io/)) and `"sourcify"` (for [Sourcify](https://github.com/ethereum/sourcify)).  The default is `["etherscan", "sourcify"]`, i.e., to check Etherscan first, then Sourcify.

Example:
```javascript
sourceFetchers: ["sourcify", "etherscan"] //prefer Sourcify over Etherscan
```

## Compiler configuration

In the `compilers` object you can specify settings related to the compilers used by Truffle.

### solc

Solidity compiler settings. Supports optimizer settings for `solc`, as well as other settings such as debug and metadata settings.

You may specify...
+ any solc-js version (using semver) listed at [solc-bin](https://solc-bin.ethereum.org/bin/list.json). Specify the one you want and Truffle will get it for you.
+ "native" to use a natively compiled solc binary (you'll need to install this yourself, links to help below).
+ a dockerized solc tag from one of images published [here](https://hub.docker.com/r/ethereum/solc/tags/).
+ a path to a locally available solc
+ "pragma" to have Truffle autodetect solc versions from your source files. This can be used to compile using multiple versions of solc.
+ a solc-js parser for faster docker and native compilations

Truffle config example:

```javascript
module.exports = {
  compilers: {
    solc: {
      version: <string>, // A version or constraint - Ex. "^0.5.0"
                         // Can be set to "native" to use a native solc or
                         // "pragma" which attempts to autodetect compiler versions
      docker: <boolean>, // Use a version obtained through docker
      parser: "solcjs",  // Leverages solc-js purely for speedy parsing
      settings: {
        optimizer: {
          enabled: <boolean>,
          runs: <number>   // Optimize for how many times you intend to run the code
        },
        evmVersion: <string> // Default: "istanbul"
      },
      modelCheckerSettings: {
        // contains options for SMTChecker
      }
    }
  }
}
```
For more information, please see the Solidity documentation on [Compiler Input JSON Description](https://docs.soliditylang.org/en/latest/using-the-compiler.html#input-description) for the various possible settings.  Note that customizing `stopAfter` and `outputSelection` are not currently supported.

### vyper

Vyper compiler settings.  Similar to the `solc` settings, but not as extensive.  In particular, specifying a Vyper version is not currently supported; your local Vyper installation will always be used.

Truffle config example:

```javascript
module.exports = {
  compilers: {
    vyper: {
      settings: {
        evmVersion: <string>,
        optimize: <boolean> //defaults to true
      }
    }
  }
}
```

Currently, only changing the `settings` is supported for Vyper; see the Vyper documentation on [Compiler Input JSON Description](https://vyper.readthedocs.io/en/stable/compiling-a-contract.html#input-json-description) for the possible settings.  Note that customizing `outputSelection` is not supported.

### external compilers

For more advanced use cases with artifact creation you can use the external compilers configuration.
You can use this feature by adding a `compilers.external` object to your Truffle config:

```javascript
module.exports = {
  compilers: {
    external: {
      command: "./compile-contracts",
      targets: [{
        /* compilation output */
      }]
    }
  }
}
```

When you run truffle compile, Truffle will run the configured command and look for contract artifacts specified by targets.

This new configuration supports a couple of main use cases:

+ Your compilation command outputs Truffle JSON artifacts directly.
If your compilation command generates artifacts directly, or generates output that contains all the information for an artifact, configure a target as follows:

```javascript
module.exports = {
  compilers: {
    external: {
      command: "./compile-contracts",
      targets: [{
        path: "./path/to/artifacts/*.json"
      }]
    }
  }
}
```

Truffle will execute your script, then expand the glob (*) and find all .json files in the listed path and copy those over as artifacts in the build/contracts/ directory.

+ Your compilation command outputs individual parts of an artifact, and you want Truffle to generate the artifacts for you.
The above use case might not be sufficient for all use cases. You can configure your target to run an arbitrary post-processing command:

```javascript
module.exports = {
  compilers: {
    external: {
      command: "./compile-contracts",
      targets: [{
        path: "./path/to/preprocessed-artifacts/*.json",
        command: "./process-artifact"
      }]
    }
  }
}
```

This will run ./process-artifact for each matched .json file, piping the contents of that file as stdin. Your ./process-artifact command is then expected to output a complete Truffle artifact as stdout.

Want to provide the path as a filename instead? Add `stdin: false` to your target configuration.

+ You can also specify the individual properties of your contracts and have Truffle generate the artifacts itself.

```javascript
module.exports = {
  compilers: {
    external: {
      command: "./compile-contracts",
      targets: [{
        properties: {
          contractName: "MyContract",
          /* other literal properties */
        },
        fileProperties: {
          abi: "./output/contract.abi",
          bytecode: "./output/contract.bytecode",
          /* other properties encoded in output files */
        }
      }]
    }
  }
}
```
Specify `properties` and/or `fileProperties`, and Truffle will look for those values when building the artifacts.

To override the working directory for all specified paths and running commands, use the `workingDirectory` option.
For instance, the following will run `./proj/compile-contracts` and read `./proj/output/contract.abi`:
```javascript
module.exports = {
  compilers: {
    external: {
      command: "./compile-contracts",
      workingDirectory: "./proj",
      targets: [{
        fileProperties: {
          abi: "./output/contract.abi",
          bytecode: "./output/contract.bytecode",
        }
      }]
    }
  }
}
```


## plugins

<p class="alert alert-warning">
<strong>Note</strong>: This feature is new and still in a barebones state. Please let us
know how we can improve it!
</p>

Provides Truffle with a list of installed third-party extensions installed as
NPM package dependencies.

Truffle supports two separate kinds of plugins. The first are `run` plugins that define a custom workflow command. More information on these can be found under [Third-Party Plugin Commands](/docs/truffle/getting-started/writing-external-scripts#third-party-plugin-commands). The second type of plugins are `preserve` plugins that define a custom workflow for preserving content using the `truffle preserve` command. More information on these can be found under [Preserving Files and Content to Storage Platforms](/docs/truffle/getting-started/preserving-files-and-content-to-storage-platforms).

## Environments

Environments are a way to specify different configuration parameters depending on the selected environment. For example, connection to IPFS is often done with a local node or ganache, while in production, it makes sense to connect to Infura. This can be configured with environments.

```js
module.exports = {
  /* ... rest of truffle-config */

  environments: {
    /* ... other environments */

    development: {
      ipfs: {
        address: 'http://localhost:5001
      }
    },
    production: {
      ipfs: {
        address: 'https://ipfs.infura.io:5001'
      }
    }
  }
}
```

## EthPM configuration

This configuration applies to the optional `ethpm.json` file that exists alongside your `truffle.js` configuration file.

### package_name

Name of the package you're publishing. Your package name must be unique to the EthPM registry.

Example:
```javascript
package_name: "adder"
```

### version

Version of this package, using the [semver](https://semver.org/) specification.

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

A list of EthPM packages your package depends on, using [semver](https://semver.org/) version ranges, like npm.

Example:
```javascript
dependencies: {
  "owned": "^0.0.1",
  "erc20-token": "1.0.0"
}
```


### license

License to use for this package; primarily informative.  Contracts created with `truffle create` will
also include this in their `SPDX-License-Identifier` comment.

Example:
```javascript
license: "MIT",
```
