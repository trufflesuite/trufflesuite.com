---
title: We came, we saw, we Merged! What’s next for Ethereum and dapp developer experience at Truffle
hide:
  - navigation
---

**By Kingsley Arinze**

On the 15th of September 2022, The Merge - Ethereum’s upgrade from PoW to PoS, was successfully completed. This has led to the complete overhaul of Ethereum’s consensus mechanism, an incredibly great engineering accomplishment not just for the ecosystem, but for the world at large.

WIth this upgrade, Ethereum now runs on ~99.98% less electricity than it used to with PoW. To put this into perspective, that’s equivalent to a country like Finland shutting down its entire electricity grid in one night according to the [Ethereum energy consumption index](https://digiconomist.net/ethereum-energy-consumption). Also, based on the same report, the Merge is projected to reduce world electricity consumption by 0.2%, the decarbonization in the technology sector’s history that paves the way for all industries. 

This post is the fourth and final part of the Truffle Merge content series, where we discuss the Merge, its importance and how it impacts our suite of tools at Truffle. You can check out part 1, 2, and 3 below: 

[The Merge and what it means for Truffle](https://trufflesuite.com/blog/the-merge-and-what-it-means-for-truffle)

[Preparing for the Merge, hear from our Truffle engineers](https://trufflesuite.com/blog/preparing-for-the-merge-hear-from-our-truffle-engineers)

[How the Merge impact the application layer and developer experience](https://trufflesuite.com/blog/how-the-merge-impacts-the-application-layer-and-developer-experience)

## Immediate impact of the Merge

The most important impact of the Merge is Etheruem’s reduced energy consumption going forward. As stated earlier, Ethereum now requires ~99.98% less energy to run successfully, a huge reduction in its carbon footprint. As pointed out by Justin Drake, a member of the Ethereum core dev group in [this interview](https://www.coindesk.com/tech/2022/09/15/the-ethereum-merge-is-done-did-it-work), the Merge would result to ~0.2% reduction in world electricity consumption and while there’s been some [debates](https://www.coindesk.com/layer2/2022/09/19/did-the-ethereum-merge-drop-worldwide-electricity-consumption-by-02) about the validity of his statement, as former Ethereum PoW miners are moving to other PoW blockchain to continue mining blocks, the Merge sets an example for how technologies can become less harmful to our immediate environment. 

Another important impact the Merge will  have on Ethereum are the new validators it will onboard over the coming months and years. While PoW Ethereum requires extensive hardware with expensive chips to be a part of the validators network, PoS only requires validators to possess 32 ETH to be able to participate in the network.

Although the goal we’re working towards is to ensure  Ethereum is fully decentralized and no one organization or individual has a major stake in validating nodes, this isn’t the case yet. Shortly after the Merge, the founder of Gnosis Safe [took to Twitter to point out](https://twitter.com/koeppelmann/status/1570436882483523585?s=20&t=nhd4W81nd_mMZ9vDyPL5FQ) how ~50% of validation of the first 1000 blocks were controlled by two major players in Lido and Coinbase. This is the ongoing debate about client diversity that you can read about more on the ConsenSys blog. 

Another impact of the Merge is the reduction in the issuance of ETH, mostly due to a [burning mechanism](https://www.coindesk.com/layer2/2022/01/05/the-state-of-ethereums-fee-market) that was introduced by [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) which drastically reduced the amount of new ETH issued with every block. There are speculations that Ethereum would become deflationary, meaning that its token supply could decrease over time.

## What’s next for Ethereum

With the Merge complete, it is important to note that the future envisioned for Ethereum by the core team is still in process as there are other network upgrades coming. Upgrades that promise to make Ethereum more private, scalable, and secure.

In his talk during the last EthCC in Paris, Vitalik Buterin, outlined some of these upgrades as follows:

1. The Surge: Improve network scalability by introducing sharding, a technique used by database providers to limit the amount of data being stored at a specific location.

2. The Verge: Decrease node validation times by replacing Merkle trees with Verkle trees.

3. The Purge: Remove excess historical data, thereby reducing the network congestion and space requirement for validators.

4. The Splurge: Other “fun stuff” that would further improve the network.

If you’re interested in delving deeper into these future updates in greater detail, my colleagues wrote this [amazing blog](https://consensys.net/blog/news/the-merge-is-done-whats-next-for-the-ethereum-ecosystem) that does justice to the topic.

## What’s next for Truffle

At Truffle, our goal remains the same - onboard the next generation of dapp developers by improving the developer experience for builders in the Ethereum ecosystem through the  creation and maintenance of tools and resources that support all aspects of dapp development. 

We are excited for the success of the Merge and look forward to other upgrades coming to Ethereum in the coming months. We also remain committed to ensuring that Truffle users are carried along throughout this period, while also ensuring that the upgrades to Ethereum are as seamless as possible for our users.

In our [previous post](https://trufflesuite.com/blog/how-the-merge-impacts-the-application-layer-and-developer-experience), we highlighted some of the changes to the application layer you should be aware of since the Merge. Most notable is the deprecation of two popular testnets within the dapp developer ecosystem: Rinkeby and Ropsten as well the deprecation of the Kiln testnet, which was initially setup for testing the Ethereum network post-merge.

The future is truly decentralized and we’re happy to see the impact the Merge is having on tools around the ecosystem. Just last week, following the success of the Merge, [Infura](http://infura.io), the most reliable node provider in Web3, announced their plan to launch a decentralized infrastructure protocol early next year. 

This protocol, when launched, will enable diverse infrastructure operators to participate in node provision, thereby eliminating the concerns from the community about a single company being the major source of Ethereum node access.

You can learn more about the announcement in this [press release](https://consensys.net/blog/press-release/infura-announces-plan-to-foster-a-decentralized-infrastructure-ecosystem).

## Stay in touch with us

To stay up to date with the updates coming to Ethereum and how we are preparing for it at Truffle, subscribe to the Truffle newsletter by visiting our [website](https://trufflesuite.com) today. We also hold weekly live streamed sessions called **Web Unleashed**, where we build, interview folks, and discuss important developments around the ecosystem. Keep an eye on our Twitter for updates on the next session. You can also find past episodes on the [Truffle Youtube channel](https://www.youtube.com/c/TruffleSuite) and the [unleashed section](https://trufflesuite.com/unleashed) of our website if you prefer written materials.