---
title: Simulate Live Networks with Forked Sandboxes
hide:
  - navigation
---

<figure>
  <img class="mb-4 figure-shadow" src="/img/blog/sandbox-forking-with-truffle-teams/sandbox-forking-blog.png" alt="Sandbox Forking" style="width:100%">
</figure>

Sandboxes in Truffle Teams are the easiest way to setup a shared Ganache instance for the entire team. They integrate seamlessly with our deployments manager, and work locally as expected too: insert the mnemonic and RPC URL into your Truffle config or browser wallet and starting sending ether, deploying contracts, interacting via the console and more! We’re not stopping there though. Today we’re proud to introduce live network simulation via sandbox forking!

## Introducing Forking

Forking allows a sandbox to act as a live network from a given block number. We take for granted in web2 that we can get test credentials and interact with an API that will map to our production environment, but in web3 this hasn’t been so easy. With a forked sandbox you can transact, deploy, test, and debug against Mainnet without spending real Ether!

Forking has been available since 2017 ([see this older tutorial](/tutorials/chain-forking-exploiting-the-dao)), but the requirement of a full archival node was a barrier for many. By adding this ability to Truffle Teams, you no longer need to worry about anything--just select a network and go. Here are some more specific examples:

* **DeFi**: Some DeFi protocols have testnet deployments that differ from their Mainnet counterparts for a variety of reasons. For dapp developers, this inconsistency presents a problem. You want to develop against the “real” protocol, but developing in production is terrible, especially when real ETH is at stake! With forking, you’re free to simply fork Mainnet and deploy your dapp to an environment that translates to the live network.

* **Testing**: Ensuring your dapp integrates with another used to require getting those contracts, deploying them to your local test network or a live testnet (assuming there’s no comparable testnet deployment already), then finally running your tests. With a forked sandbox your target dapp is already there, with its state. Want to test your CryptoKitty item? You can do it with your actual kitty!

* **Security Analysis**: Dynamic analysis, the process of executing code and data in real-time with the hope of finding issues during execution, has never been easier. With the ability to take control of any account on the given network and travel through time by selecting an older block, you can run attacks live and see exactly what went wrong.

## How to Create a Forked Sandbox

<figure>
  <img class="mb-4 figure-shadow" src="/img/blog/sandbox-forking-with-truffle-teams/forking-details-for-blog.png" alt="--stacktrace-extra" style="width:100%">
  <figcaption class="text-center font-italic">A forked Mainnet sandbox.</figcaption>
</figure>

To fork a network, create a new sandbox and check the forking checkbox. From there, select a network and optionally provide a block number. Clicking CONFIRM will spin up a new Ganache instance forked from the given network and block. For more details, <a href="/docs/teams/deployments/sandboxes#sandbox-forking" target="_blank">see our sandboxes documentation.</a>

You can now interact with this sandbox as you would the forked network. Using Ethereum 
Mainnet as an example: you can call out to Mainnet contracts, and send ETH to Mainnet addresses.
<div class="mt-12 text-center">
    <a class="btn btn-truffle mt-3" href="/teams" target="_blank">START TESTING AGAINST PRODUCTION NETWORKS TODAY!</a>
  </div>

## How Will you Use Forking?
We’re very proud of this feature and think it’s going to be a game-changer for the community. We’re curious: how will you use forking?

We want Truffle Teams to be the most effective devops tool in the blockchain space for both new and existing teams. <a href="https://trfl.co/become-a-truffler" target="_blank">Join our slack community</a> and let us know what you think about this feature, and if your team has other needs we haven’t met yet.

**Thank you!**

Josh Quintal, Head of Product & Marketing

