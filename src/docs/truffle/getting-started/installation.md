---
title: Truffle | Installation
layout: docs.hbs
---
# Installation

```bash
npm install -g truffle
```

## Requirements

* NodeJS v8.9.4 - v11.15.0
* Windows, Linux or Mac OS X

Because of [the bug](https://github.com/trufflesuite/truffle/issues/2070), Truffle is not usable on NodeJS 12 or later.

Truffle also requires that you have a running Ethereum client which supports the standard JSON RPC API (which is nearly all of them). There are many to choose from, and some better than others for development. We'll discuss them in detail in the [Choosing an Ethereum client](/docs/getting_started/client) section.

## Recommendations for Windows

If you're running Truffle on Windows, you may encounter some naming conflicts that could prevent Truffle from executing properly. Please see [the section on resolving naming conflicts](/docs/advanced/configuration#resolving-naming-conflicts-on-windows) for solutions.
