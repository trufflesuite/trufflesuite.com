# Ethereum Overview

You may have heard the terms "blockchain" and "smart contract" floating around, but what do they actually mean? In this tutorial, we'll demystify the jargon, show you practical blockchain solutions, and give you direction on how to create an application that takes advantage of the blockchain.

This is a high-level overview covering:

**Blockchain basics**

*   Why use a blockchain?
*   What is a blockchain?
*   How a blockchain works

**The Ethereum blockchain**

*   What is Ethereum?
*   What is a smart contract?
*   Ethereum networks
*   Distributed applications (dapps)


## Why use a blockchain?

Blockchains are used when multiple parties, perhaps located across the world, need to share data and transfer value without trusting each other.

The financial world describes this trust as the **counterparty risk**: the risk that the other party won't hold up their end of the bargain. Blockchains completely remove the counterparty risk through a revolutionary system of mathematics, cryptography, and peer-to-peer networking.

Before we go into those details, let's first look at some history and how the need for blockchains arose.

### The first databases

In the 1960's the first computerized databases emerged. With hardware occupying multiple rooms and the Internet decades away, data naturally existed in central, physical locations. This is a **centralized** approach, meaning the location and accessing of data is controlled by a central authority.

Centralized systems can be manipulated, from inside or outside, so we have to trust the owners of these systems to have sufficient will and resources to keep their data secure and with integrity. Centralized databases are still the most common today, powering most of our online and offline applications.

A self-hosted blog is a common example of a centralized database. The owner could potentially edit posts in hindsight or censor users without recourse. Alternately, a hacker could infiltrate the server and commit malicious acts. If there is no database backup, reversing the damage might be impossible.

</div><div class="container container-steps text-center">
  <div class="row">
    <div class="col-sm-6 col-sm-push-3">
      ![Centralized Database](/tutorials/images/ethereum-overview/db-server.png)
      <p class="caption">Graphically represented, each arrow crossing a boundary of the main server box is a connection which requires trust</p>
    </div>
  </div>
</div><div class="container container-narrow">

### The need to share data

Sharing large amounts of data can be expensive and cumbersome. We can ease this burden by distributing data across multiple parties. Reading and writing are controlled by one or more parties within the group and therefore subject to similar corruptions as centralized databases.

Modern shared databases use techniques to minimize this corruption. Some of these overlap with blockchains. Depending on the shared database system, it may feature:

* **Immutability**: Rather than overwriting old data, a new copy is created with the old data retained as a historical record. This record can be accessed to prove a piece of data existed at a certain time.
* **Consensus**: For a database to be shared, all parties must agree on its contents. There are various methods of reaching consensus, one of which (proof-of-work) will be discussed below.

Blockchains use these and take them a step further, solving the problem of trust.


## What is a blockchain?

Fundamentally, **a blockchain is a shared database**, consisting of a ledger of transactions. Much like a bank, the ledgers of simple blockchains keep track of currency (in this case, cryptocurrency) ownership. Unlike a centralized bank, everyone has a copy of the ledger and can verify each other's accounts. Each connected device with a copy of the ledger is called a "node".

Blockchains eliminate the problem of trust that affect other databases in the following ways:

* **Full decentralization**: Reading/writing to the database is completely decentralized and secure. No single person or group controls a blockchain.
* **Extreme fault tolerance**: Fault tolerance is the ability of a system to handle corrupt data. While fault tolerance is not unique to blockchains, it takes the concept to its logical extreme by having *every* account sharing the database validate its changes.
* **Independent verification**: Transactions can be verified by anyone, without a third party. This is sometimes referred to as "disintermediation".


## How a blockchain works

Now that we have some idea of why blockchains are useful, let's dive deeper into how they work.

Interactions between accounts in a blockchain network are called "transactions". They can be monetary transactions, such as sending **ether, the cryptocurrency used in Ethereum**. They could also be transmissions of data, such as a comment or user name. A bundle of transactions is called a "block".

Every account on the blockchain has a unique signature, which lets everyone know which account initiated the transaction. On a public blockchain, anyone can read or write data. Reading data is free, but writing to the public blockchain is not. This cost, known as "gas" and priced in ether, helps discourage spam and pays to secure the network.

### Mining

Any node on the network can take part in securing the network through a process called "mining". Nodes which have opted to be miners compete to solve math problems which secure the contents of a block.

Since mining requires computing power (not to mention electricity cost), miners can be compensated for their service. The winner of the competition receives some cryptocurrency as a reward. This incentivizes nodes to work to secure the network, preventing too much power from being in the hands of any single miner.

### Hashing

Once a new block is mined, the other miners are notified and begin verifying and adding this new block to their copies of the chain. This is done through cryptographic hashing (or simply, "hashing"). Hashing is a one-way process which takes in data and gives back a fixed-length string representing that data.

While the original data can't be reproduced from its hash, the same data will always produce the same hash. Therefore, unverified data can be hashed with the same function and compared to the original. If they are identical, the data is validated.

Once more than half of the miners have validated the new block, the network has "reached consensus" and the block becomes part of the blockchain permanent history. Now this data can be downloaded by all nodes, with its validity assured.

Here's the whole process visually:
</div>
<div class="container container-steps text-center">
<div class="row">
<div class="col-lg-4">
![Mining Step 1](/tutorials/images/ethereum-overview/chain-step1.png)
<p>1. Bob attempts to send Alice 1 ETH</p>
</div>

<div class="col-lg-4">
![Mining Step 2](/tutorials/images/ethereum-overview/chain-step2.png)
<p>2. Bob and Alice's transaction is combined with other transactions that have occurred since the last block</p>
</div>

<div class="col-lg-4">
![Mining Step 3](/tutorials/images/ethereum-overview/chain-step3.png)
<p>3. Miners compete to validate the block with the new set of transactions</p>
</div>
</div>

<div class="row">
<div class="col-lg-4 col-lg-offset-2">
![Mining Step 4](/tutorials/images/ethereum-overview/chain-step4.png)
<p>4. The victorious miner creates a new block and receives a reward</p>
</div>

<div class="col-lg-4">
![Mining Step 5](/tutorials/images/ethereum-overview/chain-step5.png)
<p>5. With the transaction validated, Alice receives 1 ETH</p>
</div>
</div>
</div>
<div class="container container-narrow">
<h3><a name="what-is-ethereum" class="anchor" href="#what-is-ethereum"><span class="header-link" style="z-index: 9999995985">&nbsp;</span></a>What is Ethereum?</h3>

<p><strong>Ethereum is a blockchain that allows you to run programs in its trusted environment.</strong> This contrasts with the Bitcoin blockchain, which only allows you to manage cryptocurrency.</p>

<p>To this end, Ethereum has a virtual machine, called the Ethereum Virtual Machine (EVM). The EVM allows code to be verified and executed on the blockchain, providing guarantees it will be run the same way on everyone's machine. This code is contained in "smart contracts" (more on these below).</p>

<p>Beyond just tracking account balances, Ethereum maintains the state of the EVM on the blockchain. All nodes process smart contracts to verify the integrity of the contracts and their outputs.</p>


<h3><a name="what-is-a-smart-contract" class="anchor" href="#what-is-a-smart-contract"><span class="header-link" style="z-index: 9999995985">&nbsp;</span></a>What is a smart contract?</h3>

<p><strong>A smart contract is code that runs on the EVM.</strong> Smart contracts can accept and store ether, data, or a combination of both. Then, using the logic programmed into the contract, it can distribute that ether to other accounts or even other smart contracts.</p>

<p>Here's a smart contract example with Bob and Alice again. Alice wants to hire Bob to build her a patio, and they are using an escrow contract (a place to store money until a condition is fulfilled) to store their ether before the final transaction.</p>

</div>

<div class="container container-steps text-center">
<div class="row">
<div class="col-lg-4">
![Smart Contract Step 1](/tutorials/images/ethereum-overview/smart-contract-step1.png)
<p>1. Alice agrees to store her payment for the patio within the escrow contract, and Bob agrees to deposit an equal amount</p>
</div>

<div class="col-lg-4">
![Smart Contract Step 2](/tutorials/images/ethereum-overview/smart-contract-step2.png)
<p>2. Bob completes the patio project and Alice gives the smart contract permission to release the funds</p>
</div>

<div class="col-lg-4">
![Smart Contract Step 3](/tutorials/images/ethereum-overview/smart-contract-step3.png)
<p>3. Bob receives Alice's payment along with his collateral</p>
</div>
</div>
</div>
<div class="container container-narrow">

(Provisions could be written into the contract code releasing Bob's collateral to Alice if Bob were to fail to build the patio or if he were to perform a poor job.)

**Smart contracts are written in a language called Solidity**. [Solidity](https://solidity.readthedocs.io/) is statically typed, and supports inheritance, libraries, and complex user-defined types, among much else. Solidity syntax is similar to JavaScript.


## Ethereum networks

Up to this point we've been describing the main Ethereum public blockchain (or "MainNet"). On the MainNet, data on the chain—including account balances and transactions—are public, and anyone can create a node and begin verifying transactions. Ether on this network has a market value and can be exchanged for other cryptocurrency or fiat currencies like US Dollars.

But there are other networks as well. In fact, anyone can create their own Ethereum network.

### Local test networks

The Ethereum blockchain can be simulated locally for development. Local test networks process transactions instantly and Ether can be distributed as desired. An array of Ethereum simulators exist; we recommend [Ganache](/ganache).

### Public test networks

Developers use public test networks (or testnets) to test Ethereum applications before final deployment to the main network. Ether on these networks is used for testing purposes only and has no value.

There are three public test networks in wide usage:

* **Ropsten**: The official test network, created by [The Ethereum Foundation](https://www.ethereum.org/foundation). Its functionality is similar to the MainNet.

* **Kovan**: A network that uses a consensus method called "proof-of-authority". This means its transactions are validated by select members, leading to a consistent four second block time. The supply of ether on this testnet is also controlled to mitigate spam attacks.

* **Rinkeby**: A testnet also using proof-of-authority, created by The Ethereum Foundation.

### Private/enterprise networks

Private Ethereum networks allow parties to share data without making it publicly accessible. A private blockchain is a good choice for:

* Sharing of sensitive data, such as health care records
* Scaling to handle higher read/write throughput, due to the smaller network size

An example of a private enterprise blockchain is [Quorum](https://www.jpmorgan.com/country/US/EN/Quorum), originally written by J.P. Morgan. ([Read our blog post on using Truffle with Quorum.](/tutorials/building-dapps-for-quorum-private-enterprise-blockchains))


## Distributed applications (dapps)

**Applications using smart contracts for their processing are called "distributed applications", or "dapps".** The user interfaces for these dapps consist of familiar languages such as HTML, CSS, and JavaScript. The application itself can be hosted on a traditional web server or on a decentralized file service such as [Swarm](http://swarm-gateways.net/bzz:/theswarm.eth/) or [IPFS](http://ipfs.io/).

Given the benefits of the Ethereum blockchain, a dapp could be a solution for many industries, including but not limited to:

*   Record keeping
*   Finance
*   Supply chains
*   Real estate
*   Marketplaces

And what is the best way to create your own dapp, test it, and deploy it to an Ethereum network of your choice? With [Truffle](/docs/getting_started/project), of course.
