# Command reference

## Usage

```none
$ truffle [command] [options]
```

## Available commands

### build

Execute build pipeline (if configuration present)

```none
$ truffle build
```

See the [Building your application](/docs/getting_started/build) section for more details.

### console

Run a console with contract abstractions and commands available.

```none
$ truffle console
```

Once the console starts, you can then use your contracts via the command line like you would in your code. Additionally, all truffle commands listed here are available within the console.

Optional parameters:

* `--network name`: Specify the network to use.
* `--verbose-rpc`: Log communication between Truffle and the RPC.

See the [Using the console](/docs/getting_started/console) section for more details.

### compile

Intelligently compile your contracts. This will only compile contracts that have changed since the last compile, unless otherwise specified.

```none
$ truffle compile
```

Optional parameter:

* `--all`: Compile all contracts instead of intelligently choosing.
* `--network name`: Specify the network to use, saving artifacts specific to that network.

### create contract

Helper method to scaffold a new contract. Name must be camel-case.

```none
$ truffle create contract MyContract
```

### create migration

Helper method to scaffold a new migration. Name must be camel-case.

```none
$ truffle create migration MyContract
```

### create test

Helper method to scaffold a new test for a contract. Name must be camel-case.

```none
$ truffle create test MyTest
```

### exec

Execute a Javascript file within the Truffle environment. This will include `web3`, set the default provider based on the network specified (if any), and include your contracts as global objects while executing the script. Your script must export a function that Truffle can run. See the [Writing external scripts](/docs/getting_started/scripts) section for more details.

```none
$ truffle exec /path/to/my/script.js
```

Optional parameter:

* `--network name`: Specify the network to use, using artifacts specific to that network.

### init

Create a completely new app within the current working directory. Will add default contracts, tests and frontend configuration.

```none
$ truffle init
```

### install

Install a package from the Ethereum Package Registry.

```none
$ truffle install <package name>@<version>
```

The @`version` parameter syntax is optional. See the [Package Management with EthPM](/docs/getting_started/packages-ethpm) section for more details.

### migrate

Run your project's migrations. See the [Migrations](/docs/getting_started/migrations) section for more details.

```none
$ truffle migrate
```

Optional parameters:

* `--reset`: Run all migrations from the beginning, instead of running from the last completed migration.
* `-f number`: Run contracts from a specific migration.
* `--network name`: Specify the network to use, saving artifacts specific to that network.
* `--compile-all`: Compile all contracts instead of intelligently choosing.
* `--verbose-rpc`: Log communication between Truffle and the RPC.

### networks

Show the deployed addresses of all contracts on all networks, and optionally clean extraneous network artifacts.

```none
$ truffle networks
```

Use this command before publishing your package to see if there are any extraneous network artifacts you don't want published. With no options specified, this package will simply output the current artifact state.

Optional parameters:

* `--clean`: Remove all network artifacts that aren't associated with a named network.

### publish

Publish a package to the Ethereum Package Registry.

```none
$ truffle publish
```

All parameters are pulled from your project's configuration file. See the [Package Management with EthPM](/docs/getting_started/packages-ethpm) section for more details.

### serve

Serve the built app from `http://localhost:8080`, rebuilding and redeploying changes as needed. Like `truffle watch`, but with the web server component added.

```none
$ truffle serve
```

Optional parameters:

* `-p port`: Specify the port to serve on. Default is 8080.
* `--network name`: Specify the network to use, using artifacts specific to that network.

### test

Run all tests within the `./test` directory, or optionally run a single test.

```none
$ truffle test [/path/to/test/file]
```

Optional parameters:

* `--compile-all`: Compile all contracts instead of intelligently choosing.
* `--verbose-rpc`: Log communication between Truffle and the RPC.
* `--network name`: Specify the network to use, using artifacts specific to that network.

### version

Show version number and exit.

```none
$ truffle version
```

### watch

Watch for changes to contracts, app and configuration files. When there's a change, rebuild the app if necessary.

```none
$ truffle watch
```
