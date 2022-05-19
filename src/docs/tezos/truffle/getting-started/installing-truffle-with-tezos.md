---
title: Installation
layout: docs.hbs
---

<p class="alert alert-danger">
<strong>Tezos support</strong> in Truffle is experimental. Give it a spin, and help us out by <a href="https://github.com/trufflesuite/truffle/issues">filing issues on Github</a>.
</p>

# Installing Truffle with Tezos

### Installing Docker

Before you can start developing Tezos applications with Truffle, you'll first need to ensure you have [Docker](https://www.docker.com/) installed on your machine. Installing docker let's Truffle easily use the latest LIGO compiler on any platform.

[See Docker install instructions for your platform.](https://docs.docker.com/install/)

<p class="alert alert-info">
<strong>Docker on Windows:</strong> If you're developing on Windows, you need to install the <a href="https://docs.docker.com/docker-for-windows/edge-release-notes/">Docker edge release</a> instead of the mainline docker version. Trust us: This is a better experience.
</p>

### Other Requirements

* [NodeJS](https://nodejs.org/) v8.9.4 or later
* Windows, Linux or Mac OS X

## Installing Truffle

You'll need to download a special version of Truffle to use Tezos. 

    $ npm install -g truffle@tezos

If you already have Truffle installed, we recommend uninstalling truffle before running the above command.

## Next step: Create a Truffle project with Tezos

Once you have Truffle and Docker installed, you can move on to [creating a Tezos project](/docs/tezos/truffle/getting-started/creating-a-tezos-project) with Truffle.


