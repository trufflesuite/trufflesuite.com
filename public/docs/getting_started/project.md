# Create a Project Folder

First create a project folder. You can do this through your favorite file explorer or by running the following on the command line:

```none
$ mkdir myproject
```

# Initialize Your Project

Next, initialize your Truffle project by performing the following in the command line:

```none
$ cd myproject
$ truffle init
```

Once completed, you'll now have a project structure with the following items:

* `contracts/` - directory where Truffle expects to find solidity contracts.
* `migrations/` - directory to place scriptable deployment files.
* `test/` - location of test files for testing your application and contracts.
* `truffle.js` - your main Truffle configuration file.

# Default Contracts: MetaCoin

By default, `truffle init` gives you a set of example contracts (`MetaCoin` and `ConvertLib`) which act like a simple alt-coin built on top of Ethereum. You can use these contracts to learn quickly while navigating through the Getting Started guide, or delete these files and build a project of your own.

# Advanced Initialization

By default, `truffle init` creates a simple project for you so you can get familiar with writing, compiling and deploying Solidity-based smart contracts. However, if you'd like to take a stab at building an Ethereum-based web application, we recommend using the following command instead:

```
$ truffle init webpack
```

This will download and install a copy of [this project](https://github.com/trufflesuite/truffle-init-webpack) that integrates both Truffle and Webpack, giving you the power of Webpack for web development and Truffle for Ethereum development.

This package is the first of officially-supported boilerplates soon to be released. Keep a look out for more!
