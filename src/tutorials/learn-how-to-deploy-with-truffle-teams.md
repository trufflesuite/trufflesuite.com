In this tutorial, you'll learn how to deploy your smart contracts to a public Ethereum network using Truffle Teams.

## Prerequisites

This tutorial assumes you've already done the following:
- [Created a Truffle Teams account](https://www.trufflesuite.com/docs/teams/getting-started/creating-an-account)
- Linked a repo that is a truffle project
- Have a build that passed within Truffle Teams
- You have some Ropsten Ether. You can grab some with the [MetaMask Ether Faucet](https://faucet.metamask.io/)
- A stable network connection

## The Deployments Page

Head over to [Truffle Teams](https://my.truffleteams.com).

On the left navigation bar, click the item near the top labelled `DEPLOYMENTS` next to a parachute icon.

![Deployments Navbar](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployments-navbar.png)

Here you'll see a list of your repositories. Click on the one you'd like to deploy.

![Repo List](/img/tutorials/learn-how-to-deploy-with-truffle-teams/repo-list.png)

Here is the deployments page. You'll notice there are three columns: `Commits`, `Staging`, and `Production`.

### `Commits` Column

`Commits` is a list of all the commits that Truffle Teams is processing or has processed as a build. You'll see each will have a status icon to show if the build is in progress, failed, or successful. Commits with a successful icon (a green box with a checkmark as pictured) will be able to be deployed; you'll also notice the parachute icon in the top right of the commit that indicates this.

![Commit Card](/img/tutorials/learn-how-to-deploy-with-truffle-teams/commit-card.png)

### `Staging` and `Production` Columns

`Staging` contains a list of all testnet (i.e. Ropsten, Rinkeby, Kovan, and Görli) deployments. `Production` contains a list of Mainnet deployments. We'll see more how these work later in the tutorial.

## Your First Deployment

Currently, Truffle Teams supports Ethereum Ropsten and Rinkeby testnets (with Görli and Kovan coming soon) and Mainnet. Over time, we'll be adding support to other targets.

In this tutorial we'll be deploying our application to Ropsten.

Press the parachute icon on the commit you'd like to deploy.

![Parachute Callout](/img/tutorials/learn-how-to-deploy-with-truffle-teams/parachute-callout.png)

A wizard will popup; under Destination Network select Ropsten. Then press `Connect Wallet`.

![Deployment Wizard Ropsten Select](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployment-wizard-ropsten-select.png)

MetaMask will popup asking you to login if you aren't already, and then to confirm to connect Truffle Teams. Press Connect.

![MetaMask Connect](/img/tutorials/learn-how-to-deploy-with-truffle-teams/metamask-connect.png)

If the wizard hasn't changed (you don't see a button to start deploying), you likely need to switch your MetaMask network to Ropsten. This may reload the page, and you'll have to repeat the steps above.

![MetaMask Network](/img/tutorials/learn-how-to-deploy-with-truffle-teams/metamask-network.png)

Before moving on, make sure you have the correct account selected in MetaMask.

![MetaMask Account](/img/tutorials/learn-how-to-deploy-with-truffle-teams/metamask-account.png)

Now you should see the wizard prompting for a `Deployment Context`. Leave it set to `Create a New Deployment`. We'll cover what this is later in the tutorial. Press the `OK, START DEPLOYING` button!

![Deployment Wizard Ready](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployment-wizard-ready.png)

From here on, it's important that you don't close the tab, refresh the page, or lose network connection. We're working on a more robust experience for you to pick up unfinished deployments, but our current version requires the tab to stay open and connected.

Truffle Teams can only process so many deployments at the same time, so you may see that your deployment has been queued. You'll have to wait (without closing/refreshing the tab) for your deployment to get to the front of the list. We're working diligently to make this experience better going forward.

Once your deployment has started processing, you'll see a list of steps Truffle Teams is doing to prepare for your deployment.

![Deployment Wizard Preparing](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployment-wizard-preparing.png)

Once the preparation steps are complete, you'll see a screen with the list of your migrations being processed, and you should also get a popup from MetaMask for your first transaction.

![First Transaction](/img/tutorials/learn-how-to-deploy-with-truffle-teams/first-transaction.png)

You'll notice that interface for MetaMask is like sending a transaction to any other dapp. It's your account that is sending this transaction, and you have complete control of it. We highly recommend you change the `GAS FEE` to be higher so that your transactions run quicker. For testnets like Ropsten, it's affordable to always select the `Fast` option.

![MetaMask Gas](/img/tutorials/learn-how-to-deploy-with-truffle-teams/metamask-gas.png)

Once you're happy with the transaction gas fee, press the `Confirm` button to send your transaction. Once the transaction is confirmed (it may be slightly different from when MetaMask confirms it and when Truffle Teams confirms it), you'll receive the next transaction. Repeat this process until you see a message that your deployment is being finalized.

After a short wait, you'll see a window with your deployment results:

![Deployment Results](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployment-results.png)

Go ahead and push the button or the `X` in the wizard. You'll now see a new card in the `Staging` column with the results of your deployment:

![Deployment Card](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployment-card.png)

You can click on the `+ Contracts` bar on the bottom of the card to see a list of your deployed contracts and their addresses:

![Deployment Card Instance Details](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployment-card-instance-details.png)

You can also click the vertical 3 dots in the top right of the card to find a menu. In this menu you can download a ZIP file of your Truffle `.json` artifacts used in your frontend webapp, graduate a deployment to production, or archive the deployment. **Note:** Be careful of the archive feature; we haven't implemented a way to unarchive deployments yet.

![Deployment Card Menu](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployment-card-menu.png)

## Deployment Context

I brushed over the Deployment Context earlier when we were setting up our deployment:

![Deployment Wizard Ready](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployment-wizard-ready.png)

This would usually be used for more advanced Truffle applications which utilize the migration system to iteratively migrate more to the blockchain (rather than starting fresh each deployment).

This option will let you select an existing deployment on the same network you'd like to use the deployed artifacts for. Truffle supports making more migration scripts and only migrating those additional migration scripts (maybe you added an extra contract, or your Truffle project uses proxy contracts to upgrade your contracts). Selecting the Deployment Context will technically put the Truffle artifacts from the deployment context you selected in the directory before running `truffle migrate`.
sdss
## Graduating Deployments

Happy with a particular deployment in `Staging`? You can select the `Graduate` option from the menu to use the same build as the basis of your deployment into Mainnet. Other than selecting a different network in MetaMask, the steps are the same! After you're done you'll see a new deployment in the production section.

![Mainnet Deployment](/img/tutorials/learn-how-to-deploy-with-truffle-teams/mainnet-deployment.pnge)

<div class="post-trufflecon-box mt-5 text-center">
  Get started today with Truffle Teams, and see deployments for yourself!

  <div class="mt-3">
    <a class="btn btn-truffle" href="/teams">Try Truffle Teams Today</a>
  </div>
</div>
