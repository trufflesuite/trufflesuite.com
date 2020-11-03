---
title: Teams | Sandbox forking
layout: docs.hbs
---
# Sandbox forking

Forking allows a sandbox to act as a live network from a given block number. We take for granted in web2 that we can get test credentials and interact with an API that will map to our production environment, but in web3 this hasn’t been so easy. With a forked sandbox you can transact, deploy, test, and debug against Mainnet without spending real Ether!

<figure>
  <img class="half-width mb-6" src="/img/docs/teams/what-is-forking.png" alt="Forking example">
</figure>

To fork a network, create a new sandbox by clicking the <span class="inline-button">NEW SANDBOX</span> button. Then, check the **Enable forking** checkbox. From there, select a network and optionally provide a block number. Clicking the <span class="inline-button">CONFIRM</span> button will spin up a new Ganache instance forked from the given network and block.

<figure class="screenshot">
  <img class="w-100" src="/img/docs/teams/sandbox-forking.png" alt="Sandbox forking options">
  <figcaption class="text-center">Sandbox forking options and details.</figcaption>
</figure>