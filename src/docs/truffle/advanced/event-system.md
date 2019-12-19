---
title: Truffle | Truffle Event System
layout: docs.hbs
---

ℹ️ The Truffle Event System is currently an experimental feature and we
anticipate that it will be developing and changing in the near future.
Please keep this in mind when using this feature as we cannot promise that its
architecture or the API will remain the same until we declare it as stable.
Please enjoy and if you discover any issues or bugs, we would love it if you
created an issue on the
[Truffle GitHub page](https://github.com/trufflesuite/truffle/issues).
Thank you!

# Truffle Event System

The Truffle Event System is a system of hooks implemented in several of the
command flows. Truffle commands emit events for specific tasks, passing
data relevant to the task. For example, during compilation an event is
emitted that contains the names of contracts that are being compiled.

Events are currently implemented for the following Truffle command flows:
  - compile
  - unbox
  - obtain

We plan to integrate the event system into the rest of Truffle's command
flows in future versions of Truffle.

## How it works

All emitted events are named after the task that emits them. What makes
Truffle's event system different than an event emitter is that the names of
events are "namespaced", each part of the name being separated by a colon. The
entire name, in whole, is called the "event name". A simple example of an
event name in the `compile` command flow is `"compile:start"`. Individual
components of event names are "labels". The event name `"compile:start"` has
two labels: `"compile"` and `"start"`. This particular event is emitted near
the very start of the code that runs during compilation.

A slightly more complicated name from the `unbox` command flow is
`"unbox:downloadingBox:succeed"`. This event name has three labels:
`"unbox"`, `"downloadingBox"`, and `"succeed"`. This event, as you can
probably guess, is emitted when a Truffle box has successfully finished
downloading during the `unbox` command flow.

Events are often grouped into sub-labels that mark the beginning and end of a
process. Paired event names are common, e.g., an event name ends with
`":start"` and another that ends with `":succeed"`. These denote the start
and successful finish of a certain event. Another common label, `"fail"`, is
used to indicate the failure of a certain event. When the event `"compile:start"`
is emitted, it means that compilation has started. `"compile:succeed"` lets
us know that compilation has completed and `"compile:fail"` tells us that
compilation has failed.

In order to make use of this system, you are able to provide handlers for
any emitted event. These handlers will be executed when matching
events are emitted. In the [Subscribers](#subscribers) section you will
find a description of how to attach handlers to events.

As was mentioned briefly, some events also provide data to the handlers
when emitted. This could be useful for collecting statistics or perhaps to
make your own formatted output during development. `"compile:compiledSources"`
is an example of an event that provides data about what source files were
used during compilation. This data comes in the form of an array of source
filenames that you can log to the console, save to a file, or use
however you please.

In the [Currently supported events](#currently-supported-events) section you
will find a chart of all currently available event names, where they are
emitted in the command flow, and what data is available in the handlers for
that event.

## Subscribers

In order to react to events you must create a JavaScript file that will be
used to create a "Subscriber". A Subscriber is a class that manages a group
of event handlers. This file is used internally by a Subscriber to indicate
what to do when events are emitted. The Subscriber checks two exported
fields: `initialization` and `handlers`.

`initialization` must be a function. This function is executed when the
Subscriber is instantiated at the beginning of all command flows. This
function is optional.

*NOTE: In this function you will have access to the Subscriber itself through
the `this` keyword when your functions are described using `function`
syntax, i.e., `function(data){`, not `(data) => {`. This makes it easy to
attach properties and helper methods to the Subscriber that will then be
available in your handlers.*

`handlers` should be an object whose keys are event names and values are an
array of event handler functions. This is where you will describe what
functions to run when certain events are fired. The following section describes
how to construct event handlers.

In order to use this file as a Subscriber you must `require()` it in your
[`truffle-config.js`](/docs/truffle/reference/configuration) under the
`"subscribers"` object:

```javascript
modules.exports = {
  networks: {
    // ...
  },
  subscribers: {
    mySubscriberName: require("../my-subscriber-config.js"),
    myOtherSubscriberName: require("../my-other-subscriber-config.js")
  }
}
```

## How to define your event handlers

To create your event handlers you will need to populate the `handlers` object.
In order to describe which handlers correspond to which events, you must
create at least one "event matcher". An event matcher is a string that will
be used to match against events that are emitted. An event matcher could be
the exact event name, like `"compile:start"`, or you may use wildcard
characters (`"*"` and `"**"`) to match multiple events.

A single asterisk (`"*"`) is used to match a single label within an event
name. The event matcher `"unbox:*"` would match any event name that has
exactly two labels and starts with `"unbox"`. `"unbox:*"` would match
`"unbox:start"` and `"unbox:succeed"` but _not_ `"unbox:downloadingBox:start"`
since that has three labels. Nor would it match `"compile:start"` since the
first word does not match `"unbox"`.

A double asterisk is used to match one or more labels in an event name. So
the event matcher `"unbox:\**"` would match any event name that starts with
"`unbox"` regardless of how many other labels the event name has. This means
that it would match `"unbox:start"` as well as
`"unbox:preparingToDownload:succeed"`. The matcher `"**:succeed"` would
match `"fetchSolcList:succeed"` and `"unbox:preparingToDownload:succeed"`.
In this way you are able to write handlers that match against batches of events.

The event matcher string must be a key in the `handlers` object whose value
must be an array of functions. These functions will be executed when that
event matcher matches an emitted event. Every time an event matcher matches
an emitted event, each of its functions will be executed. Here is a
simple "hello world" example:

```javascript
module.exports = {
  handlers: {
    "compile:start": [
      function() {
        console.log("hello world!");
      }
    ]
  }
};
```

In the above example, every time the `"compile:start"` event is emitted,
`"hello world!"` will be logged to the console.

*NOTE: Currently you must use `function` syntax when creating the handler
functions in order to have the appropriate `this` value. You can use arrow
functions in your handler functions, but you will lose the `this` reference
to the Subscriber if you do so.*

## More on subscribers

When you are creating your handlers, you will have access to Subscriber class
methods. Most of these shouldn't be used directly except for the
`removeListener` method. If at some point you need to remove a listener that
was added, you can call `this.removeListener(<eventMatcher>)` to "detach"
the handlers listed under that specific event matcher.

You will also have access to everything that you made references to in the
initialization function. For example: if I wanted to use an external library,
perhaps one for colorful logging, I would require it in my JavaScript and
create a reference to it in the initialization like so:

```javascript
const colors = require("colors");

module.exports = {
  initialization: function() {
    this.colors = colors;
  },
  // ......
};
```

I would then be able to access `this.colors` in my handlers property! So
extending the example above could yield the following code:

```javascript
const colors = require("colors");

module.exports = {
  initialization: function() {
    this.colors = colors;
  },
  handlers: {
    "compile:compiledSources": [
      function(data) {
        const { sourceFileNames } = data;
        const message = this.colors.rainbow(`The source files are ${sourceFileNames}`);
        console.log(message);
      }
    ]
  }
};
```

This would log the source filenames in rainbow colors whenever the
`"compile:compiledSources"` event is emitted. Remember, some events (not all)
provide data to your handlers at the time of execution. The
`"compile:compiledSources"` provides an array of all source filenames to this
particular handler. Check the chart below to see which events are provided
with what data.

*Reminder: The `this` in your Subscriber files refers to the Subscriber class
that is instantiated from the file you create and not the `this` in the file.*

## Currently supported events

This section lists all events currently implemented in Truffle. They are
organized by command and contain three pieces of information: the event name,
when it is emitted, and the specific data, if any, that is passed along to
the handlers.

### `truffle compile`


#### `"compile:start"`

Emitted at the start of the command flow.

*No data available for this event.*

#### `"compile:succeed"`

Emitted at the end of the command flow.

```
{
    contractBuildDirectory: <string: directory where artifacts were saved>,
    compilersInfo: {
      <compilerName>: {
        version: <string: version of compiler>,
      },
      ...one entry per compiler used
    }
}
```

#### `"compile:sourcesToCompile"`

Emitted before sources are compiled.

```
{
    sourceFileNames: [
      <string: filenames of sources to compile>,
      ...one string entry for each file
    ]
}
```

#### `"compile:warnings"`

Emitted after sources are compiled.

```
{
    warnings: [
      <string: warnings created by the compiler during compilation>,
      ...one string entry for each warning
    ]
}
```

#### `"compile:nothingToCompile"`

Emitted after attempted compilation if no compilation was needed

*No data available for this event.*

### `truffle obtain`

#### `"obtain:start"`

Emitted at the start of the command flow.

*No data available for this event.*

#### `"obtain:succeed"`

Emitted at the end of the command flow.

```
{
    compiler: {
      name: <string: name of compiler obtained>,
      version: <string: version of compiler obtained>
    }
}
```

#### `"obtain:fail"`

Emitted in case the obtain command fails.

*No data available for this event.*

#### `"downloadCompiler:start"`

Emitted before attempting to download a compiler.

```
{
  attemptNumber: <number: what number attempt at downloading the compiler>
}
```

#### `"downloadCompiler:succeed"`

Emitted after successfully downloading a compiler

*No data available for this event.*

#### `"fetchSolcList:start"`

Emitted before fetching the list of available versions of the Solidity compiler

*No data available for this event.*

#### `"fetchSolcList:succeed"`

Emitted after fetching the list of available versions of the Solidity compiler

*No data available for this event.*

#### `"fetchSolcList:fail"`

Emitted emitted if downloading the list of Solidity compiler versions fails

*No data available for this event.*

### `truffle unbox`

#### `"unbox:start"`

Emitted at the start of command flow.

*No data available for this event.*

#### `"unbox:succeed"`

Emitted at the end of command flow.

  ```
  {
      boxConfig: <object: contents of the `truffle-box.json` for the given box>
  }
  ```

#### `"unbox:fail"`

Emitted if the unbox fails.

*No data available for this event.*

#### `"unbox:preparingToDownload:start"`

Emitted before setting up a temporary directory for the downloaded contents.

*No data available for this event.*

#### `"unbox:preparingToDownload:succeed"`

Emitted after creating the temporary directory for the downloaded contents.

*No data available for this event.*

#### `"unbox:downloadingBox:start"`

Emitted before attempting to download the box contents.

*No data available for this event.*

#### `"unbox:downloadingBox:succeed"`

Emitted after downloading the box contents.

*No data available for this event.*

#### `"unbox:cleaningTempFiles:start"`

Emitted before removing the temporary files.

*No data available for this event.*

#### `"unbox:cleaningTempFiles:succeed"`

Emitted after removing the temporary files.

*No data available for this event.*

#### `"unbox:settingUpBox:start"`

Emitted before installing box dependencies.

*No data available for this event.*

#### `"unbox:settingUpBox:succeed"`

Emitted after installing box dependencies.

*No data available for this event.*
