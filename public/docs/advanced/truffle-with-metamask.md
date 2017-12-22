# Truffle and MetaMask

Before you can interact with smart contracts in a browser, make sure they're compiled, deployed, and that you're interacting with them via `web3` in client-side JavaScript. We recommend using the [truffle-contract](https://github.com/trufflesuite/truffle-contract) library, as it makes interacting with contracts easier and more robust.

<p class="alert alert-info">
<strong>Note</strong>: For more information on these topics, including using `truffle-contract`, check out our [Pet Shop](/tutorials/pet-shop) or [TutorialToken](/tutorials/robust-smart-contracts-with-openzeppelin) tutorials.
</p>

Once you've done the above, you're ready to use MetaMask.

## What is MetaMask?

[MetaMask](https://metamask.io/) is the easiest way to interact with dapps in a browser. It is an extension for Chrome or Firefox that connects to an Ethereum network without running a full node on the browser's machine. It can connect to the main Ethereum network, any of the testnets (Ropsten, Kovan, and Rinkeby), or a local blockchain such as the one created by [Ganache](/ganache) or Truffle Develop.

![MetaMask](/docs/img/metamask.png)

For development with Truffle this means we can use our dapp the same way users will interact with it on a live network.

## Installing MetaMask

* To install MetaMask for Chrome, go to the [Chrome Web Store](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) and click the **Add to Chrome** button.

* To install MetaMask for FireFox, go to the [Firefox Add-ons page](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/) and click the **Add to Firefox** button.

With our front-end ready to be used and MetaMask installed, we're ready to see our dapp in all its glory.

## Using MetaMask with Ganache

[Ganache](/ganache) is a graphical application that runs a blockchain that can be used for testing purposes. It runs on `127.0.0.1:7545`.

<p class="alert alert-info">
**Note**: We recommend specifying `127.0.0.1` instead of `localhost` because the address does not require a network connection and so is more suitable for development.
</p>

### Detecting MetaMask's web3 injection

Before diving in, we'll need to make sure the dapp is checking for MetaMask's `web3` instance and that the extension itself is configured properly with Ganache.

MetaMask injects its own `web3` instance, so we'll want to make sure we're checking for that. After the window has loaded perform the following check:

```javascript
// Is there is an injected web3 instance?
if (typeof web3 !== 'undefined') {
  App.web3Provider = web3.currentProvider;
  web3 = new Web3(web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fallback to Ganache.
  App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
  web3 = new Web3(App.web3Provider);
}
```

### Setting up MetaMask

To use Ganache with MetaMask, click the MetaMask icon in your browser and this screen will appear:

![MetaMask initial screen](/tutorials/images/pet-shop/metamask-initial.png)

*MetaMask initial screen*

Click **Import Existing DEN**. In the box marked **Wallet Seed**, enter the mnemonic that was displayed when launching Ganache. While this can be changed in the Settings, the default is:

```shell
candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```

<p class="alert alert-danger">
**Warning**: Do not use this mnemonic on the main Ethereum network (mainnet). If you send ETH to any account generated from this mnemonic, you will lose it all!
</p>

Enter a password below that and click **OK**.

![MetaMask seed phrase](/tutorials/images/pet-shop/metamask-seed.png)

*MetaMask seed phrase*

Now we need to connect MetaMask to the blockchain created by Ganache. Click the menu that shows "Main Network" and select **Custom RPC**.

![MetaMask network menu](/tutorials/images/pet-shop/metamask-networkmenu.png)

*MetaMask network menu*

In the box titled "New RPC URL" enter `http://127.0.0.1:7545` and click **Save**.

<!--Add image from pet shop tutorial when updated for Ganache -->

The network name at the top will switch to say "Private Network". Click the left-pointing arrow next to "Settings" to close out of the page and return to the Accounts page.

Now that we've connected MetaMask to Ganache, you'll be take to the accounts screen. Each account created by Ganache is given 100 ether. The first account should have less than the others because that account supplies the gas for smart contract deployment. Since you've deployed your smart contract to the network, this account paid for it.

Click the account icon in the upper-right to create new accounts, the first 10 of which will correspond to the 10 accounts displayed when you launched Ganache.

![MetaMask account](/tutorials/images/pet-shop/metamask-account1.png)

*MetaMask account*

## Using MetaMask with Truffle Develop

Truffle Develop is a command-line application that runs a temporary blockchain that is also used for testing purposes. It runs on `127.0.0.1:9545`.

<p class="alert alert-info">
**Note**: We recommend specifying `127.0.0.1` instead of `localhost` because the address does not require a network connection and so is more suitable for development.
</p>

Using MetaMask with Truffle Develop is very similar to that of Ganache. There are only a few notable differences:

* The mnemonic is always `candy maple cake sugar pudding cream honey rich smooth crumble sweet treat` and can't be changed.
* Truffle Develop runs by default on `127.0.0.1:9545`, so you'll want to edit the above web3 code to say:

  ```javascript
  // Is there is an injected web3 instance?
  if (typeof web3 !== 'undefined') {
    App.web3Provider = web3.currentProvider;
    web3 = new Web3(web3.currentProvider);
  } else {
    // If no injected web3 instance is detected, fallback to Truffle Develop.
    App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:9545');
    web3 = new Web3(App.web3Provider);
  }
  ```

* In MetaMask, when entering the "New RPC URL", enter `http://127.0.0.1:9545`.

## Using MetaMask with Ganache CLI

Using MetaMask with Ganache CLI is also very similar to that of Ganache. There are only a few notable differences:

* Ganache CLI runs by default on `http://127.0.0.1:8545` so you'll want to edit the above web3 code to say:

  ```javascript
  // Is there is an injected web3 instance?
  if (typeof web3 !== 'undefined') {
    App.web3Provider = web3.currentProvider;
    web3 = new Web3(web3.currentProvider);
  } else {
    // If no injected web3 instance is detected, fallback to Ganache CLI.
    App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:8545');
    web3 = new Web3(App.web3Provider);
  }
  ```

* In MetaMask, when entering the "New RPC URL", enter `http://127.0.0.1:8545`.
