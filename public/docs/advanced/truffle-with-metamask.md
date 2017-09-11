# Accessing Smart Contracts in a Browser

To begin interacting with our smart contracts in a browser, first make sure they're compiled, deployed and that we're interacting with them via `web3` in our client-side JavaScript. We recommend using the [truffle-contract library](https://github.com/trufflesuite/truffle-contract), as it makes interacting with contracts easier and more robust.

For more information on these topics, including using `truffle-contract`, check out our [Pet Shop](/tutorials/pet-shop) or [TutorialToken](/tutorials/robust-smart-contracts-with-openzeppelin) Tutorials.

# What is MetaMask?

[MetaMask](https://metamask.io/) is the easiest way to start using Dapps in a browser. It is a Chrome extension that connects to the Ethereum network without running a full node on the browser's machine. It can connect to the Ethereum Main Network; Ropsten, Kovan and Rinkeby testnets; or a local chain such as the TestRPC. For development with Truffle this means we can use our Dapp the same way users will interact with it on a live network.

## Installing Metamask

Currently, MetaMask only supports Google's Chrome browser, but support for Firefox and others is planned for the future.

To install MetaMask, go to the [Chrome Web Store](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) and click the + ADD TO CHROME button.

# Using MetaMask with the TestRPC

With our front-end ready to be used and MetaMask installed, we're ready to see our Dapp in all its glory. Before diving in though, we'll need to make sure we're checking for MetaMask's `web3` instance and the extension itself is configured properly with the TestRPC.

## Detecting MetaMask's Web3 Injection

MetaMask injects its own `web3` instance, so we'll want to make sure we're checking for that. After the window as loaded perform the following check:

```javascript
// Is there is an injected web3 instance?
if (typeof web3 !== 'undefined') {
  App.web3Provider = web3.currentProvider;
  web3 = new Web3(web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fallback to the TestRPC.
  App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
  web3 = new Web3(App.web3Provider);
}
```

## Using the Browser Extension

To use the TestRPC with MetaMask, you'll need to copy the mnemonic phrase given to you when the TestRPC first starts. From there, click the MetaMask icon in your browser and this screen will appear:

<div class="text-center">
  ![MetaMask Unlock](/tutorials/images/pet-shop/metamask-1.png)
  <br/><br/>
</div>

If the network in the upper-left is something other than "Private Network", click it and you'll see a dropdown of possible networks. Select Localhost 8545 to use the TestRPC. If you've set the TestRPC to use a custom port, instead choose Custom RPC and input the full TestRPC URL with port number (for example: `localhost:1234`).

<div class="text-center">
  ![MetaMask Network Choices](/tutorials/images/pet-shop/metamask-2.png)
  <br/><br/>
</div>

Now, you'll need to get the Mnemonic the TestRPC generated when we first started it up. If you don't have it, go to the console window running the TestRPC and scroll to the top. You'll see a heading called HD Wallet and below it Mnemonic. Copy this phrase, then click I forgot my password and paste it in the first field. Now choose a password and click OK.

<div class="text-center">
  ![MetaMask Mnemonic](/tutorials/images/pet-shop/metamask-3.png)
  <br/><br/>
</div>

Now that we've connected MetaMask to the TestRPC, you'll be take to the accounts screen. Each account created by the TestRPC is given 100 Ether. The first account may have less than the others because that account supplies the gas for smart contract deployment.

The plus button below Account 1 will create new accounts, the first 10 of which will correspond to the 10 accounts made by the TestRPC.

<div class="text-center">
  ![MetaMask Account](/tutorials/images/pet-shop/metamask-4.png)
  <br/><br/>
</div>

Now that MetaMask is configured, we can start our web server and actually use the Dapp.
