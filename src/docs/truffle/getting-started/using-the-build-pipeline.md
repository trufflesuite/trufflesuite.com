---
title: Truffle | Using the Build Pipeline
layout: docs.hbs
---
# Using the Build Pipeline

<p class="alert alert-warning">
**Alert**: This command is deprecated. Please use third-party build tools like webpack or grunt, or see our <a href="/boxes">Truffle Boxes</a> for an example.
</p>

Truffle 1.0 and 2.0 came standard with a default build system heavily geared toward web applications (here, the term "build" means turning code artifacts into HTML, Javascript and CSS). That build system has been pulled out into its [own module](https://github.com/trufflesuite/truffle-default-builder/tree/master) to make Truffle usable and extensible for all kinds of applications.

Truffle can be configured for tight integration with any build system. To configure a custom build system, see the [Advanced Build Processes](/docs/advanced/build_processes) section for more details.

## Command

To build your application when a build system is configured, run:

```shell
$ truffle build
```

Note you'll receive an error if you try to run the `build` command without first configuring a custom build process.
