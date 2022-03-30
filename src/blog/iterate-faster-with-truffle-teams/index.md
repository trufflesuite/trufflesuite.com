---
title: Iterate Faster with Truffle Teams

---

Consider the amount of context switching required to develop a dapp: you’re writing Solidity one minute, writing tests another, debugging those results--it’s easy to get lost! These switches carry a cognitive load and when errors equal a loss of ETH we need all the help we can get. I’m happy to inform you Truffle Teams can help reduce context switching and help you or your team iterate faster.

Truffle Teams has reached a very important stage in its life: it now provides a complete workflow including building, testing, managing, monitoring, and debugging. This means you’re getting a huge boost in productivity. This amounts to a more robust workflow for you and/or your team and contributes to the application lifecycle generally by tightening the feedback loop between deployment, operation, and debugging all within a flexible development network.

<figure>
  <img class="mb-4 w-100" src="/img/blog/iterate-faster-with-truffle-teams/dev-lifecycle.png" alt="The development lifecycle: plan, code, build, test, release, deploy, operate, and monitor.">
  <figcaption class="text-center font-italic">The development lifecycle.</figcaption>
</figure>

Up to this point, Truffle Teams has already offered a builds system, deployment manager, blockchain sandboxes, and monitoring. Recently we released a visual debugger into early access. With that, we’d like to highlight two features that completed this cycle: the Debugger and the Contract Manager.

For a great video example, check out our demo from TruffleCon 2020. We briefly touch all the phases talked about above using a rock, paper, scissors game. For something more long-form, check out our 5-part webinar series walking you through using the Truffle suite to create an NFT and trade it on a decentralized marketplace.

<figure>
  <a href="https://www.youtube.com/watch?v=LsQ2Iwd5VMc" target="_blank">
    <img class="mb-4 w-100 w-md-70 figure-shadow" src="/img/blog/iterate-faster-with-truffle-teams/teams-demo-tcon-2020.jpg" alt="The video thumbnail for Josh Quintal and Mike Seeses demo of Truffle Teams at TruffleCon 2020.">
    <figcaption class="text-center font-italic">Mike Seese and Josh Quintal go over the entire development lifecycle using Truffle Teams for a decentralized rock, paper, scissors dapp.</figcaption>
  </a>
</figure>

## Debugger Enhancements

<p class="alert alert-info">
  <i class="fas fa-info-circle"></i> <strong>Note</strong>: To use the debugger right away, you'll need to opt-in to <a href="/blog/try-new-features-first-with-truffle-teams-early-access">Truffle Teams Early Access</a>.
</p>

Truffle offers a sophisticated forensic transaction debugger and allows you to extract the most information and context possible from your transactions. We released a graphical version of our command line debugger into Truffle Teams Early Access in December. Since then we’ve added syntax highlighting and breakpoints for an improved developer experience. Readability increases and you control where execution stops, providing a precision debugging experience. Check out the Truffle Teams debugger docs to learn more about breakpoints. Currently the debugger in Truffle Teams only works for sandbox environments, but we plan on supporting public networks next!

</div></div></div>

<figure class="breakout">
  <img class="mb-4 w-100 w-md-70 figure-shadow" src="/img/blog/iterate-faster-with-truffle-teams/debugger.png" alt="The Truffle Teams debugger working on an NFT-based badge contract">
  <figcaption class="text-center font-italic">The Truffle Teams Debugger--now with syntax highlighting and breakpoints!</figcaption>
</figure>

<div class="container container-post"><div class="row justify-content-center"><div class="col">

## The Contract Manager

<p class="alert alert-info">
  <i class="fas fa-info-circle"></i> <strong>Note</strong>: To use the contract manager right away, you'll need to opt-in to <a href="/blog/try-new-features-first-with-truffle-teams-early-access">Truffle Teams Early Access</a>.
</p>

Truffle Teams’ Contract Manager generates a UI for interacting with all the functions of your smart contracts, as well as a live state tree so you can quickly see the changes propagated by those functions. If you’re familiar with Remix, you’ll feel right at home here.

</div></div></div>

<figure class="breakout">
  <img class="mb-4 w-100 w-md-70 figure-shadow" src="/img/blog/iterate-faster-with-truffle-teams/contract-manager.png" alt="The Truffle Teams Contract Manager using an NFT-based badge contract">
  <figcaption class="text-center font-italic">The Contract Manager; shown here using an NFT badge.</figcaption>
</figure>

<div class="container container-post"><div class="row justify-content-center"><div class="col">

The Contract Manager is great for quick demos, integration tests, and a faster, all-GUI debugging workflow. For example, you can deploy to a sandbox via the deployment wizard, hop over to the contract manager to fire off a few transactions, and finally debug these transactions from the monitoring screen.

## Dapp Topography

Going forward, we’ll be helping you understand your dapp on an even deeper level, offering forensic-level analysis of your transactions. Not only that, but it will be able to diagram contract interaction to allow different stakeholders to participate in the debugging process. For example a product manager, or other domain expert can participate in the forensic analysis. These diagrams and other assets can be shareable media that can fit into existing communication channels.

</div></div></div>

<figure class="breakout">
  <img class="mb-4 w-100 w-md-70" src="/img/blog/iterate-faster-with-truffle-teams/ens-plant-uml.png" alt="Plant UML diagram of an ENS transaction">
  <figcaption class="text-center font-italic">A test in which a user who isn't the owner of an ENS name attempt to change the resolver. Note the "X" shoing the revert.</figcaption>
</figure>

<div class="container container-post"><div class="row justify-content-center"><div class="col">

## Get Started with Truffle Teams

We want Truffle Teams to be the most effective DevOps tool in the blockchain space for both new and existing teams. Check out Truffle Teams today and let us know what you think about the new deployment views and contract manager, or if your team has other needs we haven’t met yet.

<div class="mt-3 mb-4 text-center">
  <a class="btn btn-truffle" href="https://my.truffleteams.com">SIGN UP FOR THE TRUFFLE TEAMS</a>
  <a class="btn btn-truffle" href="/docs/teams/quickstart">TRUFFLE TEAMS QUICKSTART</a>
</div>

Thanks!

_Josh Quintal, Head of Product & Marketing_
