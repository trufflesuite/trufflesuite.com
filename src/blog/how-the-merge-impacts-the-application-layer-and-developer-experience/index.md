---
title: How the merge impacts the application layer and developer experience
hide:
  - navigation
---

**By Kingsley Arinze**

The Merge is scheduled to happen between the 13th and 15th of September and once complete, Ethereum would no longer run on PoW, but a PoS consensus mechanism that promises to reduce its carbon footprint by 99.95%.

This blog is the third part of a 3-part Truffle series on the Ethereum Merge, where we explain its impact on our suite of tools. If you haven’t already, please checkout the previous post as they provide more context on the topic of the Merge

1. [The Merge and what it means for Truffle](https://trufflesuite.com/blog/the-merge-and-what-it-means-for-truffle)
2. [Preparing for the Merge, hear from our Truffle engineers](https://trufflesuite.com/blog/preparing-for-the-merge-hear-from-our-truffle-engineers)

While in the previous blogs we touched on what the Merge means for Truffle, what steps we are taking to prepare, and how if affects our suite of tools and users, in this blog our focus is on the changes PoS  brings to Ethereum’s application layer and developer experience by exploring opcode changes, testnets, and how Truffle users can have a seamless transition.

## Opcode changes

Smart contract developers usually rely on the 0x44 opcode, known as **DIFFICULTY** for obtaining some form of randomness in their smart contracts, which makes sense as this field returns the block difficulty in the PoW Ethereum. 

With the switch to PoS, this field would no longer return anything meaningful as there is no concept of block difficulty in PoS. In order to provide some form of backward compatibility and prevent smart contracts that use `block.difficulty` from breaking, the value returned by the **DIFFICULTY** opcode will be replaced with the pseudo-random value generated as part of the Beacon Chain and would be renamed **PREVRANDAO**.

It should be noted that although this new **PREVRANDO** value is considered as a source of randomness output of a higher strength than the output provided by the DIFFICULTY opcode in the PoW network, it is still not a true source of randomness the same way `block.difficulty` is not and should be used with care while adhering to the instructions outlined in the [EIP under security considerations](https://eips.ethereum.org/EIPS/eip-4399#security-considerations).

## Testnets

If you’ve been a part of the Ethereum ecosystem long enough, you’ve noticed that with significant changes to the network like the Merge comes changes to testnets. If you’re interested in understanding the journey so far and how the testnet landscape has changed over the years, check out this blog on [The history of the Ethereum testnets](https://consensys.net/blog/news/the-history-of-ethereum-testnets).

So far, we’ve seen the deprecation of two popular testnets within the dapp developer ecosystem: Rinkeby and Ropsten. We’ve also seen the deprecation of the Kiln testnet, which was initially setup for testing the Ethereum network post-merge. 

Although these networks have been deprecated and developers are advised not to use them moving forward, they are still up and running to allow enough time for users to transition, with the timelines for their complete shut down outlined [here](https://blog.ethereum.org/2022/06/21/testnet-deprecation)

With Rinkeby, Ropsten, and Kiln deprecated, it frees up capacity and time for client developers to focus and provide long-term support for the two long-lived  testnets going forward, Goerli and Sepolia. 

Dapp developers can access these testnets during development via [Truffle Ganache](https://github.com/trufflesuite/ganache#startup-options), including the ability to fork them. These networks are also fully supported by [Infura](https://infura.io), the leading Ethereum node provider, so please check out their [documentation](https://docs.infura.io/infura) to better understand how it works.

## Seamless transition to PoS

Since the start of the Merge, one goal  that has remained constant for Truffle from a developer perspective is how seamless the transition from PoW to PoS is going to be. The Merge is designed to have very little impact on existing applications and developer tools by supporting backward compatibility as much as possible.

At Truffle, we’re excited about a PoS future for Ethereum and cannot  wait for its full actualization, as well as the further performance and scalability improvements it sets the foundation for. You can hear directly from our engineers on [what the Merge means for us and how we’ve prepared for it](https://trufflesuite.com/blog/preparing-for-the-merge-hear-from-our-truffle-engineers).

## Ready. Set. Merge! 

As you can see, the Merge does impact the Ethereum application layer, even though in a minimal way. It introduces some opcode changes that dapp developers should be aware of when building on a PoS blockchain. It also introduces some changes to the developer tooling, most notable is the deprecation of popular testnets Rinkeby and Ropsten and the introduction of the new testnet Sepolia.

To stay up to date with the Merge and how we are preparing for it at Truffle, subscribe to the Truffle newsletter by visiting our [website](https://trufflesuite.com) today. We also hold monthly live streamed sessions called, Web Unleashed, where we build, interview folks, and discuss important developments around the ecosystem. Keep an eye on our Twitter for updates on the next session. You can also find past episodes on the [Truffle Youtube channel](https://www.youtube.com/c/TruffleSuite) on the [unleashed section](https://trufflesuite.com/unleashed) of our website if you prefer written materials.
