<div class="post-trufflecon-box mb-5">
  **[TruffleCon 2019](https://www.trufflesuite.com/trufflecon2019)** is happening August 2-4 on Microsoft’s campus in Redmond, WA. This year’s event will include 60+ speakers from the blockchain ecosystem, along with hands-on workshops geared toward novice users and expert builders alike. The Truffle team is ramping up for TruffleCon 2019 by writing a daily blog post about everything that’s on our minds. We hope you enjoy and we’ll see you in Redmond!

  <div class="text-center">
    <a class="btn btn-truffle mt-3" href="/trufflecon2019">Get your Ticket for TruffleCon 2019 Today</a>
  </div>
</div>

**TL;DR** - Deploying your contracts shouldn't be difficult, and should be flexible. I give a sneak peek at the next feature we're building: an **easy to use interface to deploy your Truffle projects with [Truffle Teams](https://trufflesuite.com/teams)**! It's going to be awesome, and **you can be the first to use it**! I'll be giving a **workshop (9AM-12PM on Friday, 8/2) at [TruffleCon 2019](https://www.trufflesuite.com/trufflecon2019)** which goes through the entire Truffle Teams lifecycle, including the **never-before-used Deployments interface**! See you there!

---

You've finished implementing your dApp, you've tested it on [Ganache](https://trufflesuite.com/ganache), and you're ready to push it to a testnet or Mainnet! Congratula—oh wait.

![One Does Not Simply Deploy to Mainnet](https://i.imgflip.com/35r219.jpg)

It's not that easy.

There are a handful of solutions, and none have _really_ made it painlessly easy. Even our own `truffle migrate` (aka `truffle deploy`) is still sub-optimal.

Well it's about to get a whole lot easier with Truffle Teams. [Skip to the good stuff.](#truffle-teams)

## The Not-So-Easy Ways to Deploy Your Smart Contracts

So what's wrong with what's already made? Why make _yet another_ tool? I hear you. Let's take a look at what **is** available, and if you're still meh, I'd love to talk to you at [TruffleCon](https://trufflesuite.com/trufflecon2019)!

<h3 class="link-markdown">
  <a href="#remix" name="remix">
    <i class="fas fa-link">
    </i>
  </a>
  <div>
    <span>Remix</span>
    <img style="margin: 0 !important; display: inline-block !important;" src="/img/blog/an-easier-way-to-deploy-your-smart-contracts/remix-logo.svg"  width="40px" title="Remix" alt="Remix">
  </div>
</h3>

![Remix IDE](/img/blog/an-easier-way-to-deploy-your-smart-contracts/remix.png)

Oh [Remix](https://remix.ethereum.org), we all have fond memories of you. And many people still use Remix for all sorts of use cases! Remix gives you an in-browser Ethereum IDE, letting you develop, compile, test, debug, and deploy smart contracts for Ethereum. And it's probably the least amount of work needed to throw a single smart contract (i.e. only 1 `.sol` file) onto a testnet or Mainnet.

Remix (apparently they just released a new layout of the app; I'm basing this on the `0.7.7` version) gives you a simple `Deploy` button. This will send a transaction to a `web3` provider of your choice (many use [MetaMask](https://metamask.io)), and you're off to the races!

Great, right?

Well, Remix gets harder to use as you add more contracts, import 3rd party contracts, etc. It's definitely flexible and able to handle these, but it's not my personal preference to develop large, complex dApps.

<h3 class="link-markdown">
  <a href="#truffle-cli" name="truffle-cli">
    <i class="fas fa-link">
    </i>
  </a>
  <div>
    <span>Truffle CLI</span>
    <img style="margin: 0 !important; display: inline-block !important;" src="/img/truffle-logo-light.svg"  width="50px" title="Truffle" alt="Truffle">
  </div>
</h3>

Enter [Truffle](https://trufflesuite.com/truffle).

It's a fantastic (not to toot our own horns) framework that lets you develop in a flexible and extensible way. It provides structure (sure, you can call this opinionated) to keep a sane way to manage this chaotic world of Web 3.0.

It even gives you a mechanism to define what deploying (or what Truffle calls: migrating) means for your application. You can specify what contracts get deployed in which order, with whatever arguments (maybe they depend on the deployment of a past contract).

**And it's as easy as running `truffle migrate`!**

![Running `truffle migrate`](/img/blog/an-easier-way-to-deploy-your-smart-contracts/truffle.png)

And if you were deploying to [Ganache](https://trufflesuite.com/ganache), that'd be entirely true, with very minimal amount of configuration.

But that's not the case when we start talking about testnets or Mainnet.

The **easiest** way to deploy to an external network is by using [Truffle's HD Wallet Provider](https://www.trufflesuite.com/docs/truffle/reference/configuration#providers). However, this requires you to somehow get your mnemonic or private key into the `truffle-config.js` config file, **without committing it to your provider source control provider (PLEASE don't do this). To use an account you created with MetaMask, you'd need to go to MetaMask, export your private key (or your mnemonic 😱), and creating the boilerplate code to read in the key from the environment variable.

This isn't that bad, but it's also a bit too much config for me. I'd much rather use MetaMask directly to authenticate.

### Custom Management Web Interface

Some devs will create a small front-end web interface which uses `web3` JS calls to deploy their smart contracts. I have done this personally in my [Game of Thrones Death Pool](https://seesemichaelj.github.io/game-of-thrones-death-pool) project, and I chalked it up to "well I can put this on a website and others can deploy their own versions."

![Custom Management Web Interface for GoT Death Pool](/img/blog/an-easier-way-to-deploy-your-smart-contracts/got-death-pool.png)

Sometimes this is necessary, but it's more work if it's not absolutely needed for your application.

## My Version of an Ideal Deployment Interface

In an ideal world, I'd like these features in a deployment interface:

<ul>
  <li>Let's you use MetaMask directly for signing transactions
    <ul>
      <li style="margin-bottom: 0 !important;">Remix ✔️ | Truffle CLI ❌ | Custom Webapp ✔️</li>
      <li>A bonus win here is support for Ledger and Trezor wallets!</li>
    </ul>
  </li>
  <li>I can use a framework/toolset/etc. that lets me build complex apps and supports complex deployment processes
    <ul>
      <li>Remix ❌ | Truffle CLI ✔️ | Custom Webapp ✔️</li>
    </ul>
  </li>
  <li>I don't need to do a lot of work to go from finishing development to deploying
    <ul>
      <li>Remix ✔️ | Truffle CLI ✔️ | Custom Webapp ❌</li>
    </ul>
  </li>
</ul>

<h3 class="link-markdown">
  <a href="#truffle-teams" name="truffle-teams">
    <i class="fas fa-link">
    </i>
  </a>
  <div>
    <span>Introducing: Truffle Teams Deployments</span>
    <img style="margin: 0 !important; display: inline-block !important;" src="/img/tt-logomark.svg"  width="50px" title="Truffle Teams" alt="Truffle Teams">
  </div>
</h3>

If you haven't heard about our latest tool, [Truffle Teams](https://trufflesuite.com/teams), you really should check it out. Truffle Teams gives you zero-config Continuous Integration (CI) for your Truffle projects, and it also lets you monitor your deployed contracts. Truffle Teams is our solution to taking the power our other tools provide and meshing them into a cohesive application that enables collaboration within teams (even teams of 1!).

!["Truffle Teams Builds"](/img/blog/an-easier-way-to-deploy-your-smart-contracts/teams-build.png)

The next big feature we're working on is Deployments. We already compile your contracts from your Truffle project for you when you make a commit to GitHub; why can't we migrate/deploy them as well? Further, Truffle Teams is a web application, allowing for easy integration with [MetaMask](https://metamask.io).

We've looked at this from a [DevOps](https://en.wikipedia.org/wiki/DevOps) perspective, and we're trying to create an extensible system that will support projects and teams of **any size**.

### Connect Your GitHub Repository to Truffle Teams

Unfortunately, we only support GitHub repositories (if you want support for something else, please add your preference [here](https://github.com/trufflesuite/truffle-teams/issues/3)).

This is a simple step, and we have instructions on how to do this [here](https://www.trufflesuite.com/docs/teams/quickstart).

### Setup Your Migrations Scripts

If you haven't built a Truffle project, you should really give it a try; the [Pet Shop Tutorial](https://www.trufflesuite.com/tutorials/pet-shop) is a great place to start as it gives a good survey of the different facets of using Truffle, including the `migrations` scripts. These scripts let you define the behavior of deploying your smart contracts. In the tutorial, you simply just deploy the single contract, but I hope you can see the flexibility to do so much more (i.e. you can deploy one contract, get its address, and use that in the constructor of deploying another contract).

Setting up these scripts is part of the development lifecycle of creating a Truffle project, so I won't cover that here. But that's great! You already should be done with this step!!

### Commit to GitHub

Welp. That was easy.

### Monitor the Status of Your Build

Head over to https://my.truffleteams.com and click on the `BUILDS` tab if you're not there already. You can see a build has been queued, or has started to process. You can click on the repository name in the card to see more details. You can also get to this page by clicking on the yellow dot in GitHub next to your commit and pressing `Details`.

!["Teams Builds More Details"](/img/docs/teams/starting-builds-comp.png)

### All Your Tests Pass, Let's Deploy! (but just to a testnet to save money)

> NOTE: This is just a sneak peek unfortunately as we haven't released Deployments yet! You won't be able to follow along (yet!).

Great, your builds are passing, and you're ready to deploy to a testnet (i.e. Ropsten) to see if everything works.

Now head over to the `DEPLOYMENTS` tab and select your repository.

TODO: You'll now see a screen that shows a list of commits on the left. Press the dohickey, enter the stuff, and badabing.

Truffle Teams will then start the migration/deployment process. Each transaction is sent to the web application and MetaMask will prompt you to sign transactions.

And that's it! Pretty easy if you ask me.

### Happy With a Released Version? Promote it to Production (aka deploy to Mainnet)

But we're not done yet! You've finished your testing to Ropsten, and you're now ready to deploy to Mainnet. You're happy with this one specific build that is on Ropsten. You can select that deployment and promote it to production (aka Mainnet).

## 🎉 Be The First to Try it With Me at My TruffleCon 2019 Workshop! 🎉

I really hope you're going to TruffleCon; it's going to be awesome. Even more so because you can **be the first to try Truffle Teams Deployments in my workshop!** In my `TODO: make a catchier name for my workshop` (9AM-12PM on Friday, Aug, 2nd) workshop, we'll cover this entire lifecycle: hooking up your repository, making your first build, seeing a build fail, fixing the bug, getting a passing build, deploying your contract to Ropsten, testing your deployed contract, and then finally checking the monitoring side of Truffle Teams to see your transaction (we didn't talk about this here; check out the [docs](https://www.trufflesuite.com/docs/teams/contracts/contract-monitoring) for more details on contract monitoring).

Hopefully there will be time for me to answer any questions individually, and maybe even help get your own Truffle project hooked up with Truffle Teams! If not, I will be available during the office hours at 5PM on Friday! I'm also always happy to chat anytime throughout the conference!

**You can reserve your spot in my workshop [here](https://trufflecon2019.sched.com/event/RFHD/hook-your-truffle-project-up-to-truffle-teams)!**

Haven't bought your ticket to TruffleCon yet, and really want to get your hands on this cool feature?? It's not too late! Hope to see you there 👇

<div class="post-trufflecon-box mt-5 text-center">
  Get your ticket for TruffleCon 2019 Today

  <div class="mt-3">
    <a class="btn btn-truffle" href="/trufflecon2019">Get your Ticket for TruffleCon 2019 Today</a>
  </div>
</div>
