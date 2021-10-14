---
title: Truffle and Infura Now Support Optimism
hide:
  - navigation
---

![Truffle, Optimism Collab Image](/img/blog/truffle-and-infura-support-optimism/blog-header.png)

Developer demand for scalable Ethereum application development tooling continues to grow. The multi-network Ethereum ecosystem is here, and Layer 2 solutions such as Optimistic Ethereum are leading the way. The Truffle team is delighted to support Optimistic Ethereum in helping developers build for this ecosystem. Today we are announcing the launch of the new Truffle Optimism Box.

## Optimistic Ethereum

Optimistic Ethereum is a Layer 2 scaling protocol for Ethereum applications. It is an application inside of Ethereum that executes transactions more efficiently than Ethereum itself, based on the concept of an [Optimistic Rollup](https://medium.com/plasma-group/ethereum-smart-contracts-in-l2-optimistic-rollup-2c1cef2ec537). The Optimistic Ethereum security model is backed by a system of “fraud proofs” that allow users to identify bad transaction results to support the accuracy of the data that is eventually rolled up and published to the main Ethereum chain. Transactions on Optimistic Ethereum are handled similarly to those on the Ethereum mainnet, and bridging between Optimistic Ethereum and mainnet Ethereum allows users to conduct gas-intensive operations on Optimistic Ethereum for a fraction of the cost.

Optimistic Ethereum tracks closely to the structure and operation of the Ethereum mainnet, preserving security guarantees while increasing throughput and decreasing transaction costs. Important to note, this protocol requires a delay for bridging funds from Optimism back to Ethereum, and you can find more information about that [here](https://community.optimism.io/docs/developers/bridging.html#understanding-the-fraud-proof-window).

Existing Solidity smart contracts can run on Optimistic Ethereum with minimal differences. Off-chain code such as user interfaces and wallets will need to update their RPC endpoints to interact with Optimistic Ethereum, and will largely just work once the update is made.

For detailed documentation on the Optimistic Ethereum protocol, see [here](https://community.optimism.io/docs/protocol/protocol.html#introduction) and [here](https://community.optimism.io/docs/developers/integration.html).

## Introducing the Truffle Optimism Box

The [Truffle Optimism Box](https://github.com/truffle-box/optimism-box) provides developers with the boilerplate structure necessary to start coding for Optimism’s Ethereum Layer 2 solution.

We provide the initial building blocks to get to work on Optimistic Ethereum without pushing developers to write any particular sort of application. With this box, you will be able to compile, migrate, and test Solidity code against several instances of Optimistic Ethereum networks.

Optimism’s Layer 2 solution is almost fully compatible with the EVM, though it uses an “optimistic” EVM called the OVM. The main difference between the EVM and the OVM that developers will notice is that some opcodes are not available for contracts that are deployed to the OVM. The Truffle Optimism Box is complete with the Optimistic `solc` compiler already referenced in the `truffle-config.ovm.js` file. You can see a complete list of differences between Optimism’s fork of the `solc` compiler and the original [here](https://github.com/ethereum-optimism/solidity/compare/27d51765c0623c9f6aef7c00214e9fe705c331b1...develop-0.6).

## Integration With Infura

Our colleagues at Infura are also adding full API support for the Optimistic Ethereum network. Infura users can now add the free Optimism add-on directly in their Infura dashboard. The Optimism network API largely uses the same JSON RPC specification as Ethereum and Infura will support all the necessary API methods for building a fully functional application on the Optimistic Ethereum network. For more information on the full support check out the [complete documentation](https://infura.io/docs/ethereum#section/Network-Add-Ons/).

Infura endpoints for the Optimistic Ethereum chain are included in the configuration of the Optimism Truffle Box, to aid developers in getting fully acquainted with their options when developing for the Optimistic Ethereum chain.

## Where to Get Help

You can find all of the documentation for the Truffle Optimism Box [here](https://github.com/truffle-box/optimism-box). If you have any questions, feedback, or just want to chat, reach out to us through the resources on our [community page](https://www.trufflesuite.com/community).

We are thrilled to add Optimistic Ethereum to the Truffle development suite and can’t wait to see the universe of applications built on Layer 2. Stay tuned as we continue to add more networks, features, and tools that accelerate and simplify development on a secure and scalable Ethereum.
