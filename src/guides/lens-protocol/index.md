---
title: "Web3 Unleashed: Decentralized social media with Lens"
hide:
  - navigation
---
# Web3 Unleashed: Decentralized social media with Lens

Written by [Emily Lin](https://twitter.com/_emjlin)

Last updated 1/31/2023

## Overview 

Web3 is revolutionizing the social media landscape. In this guide, we'll cover how to use the Truffle Lens box to start building your social media dapp. We'll walk through what's in it and provide an example of how you can customize the Lens Protocol by creating a Follow Module.

Watch the livestream on [YouTube](https://youtu.be/I-KOWTctSZk) to hear from Nader Dabit about how Lens Protocol is onboarding the next million of web3 users.

<iframe width="560" height="315" src="https://www.youtube.com/embed/I-KOWTctSZk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

The Lens box code lives [here](https://github.com/truffle-box/lens-box).

## Download System Requirements

You'll need to install:

- [Node.js](https://nodejs.org/en/), v14 or higher
- [truffle](https://trufflesuite.com/docs/truffle/getting-started/installation/)
- [ganache CLI](https://github.com/trufflesuite/ganache)

## Create an Infura account and project

To connect your DApp to Ethereum mainnet and testnets, you'll need an Infura account. Sign up for an account [here](https://infura.io/register?utm_source=truffle&utm_medium=webinar&utm_campaign=2022_Aug_unleashed-rentable-nft_tutorial_content).

## Register for a MetaMask wallet

To interact with your DApp in the browser, you'll need a MetaMask wallet. You can download it and create one [here](https://metamask.io/download/?utm_source=truffle&utm_medium=webinar&utm_campaign=2022_Aug_unleashed-rentable-nft_tutorial_content).

## Download VS Code

Feel free to use whatever IDE you want, but we highly recommend using VS Code! You can run through most of this tutorial using the Truffle extension to create, build, and deploy your smart contracts, all without using the CLI! You can read more about it [here](https://trufflesuite.com/blog/build-on-web3-with-truffle-vs-code-extension/).

## Get Some Test Eth

In order to deploy to the public testnets, you'll need some test Eth to cover your gas fees! [Here's](https://faucetlink.to/) a site that links to different Goerli and Sepolia ETH faucets.

## Unbox the Truffle box

First, let's examine the contents of the Truffle Lens box. Start off by unboxing it:

```shell
truffle unbox lens <DIRECTORY_NAME>
```

In this box, we have two folders: `lens-app` and `truffle`. Let's dive into what's in each folder and how you might edit the contents to create your own social dapp!

## `lens-app`: your frontend code

You can build on Lens without writing any smart contracts because they've provided a robust API that will interact with their contracts for you. You can find the documentation for the API [here](https://docs.lens.xyz/docs/introduction).

`lens-app` contains frontend code that leverages Next.js and Tailwind CSS to build a app that:

1. Prompts the user to connect their wallet
2. Displays the top profiles on Lens
3. Allows the user to click into and see the posts by the top profiles on Lens

First, let's install the dependencies:

```shell
cd lens-app
npm i
```

Let's dive into the important pieces of code that demonstrate how to leverage the Lens API. This assumes you already have understanding of Next.js and frontend development.

### `lens-app/api.js`

In order to interact with Lens, we first need to create the api. To do this, you'll need to construct GraphQL queries. We're doing so with [Apollo client](https://docs.lens.xyz/docs/apollo-client).

The first thing we do in this file is create our Apollo client. While reading data from the Lens API is as simple as sending a GraphQL query, we need to either be authenticated or write a transaction directly to the Lens smart contracts to make any state change, like following, unfollowing, creating a post, and creating a mirror. Lines 1-23 demonstrate how to create an authenticated Apollo client:

```javascript
import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const API_URL = 'https://api.lens.dev'

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('your-storage-key')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const httpLink = createHttpLink({
  uri: API_URL
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
```

Do note that we are getting our authenticated token from `localStorage`, which we write to in `index.tsx`. You can read more about it in the section below.

The remaining code in this file represent different GraphQL queries that get the information we want from Lens. The `challenge` and `authenticate` queries are specifically used for authentication, while `exploreProfiles`, `getProfile`, and `getPublications` are for reading data from Lens. 

### `lens-app/pages/index.tsx`

This is the home page of our dapp. It requires the user to be connected and authenticated before rendering all the Lens profile information. You can read more about the login process [here](https://docs.lens.xyz/docs/login).

To do the authentication, the important functions to highlight are:

1. `checkConnection`

    ```javascript
    async function checkConnection() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.listAccounts()
      if (accounts.length) {
        setAddress(accounts[0])
      }
    }
    ```

    This function checks to see if the user has already connected their wallet when the app loads and saves the address of the connected account.

2. `connect`

    ```javascript
    async function connect() {
      /* this allows the user to connect their wallet */
      const account = await window.ethereum.send('eth_requestAccounts')
      if (account.result.length) {
        setAddress(account.result[0])
      }
    }
    ```

    If the user has not yet connected their account, this function will allow them to do so by using the MetaMask Provider API `await window.ethereum.send('eth_requestAccounts')`.

3. `login`

    ```javascript
    async function login() {
      try {
        /* first request the challenge from the API server */
        const challengeInfo = await client.query({
          query: challenge,
          variables: { address }
        })
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        /* ask the user to sign a message with the challenge info returned from the server */
        const signature = await signer.signMessage(challengeInfo.data.challenge.text)
        /* authenticate the user */
        const authData = await client.mutate({
          mutation: authenticate,
          variables: {
            address, signature
          }
        })
        /* if user authentication is successful, you will receive an accessToken and refreshToken */
        const { data: { authenticate: { accessToken }}} = authData
        console.log({ accessToken })
        setToken(accessToken)
        window.localStorage.setItem('your-storage-key', accessToken)
      } catch (err) {
        console.log('Error signing in: ', err)
      }
    }
    ```

    Finally, to get our token, we need to issue a challenge and get the user to sign it using their wallet. To do so, we'll be using the `challenge` and `authenticate` queries we created in `api.js`. Once we get the token, we save it to `localStorage`. Note that we call `setToken(window.localStorage.getItem('your-storage-key'))` in the `useEffect` so that we don't have to re-authenticate every time we refresh the page.

4. Once the user is logged in, we display the top Lens profiles! Getting that information is as simple as calling the `exploreProfiles` query we defined in `api.js`:

    ```javascript
    async function fetchProfiles() {
      try {
        /* fetch profiles from Lens API */
        let response = await client.query({ query: exploreProfiles })
        /* loop over profiles, create properly formatted ipfs image links */
        let profileData = await Promise.all(response.data.exploreProfiles.items.map(async profileInfo => {
          let profile = { ...profileInfo }
          let picture = profile.picture
          if (picture && picture.original && picture.original.url) {
            if (picture.original.url.startsWith('ipfs://')) {
              let result = picture.original.url.substring(7, picture.original.url.length)
              profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
            } else {
              profile.avatarUrl = picture.original.url
            }
          }
          return profile
        }))

        /* update the local state with the profiles array */
        setProfiles(profileData)
      } catch (err) {
        console.log({ err })
      }
    }
    ```

### `lens-app/pages/profile/[handle].js`

The last hook-in to the Lens API is in `[handle].js`. If you notice on line 114 in `index.tsx`, you can navigate to a detailed view of the user's profile. This will simply direct you to `[handle].js`, where we format the data queried from the Lens API:

```javascript
const returnedProfile = await client.query({
  query: getProfile,
  variables: { handle }
})
```

```javascript
const pubs = await client.query({
  query: getPublications,
  variables: {
      id: profileData.id, limit: 50
  }
})
```

### Running the dapp

To see this code in action, simply call `npm run dev`. You can use this as a launching off point for more complex social dapps. If you don't need to write any smart contracts, you can just delete the `truffle` folder.

## `truffle`: your smart contract code

The `truffle` folder contains the set up for if you want to build [Lens modules](https://docs.lens.xyz/docs/module-interfaces) to customize Lens' capabilities. For example, if you wanted to change the comment mechanism such that only NFT holders can comment, you can do that by writing smart contracts to create a [reference module](https://docs.lens.xyz/docs/module-interfaces#reference-modules). Lens will then call into that module at pre-determined points to execute your custom functionality!

Before we dive into creating our own module, let's go over what's in the box so far.

### `truffle/contracts`

This folder contains all the Lens protocol contracts. In order to create a module, we'll be adding a smart contract here under `truffle/contracts/core/modules`.

### `truffle/migrations/1_deploy_lens_protocol.js`

This file deploys all the existing Lens Protocol contracts. There are some key pieces to highlight that are more complex than simply deploying individual contracts.

First off, we specify a few important addresses to take into account:

```javascript
const deployerAddress = accounts[0];
const governanceAddress = accounts[1];
const treasuryAddress = accounts[2];
const proxyAdminAddress = deployerAddress;
const profileCreatorAddress = deployerAddress;
```

Lens Protocol contracts are upgradeable contracts, which you can learn more about in our [3rd episode](https://trufflesuite.com/guides/upgrading-security/) about upgradeble contracts with OpenZeppelin. Because upgradeable contracts are proxy contracts, we must provide an admin, who has the authority to upgrade the contracts should the need arise:

```javascript
await deployer.deploy(TransparentUpgradeableProxy, lensHubImpl.address, proxyAdminAddress, data, { nonce: deployerNonce++ });
```

Moving forward, we only want to interact with the proxy address and _not_ the `LensHub` implementation contract. You can see us create our contract abstraction based off of the proxy in lines 114-116:

```javascript
let proxy = await TransparentUpgradeableProxy.deployed();

let lensHub = await LensHub.at(proxy.address);
```

Additionally, you'll note that we pass in the parameter `data` to our proxy deployment, defined as follows:

```javascript
let data = await web3.eth.abi.encodeFunctionCall({
  "inputs": [
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "symbol",
      "type": "string"
    },
    {
      "internalType": "address",
      "name": "newGovernance",
      "type": "address"
    }
  ],
  "name": "initialize",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, [LENS_HUB_NFT_NAME, LENS_HUB_NFT_SYMBOL, governanceAddress]);
```

We pass in `governanceAddress`, which is the only address that can call certain `LensHub` methods. In order to call a function such that `msg.sender` is `governanceAddress`, you can pass it in by modifying the `from` property like so:

```javascript
await lensHub.whitelistCollectModule(feeCollectModule.address, true, { nonce: governanceNonce++, from: governanceAddress })
```

We'll need to start a local test chain using Ganache to start interacting with this protocol. In addition to deploying each of our contracts, lines 207 to 245 in the migrations file whitelists our module smart contracts so that Lens can call into them.

What's also interesting about this deployment is linking library contracts:

```javascript
console.log('\n\t-- Deploying Hub Implementation --');
await LensHub.link(hubLibs);
await deployer.deploy(LensHub, followNFTImplAddress, collectNFTImplAddress, { nonce: deployerNonce++, gas: 25000000 });
let lensHubImpl = await LensHub.deployed();
```

You cannot deploy contracts that are greater than 24.77 kib in size. In order to get around this restriction, there are two things we do:

1. Extracting functionality out into libraries
2. Optimizing contract compilation in our `truffle-config.js`

    ```javascript
    // Configure your compilers
    compilers: {
      solc: {
        version: "0.8.10",      // Fetch exact version from solc-bin (default: truffle's version)
        // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
        settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        //  evmVersion: "byzantium"
        }
      }
    },
    ```

You can read more about optimizers [here](https://docs.soliditylang.org/en/v0.8.10/internals/optimizer.html). In short, the optimizer attempts to simplify complex code, with the tradeoff being deployment cost against execution cost. If this is off, this contract will fail to deploy!

The last piece that is interesting about this deployment is that we write all the relevant contract addresses to a file named `addresses.json`. This will be used later in our scripts when interacting with the Lens smart contracts.

### truffle/scripts

This folder contains scripts that interact with the Lens protocol. 

In `utils.js`, we create some functions that help us easily retrieve common information. Note that `getAddrs` will read from the file we created in our migration script. Because it calls into the relative file path `./addresses.json`, you have to execute scripts from the root `truffle` folder. Otherwise, the script will fail because it can't find `./addresses.json`.

You can only interact with it when it is unpaused, which you can do by calling `truffle exec scripts/unpause.js` after you've deployed the Lens contracts.

Again, you'll note that we modify the `from` parameter in several contract calls.

1. We send from the governance address when calling functions in `LensHub` contract that contains the `onlyGov` modifier

    ```javascript
    await lensHub.whitelistCollectModule(freeCollectModuleAddr, true, {from: governance});
    ```
2. We send from a user address when calling functions that perform user interactions, such as making a post

    ```javascript
    await lensHub.post(inputStruct, {from: user});
    ```

### `truffle/.env` and `truffle/truffle-config.js`

These two files define the networks that you can deploy the Lens contracts to. You can get the RPC URLs from your Infura account and use the mnemonic from your MetaMask wallet. Be sure to never expose this information!

### Running the protocol

In order to deploy our contracts locally, you need to spin up a local instance of Ganache:

```shell
ganache
```

This will default to port 8545, which is designated as our `development` network in our `truffle-config.js`. Then, to deploy:

```shell
truffle migrate
```

If you want to deploy to other networks, you can run:

```shell
truffle migrate --network <NETWORK_NAME>
```

Because there are so many contracts, compilation will take some time. Do note that every time you run the migration, it will overwrite what contract addreses have been written to `addresses.json`.

## Build your own module

Now, we'll demonstrate how to create a custom module using the Truffle box. In this case, we'll only be working within the `truffle` folder.

The completed code for the module lives [here](https://github.com/truffle-box/lens-box/tree/secretFollowModule).

### Write the module smart contract

Let's customize the Lens follow functionality. Specifically, we want to specify that the user has to enter a password in order for them to follow a particular profile.

Start off by creating a smart contract `truffle/contracts/core/modules/follow/SecretCodeFollowModule.sol`. Then, let's define our imports:

```javascript
pragma solidity 0.8.10;

import {IFollowModule} from '../../../interfaces/IFollowModule.sol';
import {ModuleBase} from '../ModuleBase.sol';
import {FollowValidatorFollowModuleBase} from './FollowValidatorFollowModuleBase.sol';
```

1. `IFollowModule` defines the functions Lens will hook into to customize the follow behavior. To explain the functions it defines:
    - `InitializeFollowModule()` is called when a profile sets this module as its follow module.
    - `ProcessFollow()` is called when a user attempts to follow a given profile with this module set as its follow module.
    - `FollowModuleTransferHook()` is called when a FollowNFT associated with a profile that has this module set as its follow module is transferred
    - `ValidateFollow()` which` is called to validate whether a follow is still valid
2. `ModuleBase` exposes an `onlyHub` modifier and `HUB` address.
3. `FollowValidatorFollowModuleBase` implements `isFollowing, which is one of the functions we need to define in the interface

Now, let's create a contract that inherits these imports:

```javascript
contract SecretCodeFollowModule is IFollowModule, FollowValidatorFollowModuleBase {

}
```

Then, let's define some variables we'll need. We'll create a custom error that indicates the wrong passcode was input and a mapping that associates passwords with profiles.

```javascript
error PasscodeInvalid();

mapping(uint256 => uint256) internal _passcodeByProfile;
```

Then, add `SecretCodeFollowModule`'s constructor, which inherits from `ModuleBase`.

```javascript
constructor(address hub) ModuleBase(hub) {}
```

Finally, we'll implement the interface functions:

```javascript
function initializeFollowModule(uint256 profileId, bytes calldata data)
  external
  override
  onlyHub
  returns (bytes memory)
{
  uint256 passcode = abi.decode(data, (uint256));
  _passcodeByProfile[profileId] = passcode;
  return data;
}

function processFollow(
  address follower,
  uint256 profileId,
  bytes calldata data
) external view override {
  uint256 passcode = abi.decode(data, (uint256));
  if (passcode != _passcodeByProfile[profileId]) revert PasscodeInvalid();
}

function followModuleTransferHook(
  uint256 profileId,
  address from,
  address to,
  uint256 followNFTTokenId
) external override {}
```

Note that we don't implement anything in `followModuleTransferHook` because we don't need to use it! Your final smart contract code should look like this:

```javascript
pragma solidity 0.8.10;

import {IFollowModule} from '../../../interfaces/IFollowModule.sol';
import {ModuleBase} from '../ModuleBase.sol';
import {FollowValidatorFollowModuleBase} from './FollowValidatorFollowModuleBase.sol';

contract SecretCodeFollowModule is IFollowModule, FollowValidatorFollowModuleBase {
    error PasscodeInvalid();

    mapping(uint256 => uint256) internal _passcodeByProfile;

    constructor(address hub) ModuleBase(hub) {}

    function initializeFollowModule(uint256 profileId, bytes calldata data)
        external
        override
        onlyHub
        returns (bytes memory)
    {
        uint256 passcode = abi.decode(data, (uint256));
        _passcodeByProfile[profileId] = passcode;
        return data;
    }

    function processFollow(
        address follower,
        uint256 profileId,
        bytes calldata data
    ) external view override {
        uint256 passcode = abi.decode(data, (uint256));
        if (passcode != _passcodeByProfile[profileId]) revert PasscodeInvalid();
    }

    function followModuleTransferHook(
        uint256 profileId,
        address from,
        address to,
        uint256 followNFTTokenId
    ) external override {}
}
```

### Deploy your new contract!

Let's create a new file `truffle/migrations/2_deploy_SecretCodeFollowModule.js`. As in our previous migration file, we have to define our `LensHub` contract based on the proxy address. Then, in order for us to use the new module, we have to whitelist it, calling the function from the `governanceAddress`.

```javascript
const SecretCodeFollowModule = artifacts.require("SecretCodeFollowModule");
const TransparentUpgradeableProxy = artifacts.require("TransparentUpgradeableProxy");
const LensHub = artifacts.require("LensHub");

module.exports = async function (deployer, networks, accounts) {
  const governanceAddress = accounts[1];
  const proxy = await TransparentUpgradeableProxy.deployed();
  const lensHub = await LensHub.at(proxy.address);

  await deployer.deploy(SecretCodeFollowModule, lensHub.address)
  const secretCodeFollowModule = await SecretCodeFollowModule.deployed();
  await lensHub.whitelistFollowModule(secretCodeFollowModule.address, true, {from: governanceAddress});
}
```

Since we don't want to rerun the first migration, you can use the `--f` flag to specify exactly which migration file you want to execute:

```shell
truffle migrate --f 2
```

### Write a script to test the new module

Now, let's write a script that will call on the new follow functionality. Create a file `truffle/scripts/secret_follow.js`, and add this code:

```javascript
const { defaultAbiCoder } = require('ethers/lib/utils');
const {
  getAddrs,
  initEnv,
  ProtocolState,
  ZERO_ADDRESS,
} = require('./helpers/utils');

const LensHub = artifacts.require("LensHub");
const FollowNFT = artifacts.require("FollowNFT");
const SecretCodeFollowModule = artifacts.require("SecretCodeFollowModule");

const main = async (cb) => {
  try {
    const [governance, , user] = await initEnv(web3);
    const addrs = getAddrs();
    const lensHub = await LensHub.at(addrs['lensHub proxy']);
  
    await lensHub.setState(ProtocolState.Unpaused, {from: governance});
    await lensHub.whitelistProfileCreator(user, true, {from: governance});
    
    // Will fail if you've already minted this profile
    // const inputStruct = {
    //   to: user,
    //   handle: 'zer0dot',
    //   imageURI:
    //     'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
    //   followModule: ZERO_ADDRESS,
    //   followModuleInitData: [],
    //   followNFTURI:
    //     'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
    // };
    // await lensHub.createProfile(inputStruct, {from: user});
  
    const data = defaultAbiCoder.encode(['uint256'], ['42069']);
    const secretCodeFollowModule = await SecretCodeFollowModule.deployed();
    await lensHub.setFollowModule(1, secretCodeFollowModule.address, data, {from: user});
    
    try {
      await lensHub.follow([1], [badData], {from: user, gas: "0xfffff"});
    } catch (e) {
      console.log(`Expected failure occurred! Error: ${e}`);
    }
    await lensHub.follow([1], [data], {from: user});
  
    const followNFTAddr = await lensHub.getFollowNFT(1, {from: governance});
    const followNFT = await FollowNFT.at(followNFTAddr);

    const totalSupply = await followNFT.totalSupply({from: user});
    const ownerOf = await followNFT.ownerOf(1, {from: user});
  
    console.log(`Follow NFT total supply (should be 1): ${totalSupply}`);
    console.log(
      `Follow NFT owner of ID 1: ${ownerOf}, user address (should be the same): ${user}`
    );
  } catch(err) {
    console.log(err);
  }
  cb();
}

module.exports = main;
```

Replace `[SecretFollowModuleAddress]` in line 36 with the contract address. You can easily find it by running `truffle networks`.

If you haven't executed the `create-profile` script yet, you can uncomment the profile creation piece of this code. Otherwise, if you have created a profile, leave that portion commented, since you cannot create two profiles with the same username.

To run, simply call:

```shell
truffle exec scripts/secret_follow.js
```

You should see something a bit like this:

```shell
Using network 'development'.

Expected failure occurred! Error: StatusError: Transaction: 0x1c22b1e9b35d6531b22e22d807d58be55c96a81e343bf2bb3f5bd35145a1b255 exited with an error (status 0). Reason given: Custom error (could not decode).
     Please check that the transaction:
     - satisfies all conditions set by Solidity `require` statements.
     - does not trigger a Solidity `revert` statement.

Follow NFT total supply (should be 1): 1
Follow NFT owner of ID 1: 0xA9A3b27098f4446a1019F75e1164F4ca1980727e, user address (should be the same): 0xA9A3b27098f4446a1019F75e1164F4ca1980727e
```

The first failure is expected because we intentionally input the wrong password!

## Future extensions

So there you have it! We've gone over how to incorporate the Lens API into your dapp frontends and how to customize the Lens functionality by modifying their smart contracts using modules. There are a variety of ways to extend this content, such as creating a more fully fleshed dapp like Twitter or gating Lens actions through NFT ownership. Let us know how you utilized the Lens box by joining our community!

If you want to talk about this content, join our [Discord](https://discord.com/invite/hYpHRjK)! If you need help coding, start a discussion [here](https://github.com/orgs/trufflesuite/discussions/). Lastly, don't forget to follow us on [Twitter](https://twitter.com/trufflesuite) for the latest updates on all things Truffle.