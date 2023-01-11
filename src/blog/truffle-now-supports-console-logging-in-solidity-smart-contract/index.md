---
title: Truffle now supports console.log in Solidity smart contract
hide:
  - navigation
---

<!-- ![Blog banner for Truffle now supports console.log in Solidity smart contract](./header-web3-dubai.jpg) -->

**By Kingsley Arinze**

If you used a popular programming language like JavaScript before Solidity, then maybe you had a hard time debugging your Solidity smart contract as a newbie. You must have ran into bugs in your code where a simple console.log() would have solved, but since Solidity has no built-in way of doing this, you had to find alternative ways to fixing your bug.

To get around this problem for Ganache users, we released the [console.sol library](https://www.npmjs.com/package/@ganache/console.log) and updated Ganache to be able to parse and automatically log calls to console.sol to standard output just like JavaScript's console.log, more details [here](https://github.com/trufflesuite/ganache/tree/develop/src/chains/ethereum/console.log).

However, to use this together with Truffle during development and testing, you must start a standalone Ganache instance and connect Truffle to it. This also means that logging output from your smart contract are sent to the Ganache terminal.

Since Truffle has its own built-in Ganache instance that you can easily access when you run `truffle develop`, we decided to take this a step further by implementing Ganache’s console.log support into Truffle directly.

This means you no longer have to manually install any package or run a separate Ganache instance to get the logging feature. Logging outputs are also sent to the Truffle terminal. See the [Usage section]() for more information.

## Installation

To follow with the content of this post, you will need to have the following requirements:

[Node.js](https://nodejs.org/en)

Windows, Linux, or macOS

It is recommended that you download Node.js using a Node version manager to avoid permission errors caused by using sudo to download Truffle. Follow the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) to download a Node version manager for your operating system.

With Node.js installed, you can upgrade by first uninstalling Truffle globally and installing the latest version like so:

```bash
npm uninstall -g truffle
npm install -g truffle
```

Only run `npm install -g truffle` if you do not have a previous version of Truffle installed on your machine.

## Configuration

There are two configuration options you can use to adjust the behavior of the console.log feature and both options can be set in the truffle configuration file i.e truffle-config.js. They are:

1. **solidityLog.displayPrefix**: This option sets the prefix for every console.log line. The default is "". It is a useful option if you want to differentiate console.log output from extra verbose text output.

2. **solidityLog.preventConsoleLogMigration**: This option is a safety measure to prevent accidentally migrating contracts that use console.log to MAINNET. It is set to false by default, so you will have to set it to true manually.

```javascript
module.exports = {
  . . .
  solidityLog: {
    displayPrefix: ' :', // defaults to ""
    preventConsoleLogMigration: true, // defaults to false
  }
```

## Usage

To use console.log in your Solidity contract, you will need to import the **truffle/console.sol** library and use it as shown in the code sample below. Note that these logs will appear in your terminal when you run `truffle test` or `truffle develop`.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
import "truffle/console.sol";

contract SampleContract {
    address public admin;

    constructor(address _admin) {
        console.log("SampleContract::constructor\n\tadmin: %o", _admin);
        admin = _admin;
    }
}
```

Migration file for SampleContract:

```javascript
// 1_migration_file.js
const SampleContract = artifacts.require(“SampleContract”);

module.exports = function(deployer, network, accounts){
	const admin = accounts[0];
	deployer.deploy(sampleContract, admin);
}
```

Now if you run `Truffle develop` followed by `migrate`, you will see the following printed on you truffle develop console:

![Image of Truffle's console.log output](./console.log%20output.jpg)

This also applies when you run test cases with Truffle using the `truffle test` command, outputs from the console.log statements within your smart contract code would be displayed on your terminal along side test results.

As you can see, usage is very similar to Node.js console.log method as it returns a formatted string using the first argument as a printf-like format string which can contain zero or more format specifiers.

Each specifier is replaced with the converted value from the corresponding argument. Some of the supported specifier includes:

- %s for string
- %d for Number
- %j for JSON and lot more, see the [Nodejs' util.format() documentation](https://nodejs.org/api/util.html#utilformatformat-args)

## Conclusion

At Truffle, we remain committed to improving and simplifying the user experience for dapp developers in the Web3 ecosystem, by creating developer tools, resources, and educational materials.

To find out more about our suite of developer tools, visit the [official Truffle website](https://trufflesuite.com). If you have questions, feel free to start a discussion on [Truffle Github Discussions](https://github.com/orgs/trufflesuite/discussions).

We also hold weekly, live-streamed sessions: Web3 Unleashed, where we live code and build, interview leaders from across web3 and discuss important developments around the ecosystem. Keep an eye on our [Twitter](https://twitter.com/trufflesuite) for updates on the next session.

You can also find past episodes on the [Truffle Youtube channel](https://www.youtube.com/c/TruffleSuite) and the [unleashed](https://trufflesuite.com/unleashed) section of our website if you prefer written materials.
