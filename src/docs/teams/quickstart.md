---
title: Teams | Truffle Teams Quickstart
layout: docs.hbs
---

# Truffle Teams Quickstart

This page will take you through the basics of creating a Truffle Teams account and linking it to a Truffle project repository.

<p class="alert alert-info">
<strong>Note</strong>: Before you begin, make sure that you have a GitHub repository containing a Truffle project.
</p>

## Table of Contents

1. [Creating an Account](#creating-an-account)
1. [Starting Builds](#starting-builds)
1. [Deploying Contracts](#deploying-contracts)

## Creating an Account

To start, navigate to <a href="https://my.truffleteams.com" target="_blank">https://my.truffleteams.com (this link will open in a new window)</a>. Click on **<span class="inline-button"><i class="fab fa-github"></i> LOGIN WITH GITHUB</span>**. If you're not already logged in to your GitHub account, Github will prompt you to do so.

If you are a member of any organizations other than your personal account, you'll be prompted to select an org to continue with installation. Orgs with an existing Truffle Teams installation will have a **Configure >** link.

![Truffle Teams DATA view](/img/docs/teams/install-01.png)

Next you'll be asked for permission to link Truffle Teams to one or more of your GitHub repositories. Select the repositories you wish to add and click continue. Select either **All repositories** to add all repos in this account/org to teams or **Only select repositories** to select individual repos from the dropdown.

<p class="alert alert-info">
<strong>Note</strong>: We can always add a repo later if necessary. See the <a href="/docs/teams/getting-started/adding-repositories">Adding Repositories</a> documentation for more informaiton.
</p>

Finally, click **Install** to install Truffle Teams on the selected repositories.

<p class="alert alert-warning">
<strong>Why do we need certain permissions?</strong> Please see the <a href="/docs/teams/reference/permissions-disclosure">Permissions Disclosure</a> section for a full breakdown of why we're asking for each permission.
</p>

![Truffle Teams DATA view](/img/docs/teams/install-03.png)

We then arrive at the home screen and see the repos we've added--let's commit some code and see how Truffle Teams will automatically run our tests!

## Starting Builds

Builds will start automatically once a new commit is pushed to any branch of a repository added to Truffle Teams. You will see the build queued in both the Truffle Teams interface on the `BUILDS` page and on GitHub with the commit itself.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/starting-builds-comp.png" alt="Build in Progress in both Truffle Teams and GitHub" style="width: 100%">
</figure>

## Deploying Contracts

Please see our detailed tutorial, ["Learning to Deploy with Truffle Teams"](https://www.trufflesuite.com/tutorials/learn-how-to-deploy-with-truffle-teams).

## Continue Learning

This quickstart showed you the basics of the Truffle Teams testing workflow, but once your contracts are deployed there's more to learn about **[monitoring deployed contracts](/docs/teams/contracts/contract-monitoring)**.

We're in a cycle of rapid development; constantly adding new features and refining existing ones. If you run into any glitches or bugs, please [raise an issue on the Truffle Teams GitHub repository](https://github.com/trufflesuite/truffle-teams/issues). To get notified of the latest updates consider [signing up for the Truffle Teams mailing list](https://share.hsforms.com/1OaTglVhGTdWk7spR6nE_AA34pbp).
