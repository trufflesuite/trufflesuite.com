# Compiling contracts

## Location

All of your contracts are located in your project's `contracts/` directory. As contracts are written in [Solidity](https://solidity.readthedocs.io/en/develop/), all files containing contracts will have a file extension of `.sol`. Associated Solidity [libraries](http://solidity.readthedocs.org/en/latest/contracts.html#libraries) will also have a `.sol` extension.

With a bare Truffle [project](./project) (created through `truffle init`), you're given a single `Migrations.sol` file that helps in the deployment process. If you're using a [Truffle Box](/boxes), you will have multiple files here.

## Command

To compile a Truffle project, change to the root of the directory where the project is located and then type the following into a terminal:

```shell
truffle compile
```

Upon first run, all contracts will be compiled. Upon subsequent runs, Truffle will compile only the contracts that have been changed since the last compile. If you'd like to override this behavior, run the above command with the `--all` option.

## Build artifacts

Artifacts of your compilation will be placed in the `build/contracts/` directory, relative to your project root. (This directory will be created if it does not exist.)

These artifacts are integral to the inner workings of Truffle, and they play an important part in the successful deployment of your application. **You should not edit these files** as they'll be overwritten by contract compilation and deployment.

## Dependencies

You can declare contract dependencies using Solidity's [import](http://solidity.readthedocs.org/en/latest/layout-of-source-files.html#importing-other-source-files) command. Truffle will compile contracts in the correct order and ensure all dependencies are sent to the compiler. Dependencies can be specified in two ways:

### Importing dependencies via file name

To import contracts from a separate file, add the following code to your Solidity source file::

```
import "./AnotherContract.sol";
```

This will make all contracts within `AnotherContract.sol` available. Here, `AnotherContract.sol` is relative to the path of the current contract being written.

Note that Solidity allows other import syntaxes as well. See the Solidity [import documentation](http://solidity.readthedocs.org/en/latest/layout-of-source-files.html#importing-other-source-files) for more information.

### Importing contracts from an external package

Truffle supports dependencies installed via both [EthPM](./packages-ethpm) and [NPM](./packages-npm). To import contracts from a dependency, use the following syntax

```
import "somepackage/SomeContract.sol";
```

Here, `somepackage` represents a package installed via EthPM or NPM, and `SomeContract.sol` represents a Solidity source file provided by that package.

Note that Truffle will search installed packages from EthPM first before searching for packages installed from NPM, so in the rare case of a naming conflict the package installed via EthPM will be used.

For more information on how to use Truffle's package management features, please see the Truffle [EthPM](./packages-ethpm) and [NPM](./packages-npm) documentation.
