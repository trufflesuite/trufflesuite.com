---
title: Ganache | CLI options
layout: docs.hbs
---

# Ganache command line

This reference describes the syntax of the Ganache command line interface (CLI) options for the Ethereum
network.

## Specify options

The startup options are grouped in the `chain`, `database`, `fork`, `logging`, `miner`, and `wallet` namespaces,
and should be used as follows on startup:

```bash
ganache --<namespace>.<option>=<value>
```

You can also use an alias for startup options that have them. For example to set the network ID of a
network use `ganache -i=<NETWORK_ID>` instead of `ganache --chain.networkId=<NETWORK_ID>`.

When using the startup options programmatically, use the following:

```javascript
const options = { <namespace>: { <option>: <value>}};
const provider = ganache.provider(options);
```

<p class="alert alert-warning">
<strong>Note</strong>: Command line options are case-sensitive.
</p>

## `chain`

**`--chain.allowUnlimitedContractSize`**

=== "Syntax"

    ```bash
    --chain.allowUnlimitedContractSize=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --chain.allowUnlimitedContractSize=true
    ```

Indicate whether to allow unlimited contract sizes while debugging. When set to `true`, Ganache behaves
differently than in production environments.

The default is `false`.

** `--chain.asyncRequestProcessing`**

=== "Syntax"

    ```bash
    --chain.asyncRequestProcessing=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --chain.asyncRequestProcessing=false
    ```

Indicate whether to asynchronously process requests. When `false`, only one request is
processed at a time.

The default is `true`.

**`--chain.chainId`**

=== "Syntax"

    ```bash
    --chain.chainId=<NUMBER>
    ```

=== "Example"

    ```bash
    --chain.chainId=10
    ```

The chain ID of the network.

The default is `1337`.

**`--chain.networkId`**, **`-i`**

=== "Syntax"

    ```bash
    --chain.networkId=<NUMBER>
    ```

=== "Example"

    ```bash
    --chain.networkId=10
    ```

The network ID that's retrieved when running the [`net_version`](https://ethereum.org/en/developers/docs/apis/json-rpc/#net_version)
JSON-RPC method.

The default is the system time when the process starts, or network ID of the forked
blockchain if configured.

The alias `--networkId` is deprecated, use `-i` instead.

**`--chain.time`**, **`-t`**

=== "Syntax"

    ```bash
    --chain.time=<DATE>
    ```

=== "Example"

    ```bash
    --chain.time=1662596414
    ```

Date and time that the first block should start. Accepts the date format supported by the
[JavaScript `Date()` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date).
For example Unix epoch or a string.

The alias `--time` is deprecated, use `-t` instead.

**`--chain.hardfork`**, **`-k`**

=== "Syntax"

    ```bash
    --chain.hardfork=<STRING>
    ```

=== "Example"

    ```bash
    --chain.hardfork="arrowGlacier"
    ```

The hardfork rules for the EVM. Valid options are: `constantinople`, `byzantium`, `petersburg`,
`istanbul`, `muirGlacier`, `berlin`, `london`, `arrowGlacier`, and `grayGlacier`.

The default is `london`.

The alias `--hardfork` has been deprecated, use `-k` instead.

**`--chain.vmErrorsOnRPCResponse`**

=== "Syntax"

    ```bash
    --chain.vmErrorsOnRPCResponse=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --chain.vmErrorsOnRPCResponse=true
    ```

Indicate whether to report runtime errors from EVM code as RPC errors.

The default is `false`.

## `database`

**`--database.dbPath`**

=== "Syntax"

    ```bash
    --database.dbPath=<STRING>
    ```

=== "Example"

    ```bash
    --database.dbPath="/User/me/db"
    ```

The path to a directory to save the chain database.

The aliases `--db` and `--db_path` have been deprecated.

## `logging`

**`--logging.debug`**

=== "Syntax"

    ```bash
    --logging.debug=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --logging.debug=true
    ```

Indicate whether to log debug information. Set to `true` to log EVM opcodes.

The default is `false`.

**`--logging.quiet`**, **`q`**

=== "Syntax"

    ```bash
    --logging.quiet=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --logging.quiet=true
    ```

Indicate whether to disable logging. Set to `true` to disable logging.

The default is `false`.

The alias `--quiet` has been deprecated, use `-q` instead.

**`--logging.verbose`**, **`-v`**

=== "Syntax"

    ```bash
    --logging.verbose=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --logging.verbose=true
    ```

Indicate whether to log detailed RPC requests.

The default is `false`.

The alias `--verbose` has been deprecated, use `-v` instead.

## `miner`

**`--miner.blockTime`**, **`b`**

=== "Syntax"

    ```bash
    --miner.blockTime=<NUMBER>
    ```

=== "Example"

    ```bash
    --miner.blockTime=10
    ```

The block time (in seconds) for automatic mining. A block time of `0` enables `instamine mode`, where
new executable transactions are mined instantly.

The default is `0`.

The alias `--blockTime` has been deprecated, use `-b` instead.

**`--miner.timestampIncrement`**

=== "Syntax"

    ```bash
    --miner.timestampIncrement=<NUMBER>
    ```

=== "Example"

    ```bash
    --miner.timestampIncrement=5
    ```

The amount of time (in seconds) to add to the timestamp of each new block header.

The default is `clock`, which uses your system clock time as the timestamp for each new block.

**`--miner.defaultGasPrice`**, **`g`**

=== "Syntax"

    ```bash
    --miner.defaultGasPrice=<STRING>
    ```

=== "Example"

    ```bash
    --miner.defaultGasPrice="0x87369400"
    ```

The default gas price in WEI for transactions if not specified.

The default is `0x77359400` (2 GWEI).

The alias `--gasPrice` has been deprecated, use `-g` instead.

**`--miner.blockGasLimit`**, **`l`**

=== "Syntax"
    ```bash
    --miner.blockGasLimit=<STRING>
    ```

=== "Example"

    ```bash
    --miner.blockGasLimit="0x87369400"
    ```

The block gas limit in WEI.

The default is `0x1c9c380` (30 million WEI).

The alias `--gasLimit` has been deprecated, use `-l` instead.

**`--miner.defaultTransactionGasLimit`**

=== "Syntax"
    ```bash
    --miner.defaultTransactionGasLimit=<STRING>
    ```

=== "Example"

    ```bash
    --miner.defaultTransactionGasLimit="0x16F30"
    ```

The default transaction gas limit in WEI. Set to `estimate` to use an estimate (slows down transaction execution by 40%+).

The defaults is `0x15f90`.

**`--miner.difficulty`**

=== "Syntax"
    ```bash
    --miner.difficulty=<STRING>
    ```

=== "Example"

    ```bash
    --miner.difficulty="0x2"
    ```

The block difficulty.

The default is `0x1`.

**`--miner.callGasLimit`**

=== "Syntax"
    ```bash
    --miner.callGasLimit=<STRING>
    ```

=== "Example"

    ```bash
    --miner.callGasLimit="0x58af080"
    ```

The transaction gas limit in WEI for `eth_call` and `eth_estimateGas` calls.

The default is `0x2faf080`.

**`--miner.instamine`**

=== "Syntax"
    ```bash
    --miner.instamine=<STRING>
    ```

=== "Example"

    ```bash
    --miner.instamine="strict"
    ```

The `instamine` mode which is either `eager` or `strict`. In `eager` mode a transaction is included in a block before its hash
is returned to the caller. In `strict` mode a transaction's hash is returned to the caller before the transaction is included in a block.
This value has no effect if `--miner.blockTime` is *not* `0` (the default).

The default is `eager`.

**`--miner.coinbase`**

=== "Syntax"
    ```bash
    --miner.coinbase=<STRING>
    ```

=== "Example"

    ```bash
    --miner.coinbase="0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"
    ```

The mining reward address.

The default is `0x0000000000000000000000000000000000000000`.

**`--miner.extraData`**

=== "Syntax"
    ```bash
    --miner.extraData=<STRING>
    ```

=== "Example"

    ```bash
    --miner.extraData="0x444F4E27542050414E4943202120484F444C2C20484F444C2C20484F444C2021"
    ```

A hex string representing the 32 bytes included in the extra data field of a mined block.

The default is `0x`.

**`--miner.priceBump`**

=== "Syntax"
    ```bash
    --miner.priceBump=<STRING>
    ```

=== "Example"

    ```bash
    --miner.priceBump="0x1"
    ```

Minimum price bump percentage needed to replace a transaction that already exists in the transaction
pool.

The default is `10`.

## `wallet`

**`--wallet.accounts`**

=== "Syntax"
    ```bash
    --wallet.accounts=<STRING>,<STRING>
    ```

=== "Example"

    ```bash
    --wallet.accounts="0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63","0X56BC75E2D63100000"
    ```


Account data in the form `<private_key>,<initial_balance>`. Specify the option multiple times
to add multiple private keys with an initial balance.

Private keys are 64 characters long, and must include the `0x` prefix. The account
balance can be an integer, or a `0x`-prefixed hex string with either form specifying the initial
balance in WEI.

The alias `--account` has been deprecated.

**`--wallet.totalAccounts`**, **`-a`**

=== "Syntax"
    ```bash
    --wallet.totalAccounts=<NUMBER>
    ```

=== "Example"

    ```bash
    --wallet.totalAccounts=5
    ```

Number of accounts to generate at startup.

The default is `10`.

The alias `--accounts` has been deprecated, use `-a` instead.

**`--wallet.deterministic`**, **`-d`**

=== "Syntax"
    ```bash
    --wallet.deterministic=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --wallet.deterministic=true
    ```

Use a pre-defined, deterministic seed.

The default is `false`.

The alias `--deterministic` has been deprecated, use `-d` instead.

**`--wallet.seed`**, **`-s`**

=== "Syntax"
    ```bash
    --wallet.seed=<STRING>
    ```

=== "Example"

    ```bash
    --wallet.seed="c0157f7c8240459516f42b518c1cba1da942b9a5fb5e6313a948872fcac2742e28250a8b2faef0924ae5d2d59781d7789c4c960a2fef8283d886198d40cf871f"
    ```

The seed to generate a mnemonic.

The default is a random value unless you specify `--wallet.deterministic`.

The alias `--seed` has been deprecated, use `-s` instead.

**`--wallet.mnemonic`**, **`-m`**

=== "Syntax"
    ```bash
    --wallet.mnemonic=<STRING>
    ```

=== "Example"

    ```bash
    --wallet.mnemonic="car casual program tourist aerobic broccoli link hamster resemble collect put october"
    ```

Use the specified HD wallet mnemonic to generate initial addresses.

The default is generated from `--wallet.seed`.

The alias `--mnemonic` has been deprecated, use `-m` instead.

**`--wallet.unlockedAccounts`**, **`-u`**

=== "Syntax"
    ```bash
    --wallet.unlockedAccounts=<STRING>
    ```

=== "Example using an address"

    ```bash
    --wallet.unlockedAccounts="0x8060b4E5dc6a2ee2974873c1ec7B58d6c2932c47"
    ```

=== "Example using an index"

    ```bash
    --wallet.unlockedAccounts=2
    ```

Addresses or address indexes specifying which accounts should be unlocked. You can specify the
option multiple times.

The alias `--unlock` has been deprecated, use `-u` instead.

**`--wallet.lock`**, **`-n`**

=== "Syntax"
    ```bash
    --wallet.lock=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --wallet.lock=true
    ```

Locks all available accounts, which is good for third party transaction signing.

The `--secure` and `--lock` aliases have been deprecated, use `-n` instead.

**`--wallet.passphrase`**

=== "Syntax"
    ```bash
    --wallet.passphrase=<STRING>
    ```

=== "Example"

    ```bash
    --wallet.passphrase="changeme"
    ```

The passphrase to use when locking accounts.

The alias `--passphrase` has been deprecated.

**`--wallet.accountKeysPath`**

=== "Syntax"
    ```bash
    --wallet.accountKeysPath=<STRING>
    ```

=== "Example"

    ```bash
    --wallet.accountKeysPath="/Users/me/myKeys.txt"
    ```

Specify a file to save accounts and private keys to, for testing.
The aliases `--account_keys_path` and `--acctKeys` have been deprecated.

**`--wallet.defaultBalance`**, **`-e`**

=== "Syntax"
    ```bash
    --wallet.defaultBalance=<NUMBER>
    ```

=== "Example"

    ```bash
    --wallet.defaultBalance=120
    ```

Specify the default account balance in ether.

The default is `1000`.

**`--wallet.hdPath `**

=== "Syntax"
    ```bash
    --wallet.hdPath=<STRING>
    ```

=== "Example"

    ```bash
    --wallet.hdPath="m,44',60',160720',0"
    ```

The hierarchical deterministic (HD) path to use when generating accounts.

The default is `m,44',60',0',0`.

## `fork`

**`--fork.url`**, **`-f`**

=== "Syntax"
    ```bash
    --fork.url=<STRING>
    ```

=== "Example"

    ```bash
    --fork.url="http://localhost:1337"
    ```

Fork from a running Ethereum client. You can optionally specify the block to
fork from using an `@` character, for example `http://localhost:1337@8675309`.

The specified URL supports basic authentication credentials as well. For example, `wss://<user>:<password>@example.com/`.
If you need to use an Infura API key secret, you would use it as follows:

```bash
wss://:<API-KEY-SECRET>@mainnet.infura.com/ws/v3/<API-KEY>
```

Alternatively, you can use the `--fork.username` and `--fork.password` options.

**`--fork.network`**

=== "Syntax"
    ```bash
    --fork.network=<STRING>
    ```

=== "Example"

    ```bash
    --fork.network="goerli"
    ```

The network to fork. Valid options are `mainnet`, `ropsten`, `kovan`, `rinkeby`, `goerli`, `görli`,
and `sepolia`.

Use the command `ganache --fork` to automatically fork Mainnet at the latest block.

**`--fork.blockNumber`**

=== "Syntax"
    ```bash
    --fork.blockNumber=<NUMBER>
    ```

=== "Example"

    ```bash
    --fork.blockNumber=182354
    ```

Block number to fork from. The default is the latest block.

**`--fork.preLatestConfirmations`**

=== "Syntax"
    ```bash
    --fork.preLatestConfirmations=<NUMBER>
    ```

=== "Example"

    ```bash
    --fork.preLatestConfirmations=8
    ```

When the `--fork.blockNumber` is set to `latest` (default), this option specifies the number of blocks
before the remote node's latest block to fork from.

The default is `5`.

**`--fork.username`**

=== "Syntax"
    ```bash
    --fork.username=<STRING>
    ```

=== "Example"

    ```bash
    --fork.username="JohnDoe"
    ```

Username for basic authentication. Does not require setting `--fork.password`.
When combined with `--fork.password`, the shorthand is `{ headers: { "Authorization": "Basic {ENCODED-BASIC-HEADER}" } }`.

If `--fork.headers` specifies an authorization header, the header is inserted after the Basic token.

**`--fork.password`**

=== "Syntax"
    ```bash
    --fork.password=<STRING>
    ```

=== "Example"

    ```bash
    --fork.password="changeme"
    ```

Password for basic authentication. Does not require setting `--fork.username`.
When combined with `--fork.username`, the shorthand is `{ headers: { "Authorization": "Basic {ENCODED-BASIC-HEADER}" } }`.

If the `--fork.headers` specifies an authorization header, the header is inserted after the Basic token.

**`--fork.jwt`**

=== "Syntax"
    ```bash
    --fork.jwt=<STRING>
    ```

=== "Example"

    ```bash
    --fork.jwt="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6Iio6KiIsInByaXZhY3lQdWJsaWNLZXkiOiIyVUtIM1ZKVGhrT29Lc2tyTEZwd294Q25uUkFSeW9iVjFiRWRnc2VGSFRzPSIsImV4cCI6IjE2MDA4OTk5OTkwMDIiLCJpYXQiOjE2MzkxNTc2Mjd9.FGf-FmfDQlIPCRDGmNnsHZWlwrUr69d7AIDqQrIrUrSJLiwGpR3NCUhVHIDMpQvDHQYf-sFMZTYvZGrvztYRuBKWMbTfIZKN74onzNJbFIPBVQuUX2HMXmI4VQ3UFB11LShiUJHKLna13qdbqfbgJIO3HetxJhJQxTiwtixfHwyPXl-Nx8HbQy_AWH58lLAUeaoLzN7QIA9kborthBpvfK9C7Sv1lXT1cdCDC4oRKBoiMg2RWFZtGtxFsnWyloangwbhCB6Bc_elqY5nd9WkF4ix95xsP_HgBcouy1sDw6jxn5_LveX53H8owczVWP6S1e6hv6hq2fs6YkSntKMK2g"
    ```

Encoded [JSON Web Token (JWT)](https://jwt.io) used for authenticating to servers.

The shorthand is `{ headers: { "Authorization": "Bearer {YOUR-ENCODED-JWT}" } }`.

If the `--fork.headers` option specifies an authorization header, the header is inserted after the JWT Bearer token.

**`--fork.userAgent`**

=== "Syntax"
    ```bash
    --fork.userAgent=<STRING>
    ```

=== "Example"

    ```bash
    --fork.userAgent="Ganache/7.0.0-beta.0 (https://www.trufflesuite.com/ganache; ganache<at>trufflesuite.com)]"
    ```

The User-Agent header sent to the fork on each request.

Sent as `Api-User-Agent` when used in the browser. Is overridden by a `User-Agent` defined in the `--fork.headers`
option, if provided.

The default is `Ganache/VERSION (https://www.trufflesuite.com/ganache; ganache<at>trufflesuite.com)`.

**`--fork.origin`**

=== "Syntax"
    ```bash
    --fork.origin=<STRING>
    ```

=== "Example"

    ```bash
    --fork.origin="https://www.trufflesuite.com/ganache"
    ```

The Origin header sent to the fork on each request. Ignored in the browser.

Is overridden by an `Origin` value defined in the `--fork.headers` option, if provided.

**`--fork.headers`**

=== "Syntax"
    ```bash
    --fork.headers=<STRING>
    ```

=== "Example"

    ```bash
    --fork.headers="User-Agent: Ganache/VERSION (https://www.trufflesuite.com/ganache; ganache<at>trufflesuite.com)"
    ```

Headers to supply on each request to the forked provider.
Headers set here override headers set by other options, unless otherwise specified.

The default is `"User-Agent: Ganache/VERSION (https://www.trufflesuite.com/ganache; ganache<at>trufflesuite.com)"`.

**`--fork.requestsPerSecond`**

=== "Syntax"
    ```bash
    --fork.requestsPerSecond=<NUMBER>
    ```

=== "Example"

    ```bash
    --fork.requestsPerSecond=10
    ```

Restrict the number of requests sent per second to the fork provider.

The default is `0`, meaning no limit is applied.

**`--fork.disableCache`**

=== "Syntax"
    ```bash
    --fork.disableCache=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --fork.disableCache=true
    ```

Disables caching forking requests.

The default is `false`.

**`--fork.deleteCache`**

=== "Syntax"
    ```bash
    --fork.deleteCache=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --fork.deleteCache=true
    ```

Deletes the persistent cache before starting.

The default is `false`.

## `server`

**`--server.ws`**

=== "Syntax"
    ```bash
    --server.ws=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --server.ws=false
    ```

Enables a WebSocket server.

The default is `true`.

**`--server.wsBinary`**

=== "Syntax"
    ```bash
    --server.wsBinary=<BOOLEAN>
    ```

=== "Example"

    ```bash
    --server.wsBinary=false
    ```

Indicates whether WebSocket should respond with binary data (ArrayBuffers) or strings. Options are
`true`, `false`, or `auto`.

The default is `auto`.

**`--server.rpcEndpoint`**

=== "Syntax"
    ```bash
    --server.rpcEndpoint=<STRING>
    ```

=== "Example"

    ```bash
    --server.rpcEndpoint="/v3"
    ```

Defines the endpoint route the HTTP and WebSocket servers listen on.

The default is `/` for Ethereum and `/rpc/v0` for Filecoin.

**`--server.host`**, **`-h`**

=== "Syntax"
    ```bash
    --server.host=<STRING>
    ```

=== "Example"

    ```bash
    --server.host="127.0.0.1"
    ```

The hostname to listen on.

The default is `127.0.0.1`.

The aliases `--host` and `--hostname` have been deprecated, use `-h` instead.

**`--server.port`**, **`-p`**

=== "Syntax"
    ```bash
    --server.port=<NUMBER>
    ```

=== "Example"

    ```bash
    --server.port=9545
    ```

The port to listen on. The default is `8545`.

The alias `--port` has been deprecated, use `-p` instead.
