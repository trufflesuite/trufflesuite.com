# Command reference

This section will describe every command available in the Truffle application.


## Usage

All commands are in the following form:

```shell
truffle [command] [options]
```

Passing no arguments is equivalent to `truffle help`, which will display a list of all commands and then exit.


## Available commands


### build

Execute build pipeline (if configuration present).

```shell
truffle build
```

Requires the `build` key to be present in the configuration. See the [Building your application](/docs/getting_started/build) and [Build processes](/docs/advanced/build_processes) sections for more details.

<p class="alert alert-warning">
**Alert**: This command is deprecated. Please use third-party build tools like webpack or grunt, or see our [Truffle Boxes](/boxes) for an example.
</p>


### compile

Compile contract source files.

```shell
truffle compile [--all] [--network <name>]
```

This will only compile contracts that have changed since the last compile, unless otherwise specified.

Optional parameters:

* `--all`: Compile all contracts instead of only the contracts changed since last compile.
* `--network <name>`: Specify the network to use, saving artifacts specific to that network. Network name must exist in the configuration.


### console

Run a console with contract abstractions and commands available.

```shell
truffle console [--network <name>] [--verbose-rpc]
```

Spawns an interface to interact with contracts via the command line. Additionally, many Truffle commands are available within the console (without the `truffle` prefix).

Requires an external Ethereum client, such as [Ganache](/docs/ganache/using) or geth. For a console that creates a development and test environment, use `truffle develop`.

See the [Using the console](/docs/getting_started/console) section for more details.

Optional parameters:

* `--network <name>`: Specify the network to use. Network name must exist in the configuration.
* `--verbose-rpc`: Log communication between Truffle and the Ethereum client.


### create

Helper to create new contracts, migrations and tests.

```shell
truffle create (contract|migration|test) <ArtifactName>
```

Parameters:

* `contract`: Create a new contract definition and file `contracts/ArtifactName.sol`.
* `migration`: Create a new migration and file `migrations/###########_artifact_name.js`.
* `test`: Create a new test and file `tests/artifact_name.js`.
* `<ArtifactName>`: Name of new artifact.

Camel case names of artifacts will be converted to underscore-separated file names for the migrations and tests. Number prefixes for migrations are automatically generated.


### debug

Interactively debug any transaction on the blockchain.

```shell
truffle debug <transaction_hash>
```

Will start an interactive debugging session on a particular transaction. Allows you to step through each action and replay. See the [Debugging your contracts](/docs/getting_started/debugging) section for more details.

<p class="alert alert-warning">
**Alert**: This command is considered experimental.
</p>


Parameters:

* `<transaction_hash>`: Transaction ID to use for debugging.


### deploy

Alias for `migrate`. See `migrate` for details.


### develop

Open a console with a development blockchain

```shell
truffle develop
```

Spawns a local development blockchain, and allows you to interact with contracts via the command line. Additionally, many Truffle commands are available within the console (without the `truffle` prefix).

If you want an interactive console but want to use an existing blockchain, use `truffle console`.

See the [Using the console](/docs/getting_started/console) section for more details.


### exec

Execute a JS module within the Truffle environment.

```shell
truffle exec <script.js> [--network <name>] 
```

This will include `web3`, set the default provider based on the network specified (if any), and include your contracts as global objects while executing the script. Your script must export a function that Truffle can run. 

See the [Writing external scripts](/docs/getting_started/scripts) section for more details.

Parameters:

* `<script.js>` JavaScript file to be executed. Can include path information if the script does not exist in the current directory.

Optional parameters:

* `--network <name>`: Specify the network to use, using artifacts specific to that network. Network name must exist in the configuration.


### help

Display a list of all commands and then exit.

```shell
truffle help
```


### init

Initialize new and empty Ethereum project

```shell
truffle init
```

Creates a new and empty Truffle project within the current working directory. Takes no arguments.

<p class="alert alert-warning">
**Alert**: Older versions of Truffle used `truffle init bare` to create an empty project. This usage has been deprecated. Those looking for the MetaCoin example that used to be available through `truffle init` should use `truffle unbox MetaCoin` instead.
</p>


### install

Install a package from the Ethereum Package Registry.

```shell
truffle install [package_name]<@version>
```

Parameters:

* `package_name`: Name of the package as listed in the Ethereum Package Registry.

Optional parameters:

* `<@version>`: When specified, will install a specific version of the package, otherwise will install the latest version.

See the [Package Management with EthPM](/docs/getting_started/packages-ethpm) section for more details.



### migrate

Run migrations to deploy contracts.

```shell
truffle migrate [--reset] [-f <number>] [--network <name>] [--compile-all] [--verbose-rpc]
```

Unless specified, this will run from the last completed migration. See the [Migrations](/docs/getting_started/migrations) section for more details.

Optional parameters:

* `--reset`: Run all migrations from the beginning, instead of running from the last completed migration.
* `-f <number>`: Run contracts from a specific migration. The number refers to the prefix of the migration file.
* `--network <name>`: Specify the network to use, saving artifacts specific to that network. Network name must exist in the configuration.
* `--compile-all`: Compile all contracts instead of intelligently choosing which contracts need to be compiled.
* `--verbose-rpc`: Log communication between Truffle and the Ethereum client.


### networks

Show addresses for deployed contracts on each network.

```shell
truffle networks [--clean]
```

Use this command before publishing your package to see if there are any extraneous network artifacts you don't want published. With no options specified, this package will simply output the current artifact state.

Optional parameters:

* `--clean`: Remove all network artifacts that aren't associated with a named network.


### opcode

Print the compiled opcodes for a given contract.

```shell
truffle opcode <contract_name>
```

Parameters:

* `<contract_name>`: Name of the contract to print opcodes for. Must be a contract name, not a file name.


### publish

Publish a package to the Ethereum Package Registry.

```shell
truffle publish
```

All parameters are pulled from your project's configuration file. Takes no arguments. See the [Package Management with EthPM](/docs/getting_started/packages-ethpm) section for more details.


### serve

Serve the built app from `http://127.0.0.1:8080`, rebuilding and redeploying changes as needed. Similar to `truffle watch`, but with the web server component added.

```shell
truffle serve [-p <port>] [--network <name>]
```

Optional parameters:

* `-p <port>`: Specify the port to serve on. Default is 8080.
* `--network <name>`: Specify the network to use, using artifacts specific to that network. Network name must exist in the configuration.

<p class="alert alert-warning">
**Alert**: This command is deprecated. Please use third-party development servers like [webpack-dev-server](https://github.com/webpack/webpack-dev-server) instead. See our [Webpack Truffle Box](/boxes/webpack) for an example.
</p>


### test

Run JavaScript and Solidity tests.

```shell
truffle test <test_file> [--compile-all] [--network <name>] [--verbose-rpc]
```

Runs some or all tests within the `test/` directory as specified. See the section on [Testing your contracts](/docs/getting_started/testing) for more information.

Parameters:

* `<test_file>`: Name of the test file to be run. Can include path information if the file does not exist in the current directory.

Optional parameters:

* `--compile-all`: Compile all contracts instead of intelligently choosing which contracts need to be compiled.
* `--network <name>`: Specify the network to use, using artifacts specific to that network. Network name must exist in the configuration.
* `--verbose-rpc`: Log communication between Truffle and the Ethereum client.

### unbox

Download a Truffle Box, a pre-built Truffle project.

```shell
truffle unbox <box_name>
```

Downloads a [Truffle Box](/boxes) to the current working directory. See the [list of available boxes](/boxes).

Parameters:

* `box_name`: Name of the Truffle Box.


### version

Show version number and exit.

```shell
truffle version
```

### watch

Watch filesystem for changes and rebuild the project automatically.

```shell
truffle watch
```

This command will initiate a watch for changes to contracts, application, and configuration files. When there's a change, it will rebuild the app as necessary. Similar to `truffle serve`, but without the web server component.

<p class="alert alert-warning">
**Alert**: This command is deprecated. Please use external tools to watch for filesystem changes and rerun tests.
</p>
