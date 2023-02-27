---
title: Web3 Gaming Development with Truffle and Unity
hide:
  - navigation
  - toc
---

![Unity x Truffle Banner](./img/truffle-x-unity-banner.png)

We're so excited you're taking your first steps into developing web3 games with Unity and the Truffle Suite. There are only a few tools you need to get started:

- [Unity](https://unity.com/download): To create the game itself, we're going to need a game engine. There are many out there, but for full-length 3D games the 2 main engines are Unity and Unreal Engine. We'll be using Unity here since it's easier to pick up and supports C#, which already has an Ethereum library, NEthereum.
- [Truffle CLI](https://www.npmjs.com/package/truffle): Truffle CLI manages the lifecycle of our smart contracts. It handles compiling our Solidity and producing artifact files, JSON files which contain the function signatures for a given contract (among other things). We'll injest these artifacts using the MetaMask SDK and NEtherem so we can interact with our smart contracts.
- [NEthereum](https://nethereum.com/): NEthereum allows us to interact with the Ethereum blockchain more conveniently than making raw RPC calls. NEthereum, combined with the MetaMask SDK, will let our users interact with the smart contracts powering our game.

Consensys has a number of tools in the Unity asset store that will help you create any web3 gaming experience you can imagine. Another one you may want to check out is the [Infura Unity SDK](https://docs.infura.io/infura/infura-custom-apis/nft-sdk). This allows you to qucickly work with NFTs; querying collections, minting new NFTs, transferring them and more, without doing any smart contract development!

<!-- Step 1: Check out the [Tutorial - Building a Tic Tac Toe Game with Truffle and Unity](/guides/building-a-tic-tac-toe-game-with-truffle-and-unity) -->

<!-- Step 2: Read our “How to” guides to: -->

## Guides

With the above tools installed, check out these guides that will help you get familiar with NFT development, a very popular crypto primitive to combine with games. NFT could host things like skins, game assets, or a player's inventory for later trading or other functionality on-chain.

- Build a NFT Rental Marketplace [Part 1](/guides/nft-rental-marketplace/) & [Part 2](/guides/nft-rental-marketplace-2/)
- [Write a rentable NFT smart contract](/guides/rentable-nft/)
- [Write an NFT Smart Contract with Royalties](/guides/nft-royalty/)
- [How to Build a NFT Marketplace DApp on Ethereum or Optimism](/guides/nft-marketplace/)

<p class="alert alert-info"><strong>Want updates on the newest web3 gaming tools and techniques?</strongs> Join <a href="#">our Early Adopter Program</a> to work with our team and community to learn more about web3 gaming and design the best features to bring your game to the next!</p>
