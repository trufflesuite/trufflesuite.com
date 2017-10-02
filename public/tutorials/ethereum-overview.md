# Ethereum Overview

You may have heard the terms "blockchain" and "smart contract" floating around, but what do they actually mean? We'll demystify the jargon, show you practical blockchain solutions and give you some direction on how to create them. This is a high level overview covering:

**Blockchain Basics**

*   Why Use a Blockchain?
*   What is a Blockchain?
*   How a Blockchain Works

**The Ethereum Blockchain**

*   What is Ethereum?
*   What is a Smart Contract?
*   Ethereum Networks
*   Distributed Applications (Dapps)

## Why Use a Blockchain?

Blockchains are used when multiple parties, perhaps located across the world, need to share data and transfer value without trusting each other. The financial world describes this trust as the **counterparty risk**, i.e. what's the risk that the other party won't hold up their end of the bargain? Blockchains completely remove the counterparty risk through a revolutionary system of mathematics, cryptography and peer-to-peer networking. Before we go into detail about how they work, let's first look at some history and how the need for blockchains arose.

### The First Databases

In the 1960s the first computerized databases emerged. With hardware occupying multiple rooms and the Internet decades away, data naturally existed in central, physical locations. This is a *centralized* approach, meaning the location and accessing of data is controlled by a central authority. Centralized systems can be manipulated, from inside or outside bad actors, so we trust the owners of these systems have sufficient will and resources to keep their data secure and preserve its integrity. Centralized databases are still the most common today, powering most of our online and offline applications.

A self-hosted blog is a common use of a centralized database. The owner could edit posts in hindsight to look better or censor users without recourse. Even with an upstanding owner, a hacker could infiltrate the server and commit malicious acts. If there is no database backup, determining what's changed and reversing the damage might be impossible.

Graphically represented, each arrow crossing a boundary of the main server box is a connection which requires trust.

</div><div class="container container-steps text-center">
  <div class="row">
    <div class="col-sm-6 col-sm-push-3">
      ![Centralized Database](/tutorials/images/ethereum-overview/db-server.png)
    </div>
  </div>
</div><div class="container container-narrow">

### The Need to Share Data

Sharing large amounts of data can be expensive and cumbersome. We can ease this burden by distributing data across parties needing to share. Reading and/or writing are controlled by one or more parties within the group and therefore subject to similar corruptions as centralized databases.

Modern shared databases use techniques to minimize this corruption. Some of these overlap with blockchains. Depending on the shared database system, it may feature:

*   Immutability: Rather than overwriting old data, a new copy is created with the old data retained as a historical record. This record can be access to prove a piece of data existed at a certain time.
*   Consensus: For a database to be shared, all parties must agree (reach consensus) on its contents. There are various methods of reaching consensus, one of which (Proof of Work) we'll discuss in the context of a blockchain below.

Blockchains use these and take them a step further, completely solving the problem of trust.

## What is a Blockchain?

A blockchain, at its heart, is a shared database. This database is called a ledger. Much like a bank, the ledgers of simple blockchains keep track of currency (in this case, cryptocurrency) ownership. Unlike a centralized bank, everyone has a copy of the ledger and can verify each other's accounts. This is the *distributed* (or decentralized) part of the blockchain. Each connected device with a copy of the ledger is called a **node**.

Interactions between accounts in a blockchain network are called **transactions**. They can be monetary transactions, such as sending someone **Ether**, Ethereum's cryptocurrency. Other times they are transmissions of data, like a comment or username. Every account on the blockchain has a unique signature, which lets everyone know which account initiated the transaction.

Blockchains eliminate this problem of trust with some key advantages over previous databases:

*   Full Decentralization: Reading/writing to the database is completely decentralized and secure. No single person or group controls a blockchain.
*   Extreme Fault Tolerance: Fault tolerance is the ability of a system to handle corrupt data. While fault tolerance is not unique to blockchains, they take the concept to its logical extreme by having every person sharing the database validate its changes.
*   Independent Verification: Transactions can be verified by anyone, without a third party. This is sometimes referred to as disintermediation.

Now that we have some idea of why blockchains are useful, let's dive deeper into how they work.

## How a Blockchain Works

On a public blockchain, anyone can read or write data. Reading data is free, but writing to the public chain costs money. This cost helps discourage spam and pays to secure the network. Any node on the network can take part in securing the network through a process called mining. Since mining requires computing power and therefore electricity cost, miners are compensated for their service.

### Mining

Each node in the network can optionally take part in a process called **mining**. Every so often, nodes which have opted to be miners compete to solve math problems which secure the contents of a block. A **block** is a bundle of any pending transactions created since the addition of the most recent block in the chain. The winner of the competition creates the next block and receives some cyptocurrency as a reward. This incentivizes nodes to secure the network, preventing too much power from being in the hands of any single miner.

### Hashing

Once a new block is mined, the other miners are notified and begin verifying and adding this new block to their copies of the chain. That math we referred to earlier is called **cryptographic hashing** (or simply, hashing). A hash function is a special, one-way process which takes in data and gives back a fixed-length string representing that data. While the original data can't be reproduced from its hash, the same data will always produce the same hash. Therefore, unverified data can be hashed with the same function and compared to the original. If they are identical, the data is validated.

Once more than half of the miners have validated the new block, the network has reached **consensus** on the new block and it becomes part of the chain's permanent history. Now this data can simply be downloaded (synchronized) by non-mining nodes with its validity assured.

Here's the whole process visually:

</div><div class="container container-steps text-center">
<div class="row">
<div class="col-lg-4">
![Mining Step 1](/tutorials/images/ethereum-overview/chain-step1.png)
<p>1. Bob attempts to send Alice 1 ETH.</p>
</div>

<div class="col-lg-4">
![Mining Step 2](/tutorials/images/ethereum-overview/chain-step2.png)
<p>2. Bob and Alice's transaction is combined with other transactions that have occured since the last block.</p>
</div>

<div class="col-lg-4">
![Mining Step 3](/tutorials/images/ethereum-overview/chain-step3.png)
<p>3. Miners compete to validate the block with the new set of transactions.</p>
</div>
</div>

<div class="row">
<div class="col-lg-4 col-lg-offset-2">
![Mining Step 4](/tutorials/images/ethereum-overview/chain-step4.png)
<p>4. The victorious miner creates a new block and receves a reward.</p>
</div>

<div class="col-lg-4">
![Mining Step 5](/tutorials/images/ethereum-overview/chain-step5.png)
<p>5. With the transaction validated, Alice receives 1 ETH.</p>
</div>
</div>
</div><div class="container container-narrow">

## What is Ethereum?

More than a database, Ethereum allows you run programs in a blockchain's trusted environment. Ethereum adds a virtual machine, called the **EVM (Ethereum Virtual Machine)**, on top of the blockchain. The EVM allows code to be verified and executed on the blockchain, providing guarantees that code will be run the same way on everyone's machine. This code is contained in Smart Contracts (more on these below).

Rather than just tracking account balances, Ethereum uses the same methods to keep the state of the EVM on the blockchain. All nodes process smart contracts to verify the integrity of the contracts themselves and their outputs.

## What is a Smart Contract?

**Smart Contracts** are programs running on the EVM. They most closely resemble classes in other programming languages. Smart Contracts can accept and store Ether, data, or a combination of both. Then, using the logic programmed into the contract, it can distribute that Ether to other accounts or even other smart contracts. You can see how complex systems can develop from this flexibility.

The language smart contracts are written in is called **Solidity**. Solidity is statically typed, supports inheritance, libraries and complex user-defined types among other features. It's file extension is ".sol". Solidity's syntax is similar to JavaScript's. We'll go over the basics of Solidity in future tutorials, but you may also want to dive deeper by checking out [the documentation](https://solidity.readthedocs.io/en/develop/).

Here's a smart contract example with Bob and Alice again. This time, they're using an escrow contract (a place to store money until a condition is fulfilled) to store their Ether before the final transaction.

</div><div class="container container-steps text-center">
<div class="row">
  <div class="col-lg-4">
    ![Smart Contract Step 1](/tutorials/images/ethereum-overview/smart-contract-step1.png)
    <p>1. Alice wants to hire Bob to build her a patio. To keep both parties honest, Alice agrees to store her payment for the patio within the escrow contract, and Bob agrees to deposit an equal amount in the contract as well.</p>
  </div>

  <div class="col-lg-4">
    ![Smart Contract Step 2](/tutorials/images/ethereum-overview/smart-contract-step2.png)
    <p>2. Bob completes the patio and Alice is thrilled! She gives the smart contract permission to release the funds.</p>
  </div>

  <div class="col-lg-4">
    ![Smart Contract Step 3](/tutorials/images/ethereum-overview/smart-contract-step3.png)
    <p>3. Bob receives his collateral of 1 ETH along with Alice's payment of 1 ETH.</p>
  </div>
</div>
</div><div class="container container-narrow">

In a more complex escrow contract, if Bob were to fail to build the patio or if he were to perform a poor job, provisions could be written into the contract's code releasing Bob's collateral to Alice instead.

## Ethereum Networks

Up to this point we've been describing the **main network** (or **MainNet**), Ethereum's public blockchain. Anyone can create a node and begin verifying transactions; therefore, it's highly secure. Data on the chain, including account balances and transactions, are public. Ether on this network has a market value and can be exchanged for other cryptocurrency or fiat currencies like US Dollars.

Apart from the MainNet, there are test networks (both local and public), as well as private networks.

### Local Test Networks

The Ethereum blockchain can be simulated locally for development. Local test networks process transactions instantly and Ether can be distributed as desired. An array of Ethereum simulators exist; we recommend our own, [Ganache](https://github.com/trufflesuite/ganache).

### Public Test Networks

These test networks are live and public. Ether on these networks is for testing purposes only and has no monetary value. Because these networks are public and the currency is freely available, developers use them to test Ethereum applications before final deployment to the main network.

*   **Ropsten**: The official test network, created by [The Ethereum Foundation](https://www.ethereum.org/foundation).
*   **Kovan**: A public test network that uses a consensus method called "proof of authority". This means its transactions are validated by select members, leading to a consistent 4 second block time. The supply of Ether on this testnet is also controlled to mitigate spam attacks. Information on this chain is public.

*   **Rinkeby**: An official public testnet also using proof of authority. It's accessible by any Ethereum client and created by The Ethereum Foundation.

### Private/Enterprise Networks

Private Ethereum networks allow parties to share data without making it publicly accessible. A private blockchain is a good choice for:

*   Sharing of sensitive data, such as health care records, that isn't allowed or desired to be public.
*   Groups with a need for massive scale. With a smaller network size, private blockchains can scale to larger sizes and handle heavier read/write throughput than public chains.

Private chains, being based on Ethereum, run the EVM and are therefore compatible with Truffle and other development tools. [Quorum](https://www.jpmorgan.com/country/US/EN/Quorum), originally written by JP Morgan, is a great example that works with Truffle. [Check out our blog for more on using Truffle with Quorum](/tutorials/building-dapps-for-quorum-private-enterprise-blockchains).

## Dapps (Distributed Applications)

Applications using smart contracts for most if not all of their backend processing are called **dapps**, short for distributed applications. The user interfaces for these dapps consists of languages you may already know: HTML, CSS and JavaScript. These files can be hosted on a traditional trusted web server or trustlessly on a decentralized file service such as [Swarm](http://swarm-gateways.net/bzz:/theswarm.eth/) or [IPFS](http://ipfs.io/).

Given the benefits of the Ethereum blockchain, a dapp could be a solution for many industries, including but not limited to:

*   Record Keeping
*   Currency (Finance)
*   Supply Chains
*   Real-Estate
*   Marketplaces

...and the list goes on. We'll be providing detailed examples of how to build your own dapps in the near future, so bookmark this tutorial, and stay tuned.
