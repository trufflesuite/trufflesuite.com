---
title: The Truffle NFT Box. All you need to know
hide:
  - navigation
---

**By [Kingsley Arinze](https://www.linkedin.com/in/bruzzy)**

![The Truffle NFT Box. All you need to know](./nft-box.jpg)

Infura [announced](https://blog.infura.io/post/introducing-the-infura-nft-api-beta-release) the private beta release of their NFT API a few months ago. Since then, there has been an ecosystem of tools developing around it, making it easier to build with Infura’s NFT API. 

One such tool is the [Truffle NFT Box](https://trufflesuite.com/boxes/nft-box), which as you’ll see later in this post, utilizes another tool built on top of the Infura NFT API, the Infura NFT SDK, to make NFT development as stress-free as possible.

In this post, we will discuss the Infura NFT API, as well as the Infura NFT SDK which is available for download as an [NPM package](https://www.npmjs.com/package/@infura/sdk). We’ll then explore the Truffle NFT Box and how it makes NFT development a lot easier by providing the necessary configuration and boilerplate code needed to start and finish an NFT project.

## Infura NFT API, what is it?

In the past year, we’ve seen a significant increase in cryptocurrency adoption across the world, which is in part, a result of the NFT boom of the past year. 

As a matter of fact, there is an estimated 880% increase in global crypto adoption in 2021, a $180 million market capitalization for stablecoins as of March 2022 as well as a $40 million market capitalization for NFTs in 2021.

We’ve also seen a number of popular brands like Coca-Cola, Adidas, Nike, and Formula 1 to name a few, launch NFTs and invest in the Metaverse. 

All this points to the fact that NFTs are an important part of our ecosystem and their use cases aren’t just limited to PFPS or artwork, but extend to include digital identity verification, membership/access to gated digital and physical communities, and much more.

![use cases and consumer trends beyond "owning jpegs"](./ownership.png)

Infura and Truffle understand the importance of NFTs and where it is headed, which is why they’ve expanded their product offering to include the [NFT API](https://docs.api.infura.io/nft), a set of READ RESTful APIs that enable developers to: 

- Fetch all or specific NFTs for an account 
- Verify ownership of an NFT or a collection
- Get the creator and transfer history of NFT or a collection
- And other important metadata

## Infura NFT SDK, what is it?

The Infura NFT SDK is basically a wrapper around the Infura NFT API, exposed as a Javascript library and available for download on [NPM](https://www.npmjs.com/package/@infura/sdk). This library, in addition to being able to make RESTful calls to all of Infura’s NFT API endpoints, allows you to deploy and call methods on common Ethereum smart-contract definitions through Infura, without the developer overhead of learning Solidity, compiling code, and importing ABI’s.

![Infura NFT SDK](./arc.png)

For a detailed description of how to use the SDK for deploying an NFT, minting and transferring an NFT, and fetching NFT metadata, please refer to the [how-to section](https://docs.infura.io/infura/infura-custom-apis/nft-sdk/how-to) of the Infura NFT API documentation.

## Truffle NFT Box

To further simplify the developer experience for NFT developers and creators using the Infura NFT API and the SDK, Truffle is happy to announce the release of the [Truffle NFT Box](https://trufflesuite.com/boxes/nft-box), a set of boilerplate code that enables NFT developers, using Truffle, to take their ideas from concept to reality, as quickly as possible, by allowing them to focus on the most important and unique parts of their projects: the application logic, while taking care of all other aspects such as project configuration, deployment, and environment variables.

## Installation and setup

To use the Truffle NFT Box, you have to meet the following requirements: 

- Node.js 10.x or later 
- NPM version 5.2 or later 
- Windows, Linux, or macOS 
- Helpful, but optional: - An [Infura](https://infura.io) account and Project ID - A [MetaMask](https://metamask.io) account

Once these requirements are met, in an empty folder, run the unbox command as shown below: 

```bash
npx truffle unbox nft-box
```
In the root directory, install the required dependencies by running the `npm install` command. This will install a few things along with Open Zeppelin ERC 721 Contracts.

Then, add the constructor arguments to the deployer function in the **2_deploy_contracts.js** file. The URI for your NFT images must be passed as the first argument, followed by the name and symbol of the token as the second and third respectively. 

```javascript
module.exports = function(deployer) { deployer.deploy(NFTCollection,"YOUR URI","TOKEN NAME","TOKEN SYMBOL"); };
```

Run the command `truffle develop` to start the development console. 

## Compiling and migrating

To compile and migrate your smart contracts, simply run `compile migrate` on your Truffle development console. Notice that inside the Truffle development console we don't preface commands with the “truffle” keyword. 

To test things out, we’ve included a basic user interface built with React. Switch to the client directory of the box and run `npm install` followed by `npm start`. On your browser, navigate to `http://localhost:3000` to view your application and connect your wallet. Also, note that smart contract changes must be manually recompiled and migrated.

## Deployment

As outlined in the [documentation](https://trufflesuite.com/boxes/nft-box/#deployment), the best way to deploy your smart contract to the network of your choice is using the Truffle dashboard feature. The Truffle dashboard feature comes bundled with Truffle, so there is no need to download any new package if you already have Truffle installed. Start the dashboard by running the `truffle dashboard` command in a separate non-truffle console.

Once started, you can access the dashboard at http://localhost:24012. Going forward, you’ll only need to run `truffle migrate` after making changes to your smart contract and compiling those changes. Check out this [post](https://trufflesuite.com/blog/introducing-truffle-dashboard) for a more detailed description of how to use the Truffle dashboard.

Alternatively to using the Truffle Dashboard, you can also use the good old environmental variable method by including a `.env` file in the root of your project, more on how to do that in the [documentation](https://trufflesuite.com/boxes/nft-box/#using-the-env-file).

## Conclusion

At Truffle, we remain committed to improving and simplifying the user experience for dapp developers in the Web3 ecosystem by creating developer tools, resources, and educational materials. 

To find out more about our suite of developer tools, visit the official [Truffle website](https://trufflesuite.com). If you have questions, feel free to start a discussion on our https://github.com/orgs/trufflesuite/discussions. 

We also hold weekly live-streamed sessions called **Web Unleashed**, where we build, interview folks, and discuss important developments around the ecosystem. Keep an eye on our Twitter for updates on the next session. 

You can also find past episodes on the [Truffle Youtube channel](https://www.youtube.com/c/TruffleSuite) and the [unleashed section](https://trufflesuite.com/unleashed) of our website if you prefer written materials.