---
title: "Truffle Commands"
layout: "docs.hbs"
---

# Truffle Commands

This section will describe every command available in the Truffle application.

## Usage

All commands are in the following form:

```shell
truffle <command> [options]
```

Passing no arguments is equivalent to `truffle help`, which will display a list of all commands and then exit.

## Available commands

### build

Execute build pipeline (if configuration present).

```shell
truffle build
```

Requires the `build` key to be present in the configuration. See the [Build processes](/docs/truffle/advanced/build-processes) sections for more details.

<p class="alert alert-warning">
<i class="far fa-exclamation-triangle"></i> <strong>Warning</strong>: The <code>build</code> command and this approach is being deprecated. Please use third-party build tools like webpack or grunt, or see our <a href="/boxes">Truffle Boxes</a> for an example.
</p>

### compile

Compile contract source files.

```shell
truffle compile [--list <filter>] [--all] [--network <name>] [--quiet]
```

This will only compile contracts that have changed since the last compile, unless otherwise specified.

Options:

- `--list <filter>`: List all recent stable releases from solc-bin. If filter is specified then it will display only that type of release or docker tags. The filter parameter must be one of the following: pre-releases, releases, latestRelease or docker.
- `--all`: Compile all contracts instead of only the contracts changed since last compile.
- `--network <name>`: Specify the network to use, saving artifacts specific to that network. Network name must exist in the configuration.
- `--quiet`: Suppress all compilation output.

### config

Displays and sets user-level configuration options.

```shell
truffle config [--enable-analytics|--disable-analytics] [[<get|set> <key>] [<value-for-set>]]
```

Options:

- `--enable-analytics|--disable-analytics`: Enable or disable analytics.
- `get`: Get a Truffle configuration option value.
- `set`: Set a Truffle configuration option value.

### console

Run a console with contract abstractions and commands available.

```shell
truffle console [--network <name>] [--verbose-rpc]
```

Spawns an interface to interact with contracts via the command line. Additionally, many Truffle commands are available within the console (without the `truffle` prefix).

Requires an external Ethereum client, such as [Ganache](/docs/ganache/quickstart) or geth. For a console that creates a development and test environment, use `truffle develop`.

See the [Using Truffle Develop and the Console](/docs/truffle/getting-started/using-truffle-develop-and-the-console) section for more details.

Options:

- `--network <name>`: Specify the network to use. Network name must exist in the configuration.
- `--verbose-rpc`: Log communication between Truffle and the Ethereum client.

### create

Helper to create new contracts, migrations and tests.

```shell
truffle create <artifact_type> <ArtifactName>
```

Options:

- `<artifact_type>`: Create a new artifact, where `artifact_type` is one of the following: `contract`, `migration`, `test`, or `all`. The new artifact is created along with one of the following files: `contracts/ArtifactName.sol`, `migrations/####_artifact_name.js` or `tests/artifact_name.js`. Using `truffle create all` will create all three. (required)
- `<ArtifactName>`: Name of new artifact. (required)

Camel case names of artifacts will be converted to underscore-separated file names for the migrations and tests. Number prefixes for migrations are automatically generated.

### debug

Interactively debug any transaction on the blockchain.

```shell
truffle debug [<transaction_hash>] [--network <network>] [--fetch-external] [--compile-tests|--compile-all|--compile-none]
```

Will start an interactive debugging session on a particular transaction. Allows you to step through each action and replay. See [Using the truffle debugger](/docs/truffle/getting-started/using-the-truffle-debugger) for more details.

Options:

- `<transaction_hash>`: Transaction ID to use for debugging. You can omit this to simply start the debugger and then load a transaction later.
- `--network`: The network to connect to.
- `--fetch-external`: Allows the debugger to download source from source verification services to debug transactions involving external contracts. When used, a transaction hash is required. May be abbreviated `-x`.
- `--compile-tests`: Allows the debugger to compile [Solidity test contracts](../testing/writing-tests-in-solidity). Implies `--compile-all`.
- `--compile-all`: Forces the debugger to recompile all contracts, even when it would otherwise judge doing so unnecessary. Compilation results are not saved.
- `--compile-none`: Forces the debugger not to recompile contracts, even when it would otherwise judge it necessary. This option is dangerous and may cause errors. Please only use this if you are sure a recompilation is not necessary.

### deploy

Alias for `migrate`. See [migrate](#migrate) for details.

### develop

Open a console with a development blockchain

```shell
truffle develop [--log]
```

Spawns a local development blockchain, and allows you to interact with contracts via the command line. Additionally, many Truffle commands are available within the console (without the `truffle` prefix).

If you want an interactive console but want to use an existing blockchain, use `truffle console`.

See the [Using the console](/docs/truffle/getting-started/using-truffle-develop-and-the-console) section for more details.

Option:

- `--log`: Start/Connect to a Truffle develop session and log all RPC activity.
  See the [Log RPC Activity](/docs/truffle/getting-started/using-truffle-develop-and-the-console#log-rpc-activity)
  docs for more information about using this option.

### exec

Execute a JS module within the Truffle environment.

```shell
truffle exec <script.js> [--network <name>] [--compile]
```

This will include `web3`, set the default provider based on the network specified (if any), and include your contracts as global objects while executing the script. Your script must export a function that Truffle can run.

See the [Writing external scripts](/docs/truffle/getting-started/writing-external-scripts) section for more details.

Options:

- `<script.js>`: JavaScript file to be executed. Can include path information if the script does not exist in the current directory. (required)
- `--network <name>`: Specify the network to use, using artifacts specific to that network. Network name must exist in the configuration.
- `--compile`: Compile contracts before executing the script.

### help

Display a list of all commands or information about a specific command.

```shell
truffle help [<command>]
```

Option:

- `<command>`: Display usage information about the specified command.

### init

Initialize new and empty Ethereum project

```shell
truffle init [--force]
```

Creates a new and empty Truffle project within the current working directory.

<p class="alert alert-warning">
<strong>Alert</strong>: Older versions of Truffle used `truffle init bare` to create an empty project. This usage has been deprecated. Those looking for the MetaCoin example that used to be available through `truffle init` should use `truffle unbox MetaCoin` instead.
</p>

Option:

- `--force`: Initialize project regardless of the current working directory's state. Be careful, this could overwrite existing files that have name conflicts.

### install

Install a package from the Ethereum Package Registry.

```shell
truffle install <package_name>[@<version>]
```

Options:

- `<package_name>`: Name of the package as listed in the Ethereum Package Registry. (required)
- `@<version>`: When specified, will install a specific version of the package, otherwise will install the latest version.

See the [Package Management with EthPM](/docs/truffle/getting-started/package-management-via-ethpm) section for more details.

### migrate

Run migrations to deploy contracts.

```shell
truffle migrate [--reset] [--f <number>] [--to <number>] [--network <name>] [--compile-all] [--verbose-rpc] [--dry-run] [--interactive] [--skip-dry-run] [--describe-json]
```

Unless specified, this will run from the last completed migration. See the [Migrations](/docs/truffle/getting-started/running-migrations) section for more details.

Options:

- `--reset`: Run all migrations from the beginning, instead of running from the last completed migration.
- `--f <number>`: Run contracts from a specific migration. The number refers to the prefix of the migration file.
- `--to <number>`: Run contracts to a specific migration. The number refers to the prefix of the migration file.
- `--network <name>`: Specify the network to use, saving artifacts specific to that network. Network name must exist in the configuration.
- `--compile-all`: Compile all contracts instead of intelligently choosing which contracts need to be compiled.
- `--verbose-rpc`: Log communication between Truffle and the Ethereum client.
- `--dry-run`: Fork the network specified and only perform a test migration.
- `--skip-dry-run`: Skip the test migration performed before the real migration.
- `--interactive`: Prompt to confirm that the user wants to proceed after the dry run.
- `--describe-json`: Prints additional status messages.

### networks

Show addresses for deployed contracts on each network.

```shell
truffle networks [--clean]
```

Use this command before publishing your package to see if there are any extraneous network artifacts you don't want published. With no options specified, this package will simply output the current artifact state.

Option:

- `--clean`: Remove all network artifacts that aren't associated with a named network.

### obtain

Fetch and cache a specified compiler.

```shell
truffle obtain [--solc <version>]
```

Option:

- `--solc`: Download and cache a version of the solc compiler. (required)

### opcode

Print the compiled opcodes for a given contract.

```shell
truffle opcode <contract_name>
```

Option:

- `<contract_name>`: Name of the contract to print opcodes for. Must be a contract name, not a file name. (required)

### preserve

Preserve files and content to decentralized storage platforms such as IPFS or Filecoin.

```shell
truffle preserve <path> --<recipe> [--environment <name>]
```

Options:

- `--ipfs`: Preserve files to IPFS
- `--filecoin`: Preserve files to Filecoin
- `--buckets`: Preserve files to Textile Buckets
- `--<recipe>`: Preserve files using an installed plugin with the specified recipe tag
- `--environment <name>`: Specify the environment to use (defined in `truffle-config.js`) (default: "development")

Custom options for these "preserve recipes" can be provided through [environments](/docs/truffle/reference/configuration#environments). Additional preserve recipes can be installed through NPM and [configured as Truffle plugins](/docs/truffle/reference/configuration#plugins). More information about usage, configuration and installation of preserve recipes can be found on the [dedicated documentation page](/docs/truffle/getting-started/preserving-files-and-content-to-storage-platforms).

### publish

Publish a package to the Ethereum Package Registry.

```shell
truffle publish
```

All parameters are pulled from your project's configuration file. Takes no arguments. See the [Package Management with EthPM](/docs/truffle/getting-started/package-management-via-ethpm) section for more details.

### run

<p class="alert alert-warning">
<strong>Note</strong>: This feature is new and still in a barebones state. Please let us
know how we can improve it!
</p>

Run a third-party plugin command

```shell
truffle run <command>
```

Option:

- `<command>`: Name of a command defined by an installed plugin. (required)

Install plugins as NPM package dependencies and [configure Truffle](/docs/truffle/reference/configuration#plugins)
to recognize the plugin. For more information, see [Third-Party Plugin Commands](/docs/truffle/getting-started/writing-external-scripts#third-party-plugin-commands).

### test

Run JavaScript and Solidity tests.

```shell
truffle test [<test_file>] [--compile-all[-debug]] [--network <name>] [--verbose-rpc] [--show-events] [--debug] [--debug-global <identifier>] [--bail] [--stacktrace[-extra]]
```

Runs some or all tests within the `test/` directory as specified. See the section on [Testing your contracts](/docs/truffle/testing/testing-your-contracts) for more information.

Options:

- `<test_file>`: Name of the test file to be run. Can include path information if the file does not exist in the current directory.
- `--compile-all`: Compile all contracts instead of intelligently choosing which contracts need to be compiled.
- `--compile-all-debug`: Like `--compile-all`, but compiles contracts in debug mode for extra information. Has no effect on Solidity <0.6.3.
- `--network <name>`: Specify the network to use, using artifacts specific to that network. Network name must exist in the configuration.
- `--verbose-rpc`: Log communication between Truffle and the Ethereum client.
- `--show-events`: Log all contract events.
- `--debug`: Provides global `debug()` function for in-test debugging. Usable with Javascript tests only; implies `--compile-all`.
- `--debug-global <identifier>`: Allows one to rename the `debug()` function to something else.
- `--bail`: Bail after the first test failure. May be abbreviated `-b`.
- `--stacktrace`: Allows for mixed Javascript-and-Solidity stacktraces when a Truffle Contract transaction or deployment reverts. Does not apply to calls or gas estimates. Implies `--compile-all`. May be abbreviated `-t`. Warning: This option is still somewhat experimental.
- `--stacktrace-extra`: Shortcut for `--stacktrace --compile-all-debug`.

### unbox

Download a Truffle Box, a pre-built Truffle project.

```shell
truffle unbox <box_name> [<destination_path>] [--force]
```

Downloads a [Truffle Box](/boxes) to destination_path if provided. Truffle
defaults to the current working directory if this argument is not provided.

See the [list of available Truffle boxes](/boxes).

You can also design and create your own boxes! See the section on [Truffle boxes](/docs/truffle/advanced/creating-a-truffle-box) for more information.

Options:

- `<box_name>`: Name of the Truffle Box. (required)
- `--force`: Unbox project in the current directory regardless of its state. Be careful, this will potentially overwrite files that exist in the directory.

**Note**: box_name can be one of several formats:

1. \<truffleBoxName\> - like `metacoin` (see the official Truffle boxes [here](/boxes))
2. \<gitOrgName/repoName\> - like `truffle-box/bare-box` (your repo will have to
   have the proper structure - see our page on [creating a Truffle
   Box](/docs/truffle/advanced/creating-a-truffle-box))
3. \<urlToGitRepo\> - like `https://github.com/truffle-box/bare-box`
4. \<sshUrlToGitRepo\> - like `git@github.com:truffle-box/bare-box`

Also note that you can add a `#` followed by a branch name to the end of all
of the above formats to unbox from a specific branch - for example, you could
use `truffle-box/bare-box#myBranch`

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

This command will initiate a watch for changes to contracts, application, and configuration files. When there's a change, it will rebuild the app as necessary.

<p class="alert alert-warning">
<strong>Alert</strong>: This command is deprecated. Please use external tools to watch for filesystem changes and rerun tests.
</p>
