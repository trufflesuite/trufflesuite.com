# Ethereum Overview

You may have heard the terms "blockchain" and "smart contract" floating around, but what do they acutually mean? We'll demystify the jargon, show you practical blockchain solutions and give you some direction on how to create them. This is a high level overview, and as such will leave out some things that aren't essential to a general understanding of a blockchain. Links for more in-depth reading are provided in the Review section.

In this tutorial we will be covering:

*   What is a Blockchain?
*   What is Ethereum?
*   What is a Smart Contract?
*   Blockchain Use-Cases
*   Review

## What is a Blockchain?

A blockchain, at its heart, is a distributed database. This database is called a ledger. Much like a bank, the ledger keeps track of currency (in this case, cryptocurrency) ownership. Unlike a centralized bank, everyone has a copy of the ledger and can verify each other's accounts. This is the *distributed* (or decentalized) part of the blockchain. Each connected device with a copy of the ledger is called a **node**.

Interactions between accounts in a blockchain network are called **transactions**. They can be monetary transactions, such as sending someone **Ether**, Ethereum's cryptocurrency. Other times they are transmissions of data, like a comment or username. Every account on the blockchain has a unique signature, which lets us know which account initiated the transaction.

### Hashing & Mining: How the Blockchain Stays Secure

Each node in the network can optionally take part in a process called **mining**. Every so often, nodes which have opted to be miners compete to solve math problems which secure the contents of the block. The winner of this competition creates the next block and receives some cyptocurrency as a reward. This incentivizes nodes to secure the network and prevents too much power from being in the hands of any single miner. A **block** contains a bundle of any pending transactions since the creation of the previous block.

Once a new block is mined, the other miners are notified and begin verifying and adding this new block to their copies of the chain. That math we referred to earlier is called **cryptographic hashing** (or simply, hashing). A hash function is a special, one-way process which takes in data and gives back a fixed-length string representing that data. While the original data can't be reproduced from its hash, the same data will always produce the same hash. Therefore, unverified data can be hashed with the same function and compared to the original. If they are identical, the data is validated.

Once more than half of the miners have validated the new block, the network has reached **consensus** on the new block and it is part of the chain's permanent history. Now this data can simply be downloaded (synchronized) by non-mining nodes with its validity assured.

Here's the whole process visually:

<div class="container container-steps text-center">
<div class="row">
  <div class="col-lg-4">
    ![Ethereum Pet Shop](/tutorials/images/chain-step1.png)
    <p>1. Bob attempts to send Alice 1 ETH.</p>
  </div>

  <div class="col-lg-4">
    ![Ethereum Pet Shop](/tutorials/images/chain-step2.png)
    <p>2. Bob and Alice's transaction is combined with other transactions that have occured since the last block.</p>
  </div>

  <div class="col-lg-4">
    ![Ethereum Pet Shop](/tutorials/images/chain-step3.png)
    <p>3. Miners compete to valid block for the new set of transactions.</p>
  </div>
</div>

<div class="row">
  <div class="col-lg-4 col-lg-offset-2">
    ![Ethereum Pet Shop](/tutorials/images/chain-step4.png)
    <p>4. The victorious miner creates a new block and receves a reward.</p>
  </div>

  <div class="col-lg-4">
    ![Ethereum Pet Shop](/tutorials/images/chain-step5.png)
    <p>5. With the transaction validated, Alice receives 1 ETH.</p>
  </div>
</div>
</div>

## What is Ethereum?

Ethereum adds a virtual machine, called the **EVM (Ethereum Virtual Machine)**, on top of the blockchain. The EVM allows code to be verified and executed on the blockchain. This code is called a Smart Contract (more on these below).

Rather than just tracking account balances, the Ethereum blockchain uses the same methods to keep the state of the EVM on the blockchain. All nodes process smart contracts to verify the integrity of the contracts themselves their outputs.

Ethereum's main chain, called Mainnet, is a public blockchain. This means it's very secure, as anyone from the public can add a device and begin verifying transactions. A tradeoff to this is that any data you put on the chain, including your account balances and transactions, are public.

*Wait, all the data is public? What if I want it kept private?* Glad you asked! Sounds like you could use an enterprise Ethereum chain.

### Private/Enterprise Networks

Companies can start their own Ethereum networks by ...  . These networks and their data are private. Because they're generally smaller, these networks can also process transactions faster.

### Test Networks

Another special type of chain on the Ethereum network is a test network. These can be local simulations of the blockchain (esentially your local LAMP install vs. a Linux server) or live, public test networks. The two test networks currently running are Ropsten and Kovan.

**Ropsten** is the official public testnet, used for testing Ethereum applications in the wild before finally deploying to Mainnet.

**Kovan** is a testnet that uses a consensus method called "proof of authority". This means its transactions are validated by select members, leading to a consistent 4 second block time. The supply of Ether on this testnet is also controlled to mitigate spam attacks. Information on this chain is public.

## What is a Smart Contract?

**Smart Contracts** are programs running on the EVM. They most closely resemble classes in other programming languages. Smart Contracts can accept and store Ether, data, or a combination of both. Then, using the logic programmed into the contract, it can distribute that Ether to other accounts or even other smart contracts. You can see how complex systems can develop from this flexibility.

The language smart contracts are written in is called **Solidity**. Solidity is is statically typed, supports inheritance, libraries and complex user-defined types among other features. It's file extension is ".sol". Solidity's syntax is similar to JavaScript's. We'll go over the basics of Solidity in our [our Pet Shop tutorial](/tutorials/pet-shop), but you may also want to dive deeper by checking out [the documentation](https://solidity.readthedocs.io/en/develop/).

Here's a smart contract example with Bob and Alice again. This time, they're using an escrow (a place to store money until a condidtion is fulfilled) to store their Ether before the final transaction.

<div class="container container-steps text-center">
<div class="row">
  <div class="col-lg-4">
    ![Ethereum Pet Shop](/tutorials/images/smart-contract-step1.png)
    <p>1. Alice wants to hire Bob to build her a patio. To keep both parties honest, Alice agrees to store her payment and Bob an equal amount of collateral in an escrow smart contract.</p>
  </div>

  <div class="col-lg-4">
    ![Ethereum Pet Shop](/tutorials/images/smart-contract-step2.png)
    <p>2. Bob completes the patio and Alice is thrilled! She gives the smart contract permission to release the funds.</p>
  </div>

  <div class="col-lg-4">
    ![Ethereum Pet Shop](/tutorials/images/smart-contract-step3.png)
    <p>3. Bob receives his collateral of 1 ETH along with Alice's payment of 1 ETH.</p>
  </div>
</div>
</div>

## Blockchain Use-Cases

Blockchains enable sharing of information between people or businesses who may not know each other directly. With that in mind, blockchains are a great fit for many industries, including but not limited to:

*   Record Keeping
*   Currency
*   Supply Chains
*   Real-Estate
*   Marketplaces

## Review

So to review, a blockchain is a distributed database whose integrity is protected and verified by cryptography and consensus. Etherum adds a new layer on top of this, called the Ethereum Virtual Machine (EVM), which allows the blockchain to store and execute arbitrary programs. These programs are called smart contracts.

Ready to build your first distributed application (Dapp)? Check out [our Pet Shop tutorial](/tutorials/pet-shop).
