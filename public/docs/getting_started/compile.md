# Location

All of your contracts are located in the `./contracts` directory. By default you're given an example Solidity [contract](http://solidity.readthedocs.org/en/latest/contracts.html) file and an example Solidity [library](http://solidity.readthedocs.org/en/latest/contracts.html#libraries) file, both with filenames ending in `.sol`. Although a Solidity library is different than a contract, for documentation purposes we're going to lump these into the same word, "contracts".

# Command

To compile your contracts, simply run:

```none
$ truffle compile
```

Truffle will compile only the contracts that have been changed since the last compile, to reduce any unnecessary compilation. If you'd like to override this behavior, run the above command with the `--all` option.

# Artifacts

Artifacts of your compilation will be placed in the `./build/contracts` directory, relative to your project. This directory will be created if it does not exist. These artifacts are integral to the inner workings of Truffle, and they play an important part in the successful deployment of your application. You should not edit these files by hand as they'll be overwritten by contract compilation and deployment.

# Dependencies

You can declare contract dependencies using Solidity's [import](http://solidity.readthedocs.org/en/latest/layout-of-source-files.html#importing-other-source-files) command. Truffle will compile contracts in the correct order and ensure all dependencies are sent to the compiler. Dependencies can be specified in two ways:

### Importing dependencies via their file name:

To import contracts from a separate file, simply write the following command, where `AnotherContract.sol` is relative to the current contract being written. This will make all contracts within `AnotherContract.sol` available to the current source file.

```
import "./AnotherContract.sol";
```

Note that Solidity allows other import syntaxes as well. See their [import documentation](http://solidity.readthedocs.org/en/latest/layout-of-source-files.html#importing-other-source-files) for more information.

### Importing contracts from an external package

Truffle supports dependencies installed via [NPM](./packages-npm) as well as [EthPM](./packages-ethpm). To import contracts from a dependency, use the following syntax, where `somepackage` represents a package installed via NPM or EthPM, and `/SomeContract.sol` represents a path to a Solidity source file provided by that package.

```
import "somepackage/SomeContract.sol";
```

Note that Truffle will search installed packages from EthPM first before searching for packages installed from NPM, so in the rare case of a naming conflict the package installed via EthPM will be used.

For more information on how to use Truffle's package management features, please see Truffle's [NPM](./packages-npm) and [EthPM](./packages-ethpm) documentation, respectively.
