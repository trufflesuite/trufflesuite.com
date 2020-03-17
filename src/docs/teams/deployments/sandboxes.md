---
title: Teams | Sandboxes
layout: docs.hbs
---
# Sandboxes

<p class="alert alert-warning"><i class="fad fa-flask"></i> Thank you so much for participating in the <strong>Truffle Teams Private Preview</strong>! Your access gets exclusive access to this feature in progress! Since we're still getting the recipe perfect, you may run into issues. <strong>Please let us know if you encounter any issues!</strong></p>

Sandboxes are shared Ganache instances you can create with the click of a button. Convenient features of Ganache's local development experience are now available to the whole team! Each sandbox has 10 pre-funded accounts and near-instant transaction times giving your team a performant, turnkey blockchain environment without spending a single wei on transactions.

Currently, sandboxes exist in isolation of the other features of Truffle Teams. Our next iteration will allow you to target a sandbox on the Deployments screen, as well as integrate with Monitoring. Sandboxes in Truffle Teams will also be the easiest way to use live chain data in your environment via forking.

## Creating or Destroying a Sandbox

Creating a sandbox is as easy as hitting the <span class="inline-button">QUICKSTART SANDBOX</span> button. To destroy a box, click the <span class="inline-button red">DESTROY</span> button for the desired sandbox.

<figure class="screenshot">
  <img class="w-100" src="/img/docs/teams/sandboxes.png" alt="Truffle Teams SANDBOXES screen">
  <figcaption class="text-center">The Truffle Teams Sandboxes screen.</figcaption>
</figure>

You'll see all the details necessary to start using this sandbox, including the `mnemonic` and `network_id`. See below for complete details on [usage with Truffle](#usage-with-truffle).

## Usage with Truffle

You can use sandboxes with all of Truffle's commands that work with Ganache, including: `migrate`, `console`, and `test`! Doing so requires a specific configuration of Truffle's HDWalletProvider.

In addition to providing the `mnemonic` and `network_id`, we must specify the initial account index (`0`), total number of accounts (`10`), and set the `shareNonce` option to `false`. Here's a complete example:

```
const HDWalletProvider = require("@truffle/hdwallet-provider");
const teamsMnemonic = "custom buzz situate mesh cannon number grass improve iron swim pilot cool";

module.exports = {
  networks: {
    teams: {
      provider: function() {
        return new HDWalletProvider(teamsMnemonic, "https://sandbox.truffleteams.com/ac98e539-140d-498e-818e-8284eee9d933", 0, 10, false);
      },
      network_id: 1583853263114
    }
  }
};
```