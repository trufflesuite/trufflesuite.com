---
title: Teams | Deployments overview
layout: docs.hbs
---

# Deployments overview

Truffle Teams provides a quick and easy interface for deploying your smart contracts to Ethereum testnets, mainnet, and [sandboxes](/docs/teams/sandboxes/sandboxes-overview). On the **<span class="inline-menu-item"><i class="fal fa-parachute-box"></i>DEPLOYMENTS</span>** page, you can toggle between two views: [cards](#cards-view) and [table](#table-view).

## Cards view

The **CARDS** view contains three columns: **Commits**, **Staging**, and **Production**. These columns contain your builds available to be deployed as well as any successful deployments.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/deployments-card-view.png" alt="Deployments cards view" style="width: 100%">
  <figcaption class="text-center font-italic">Deployments cards view</figcaption>
</figure>

### Builds Column

**Builds** is a list of all the builds that Truffle Teams is processing or has processed. Each will have a status icon to show if the build is in progress, failed, or successful. Builds with a successful icon (a green box with a checkmark, as pictured) will be able to be deployed; the **<span class="inline-button">DEPLOY <i class="far fa-parachute-box"></i></span>** button in the top right of the commit indicates this.

<figure>
  <img class="mb-2" src="/img/docs/teams/commit-card.png" alt="Commit Card">
</figure>

### Staging and Production Columns

**Staging** contains a list of all testnet (i.e. Ropsten, Görli, Rinkeby, and Kovan) and sandbox deployments. **Production** contains a list of Mainnet deployments.

## Table view

The **TABLE** view contains a list of all of your successful deployments, regardless of what network they were deployed to. There is a **NETWORK** column that indicates which network the deployment was deployed on.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/deployments-table-view.png" alt="Deployments table view" style="width: 100%">
  <figcaption class="text-center font-italic">Deployments table view</figcaption>
</figure>
