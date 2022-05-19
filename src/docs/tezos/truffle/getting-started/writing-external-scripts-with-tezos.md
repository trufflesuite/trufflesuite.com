---
title: Writing External Scripts with Tezos
layout: docs.hbs
---

<p class="alert alert-danger">
<strong>Tezos support</strong> in Truffle is experimental. Give it a spin, and help us out by <a href="https://github.com/trufflesuite/truffle/issues">filing issues on Github</a>.
</p>

# Writing External Scripts

Often you may want to run external scripts that interact with your deployed contracts, or in some cases deploy new contracts! Truffle provides an easy way to do this, bootstrapping your contracts based on your desired network and connecting to your Tezos client automatically per your [project configuration](/docs/tezos/truffle/reference/configuring-tezos-projects).

## Command

To run an external script, perform the following:

```shell
$ truffle exec <path/to/file.js>
```

Refer to [Truffle Commands Reference](/docs/truffle/reference/truffle-commands#exec) for more information about this command, such as what options it accepts.

## File structure

In order for external scripts to be run correctly, Truffle expects them to export a function that takes a single parameter as a callback:

```javascript
module.exports = function(callback) {
  // perform actions
}
```

You can do anything you'd like within this script, so long as the callback is called when the script finishes. The callback accepts an error as its first and only parameter. If an error is provided, execution will halt and the process will return a non-zero exit code.

## artifacts.require()

Note that the `artifacts.require()` function [available in migrations](/docs/tezos/truffle/getting-started/deploying-tezos-contracts) is also available to you within external scripts. Here's an example of how you might use it to deploy a new contract outside of Truffle's migration system:

Filename: `./script.js`
```javascript
const SimpleStorage = artifacts.require("SimpleStorage");

module.exports = callback => {
  SimpleStorage.new(3).then((instance) => {
    console.log("New address:", instance.address);
    callback();
  }).catch(callback);
};
```

The output would look like this:

```shell
$ truffle exec ./script.js
Using network 'development'.

New address: KT1JZ8JQ4ziGCsQJcTegNcByYGW32ZhXD217
```
