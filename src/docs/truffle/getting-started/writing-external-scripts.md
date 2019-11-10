---
title: Truffle | Writing External Scripts / Command Plugins
layout: docs.hbs
---
# Writing External Scripts

Often you may want to run external scripts that interact with your contracts. Truffle provides an easy way to do this, bootstrapping your contracts based on your desired network and connecting to your Ethereum client automatically per your [project configuration](/docs/advanced/configuration).

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


# Third-party plugin commands

<p class="alert alert-warning">
**Note**: This feature is new and still in a barebones state. Please let us
know how we can improve it!
</p>

## Plugin installation / usage

1. Install the plugin from NPM.
   ```shell
   npm install --save-dev truffle-plugin-hello
   ```

2. Add a <code>plugins</code> section to your Truffle config.
   ```javascript
   module.exports = {
     /* ... rest of truffle-config */

     plugins: [
       "truffle-plugin-hello"
     ]
   }
   ```

3. Run the command
   ```shell
   $ truffle run hello
   Hello, World!
   ```


## Creating a custom command plugin

1. Implement the command as a Node module with a function as its default export.

   Example: `hello.js`

   ```javascript
   /**
    * Outputs `Hello, World!` when running `truffle run hello`,
    * or `Hello, ${name}` when running `truffle run hello [name]`
    * @param {Config} config - A truffle-config object.
    * Has attributes like `truffle_directory`, `working_directory`, etc.
    */
   module.exports = async (config) => {
     // config._ has the command arguments.
     // config_[0] is the command name, e.g. "hello" here.
     // config_[1] starts remaining parameters.
     if (config.help) {
       console.log(`Usage: truffle run hello [name]`);
       return;
     }

     let name = config._.length > 1 ? config._[1] : 'World!';
     console.log(`Hello, ${name}`);
   }
   ```

2.  Define a `truffle-plugin.json` file to specify the command.
    Example: <code>truffle-plugin.json</code>

    ```json
    {
      "commands": {
        "hello": "hello.js"
      }
    }
    ```

3.  Publish to NPM

    ```shell
    npm publish
    ```

## Importing Truffle as a module

```javascript
const truffle = require("truffle");
```

Beginning with `v5.0.30`, Truffle exports the methods listed in [core/index.js](https://github.com/trufflesuite/truffle/blob/develop/packages/core/index.js). This means
your plugin can consume the user's Truffle instance as a library and access a subset of its internal command APIs.

These are useful if you need to touch several Truffle commands in succession. For example, imagine a plugin that evaluated how a contract system performed at different levels of solc optimization. Its workflow might look like:
```
for a range of solc settings:
   compile contracts to a temp folder
   run user's tests using the temp artifacts
   measure and save gas usage data

aggregate data and report
```
The Truffle library lets you do this without making the user add configuration or string their own commands together.

:warning: **Important Note** :warning:

Truffle does not guarantee its internal APIs will follow semver. You should be prepared for your user
to run any Truffle version and handle mismatches gracefully. By using the library **you are entering into a gentleperson's agreement** to manage API volatility and other contingencies on your users' behalf. Some tips:

+ Always `require` Truffle in a try/catch block
+ At runtime, verify the API components you need are actually exposed
+ Consume separately published (and semver guaranteed) Truffle modules when possible
+ Add yourself to the Truffle repo watch list on GitHub and keep abreast of internal changes that
might affect you.
+ Do not go on vacation






