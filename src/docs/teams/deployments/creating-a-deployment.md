---
title: Teams | Creating a deployment
layout: docs.hbs
---

# Creating a deployment

Currently Truffle Teams supports deployments to Ethereum testnets, Ethereum Mainnet, and [sandboxes](/docs/teams/sandboxes/sandboxes-overview) with support for more target networks over time.

Creating a deployment slightly differs depending on which view you have selected for the **<span class="inline-menu-item"><i class="fal fa-parachute-box"></i>DEPLOYMENTS</span>** page. The general process is as follows:

1. [Choose a commit to deploy](#choose-a-commit-to-deploy)
1. [Select network and connect wallet](#select-network-and-connect-wallet)
1. [Select a deployment context](#select-a-deployment-context)
1. [Start deployment](#start-deployment)
1. [Finalize deployment](#finalize-deployment)

## Choose a commit to deploy

This step can differ slightly depending on which deployments view you are using, [cards](#cards-view) or [table](#table-view).

### Cards view

To begin a deployment, press **<span class="inline-button">DEPLOY <i class="far fa-parachute-box"></i></span>** on the build you'd like to deploy. You can also click **<span class="inline-button"><i class="fas fa-rocket"></i> NEW DEPLOYMENT</span>**. The deployment wizard modal will pop-up and walk you through the deployment process.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/commit-card.png" alt="Commit Card">
</figure>

### Table view

For the **TABLE** view, you'll select a build to deploy from within the deployment wizard. To start a deployment, click **<span class="inline-button"><i class="fas fa-rocket"></i> NEW DEPLOYMENT</span>**, this will open the deployment wizard modal. From the **Build to Deploy** dropdown, select which build to deploy.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/table-view-deployment-wizard.png" alt="Table view deployment wizard">
  <figcaption class="text-center font-italic">Deployment wizard</figcaption>
</figure>

## Select network and connect wallet

Within the deployment wizard, select a **Destination Network**, if your wallet has already been setup you can move on to the [Select a deployment context](#select-a-deployment-context) step. If your wallet has not been setup, you'll be able to see and click on the **<span class="inline-button">CONNECT WALLET</span>** button.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/select-network-connect-wallet.png" alt="Deployment wizard modal">
  <figcaption class="text-center font-italic">Deployment wizard</figcaption>
</figure>

MetaMask will pop up asking you to login (if you haven't already). Then you will need to press **Connect** to confirm the connection with Truffle Teams.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/metamask-connect.png" alt="Deployment wizard modal and MetaMask connect pop-up" style="width:100%">
</figure>

If the wizard hasn't changed (i.e. you don't see a button to start deploying), you likely need to switch your MetaMask network to the destination network. This may reload the page; if this happens, you'll need to repeat the steps above.

![MetaMask Network](/img/tutorials/learn-how-to-deploy-with-truffle-teams/metamask-network.png)

Before moving on, make sure you have the correct account selected in MetaMask.

![MetaMask Account](/img/tutorials/learn-how-to-deploy-with-truffle-teams/metamask-account.png)

## Select a deployment context

Now you should see the wizard prompting for a **Deployment Context**. Leave it set to **Create a New Deployment**, or selet a previous deployment to migrate against.

<p class="alert alert-info">
<strong><i class="far fa-info-circle"></i> Deployment Context</strong>: This option will let you select an existing deployment on the same network that you'd like to use the deployed artifacts for. Truffle supports the concept of migrating your application and will only run the new migration scripts from the last deployment (a.k.a. the deployment context). This becomes useful in a handful of scenarios: maybe you added an extra contract to work with your existing deployment, your Truffle project uses proxy contracts to upgrade your contracts, and more. Technically speaking, selecting the Deployment Context will put the Truffle artifacts from the deployment context you selected in the directory before running <code>truffle migrate</code>.
</p>

## Start deployment

Now you should be able to see and click on **<span class="inline-button">OK, START DEPLOYING</span>** to begin your deployment!

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/deployment-wizard-ready.png" alt="Deployment wizard modal ready">
</figure>

<p class="alert alert-warning">
<strong><i class="far fa-exclamation-triangle"></i> Be Aware</strong>: From here on, it's important that you don't close the tab, refresh the page, or lose network connection. We're working on a more robust experience that will enable you to pick up unfinished deployments, but for now our current version requires the tab to stay open and connected.
</p>

Truffle Teams will only process so many deployments at the same time, so you may see that your deployment has been queued. You'll have to wait (without closing/refreshing the tab) for your deployment to get to the front of the list. However, we're working diligently to make this experience more seamless going forward.

Once your deployment has started processing, you'll see a list of steps Truffle Teams is doing to prepare for your deployment.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/deployment-wizard-preparation.png" alt="Deployment wizard preparation steps modal">
</figure>

Once the preparation steps are complete, you'll see a screen with a list of your migrations being processed. You should also get a pop-up from MetaMask for your first transaction.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/deployment-wizard-first-tx.png" alt="Deployment wizard first transaction modal">
</figure>

You'll notice that this interface with MetaMask is like sending a transaction to any other dapp. It's your account that is sending this transaction, and you have complete control of it. Additionally, we highly recommend that you change the **GAS FEE** to be higher so that your transactions run quicker. For testnets like Ropsten, it's affordable to always select the **Fast** option.

![MetaMask Gas](/img/tutorials/learn-how-to-deploy-with-truffle-teams/metamask-gas.png)

Once you're happy with the transaction gas fee, press **Confirm** to send your transaction. Once the transaction is confirmed (the timing of confirmations from MetaMask and Truffle Teams may be slightly offset), you'll receive the next transaction. Repeat this process until you see a message that your deployment is being finalized.

## Finalize deployment

After a short wait, you'll see a window with your deployment results:

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/deployment-wizard-results.png" alt="Deployment wizard results modal">
</figure>

Your contracts are deployed! That was easy. Go ahead and push **<span class="inline-button">GREAT! GO BACK TO WORKFLOW</span>** or the **X** in the wizard. If you're using the **CARDS** view, you should now see a new card under the **Staging** column. If you're using the **TABLE** view, the new deployment will appear in the first row. For more information check out the [Deployment details](/docs/teams/deployments/deployment-details) section of our documentation.
