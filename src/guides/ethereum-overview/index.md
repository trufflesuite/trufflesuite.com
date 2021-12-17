---
title: Ethereum Overview
hide:
  - navigation
---

You may have heard the terms "blockchain" and "smart contract" floating around, but what do they actually mean? In this tutorial, we'll demystify the jargon, show you practical blockchain solutions, and give you direction on how to create an application that takes advantage of the blockchain.

This is a high-level overview covering:

**Blockchain basics**

- Why use a blockchain?
- What is a blockchain?
- How a blockchain works

**The Ethereum blockchain**

- What is Ethereum?
- What is a smart contract?
- Ethereum networks
- Distributed applications (dapps)

## Why use a blockchain?

Blockchains are used when multiple parties, perhaps located across the world, need to share data and transfer value without trusting each other.

The financial world describes this trust as the **counterparty risk**: the risk that the other party won't hold up their end of the bargain. Blockchains completely remove the counterparty risk through a revolutionary system of mathematics, cryptography, and peer-to-peer networking.

Before we go into those details, let's first look at some history and how the need for blockchains arose.

### The first databases

In the 1960's the first computerized databases emerged. With hardware occupying multiple rooms and the Internet decades away, data naturally existed in central, physical locations. This is a **centralized** approach, meaning the location and accessing of data is controlled by a central authority.

Centralized systems can be manipulated, from inside or outside, so we have to trust the owners of these systems to have sufficient will and resources to keep their data secure and with integrity. Centralized databases are still the most common today, powering most of our online and offline applications.

A self-hosted blog is a common example of a centralized database. The owner could potentially edit posts in hindsight or censor users without recourse. Alternately, a hacker could infiltrate the server and commit malicious acts. If there is no database backup, reversing the damage might be impossible.

![Centralized Database](/img/tutorials/ethereum-overview/db-server.png "Graphically represented, each arrow crossing a boundary of the main server box is a connection which requires trust")

### The need to share data

Sharing large amounts of data can be expensive and cumbersome. We can ease this burden by distributing data across multiple parties. Reading and writing are controlled by one or more parties within the group and therefore subject to similar corruptions as centralized databases.

Modern shared databases use techniques to minimize this corruption. Some of these overlap with blockchains. Depending on the shared database system, it may feature:

- **Immutability**: Rather than overwriting old data, a new copy is created with the old data retained as a historical record. This record can be accessed to prove a piece of data existed at a certain time.
- **Consensus**: For a database to be shared, all parties must agree on its contents. There are various methods of reaching consensus, two of which, **proof-of-work** and **proof-of-stake** will be discussed below.

Blockchains use these and take them a step further, solving the problem of trust.

## What is a blockchain?

Fundamentally, **a blockchain is a shared database**, consisting of a ledger of transactions. Much like a bank, the ledgers of simple blockchains keep track of currency (in this case, cryptocurrency) ownership. Unlike a centralized bank, everyone has a copy of the ledger and can verify each other's accounts. Each connected device with a copy of the ledger is called a "node".

Blockchains eliminate the problem of trust that affect other databases in the following ways:

- **Full decentralization**: Reading/writing to the database is completely decentralized and secure. No single person or group controls a blockchain.
- **Extreme fault tolerance**: Fault tolerance is the ability of a system to handle corrupt data. While fault tolerance is not unique to blockchains, it takes the concept to its logical extreme by having _every_ account sharing the database validate its changes.
- **Independent verification**: Transactions can be verified by anyone, without a third party. This is sometimes referred to as "disintermediation".

## How a blockchain works

Now that we have some idea of why blockchains are useful, let's dive deeper into how they work.

Interactions between accounts in a blockchain network are called "transactions". They can be monetary transactions, such as sending **ether, the cryptocurrency used in Ethereum**. They could also be transmissions of data, such as a comment or user name. A bundle of transactions is called a "block".

Every account on the blockchain has a unique signature, which lets everyone know which account initiated the transaction. On a public blockchain, anyone can read or write data. Reading data is free, but writing to the public blockchain is not. This cost is priced in ether and referred to as "gas", helps discourage spam and pays to secure the network.

### Consensus Mechanism

A blockchain establishes network state without relying on a central authority using what is known as a "consensus mechanism" or "consensus algorithm". Several different consensus mechanisms exist, but in each case, financial incentives are used to align the interests of network participants, establish network state, and secure the network.

### PoW Mining

In a "proof of work" consensus mechanism (often referred to as PoW), "miners" burn electricity to prove that they have something to lose if they attempt to cheat the network and introduce fraudulent transactions. Any node on a PoW network can take part in securing the network through a process called "mining". Nodes which have opted to be miners compete to solve math problems which secure the contents of a block.

Since mining requires computing power (not to mention electricity cost), miners must be compensated for their service. The winner of the competition receives some cryptocurrency as a reward. This incentivizes nodes to work to secure the network, preventing too much power from being in the hands of any single miner.

Check out [ethereum.org](https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/) to learn more about proof of work.

### PoS Staking

In a "proof of stake" consensus mechanism (often referred to as PoS), "stakers" or "validators" lock up cryptocurrency to prove that they have something to lose if they attempt to cheat the network and introduce fraudulent transactions. Any node on a PoS network can take part in the process of staking to secure the network and earn rewards in exchange for this service.

Since staking requires very minimal computing power, it is seen as a more environmentally friendly alternative.

Check out [ethereum.org](https://ethereum.org/en/learn/#proof-of-work-and-mining) to learn more about proof of stake.

### Ethereum's Consensus Mechanism

While Ethereum was built with a proof of work consensus mechanism, it is currently in the middle of a multi-phased transition toward proof of stake (more on this below).

### Hashing

Once a new block is mined, the other miners are notified and begin verifying and adding this new block to their copies of the chain. This is done through cryptographic hashing (or simply, "hashing"). Hashing is a one-way process which takes in data and gives back a fixed-length string representing that data.

While the original data can't be reproduced from its hash, the same data will always produce the same hash. Therefore, unverified data can be hashed with the same function and compared to the original. If they are identical, the data is validated.

Once more than half of the miners have validated the new block, the network has "reached consensus" and the block becomes part of the blockchain permanent history. Now this data can be downloaded by all nodes, with its validity assured.

Here's the whole process visually:

![Mining Step 1](/img/tutorials/ethereum-overview/chain-step1.png "1. Bob attempts to send Alice 1 ETH")

![Mining Step 2](/img/tutorials/ethereum-overview/chain-step2.png "2. Bob and Alice's transaction is combined with other transactions that have occurred since the last block")

![Mining Step 3](/img/tutorials/ethereum-overview/chain-step3.png "3. Miners compete to validate the block with the new set of transactions")

![Mining Step 4](/img/tutorials/ethereum-overview/chain-step4.png "4. The victorious miner creates a new block and receives a reward")

![Mining Step 5](/img/tutorials/ethereum-overview/chain-step5.png "5. With the transaction validated, Alice receives 1 ETH")

### What is Ethereum?

**Ethereum is a blockchain that allows you to run programs in its trusted environment.** This contrasts with the Bitcoin blockchain, which only allows you to manage cryptocurrency.

In computer science terms, Ethereum is a "Turing complete", virtual machine. Simply put, Ethereum is an internet-based computer - A single symbolic computer that runs on thousands of physical computers. This virtual computer is called the Ethereum Virtual Machine (EVM). The EVM allows code to be verified and executed on the blockchain, providing guarantees it will be run the same way on everyone's machine. This code is contained in "smart contracts" (more on these below).

Beyond just tracking account balances, Ethereum maintains the state of the EVM, allowing developers to program Ethereum to build any application that they could with a traditional computer. However, these blockchain-based applications can leverage all of the benefits of the trust and digital asset scarcity afforded by the blockchain.

Check out [ethereum.org](https://ethereum.org/en/learn/#how-ethereum-works) to learn more about what Ethereum is.

### What is a smart contract?

**A smart contract is code that runs on the EVM.** Smart contracts can accept and store ether, data, or a combination of both. Then, using the logic programmed into the contract, it can distribute that ether to other accounts or even other smart contracts.

Here's a smart contract example with Bob and Alice again. Alice wants to hire Bob to build her a patio, and they are using an escrow contract (a place to store money until a condition is fulfilled) to store their ether before the final transaction.

![Smart Contract Step 1](/img/tutorials/ethereum-overview/smart-contract-step1.png "1. Alice agrees to store her payment for the patio within the escrow contract, and Bob agrees to deposit an equal amount")

![Smart Contract Step 2](/img/tutorials/ethereum-overview/smart-contract-step2.png "2. Bob completes the patio project and Alice gives the smart contract permission to release the funds")

![Smart Contract Step 3](/img/tutorials/ethereum-overview/smart-contract-step3.png "3. Bob receives Alice's payment along with his collateral")
(Provisions could be written into the contract code releasing Bob's collateral to Alice if Bob were to fail to build the patio or if he were to perform a poor job.)

**Smart contracts are written in a language called Solidity**. [Solidity](https://solidity.readthedocs.io/) is statically typed, and supports inheritance, libraries, and complex user-defined types, among much else. Solidity syntax is similar to JavaScript.

Check out [ethereum.org](https://ethereum.org/en/learn/#smart-contracts) to learn more about smart contracts.

## Ethereum networks

Up to this point we've been describing the main Ethereum public blockchain (or "MainNet"). On the MainNet, data on the chain—including account balances and transactions—are public, and anyone can create a node and begin verifying transactions. Ether on this network has a market value and can be exchanged for other cryptocurrency or fiat currencies like US Dollars.

But there are other networks as well. In fact, anyone can create a copy of Ethereum.

### Sidechain networks

A sidechain network is a copy of Ethereum and a scaling solution that utilizes its own set of validating nodes, its own consensus mechanism, and therefore offers its own security assurances separate from those offered by Ethereum.

Check out [ethereum.org](https://ethereum.org/en/developers/docs/scaling/sidechains/) to learn more about side chains.

### Layer 2 networks

A layer 2 network is a copy of Ethereum and a scaling solution that utilizes own set of validating nodes, but utilizes Ethereum as the consensus layer, thereby offering additional network bandwidth while retaining Ethereum's security assurances.

Check out [ethereum.org](https://ethereum.org/en/developers/docs/scaling/layer-2-rollups/) to learn more about layer 2.

### Local test networks

The Ethereum blockchain can be simulated locally for development. Local test networks process transactions instantly and Ether can be distributed as desired. An array of Ethereum simulators exist; we recommend [Ganache](/ganache).

### Public test networks

Developers use public test networks (or testnets) to test Ethereum applications before final deployment to the main network. Ether on these networks is used for testing purposes only and has no value.

There are three public test networks in wide usage:

- **Ropsten**: The official test network, created by [The Ethereum Foundation](https://www.ethereum.org/foundation). Its functionality is similar to the MainNet.

- **Kovan**: A network that uses a consensus method called "proof-of-authority". This means its transactions are validated by select members, leading to a consistent four second block time. The supply of ether on this testnet is also controlled to mitigate spam attacks.

- **Rinkeby**: A testnet also using proof-of-authority, created by The Ethereum Foundation.

### Private/enterprise networks

Private Ethereum networks allow parties to share data without making it publicly accessible. A private blockchain is a good choice for:

- Sharing of sensitive data, such as health care records
- Scaling to handle higher read/write throughput, due to the smaller network size

An example of a private enterprise blockchain is [Quorum](https://www.jpmorgan.com/country/US/EN/Quorum), originally written by J.P. Morgan. ([Read our documentation on using Truffle with Quorum.](/docs/truffle/distributed-ledger-support/working-with-quorum))

## Decentralized applications (dapps)

**Applications using smart contracts for their processing and/or datastorage are called "decentralized applications", or "dapps".** The user interfaces for these dapps consist of familiar languages such as HTML, CSS, and JavaScript. The application itself can be hosted on a traditional web server or on a decentralized file service such as [Swarm](https://swarm-gateways.net/) or [IPFS](http://ipfs.io/).

Given the benefits of the Ethereum blockchain, a dapp could be a solution for many industries, including but not limited to:

- Record keeping
- Finance
- Supply chains
- Real estate
- Marketplaces

And what is the best way to create your own dapp, test it, and deploy it to an Ethereum network of your choice? With [Truffle](/docs/getting_started/project), of course.

## The Future of Ethereum

As a globally distributed technology, the Ethereum ecosystem is undergoing major upgrades from many directions. At the base layer, Ethereum is in the middle of a significant, multi-phased upgrade previously referred to as ETH 2.0. This name was later [deprecated](https://notes.ethereum.org/@timbeiko/great-renaming) to avoid confusion from users wondering if they need to "upgrade" their Ether holdings.

Read more about these major upgrades:

- [The Beacon Chain](https://ethereum.org/en/eth2/beacon-chain/)
- [The Merge](https://ethereum.org/en/eth2/merge/)
- [Sharding](https://ethereum.org/en/eth2/shard-chains/)
