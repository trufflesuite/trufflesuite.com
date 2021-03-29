![Filecoin Collab Banner with Ganache](/img/blog/ganache-now-comes-with-the-filecoin-flavor/blog-header.png)

We [teased a Filecoin flavor for Ganache back in July](/blog/announcing-collaboration-with-filecoin#filecoin-flavored-ganache-simulate-filecoin-summer-fall-winter-), and we're excited to announce that it has been released!

The Filecoin flavor comes with all versions of Ganache: the NodeJS library, Ganache CLI, and Ganache UI. Head over to our [documentation](/docs/filecoin/ganache/overview) to see how to get started!

## What is Filecoin?

[Filecoin](https://filecoin.io/) is created by [Protocol Labs](https://protocol.ai/), the same organization who created and maintains [IPFS](https://ipfs.io/). Filecoin extends the IPFS vision by creating an open-source decentralized storage network that provides incentives to keep data stored and pinned on IPFS. Filecoin includes storage markets where entities that want to store data can find others that are looking to store said data. Filecoin also will provide retrieval markets to allow someone to pay for reliable retrieval of stored data<!-- TODO: is this statement true? I don't believe retrieval markets exist today-->. In addition to all of that, Filecoin provides the necessary processes and protocols to be able to facilitate these transactions, including, but not limited to, methods where storage miners can prove to clients that the data is being stored and maintained per the agreed-upon storage deal without having explicit retrieval deals (a.k.a Proof-of-Spacetime or PoST).

Filecoin is powerful on its own, providing a decentralized storage solution without having to rely on larger centralized solutions. However when it comes to dapps powered by other decentralized networks, it provides the groundwork for a much needed solution to fully decentralize dapps. Currently many dapps store their state on a blockchain, but they still commonly use centralized storage solutions to store website assets. You can use IPFS to mitigate this, but without running your own IPFS nodes where you can guarantee files are pinned and readily accessible, retrieving files from IPFS can be slow and unreliable. Filecoin provides incentives to keep data stored robustly and reliably.

## How does Filecoin-flavored Ganache help?

Ganache has helped many developers create Ethereum dapps by providing a "one-click" experience; Ganache automates the difficult parts of running a decentralized network to give the developer a personal environment to tinker with and develop applications. It speeds up development by not having to wait for decentralized test networks to confirm transactions, and it provides a controlled, configurable environment to reproduce different test scenarios.

Prior to Ganache, if you wanted to run a development network for Filecoin you would need to run the [lotus-devnet](https://github.com/textileio/lotus-devnet), which requires compiling native resources or running a public Docker image. This is still a great resource to emulate the Filecoin network as close as possible as it includes a real [Lotus](https://docs.filecoin.io/get-started/lotus/) node, but Ganache now provides a lightweight alternative for getting started with Filecoin app development.

With the Filecoin flavor, Ganache now provides you both an IPFS server (used to store files) as well as a Lotus simulator (used to maintain file storage, pinning, and availability) to add the necessary Filecoin methods to get started with Filecoin development. Like the Ethereum flavor of Ganache, we've made the process as simple as possible for you to get started with Filecoin quickly.

## What can I do with Filecoin-flavored Ganache?

With Filecoin-flavored Ganache, you can do most of the development tasks for building a Filecoin application:
- Store and retrieve files from a personal IPFS node that Ganache starts for you
- Create a storage deal and see it progress through different states
- Test how your application handles storage deal expiration
- Transfer Filecoin's token FIL between accounts
- Interact with the various Filecoin wallet methods

<!-- TODO: change the branch for this link once the Filecoin PR has been merged (ideally should target `master`) -->
You can find a full list of supported RPC methods on [GitHub](https://github.com/trufflesuite/ganache-core/tree/filecoin/src/chains/filecoin/filecoin#supported-rpc-methods).

## How do I get started?

Head over to the [documentation](/docs/filecoin/ganache/overview) to see Get Started guides whether you're using the NodeJS library, CLI, or graphical UI version of Ganache.

Need an example on how to build a Filecoin application? Check out the [Filecoin Truffle Box](https://github.com/truffle-box/filecoin-box) to see an example to mint NFTs and provide a decentralized art gallery application.

## Where can I get help?

We're extremely excited to be working with the Filecoin team to add support for Filecoin into Truffle's tooling. If you have questions about our Filecoin integration or our plan for the future, join our Discord community and get your questions answered. We're happy to help!

http://trfl.co/truffle-community
