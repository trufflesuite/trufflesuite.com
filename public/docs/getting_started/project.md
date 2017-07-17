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

# Truffle Boxes

By default, `truffle init` creates a simple project for you so you can get familiar with writing, compiling and deploying Solidity-based smart contracts. However, we have many boilerplates and example applications available to you via the `truffle unbox` command that help you build complex applications quickly. [Check all of our Truffle Boxes to get started](/boxes).
