---
title: Teams | Deploying to a sandbox
layout: docs.hbs
---
# Deploying to a sandbox

To deploy to a sandbox, be sure that you have already created a sandbox, or head to the <a href="/docs/teams/sandboxes/creating-a-sandbox">Creating a sandbox</a> section of our documentation for more information.

Follow the initial steps in <a href="/docs/teams/deployments/creating-a-deployment">Creating a Deployment</a> to start a deployment. When selecting the **Destination Network**, you'll see the name of your available sandboxes in the dropdown.

The **Deployment Account** section that appears after selecting a sandbox allows you to specify which of the 10 auto-generated accounts to use for the deployment. By selecting one of these accounts, all transactions will automatically be confirmed using the specified account. You can optionally select **MetaMask** to confirm your own transactions through MetaMask like you would for any other network.

## Using MetaMask with sandbox deployments

If you're deploying to a sandbox using MetaMask as the **Deployment Account**, then you have to connect the sandbox instance to MetaMask. Click **<span class="inline-menu-item"><i class="far fa-cubes"></i>SANDBOXES</span>** and copy the **RPC URL** of the sandbox you'd like to deploy to. Open MetaMask and save the RPC URL as a **Custom RPC**.
