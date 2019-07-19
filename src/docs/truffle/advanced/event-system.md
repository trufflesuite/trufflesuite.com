---
title: Truffle | Truffle Event System
layout: docs.hbs
---
# Truffle Event System

One new addition to Truffle in version 5.1.0 is an event system. This is a system of hooks implemented in several of the command flows. At several stages in the flow of these commands, events fire and give up data related to what is happening in the code at that time. So this might be, for example, names of contracts that are being compiled or just the fact that data is being fetched.

So far, events have been implemented for the following command flows: compile, unbox, and obtain. In the future, we plan to integrate this system with the rest of the code in Truffle, as well as make the currently supported commands more robust.

## How it works

Events that are emitted have a string name representation and are namespaced with semicolons. We will refer to an entire name as an "event name". A simple example of an event name that exists in the compile command flow is "compile:start". We will refer to the individual components of event names as "labels". So the event name "compile:start" has two labels: "compile" and "start". This particular event is emitted near the very start of the code that runs during compilation. Another example of a slightly more complicated name from the unbox command flow is "unbox:downloadingBox:succeed". This event name has three labels: "unbox", "downloadingBox", and "succeed". This event, as you can probably guess, is emitted when your Truffle box has successfully finished downloading during the unbox command flow.

For all events that get emitted in the code, you can provide handlers that will be run when certain events that match are fired. Below you will find a description of how to attach handlers that will run when events are emitted.

Certain events that are emitted also release data alongside the emitted event. This could be useful for collecting statistics or perhaps to make your own formatted output during development. So as an example of an event that releases some data, the event "compile:compiledSources" creates data about what source files were used during compilation. This data comes in the form of an array of the source file names that you can log to the console, save in a file, or use however you please.

Below you will find a chart of all currently available event names, where they are emitted in the command flow, and what data is available in the handlers provided for that event.

## Subscribers

In order to react to events, you must create a javascript file that will be used to create a "Subscriber". The Subscriber is a class that deals with managing event handlers. This javascript file will basically describe and indicate what to do when events are emitted. This javascript file should be a module with two named exports: `initialization` and `handlers`.

`initialization` should be a function. This function gets run when the subscriber is first instantiated at the beginning of all command flows. This function is optional and should execute whatever setup you wish to have.
NOTE: In this function you will have access to the Subscriber itself through the `this` variable. This allows you to create references that will be available in your handlers and to access the Subscriber class methods.

 - `handlers` should be an object. This is the place where you will describe what functions to run when certain events are fired. We will describe how to construct these in the following section.

## How to define your event handlers

To create your event handlers, you will need to populate the `handlers` object. In order to describe which handlers correspond to which events, you must create at least one "event matcher". An event matcher is a string that will be used to match against events that are emitted. An event matcher could be an exact event name like "compile:start". In addition, you may use wildcard characters ("*" and "**") to match one or more events.

A single asterisk is used to match a label in an event name. So the event matcher "unbox:*" would match any event name that has exactly two labels and starts with "unbox". This means it would match "unbox:start" and "unbox:succeed" but not "unbox:downloadingBox:start" since that has three labels. Nor would it match "compile:start" since the first word does not match "unbox".

A double asterisk is used to match one or more labels in an event name. So the event matcher "unbox:**" would match any event name that starts with "unbox" regardless of how many other labels the event name has. This means that it would match "unbox:start" as well as "unbox:preparingToDownload:succeed". The matcher "**:succeed" would match "fetchSolcList:succeed" and "unbox:preparingToDownload:succeed". In this way you would be able to write handlers that match against batches of events.

After you have created your event matcher, you will add it as a key in the `handlers` object. The value for this key will be an array of functions that will be executed when that event matcher matches an emitted event. Every time that event matcher matches an emitted event, each function in that array will be run. Here is one simple hello world example:

```javascript
module.exports = {
  handlers: {
    "compile:start": [
      function() {
        console.log("hello world!");
      }
    ]
  }
```

In the above example, every time the "compile:start" event gets emitted, "hello world!" will get logged to the console.

## More on subscribers

When you are creating your handlers, you will have access to Subscriber class methods. Most of these shouldn't be used directly except for the `removeListener` method. If at some point you need to remove a listener that was added, you can call `this.removeListener(<eventMatcher>)` to "detach" the handlers listed under that specific event matcher.

You will also have access to everything that you made references to in the initialization function. So for example, if I wanted to use an external library, perhaps one for colorful output, I would require it in my javascript and create a reference to it in the initialization like so:

```javascript
const colors = require("colors");

module.exports = {
  initialization: function() {
    this.colors = colors;
  },
  .......

```

I would then be able to access `this.colors` in my handlers property! So extending the example above could yield the following code:

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
}
```

This would make it log the source file names in rainbow colors whenever the "compile:compiledSources" event is emitted. Remember, some events (not all) provide data to your handlers at the time of execution. The "compile:compiledSources" provides an array of all source file names to this particular handler. You will need to check the chart below to see which events are provided with what data.
NOTE: The `this` in your Subscriber files refers to the Subscriber class that is instantiated from the file you create and not the `this` in the file. So you will not have direct access to the `colors` library imported above unless you create a reference to it in the `initialization` function.

## Currently supported events

This section lists all events currently implemented in Truffle. They are organized by command and contain three pieces of information: the event name, where it is emitted, and the specific data, if any, that is passed along to the handlers.

### `truffle compile`

"compile:start"
  - start of command flow
   no data available

"compile:succeed"
  - end of command flow
  {
    contractBuildDirectory: <string: directory where artifacts were saved>,
    compilersInfo: {
      <compilerName>: {
        version: <string: version of compiler>,
      },
      ...one entry per compiler used
    }
  }

"compile:sourcesToCompile"
  - before the actual compilation of sources
  {
    sourceFileNames: [
      <string: filenames of sources to compile>,
      ...one for each file
    ]
  }

"compile:warnings"
  - after compilation of sources
  {
    warnings: [
      <string: warnings created by the compiler during compilation>,
      ...one for each warning
    ]
  }

"compile:nothingToCompile"
  - after attempted compilation if no compilation was needed
  no data

### `truffle obtain`

"obtain:start"
  - start of command flow
  no data available

"obtain:succeed"
  - end of command flow
  {
    compiler: {
      name: <string: name of compiler obtained>,
      version: <string: version of compiler obtained>
    }
  }

"obtain:fail"
  - emitted in case the obtain command fails
  no data available

"downloadCompiler:start"
  - before attempting to download a compiler
  {
    attemptNumber: <number: what number attempt at downloading the compiler>
  }

"downloadCompiler:succeed"
  - after successfully downloading a compiler
  no data available

"fetchSolcList:start"
  - before fetching the list of available versions of the Solidity compiler
  no data available

"fetchSolcList:succeed"
  - after fetching the list of available versions of the Solidity compiler
  no data available

"fetchSolcList:fail"
  - emitted if downloading the list of Solidity compiler versions fails
  no data available

### `truffle unbox`

"unbox:start"
  - start of command flow
  no data available

"unbox:succeed"
  - end of command flow
  {
    boxConfig: <object: contents of the `truffle-box.json` for the given box>
  }

"unbox:fail"
  - emitted if the unbox fails
  no data available

"unbox:preparingToDownload:start"
  - before setting up a temporary directory for the downloaded contents
  no data available

"unbox:preparingToDownload:succeed"
  - after creating the temporary directory for the downloaded contents
  no data available

"unbox:downloadingBox:start"
  - before attempting to download the box contents
  no data available

"unbox:downloadingBox:succeed"
  - after downloading the box contents
  no data available

"unbox:cleaningTempFiles:start"
  - before removing the temporary files
  no data available

"unbox:cleaningTempFiles:succeed"
  - after removing the temporary files
  no data available

"unbox:settingUpBox:start"
  - before installing box dependencies
  no data available

"unbox:settingUpBox:succeed"
  - after installing box dependencies
  no data available
