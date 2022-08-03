---
title: Preparing for the Merge, hear from our Truffle engineers 
hide:
  - navigation
---

![preparing for the merge - banner](./the-merge-update.png)

**By [Kingsley Arinze](https://twitter.com/heydamali)**

In a previous [blog post](https://trufflesuite.com/blog/the-merge-and-what-it-means-for-truffle), we discussed the Merge in detail, including how it upgrades Ethereum as we know it today. Check out the post to better understand and prepare for the Merge.

Here, we expand on what the Merge means for us at Truffle and what we're doing to prepare for it. We spoke with our resident L2 experts, [Kevin Weaver](https://twitter.com/kevin_weaver), Senior Blockchain Engineer, and [Faina Shalts](https://twitter.com/bitsplaining), Lead Blockchain Engineer, and our Lead Blockchain Engineer [David Murdoch](https://twitter.com/atdavidmurdoch), who leads the Ganache team at Truffle.

## ​​What is the Merge and how does it change Ethereum?

**Kevin Weaver, Senior Blockchain Engineer, Truffle:**

“*Since December 2020, the Ethereum network has encompassed two blockchains running in parallel: the original Proof-of-Work chain, and a new “beacon chain” utilizing a Proof-of-Stake consensus mechanism. The Merge will be the moment these blockchains converge, combining the full history and functionality of the PoW chain with the cleaner, more efficient security of the PoS chain. After the Merge, Ethereum will no longer require burning massive amounts of energy to secure the network, thus reducing its total electrical consumption by about 99.95%.* 

*Given the majority of new ETH issued by the network goes toward paying miners’ electrical bills, this drop in consumption allows for a similarly massive drop in the new issuance of ETH. The combination of this reduction and the fee burning mechanism introduced by [EIP 1559](https://consensys.net/blog/quorum/what-is-eip-1559-how-will-it-change-ethereum), the result will push ETH into becoming a deflationary asset. Importantly, this change is not being made for reasons of political or monetary idealism, but because the network simply no longer requires subsidizing its security with excessive monetary issuance.”*

## Is there a set date for the Merge to happen?

**Kevin Weaver, Senior Blockchain Engineer, Truffle:**

*“The tentative date for the Merge is sometime during the week of Sept. 19, 2022. However, this date is subject to change based on the outcome of the Goerli testnet merge.”*

## What do Truffle users need to know/do ahead of the Merge?

**David Murdoch, Lead Blockchain Engineer, Truffle:**

*“They probably don't need to do anything unless they run a node and/or validator. Everything will continue to work at the dApp layer as it does now. There are some changes, but 99.99% of use cases won't care or notice.”* 

**Kevin Weaver, Senior Blockchain Engineer, Truffle:**

*“Trufflers do not need to take any actions to prepare for the Merge. The switch to PoS will involve changes at the level of the consensus mechanism, which underpins the application layer, but not on the application layer itself.”*

## What changes should users expect from Ganache?

David on possible upgrades to the Ganache local Ethereum simulator:

*“We will need to add a few new block tags. We currently use `"latest"`, `"earliest"`, and `"pending"`. We may add `"safe"`, `"finalized"`, and probably `"unsafe"` to this list, though we aren't yet sure of the significance these will have outside of forking. The `difficulty` field and OPCODE will change, as well as a few other small changes to block headers. Almost everything else will be internal changes, most of which will be in the EVM layer. Some advanced users may care about changes to some OPCODEs, but those users will be few and far between.”*

## How does the Merge affect Layer 2s? 

**Faina Shalts, Lead Blockchain Engineer, Truffle:**

*“Layer 2 protocols should work pretty seamlessly after the Merge. We are keeping an eye on developments in this area and are ready to make any necessary changes to Truffle as things progress.”*

**Kevin Weaver, Senior Blockchain Engineer, Truffle:**

*“Similarly, since Layer 2 networks interface with Ethereum at the application layer, the Merge will not result in changes for Truffle engineers building on L2s.”*

## Onward to the Merge

We are excited for the Merge and  wanted to hear why our engineers are, too. Here’s what they had to say:

**Kevin Weaver, Senior Blockchain Engineer, Truffle:**

*“The complexity of the upgrade combined with the distributed nature of the core developer teams and a huge efficiency improvement will make the Merge an achievement of engineering different from anything before it. If Ethereum is truly a tool for building human coordination tools, then its first objective should be to do no harm to our habitat. By switching to a cleaner, greener consensus mechanism, Ethereum will become 99.95% more efficient in this mission. I believe the Merge will therefore result in a phase shift toward more positive narratives of NFTs, DeFi, DAOs, web3 and crypto at large”*

**Faina Shalts, Lead Blockchain Engineer, Truffle:**

*“The Merge is a really exciting step toward the sustainability and scalability of the Ethereum ecosystem. I love that we work in an industry that values these goals! I can't wait to see the post-Merge world and see the innovative protocols that it leads to.”* 

**David Murdoch, Lead Blockchain Engineer, Truffle:**

*“Getting the whole ecosystem to focus on anything else* 🙂” 

As the Merge draws closer and closer, we plan to keep our users updated with the latest information, especially any updates on our suite of tools for builders. We hope these answers from some of the engineers at Truffle are able to provide some more clarity as to what we are doing in preparation for the Merge.

Visit the [Truffle website](https://trufflesuite.com) today to learn more about our suite of developer tools. If you have questions that you would like our team members to answer concerning the merge and how it impacts our products, feel free to start a discussion on our [Github Discussions channel](https://github.com/orgs/trufflesuite/discussions). Don't forget to follow us on [Twitter](https://twitter.com/trufflesuite) for live announcements and updates.

## Here are a few more resources on the Merge:

[Infura weekly workshops](https://blog.infura.io/post/how-to-stay-informed-about-the-merge-with-infura)  
[The Merge and what it means for Truffle](https://trufflesuite.com/blog/the-merge-and-what-it-means-for-truffle)  
[The Merge knowledge base](https://consensys.net/knowledge-base/the-merge)  
[The Latest Release of Hyperledger Besu Helps Test The Merge On Any Platform](https://consensys.net/blog/news/the-latest-release-of-besu-helps-test-the-merge-on-any-platform)  
[The Ethereum Community Needs You To Test The Merge](https://consensys.net/blog/news/the-ethereum-community-needs-you-to-test-the-merge)  