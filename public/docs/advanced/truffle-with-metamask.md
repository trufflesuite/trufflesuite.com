# Truffle and MetaMask: Working with smart contracts in a browser

Before you can interact with smart contracts in a browser, make sure they're compiled, deployed, and that you're interacting with them via `web3` in client-side JavaScript. We recommend using the [truffle-contract library](https://github.com/trufflesuite/truffle-contract), as it makes interacting with contracts easier and more robust.

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

## Using MetaMask with Truffle Develop

Truffle Develop runs an in-memory blockchain that is used for testing purposes. It runs on `localhost:9545`.

With our front-end ready to be used and MetaMask installed, we're ready to see our dapp in all its glory. Before diving in though, we'll need to make sure we're checking for MetaMask's `web3` instance and the extension itself is configured properly with Truffle Develop.

### Detecting MetaMask's web3 injection

MetaMask injects its own `web3` instance, so we'll want to make sure we're checking for that. After the window has loaded perform the following check:

```javascript
// Is there is an injected web3 instance?
if (typeof web3 !== 'undefined') {
  App.web3Provider = web3.currentProvider;
  web3 = new Web3(web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fallback to Truffle Develop.
  App.web3Provider = new web3.providers.HttpProvider('http://localhost:9545');
  web3 = new Web3(App.web3Provider);
}
```

### Interacting with MetaMask

To use Truffle Develop with MetaMask, click the MetaMask icon in your browser and this screen will appear:

![MetaMask initial screen](/tutorials/images/pet-shop/metamask-initial.png)

*MetaMask initial screen*

Click **Import Existing DEN**. In the box marked **Wallet Seed**, enter the mnemonic that was displayed when launching Truffle Develop. This can be found on the console (you may need to scroll up). Enter a password below that and click **OK**.

![MetaMask seed phrase](/tutorials/images/pet-shop/metamask-seed.png)

*MetaMask seed phrase*

Now we need to connect MetaMask to the blockchain created by Truffle Develop. Click the menu that shows "Main Network" and select **Custom RPC**.

![MetaMask network menu](/tutorials/images/pet-shop/metamask-networkmenu.png)

*MetaMask network menu*

In the box titled "New RPC URL" enter `http://localhost:9545` and click **Save**. 

![MetaMask Custom RPC](/tutorials/images/pet-shop/metamask-customrpc.png)

*MetaMask Custom RPC*

The network name at the top will switch to say "Private Network". 

Click the left-pointing arrow next to "Settings" to close out of the page and return to the Accounts page.

Now that we've connected MetaMask to the TestRPC, you'll be take to the accounts screen. Each account created by the TestRPC is given 100 ether. The first account should have less than the others because that account supplies the gas for smart contract deployment. Since you've deployed your smart contract to the network, this account paid for it.

Click the account icon in the upper-right to create new accounts, the first 10 of which will correspond to the 10 accounts displayed when you launched Truffle Develop.

![MetaMask account](/tutorials/images/pet-shop/metamask-account1.png)

*MetaMask account*

## Using MetaMask with the TestRPC

Using MetaMask with the TestRPC is very similar to working with Truffle Develop. There are some important differences:

* TestRPC generates a new mnemonic upon every launch, while Truffle Develop uses the same mnemonic each time.
* TestRPC runs by default on `localhost:8545` instead of Truffle Develop's `localhost:9545`.
