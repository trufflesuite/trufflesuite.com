---
title: Teams | Debugging a Transaction
layout: docs.hbs
---
# Debugging a Transaction

<p class="alert alert-info">
<strong>Note</strong>: Truffle Teams currently only allows you to debug transactions on <a href="/docs/teams/sandboxes/sandboxes-overview">Ganache sandboxes</a>. Support for public networks (such as the <code>Görli</code> testnet or <code>mainnet</code>) will be available soon.
</p>

The debugger is accessed from the DEPLOYMENTS tab. From here, [select the deployment](/docs/teams/deployments/deployment-details) which included the contracts that received the transaction that you are looking to debug. In the example screenshot below, this is `deployment-01`.

<figure class="screenshot">
  <img class="figure-shadow mb-2 w-100" src="/img/docs/teams/debugger-deployments.png" alt="Teams Deployments">
  <figcaption class="text-center">The Truffle Teams Deployments screen.</figcaption>
</figure>

At this screen, you can either click **<span class="inline-button"><i class="fas fa-heart-rate"></i> MONITOR</span>**  to the right of the contract to view transactions sent solely to that contract address, or the **TRANSACTIONS** tab to view all the transactions associated with the entire deployment.

<figure class="screenshot">
  <img class="figure-shadow mb-2 w-100" src="/img/docs/teams/debugger-deployment.png" alt="Teams Deployment">
  <figcaption class="text-center">The Truffle Teams Deployment screen.</figcaption>
</figure>

Assuming your contract(s) have received one or more transactions you will now see a list similar to the screenshot below.

<figure class="screenshot">
  <img class="figure-shadow mb-2 w-100" src="/img/docs/teams/debugger-monitoring-transactions.png" alt="Teams Transaction Monitoring">
  <figcaption class="text-center">The Truffle Teams Transaction Monitoring screen.</figcaption>
</figure>

The debugger can be started by clicking on the **<span class="inline-button"><i class="fas fa-debug"></i> DEBUG</span>** button located on the right-hand-side of a given transaction.
