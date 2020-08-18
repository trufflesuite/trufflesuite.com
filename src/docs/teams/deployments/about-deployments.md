---
title: Teams | About Deployments
layout: docs.hbs
---
# About Deployments

On the left navigation bar, click the item near the top labelled <span class="inline-menu-item"><i class="fal fa-parachute-box"></i>DEPLOYMENTS</span> next to the parachute icon. This will bring you to the deployments page. You'll notice there are three columns: **Commits**, **Staging**, and **Production**.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/deployment-manager.png" alt="Deployment Manager" style="width: 100%">
  <figcaption class="text-center font-italic">The main deployments screen</figcaption>
</figure>

### Commits Column

**Commits** is a list of all the commits that Truffle Teams is processing, or has processed, as a build. Each will have a status icon to show if the build is in progress, failed, or successful. Commits with a successful icon (a green box with a checkmark, as pictured) will be able to be deployed; the <span class="inline-button">DEPLOY <i class="far fa-parachute-box"></i></span> button in the top right of the commit indicates this.

<figure>
  <img class="mb-2" src="/img/docs/teams/commit-card.png" alt="Commit Card">
</figure>

### Staging and Production Columns

**Staging** contains a list of all testnet (i.e. Ropsten, Görli, Rinkeby, and Kovan) and sandbox deployments. **Production** contains a list of Mainnet deployments.