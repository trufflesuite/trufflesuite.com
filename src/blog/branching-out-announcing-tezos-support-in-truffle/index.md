---
title: Branching Out - Announcing Tezos Support in Truffle
hide:
  - navigation
---

![Announcing Truffle Integration](/img/blog/branching-out-announcing-tezos-support-in-truffle/chameleon-t3-truffle-blog-header.png)

If you've been following Truffle's development, you'll notice that our tools already support a handful of exciting platforms: [Ethereum](https://ethereum.org/), [Quorum](https://www.goquorum.com/), [Axoni](https://axoni.com/technology/), Hyperledger [Fabric-EVM](https://github.com/hyperledger/fabric-chaincode-evm), Hyperledger [Sawtooth](https://www.hyperledger.org/projects/sawtooth), and Hyperledger [Burrow](https://www.hyperledger.org/projects/hyperledger-burrow). What's common amongst these chains is that they all use the Ethereum Virtual Machine under the hood. Ethereum is very near and dear to our hearts -- it's where we got our start, and where we are the most competent. But we're branching out, in large part due to market demand. In December we released a beta [Corda-flavored Ganache](/blog/unwrap-the-corda-flavored-ganache-beta) as part of our initial support for the [Corda platform](https://www.r3.com/corda-platform/). And today, we branch out even further.

**I'm excited to announce Tezos integration into the Truffle command line tool.**

Right now, at this very moment, you can [download a Tezos-specific version of Truffle](/docs/tezos/truffle/quickstart) and start building smart contracts on Tezos networks using the time-tested tooling you know and love. And if you're a Tezos native who got your start building on top of the Tezos platform, then this means professional-grade tooling has finally arrived.

We chose Tezos as our first non-EVM chain because of its blossoming developer community. In our position as tool builders, we go where the market takes us: If enough people ask for Tezos support, we listen. This market demand was coupled with an active and interested group of core developers, and a blockchain architecture that's similar to Ethereum. Ultimately, Tezos is "EVM-like". This makes it a great candidate for integration, fitting into Truffle like a glove.

Are you a developer who wants to build on top of Tezos using Truffle? [Check out our documentation](/docs/tezos/truffle/quickstart) and our [quick start guide](/docs/tezos/truffle/quickstart).

It's important to note that our integration with Tezos is experimental. As of now you'll need to download a special version of Truffle to start building on Tezos. This is by design: Integrating a new blockchain into a common workflow takes some work, and we want to ensure we keep the same level of quality for our existing chains while we work out the kinks. You can be extremely helpful here! If you run into an issue using the Tezos version of Truffle, let us know! You can file an issue at our [issue tracker](https://github.com/trufflesuite/truffle/issues).

Our plan over the coming months is to harden our Tezos integration and ultimately release it under the mainline version of Truffle. We’ve also expanded our commitment to the Tezos project by finalizing plans for further integrations: 1) a Tezos-flavored [Ganache](/ganache); and 2) full support for the [SmartPy](https://smartpy.io/) programming language.

Though this is our first foray into supporting non-EVM blockchains, I'd like to take this moment to reaffirm our support and interest in Ethereum and Ethereum-based blockchains. You'll see many more announcements in 2020 about how we're planning to make development on both Ethereum 1.0 and Ethereum 2.0 better. Stay tuned.

I'd like to thank some standout developers in the Tezos community for making this integration a reality. First, are the developers from [Stove Labs](https://stove-labs.com/), Matej Šima & Istvan Deak. They helped significantly in stress testing our integration and providing continuous feedback during development. I'd also like to thank [Taquito](https://tezostaquito.io/) developers Jev Björsell and Simon B.Robert for creating an easy to use library for communicating with and interacting with the Tezos blockchain (for Ethereum developers, this is the Web3.js equivalent). Last but not least, a big shout out to the developers of the [LIGO](https://ligolang.org/) programming language, Gabriel Alfour and the rest of the LIGO development team, for making LIGO compiler integration easy on us. Cheers to you!

We're excited to announce Tezos support as one of many integrations to come in 2020. Thank you for your continued support of our work, and the opportunity to make your development life easier. Happy coding!

Tim

-- Founder & CEO, Truffle Suite
