---
title: Teams | About Deployments
layout: docs.hbs
---
# About Deployments

On the left navigation bar, click the item near the top labelled <span class="inline-menu-item"><i class="fas fa-parachute-box"></i>DEPLOYMENTS</span> next to the parachute icon.

![Deployments Navbar](/img/tutorials/learn-how-to-deploy-with-truffle-teams/deployments-navbar.png)

Here you'll see a list of your repositories. Click on the one you'd like to deploy.

![Repo List](/img/tutorials/learn-how-to-deploy-with-truffle-teams/repo-list.png)

This will bring you to the deployments page. You'll notice there are three columns: **Commits**, **Staging**, and **Production**.

### Commits Column

**Commits** is a list of all the commits that Truffle Teams is processing, or has processed, as a build. Each will have a status icon to show if the build is in progress, failed, or successful. Commits with a successful icon (a green box with a checkmark, as pictured) will be able to be deployed; the parachute icon in the top right of the commit indicates this.

![Commit Card](/img/tutorials/learn-how-to-deploy-with-truffle-teams/commit-card.png)

### Staging and Production Columns

**Staging** contains a list of all testnet (i.e. Ropsten, Görli, Rinkeby, and Kovan) deployments. **Production** contains a list of Mainnet deployments. We'll expand more on how these work later in the tutorial.