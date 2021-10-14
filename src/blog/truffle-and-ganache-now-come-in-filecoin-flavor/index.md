---
title: Truffle and Ganache now come in Filecoin Flavor
hide:
  - navigation
---

![Filecoin Collab Banner with Ganache](/img/blog/truffle-and-ganache-now-come-in-filecoin-flavor/blog-header.png)

[Filecoin](https://filecoin.io) was created by [Protocol Labs](https://protocol.ai), the same organization who created and maintains [IPFS](https://ipfs.io). Filecoin extends the IPFS vision by creating an open-source decentralized storage network that provides incentives to keep data stored and pinned on IPFS. Filecoin is powerful because it provides a decentralized storage solution without having to rely on larger centralized solutions. Additionally when it comes to building dapps on other decentralized networks, like Ethereum, it provides the groundwork for a much needed storage and authenticity solution to full decentralization.

## Truffle Preserve to Buckets

[Back in July](/blog/announcing-collaboration-with-filecoin), we announced a first look at using the `truffle preserve` command in an experimental release. Today, we are releasing `truffle preserve` as part of the main, stable version of Truffle! To use `truffle preserve`, simply specify the files you want to preserve on the command line, and choose between the `--filecoin`, `--ipfs`, or `--buckets` recipes. The `filecoin` recipe uses the `ipfs` recipe under the hood, but if you need to, you can choose to use the `ipfs` recipe without `filecoin`. You can learn more about `truffle preserve` in this [blog post](/blog/announcing-collaboration-with-filecoin).

In addition, we’re also introducing a new recipe for `truffle preserve` which allows developers to save data to [Textile Buckets](https://docs.textile.io/buckets/): `truffle preserve --buckets`.

![`truffle preserve --buckets` Example](/img/blog/truffle-and-ganache-now-come-in-filecoin-flavor/preserve-buckets.gif)

Try out any of these three recipes today by [downloading the latest version of Truffle](/docs/truffle/getting-started/installation)!

## Filecoin-flavored Ganache

Ganache has helped many developers create Ethereum dapps by providing a "one-click" experience; Ganache automates the difficult parts of running a decentralized network to give the developer a personal environment to tinker with and develop applications. It speeds up development by not having to wait for decentralized test networks to confirm transactions, and it provides a controlled, configurable environment to reproduce different test scenarios.

Prior to Ganache, if you wanted to run a development network for Filecoin you would need to run the [lotus-devnet](https://github.com/textileio/lotus-devnet), which requires compiling native resources or running a public Docker image. This is still a great resource to emulate the Filecoin network as close as possible as it includes a real [Lotus](https://docs.filecoin.io/get-started/lotus/) node, but Ganache now provides a lightweight alternative for getting started with Filecoin app development.

With the Filecoin flavor, Ganache now provides you both an IPFS server (used to store files) as well as a Lotus simulator (used to maintain file storage, simulate a storage provider, and availability) to add the necessary Filecoin methods to get started with Filecoin development. Like the Ethereum flavor of Ganache, we've made the process as simple as possible for you to get started with Filecoin quickly.

## What can I do with Filecoin-flavored Ganache?

With Filecoin-flavored Ganache, you can do most of the development tasks for building a Filecoin application:
- Store and retrieve files from a personal IPFS node that Ganache starts for you
- Create a storage deal and see it progress through different states
- Test how your application handles storage deal expiration
- Transfer Filecoin's token FIL between accounts
- Interact with the various Filecoin wallet methods

You can find a full list of supported RPC methods on [GitHub](https://github.com/trufflesuite/ganache-core/tree/develop/src/chains/filecoin/filecoin#supported-rpc-methods).

## How do I get started?

If you’re looking to get started with Ganache, head over to the [documentation](/docs/filecoin/ganache/overview) to see Get Started guides whether you're using the NodeJS library, CLI, or graphical UI version.

Need an example on how to build a Filecoin application? Check out the [Filecoin Truffle Box](https://github.com/truffle-box/filecoin-box) to see an example to mint NFTs and provide a decentralized art gallery application.

We’re finalizing the Truffle documentation in the coming days, so stay tuned for those! When they’re live, you’ll be able to find them at our [main documentation page](https://trufflesuite.com/docs) and click on the Filecoin link.

## Where can I get help?

We're extremely excited to be working with the Filecoin community to add support for Filecoin into Truffle Suite's tooling. If you have questions about our Filecoin integration or our plan for the future, join [Truffle’s Discord community](https://trfl.co/truffle-community) & the [Filecoin community Slack](https://filecoin.io/slack) to get your questions answered. We're happy to help!
