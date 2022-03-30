---
title: Branching Out - Phase 2 of Corda-flavored Ganache

---

![Branching out to Corda-flavored Ganache](/img/blog/branching-out-phase-2-of-corda-flavored-ganache/chameleon-corda-truffle-blog-header.png)

April has been a big month for Truffle Suite! Earlier this month we branched out and announced Tezos integration into the Truffle command line tool. If you remember, back in December we released a beta [Corda-flavored Ganache](/blog/unwrap-the-corda-flavored-ganache-beta) as part of our initial support for the Corda platform. Today, we are excited to share [Phase 2 of Corda-flavored Ganache, v2.4.0](https://github.com/trufflesuite/ganache/releases) with you! Phase 2 includes more robust features for Corda including Corda CRaSH Shell, network map visualization, and a version picker.

We're thrilled to release Phase 2 of Ganache for Corda, an open source blockchain platform built for business applications, as this continues to lower the barrier to entry for Corda developers. These updates enable developers to easily set up a local network on their machines, letting them inspect the state of that network across various nodes and giving them visibility into transactions normally hidden by a live Corda network's privacy protections.

Features Include:

* One-click Corda network configuration and initialization, so you can focus on what matters most: your application.
* Multiple workspaces for all of your Corda projects including a Corda network map, notaries, nodes, transactions, accounts, and ledgers.
* Simple testing for interoperability with the Version Picker node.
* Easy access to all your application's data, including network map, notaries, nodes, transactions, and states.
* Visualizations of node connections with the Corda network map graph
* Embedded Corda CRaSH Shell to provide control over your nodes and project data

As always, this release is compatible with the latest versions of Windows ⊞, Mac OS 🍎, and Linux 🐧. You can now run and interact with a Corda network without installing prerequisites like Java, PostgreSQL, Corda binaries, docker, etc!

If you are a Corda developer who wants to use Ganache with your CorDapp [check out our documentation and our quick start guide](/docs/ganache/corda/working-with-corda). We are also hosting a [joint webinar with R3](https://www.crowdcast.io/e/corda-ganache) on May 6th to demonstrate these features along with how this fits into existing Corda developer’s’ workflow.

In closing, I’d like to thank our partners at R3, Todd McDonald, Lisa Chiong, Tiffany Sarmiento, Chris Chabot, and Nick Rogers for their collaboration, vision, and teamwork. I’d also like to thank [David Murdoch and Nick Paterno](/staff) from the Truffle team for their tireless efforts to make Corda Flavored Ganache a reality.

Thank you for your continued support and the opportunity to make your development life easier. Happy coding!

Tim

-- Founder & CEO, Truffle Suite