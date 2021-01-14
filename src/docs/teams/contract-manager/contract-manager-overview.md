---
title: Teams | Contract manager overview
layout: docs.hbs
---

# Contract manager overview

The contract mananger provides a user-friendly interface for interacting with your deployed contract instances. It enables you to view the current state of a contract and interact with a contracts functions.

<figure class="screenshot">
  <img class="img-fluid" src="/img/docs/teams/contract-manager-01.png" title="Truffle Teams contract manager view" alt="Truffle Teams contract manager view" />
  <figcaption class="text-center">Contract manager</figcaption>
</figure>

<p class="alert alert-info">
<strong>Note</strong>: The contract manager is currently available as part of our <strong>Early Access</strong> program, which when enabled gives you access to cutting-edge and potentially unstable features. It requires opting-in; navigate to your account settings by clicking on your username or GitHub avatar in the sidebar. Click <strong>ADVANCED</strong> and choose <strong>Early Access</strong>.</p>

## Getting started

To use the contract manager, you must have a deployed contract instance. If you need help deploying a contract, check out the <a href="/docs/teams/deployments/creating-a-deployment">Creating a Deployment</a> section to learn more. Once you've deployed your contract, navigate to the **<span class="inline-menu-item"><i class="fal fa-parachute-box"></i>DEPLOYMENTS</span>** page, toggle to **TABLE** view, and select the deployment from your list of deployments. On the chosen deployment page, under the **CONTRACTS** tab, you can chose a contract to interact with by clicking on **<span class="inline-button"><i class="far fa-pager"></i> MANAGE</span>**.

Once you've successfully navigated to the contract manager, you'll see two sections: **State** and **Functions**. The **State** section provides a quick glance at all of the public state variables in your contract. The **Functions** section allows you to interact with your deployed contract instance. To learn more on how to interact with your public contract functions, take a look at the <a href="/docs/teams/contract-manager/interacting-with-functions">Interacting with functions</a> section.
