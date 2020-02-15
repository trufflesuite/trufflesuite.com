![Truffle Teams Deployments Banner](/img/blog/unwrap-the-corda-flavored-ganache-beta/corda-ganache-beta-blog-banner.png)

If you've been following Truffle's development, you'll notice that our tools already support a handful of exciting platorms: [Ethereum](#), [Quorum](#), [Axoni](#), Hyperledger [Fabric-EVM](#), Hyperledger [Sawtooth](#) & [Burrow](#), and [GoChain](#) to name a few. What's common amongst these chains is that they're all based on the Ethereum Virtual Machine. As you might expect, Ethereum and its virtual machine are very near and dear to our hearts -- it's where we got our start, and where we're the most competant. So today I'd like to announce something new, the first step on a path toward Truffle's longer term strategy: **Tezos**. 

**I'm excited to announce we've added experimental Tezos integration into the Truffle command line tool.** This means that right now, at this very moment, you can [download a Tezos-specific version of Truffle](#) and start building smart contracts on Tezos networks using the time-tested tooling you already know and love. And if you're a Tezos native who got _your_ start building on top of the Tezos platform, then this means professional-grade tooling has finally arrived. 

We chose Tezos as our first non-EVM chain because of its blossoming developer community. In our position as tools builders, we go where the market takes us: If enough people ask for Tezos support, we listen. This market demand was coupled with an active and interested group of core developers, and a blockchain architecture that's similar to Ethereum. Ultimately, Tezos is "EVM-like". This makes it a great candidate for integration, fitting into Truffle like a glove. 

Are you a developer who wants to build on top of Tezos using Truffle? [Check out our documentation](#) and our [quick start guide](#).

It's important to note that our integration with Tezos is experimental. As of now you'll need to download a special version of Truffle to start building on Tezos. This is by design: Integrating a new blockchain into a common workflow takes some work, and we want to ensure we keep the same level of quality for our existing chains while we work out the kinks. You can be extremely helpful here! If you run into an issue using the Tezos version of Truffle, let us know! You can file an issue at our [issue tracker](#), or reach out to us on [Spectrum](#).

Our plan over the coming months is to harden our Tezos integration and ultimately release it under the mainline version of Truffle. We're also working with the Tezos Foundation to explore further inegrations, like a Tezos-flavored-Ganache. If this is something you'd like to see, to speed up your development process and make your tests run blazing fast, please reach out to them and let them know! 

Though this is our first foray into supporting non-EVM blockchains, I'd like to take this moment to reaffirm our support and interest in Ethereum and Ethereum-based blockchains. You'll see many more announcements in 2020 about how we're planning to make development on both Ethereum 1.0 and Ethereum 2.0 better. Stay tuned.

I'd like to thank some standout developers in the Tezos community for making this integration a reality. First is the developers from [Stove Labs](#), Matej Šima & Istvan Deak. They helped significantly in stress testing our integration and providing continuous feedback during development. I'd also like to thank [Taquito](#) developers Jev Björsell and Simon B.Robert for creating an easy to use library for communicating with and interacting with the Tezos blockchain (for Ethereum developers, this is the Web3.js equivalent). Last but not least, big shout out to the developers of the LIGO programming language, Gabriel Alfour and the rest of the LIGO development team, for making LIGO compiler integration easy on us. Cheers to you! 

We're excited to announce Tezos support as one of many integrations to come in 2020. Thank you for your continued support of our work, and the opportunity to make your development life easier. Happy coding!

Tim
