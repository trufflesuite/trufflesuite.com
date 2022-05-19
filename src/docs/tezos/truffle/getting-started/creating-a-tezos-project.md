---
title: Creating a Tezos Project
layout: docs.hbs
---

<p class="alert alert-danger">
<strong>Tezos support</strong> in Truffle is experimental. Give it a spin, and help us out by <a href="https://github.com/trufflesuite/truffle/issues">filing issues on Github</a>.
</p>

# Creating a Tezos Project

To use most Truffle commands, you need to run them against an existing Truffle project. So the first step is to create a Truffle project with Tezos.

The best way to create a project with Tezos is to start with the `tezos-example` [Truffle Box](/boxes). Truffle boxes are example applications and project templates, and we've built one specifically for Tezos. 

1. Create a new directory for your Truffle project:

   ```shell
   mkdir tezos-example
   cd tezos-example
   ```

1. Download ("unbox") the `tezos-example` box:

   ```shell
   truffle unbox tezos-example
   ```

   <p class="alert alert-info">
   <i class="far fa-info-circle"></i> <strong>Note</strong>: You can use the `truffle unbox <box-name>` command to download any of the other <a href="/boxes">Truffle Boxes</a>, though note that as of this writing, few exist for Tezos.
   </p>

   <p class="alert alert-info">
   <i class="far fa-info-circle"></i> <strong>Note</strong>: To create a bare Truffle project with no smart contracts included, use `truffle init`.
   </p>

   <p class="alert alert-info">
   <i class="far fa-info-circle"></i> <strong>Note</strong>: You can use an optional `--force` to initialize the project in the current directory regardless of its state (e.g. even if it contains other files or directories). This applies to both the `init` and `unbox` commands. Be careful, this will potentially overwrite files that exist in the directory.
   </p>

Once this operation is completed, you'll now have a project structure with the following items:

* `contracts/`: Directory for [LIGO contracts](/docs/tezos/truffle/getting-started/writing-tezos-contracts)
* `migrations/`: Directory for [scriptable deployment files](/docs/tezos/truffle/getting-started/deploying-tezos-contracts)
* `test/`: Directory for test files for [testing your application and contracts](/docs/tezos/truffle/getting-started/testing-your-tezos-contracts)
* `truffle-config.js`: Truffle [configuration file](/docs/tezos/truffle/reference/configuring-tezos-projects), configured specifically for Tezos

## Ready to write some contracts?

See the [Writing LIGO Contracts](/docs/tezos/truffle/getting-started/writing-tezos-contracts) section to get building!
