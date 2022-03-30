---
title: Truffle and Infura Now Support Polygon

---

![Truffle, Infura, and Polygon Collab Image](/img/blog/truffle-and-infura-support-polygon/blog-header.png)

The developer demand for scaling solutions that work directly with Ethereum is here and growing, so today we are very excited to launch the new Polygon Truffle Box. Ethereum-based dapp development is rapidly entering a new phase wherein a multi-network future is certain and Layer 2 solutions like Polygon's are leading the charge into this uncharted territory. Layer 2 scaling is essential to the health of the Ethereum ecosystem, and the Truffle team is delighted to support the Polygon PoS chain in helping developers build toward this future.

## Polygon PoS Chain

Polygon PoS is a hybrid Plasma Proof-of-Stake sidechain to the Ethereum mainnet which consists of a Tendermint consensus validator layer and a Plasma sidechain for block production. This configuration allows for higher transaction throughput, lower gas fees, and through Polygon's established bridges, easy connection back to the Ethereum mainnet.

## Introducing the Polygon Truffle Box

The core component of this new tooling is the [Truffle Polygon Box](https://github.com/truffle-box/polygon-box). This new Truffle box provides you with the boilerplate structure necessary to start coding for Polygon's Ethereum L2 solution, the Polygon PoS chain (previously the Matic PoS chain). For detailed information on how the Polygon PoS chain works, please see their documentation [here](https://docs.matic.network/docs/develop/getting-started).

We provide the initial building blocks needed to get to work on Polygon PoS without pushing developers to write any particular sort of application. With this box, you will be able to compile, migrate, and test Solidity code against several instances of Polygon PoS networks.

Polygon's L2 solution is fully compatible with the EVM. This means you will not need a new compiler to deploy Solidity contracts, and should be able to add your own Solidity contracts to this project. The main difference developers will encounter is in accessing and interacting with the Polygon PoS network. Additionally, Polygon offers multiple ways for dapp developers to implement communication between Ethereum ("Layer 1") and the Polygon PoS chain. Further information about how to enable Ethereum-Polygon communication can be found in the Polygon documentation [here](https://docs.matic.network/docs/develop/ethereum-matic/getting-started).

_A quick note about naming: The Polygon ecosystem was previously called Matic Network. The chain to which we'll be deploying in the Polygon Truffle Box is now called the Polygon PoS chain. We have named this box the Polygon Box because we expect to include the ability to deploy to future Polygon chains in addition to what is presented in the initial Polygon Box, and developers using this Box may find themselves incorporating additional aspects of the Polygon ecosystem in their work._

## Integration With Infura

Our colleagues at Infura are also adding full API support for the Polygon network. Infura users can now add the free Polygon Network add-on directly in their Infura dashboard. The Polygon network API largely utilizes the same JSON RPC specification as Ethereum and Infura will support all the necessary API methods for building a fully functional application on the Polygon network. For more information on the full support check out the [complete documentation](https://infura.io/docs/ethereum#section/Network-Add-Ons/Polygon-PoS?&utm_source=infurablog&utm_medium=referral&utm_campaign=announcement&utm_content=polygon-launch).

Infura endpoints for the Polygon PoS chain are included in the configuration of the Polygon Truffle Box, to aid developers in getting fully acquainted with their options when developing for the Polygon PoS chain.

## Where to Get Help

You can find all of the documentation for the Truffle Polygon box [here](https://github.com/truffle-box/polygon-box). If you have any questions, feedback, or just want to chat, reach out to us through the resources on our [community page](/community).

We are very excited to add Polygon PoS to our development suite and we can't wait to see all of the amazing applications built with these tools. Stay tuned as we continue to add more networks, features, and products that accelerate and simplify development on this exciting new technology.
