---
title: Introducing Truffle Dashboard - Stop copy + pasting your private keys!
hide:
  - navigation
---

<!-- ![truffle dashboard banner](./ganache-v7.png) -->

...

**By [Kingsley Arinze](https://twitter.com/heydamali)**

One of our core missions at Truffle is to make the right developer tooling available to builders in the web3 space while putting security at the forefront. Among the many requirements smart contract developers have for their tools, they require that these tools are safe and are able to keep sensitive information secret, reducing their chances of being compromised during development. 

If you’ve ever had to deploy a smart contract, chances are you’ve had to think twice about sharing your private keys with Truffle or other development tools or be vigilant to not accidentally share and compromise those keys on GitHub. To deploy smart contracts to an Ethereum network (mainnet, testnet, or a local blockchain on Ganache), you need to copy your wallet mnemonic phrase or private key and store it in an insecure location to share with a tool like HDWalletProvider. The mnemonic or private key gives Truffle the permissions it needs to sign transactions on your behalf. 

Storing one’s mnemonic seed phrase or private keys in regular files poses a considerable security concern. Your seed phrase can easily be hijacked by JavaScript code, accidentally committed to git or targeted by bad actors.

## Enter Truffle Dashboard 🔥 🚀

Truffle Dashboard is a tool that completely removes the need to manually interact with your wallet's mnemonic phrase or private keys throughout the development lifecycle. Truffle won't ever need to know what they look like, all while being able to safely deploy to your network of choice. It seamlessly connects to your MetaMask wallet without any configuration. The dashboard uses the MetaMask’s currently logged-in user's account mnemonic seed phrase or private keys and the selected Ethereum network as Truffle's default deployment configuration.

To make things more interesting, you can use the Truffle Dashboard with any development tool. For example, if you use  Hardhat or Foundry to develop your smart contracts, you can also integrate with  Truffle Dashboard for the improved security workflow. See the ["Using Truffle Dashboard with other development tools"](/docs/truffle/getting-started/using-the-truffle-dashboard) section to learn how.

## How does Truffle Dashboard Work? ⚙️🔧

To get started with using the Truffle Dashboard as an existing Truffle user, you want to first uninstall your existing instance of Truffle globally. Then, install the latest version by running the commands:

```console
npm uninstall -g truffle
npm install -g truffle
```

New Truffle users can run only the second command. It is important to note that Truffle dashboard is a minor release.

## Running Truffle Dashboard 🚀

With the latest version of Truffle, in addition to all previously existing `truffle . . .` commands, you will see a new `truffle dashboard` command. 

Running `truffle init` walks you through the process of setting up a new truffle project. 

Running `truffle dashboard` in a separate terminal window starts a dashboard at `http://localhost:24012` and opens the Dashboard in a new tab in your default browser.

...

You can also configure the port and host to run the dashboard in two ways:

On the command line:
		`truffle dashboard --port <Port of choice> --host <Host of choice>`

In your truffle configuration (truffle-config.js) file:
```js 
module.exports = { 
. . .
 dashboard: { 
port: 25012, 
host: "localhost"
} 
} 
```

## Connecting your wallet and confirming the selected network on Truffle Dashboard 🤝

Truffle Dashboard requires you to connect your wallet to get started. Click the `Connect Wallet` button and connect Truffle Dashboard to your wallet the same way you would for any other dapp.

...

Next, Truffle Dashboard prompts you to confirm that you are connected to the correct network, since it uses the wallet's default active network. Make sure you switch to the desired network before confirming. Every transaction you process will be sent to the confirmed network.

...

During development, a typical workflow is first to deploy and test out your smart contract code on a development blockchain like [Ganache](https://trufflesuite.com/ganache) before deploying to your favorite test network. 

You can still maintain this workflow with Truffle Dashboard by simply importing Ganache’s local blockchain network into your MetaMask wallet as usual and pointing Truffle Dashboard to use it as your confirmed network.

...

## Connecting your Truffle project to Truffle Dashboard 🎉

Before Truffle Dashboard was available, if you wanted to connect to a network like Rinkeby or Mainnet from your Truffle project, you had to specify some configuration variables in the network section of the truffle-config.js file.

```js
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" 
    },
    ropsten: {
     . . .
    },
   mainnet: {
    . . .
   }
  }
};
```

With Truffle Dashboard, you do not need any of that as Truffle now exposes a built-in network named "dashboard" which runs on whatever port and host your Truffle Dashboard is running on (`http://localhost:24012 by default). With Truffle Dashboard running and connected to your MetaMask wallet and network of choice, you can simply supply the `dashboard` keyword to any Truffle command that requires you to specify a network. For example:

```
truffle migrate --network dashboard
truffle console --network dashboard
```

When you run the above commands or any RPC request, they are forwarded to the Truffle Dashboard, where you can inspect and process them with MetaMask by accepting or declining that request.

...

As with every zero-configuration feature, you are allowed to override the default configuration by adding a network called `dashboard` to your Truffle configuration file and specifying its options as you would for any other network:

```js
module.exports = {
  . . .
  networks: {
    . . .
    dashboard: {
      mnemonic: <value>,
      chainId: <value>
      . . .
    },
  },
  dashboard: {
      port: <port>,
      host: <host>
    }
};
```

## Using Truffle Dashboard with other development tools 👪

Although we developed the Truffle Dashboard intending to improve the development experience for those who choose to build with Truffle, we made sure to make it tool agnostic. So if Truffle isn't your development tool of choice for developing smart contracts (why on earth should it not be? C'mon, now let's talk!), but you'd like to integrate the Dashboard into your workflow, we've got you covered.

You can use the Truffle Dashboard with other development tools. For example, you can use it with Hardhat by simply starting it on a separate terminal window and adding a network configuration option that points to the Dashboard's RPC URL in your Hardhat config file:

```js
module.exports = {
  ...
  networks: {
    ...
    'dashboard': {
      url: "http://localhost:24012/rpc"
    }
  },
};
```
With this setup, when you run the command `hardhat deploy --network dashboard`, the request is forwarded to the Dashboard where you can inspect and process them.

## Conclusion ❤️️

With Truffle Dashboard, you no longer have to worry about giving your private keys to someone else's javascript application during development. You can now relax and leave it up to MetaMask to keep your private keys safe and sign transactions on your behalf.

The Truffle Dashboard was borne out of our years of experience working on developer tools for the Ethereum ecosystem and receiving valuable feedback from our users. We were excited to build this out. We hope you're as excited to try it out.

Download the Truffle Dashboard today by running the command `npm uninstall -g truffle && npm install -g truffle` as an existing Truffle user or `npm install -g truffle` as a new user. See documentation for more information on getting started.

We are curious to hear what you think about it. Shoot us a tweet @trufflesuite.

With ❤️️ from the Truffle team.
