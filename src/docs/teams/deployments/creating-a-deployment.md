---
title: Teams | Creating a deployment
layout: docs.hbs
---
# Creating a deployment

To begin a deployment, press **<span class="inline-button">DEPLOY <i class="far fa-parachute-box"></i></span>**  on the commit you'd like to deploy. Currently Truffle Teams supports Ethereum testnets, Ethereum Mainnet, and [sandboxes](/docs/teams/sandboxes/sandboxes-overview) with support for more target networks over time.

<figure>
  <img class="mb-5" src="/img/docs/teams/commit-card.png" alt="Commit Card">
</figure>

A wizard will pop up; select a Destination Network, then press **<span class="inline-button">CONNECT WALLET</span>**.

![Deployment Wizard Ropsten Select](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployment-wizard-ropsten-select.png)

MetaMask will pop up asking you to login (if you haven't already). Then you will need to press **Connect** to confirm the connection with Truffle Teams.

![MetaMask Connect](/img/tutorials/learn-how-to-deploy-with-truffle-teams/metamask-connect.png)

If the wizard hasn't changed (i.e. you don't see a button to start deploying), you likely need to switch your MetaMask network to the destination network. This may reload the page; if this happens, you'll need to repeat the steps above.

![MetaMask Network](/img/tutorials/learn-how-to-deploy-with-truffle-teams/metamask-network.png)

Before moving on, make sure you have the correct account selected in MetaMask.

![MetaMask Account](/img/tutorials/learn-how-to-deploy-with-truffle-teams/metamask-account.png)

Now you should see the wizard prompting for a **Deployment Context**. Leave it set to **Create a New Deployment**, or selet a previous deployment to migrate against (see below). Then, press **<span class="inline-button">OK, START DEPLOYING</span>**!

<p class="alert alert-info">
<strong><i class="far fa-info-circle"></i> Deployment Context</strong>: This option will let you select an existing deployment on the same network that you'd like to use the deployed artifacts for. Truffle supports the concept of migrating your application and will only run the new migration scripts from the last deployment (a.k.a. the deployment context). This becomes useful in a handful of scenarios: maybe you added an extra contract to work with your existing deployment, your Truffle project uses proxy contracts to upgrade your contracts, and more. Technically speaking, selecting the Deployment Context will put the Truffle artifacts from the deployment context you selected in the directory before running `truffle migrate`.
</p>

![Deployment Wizard Ready](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployment-wizard-ready.png)

<p class="alert alert-warning">
<strong><i class="far fa-exclamation-triangle"></i> Be Aware</strong>: From here on, it's important that you don't close the tab, refresh the page, or lose network connection. We're working on a more robust experience that will enable you to pick up unfinished deployments, but for now our current version requires the tab to stay open and connected.
</p>

Truffle Teams will only process so many deployments at the same time, so you may see that your deployment has been queued. You'll have to wait (without closing/refreshing the tab) for your deployment to get to the front of the list. However, we're working diligently to make this experience more seamless going forward.

Once your deployment has started processing, you'll see a list of steps Truffle Teams is doing to prepare for your deployment.

![Deployment Wizard Preparing](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployment-wizard-preparing.png)

Once the preparation steps are complete, you'll see a screen with a list of your migrations being processed. You should also get a pop-up from MetaMask for your first transaction.

![First Transaction](/img/tutorials/learn-how-to-deploy-with-truffle-teams/first-transaction.png)

You'll notice that this interface with MetaMask is like sending a transaction to any other dapp. It's your account that is sending this transaction, and you have complete control of it. Additionally, we highly recommend that you change the **GAS FEE** to be higher so that your transactions run quicker. For testnets like Ropsten, it's affordable to always select the **Fast** option.

![MetaMask Gas](/img/tutorials/learn-how-to-deploy-with-truffle-teams/metamask-gas.png)

Once you're happy with the transaction gas fee, press **Confirm** to send your transaction. Once the transaction is confirmed (the timing of confirmations from MetaMask and Truffle Teams may be slightly offset), you'll receive the next transaction. Repeat this process until you see a message that your deployment is being finalized.

After a short wait, you'll see a window with your deployment results:

![Deployment Results](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployment-results.png)

Your contracts are deployed! That was easy. Go ahead and push **<span class="inline-button">GREAT! GO BACK TO WORKFLOW</span>** or the **X** in the wizard. You'll now see a new card in the **Staging** column with the results of your deployment:

<figure>
  <img class="mb-5" src="/img/docs/teams/deployment-card.png" alt="Deployment Card">
</figure>

You can click on the **+ Contracts** bar on the bottom of the card to see a list of your deployed contracts and their addresses:

<figure>
  <img class="mb-5" src="/img/docs/teams/deployment-card-expanded.png" alt="Deployment Card Expanded">
</figure>

You can also click the vertical 3 dots in the top right of the card to find a menu. In this menu, you can download a **.zip** file of the Truffle **.json** artifacts used in your frontend webapp, graduate a deployment to production, or archive the deployment.

<p class="alert alert-warning">
<strong><i class="far fa-exclamation-triangle"></i> Be careful</strong> when using the archive feature; we haven't implemented a way to unarchive deployments yet.
</p>

![Deployment Card Menu](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployment-card-menu.png)