**TL;DR** - Deploying your smart contracts shouldn't be difficult, and the process should be flexible. I give a sneak peek at the next feature we're building: an **easy to use interface to deploy your Truffle projects with [Truffle Teams](/teams)**! It's going to be awesome, and **you can be the first to use it**! I'll be giving a **hands-on workshop from 9AM-12PM on Friday, August 2nd, at [TruffleCon 2019](/trufflecon2019)** that will walk you through through the entire Truffle Teams lifecycle, including the **never-before-used Deployments interface**! See you there!

---

So! You've finished implementing your dApp, you've tested it on [Ganache](/ganache), and you're ready to push it to a testnet or Mainnet! Congratula—oh wait.

![One Does Not Simply Deploy to Mainnet](/img/blog/an-easier-way-to-deploy-your-smart-contracts/got-deploy-mainnet.jpg)

It's not that easy.

There are a handful of solutions, and none have _really_ made it painlessly easy. Even our own `truffle migrate` (aka `truffle deploy`) has left much to be desired.

Well it's about to get a whole lot easier with Truffle Teams. [Skip to the good stuff.](#truffle-teams)

## The Not-So-Easy Ways to Deploy Your Smart Contracts

So what's wrong with what's already made? Why make _yet another_ tool? I hear you. Let's take a look at what **is** available, and if you're still meh, I'd love to talk to you at [TruffleCon](/trufflecon2019)!

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

Oh [Remix](https://remix.ethereum.org), we all have fond memories of you. And many people still use Remix for all sorts of use cases! Remix gives you an in-browser Ethereum IDE, letting you develop, compile, test, debug, and deploy smart contracts for Ethereum. And it's probably the least amount of work needed to throw a single smart contract onto a testnet or Mainnet (i.e. when deploying a single `.sol` file).

Remix, as of version `0.7.7`, gives you a simple `Deploy` button. This will send a transaction to the `web3` provider of your choice (many use [MetaMask](https://metamask.io)), and you're off to the races!

Great, right?

Well, Remix gets harder to use as you add more contracts, import 3rd party contracts, work as a whole team, etc. It's definitely flexible and able to handle these use cases (though not without legwork and configuration), but it's not my personal preference for developing large, complex dApps.

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

Enter [Truffle](/truffle).

It's a fantastic framework (not to toot our own horns) that lets you develop your dApp in a flexible and extensible way. It provides structure to keep you sane in this chaotic world of Web 3.0.

It even gives you a mechanism to define what deploying (aka: "migrating") means for your application. You can specify what contracts get deployed in which order with whatever arguments you require. For instance, your smart contracts may depend on the deployment of a past contract, which you can easily code in migration scripts.

**And it's as easy as running `truffle migrate`!**

...and if you were deploying directly to [Ganache](/ganache), that'd be entirely true.

![Running `truffle migrate`](/img/blog/an-easier-way-to-deploy-your-smart-contracts/truffle.png)

But that's not the case when we start talking about testnets or Mainnet.

The **easiest** way to deploy to an external network is by using [Truffle's HD Wallet Provider](/docs/truffle/reference/configuration#providers). However, this requires you to somehow get your mnemonic or private key into the `truffle-config.js` config file, **without committing it to your provider source control provider (PLEASE don't do this - you'll get your Ether stolen).** To use an account you created with MetaMask, you'd need to export your private key from MetaMask (or your mnemonic, if you're feeling lucky 😱) and create the boilerplate code to read in the key from an environment variable (to prevent committing it to your repository and sharing it publicly).

In all truthfulness, this isn't too bad, but it's also a bit too much config for me. I'd much rather use MetaMask directly to authenticate transactions during deployments.

### Custom Management Web Interface

Some devs will create a small front-end web interface which uses [web3.js](https://github.com/ethereum/web3.js) to deploy their smart contracts. I have done this personally in my [Game of Thrones Death Pool](https://seesemichaelj.github.io/game-of-thrones-death-pool) project, and I chalked it up to "well I can put this on a website and others can deploy their own versions."

![Custom Management Web Interface for GoT Death Pool](/img/blog/an-easier-way-to-deploy-your-smart-contracts/got-death-pool.png)

Sometimes this is necessary, but it's more work if it's not absolutely needed for your application.

## My Version of an Ideal Deployment Interface

In an ideal world, I'd like these features in a deployment interface:

<ul>
  <li>Lets me use MetaMask directly for signing transactions
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

If you haven't heard about our latest tool, [Truffle Teams](/teams), you really should check it out. Truffle Teams gives you zero-config Continuous Integration (CI) for your Truffle projects, and it also lets you monitor what's happening with your deployed contracts. Truffle Teams meshes the full Truffle Suite into a cohesive application that enables better collaboration within development teams (even teams of 1!).

![Truffle Teams Builds](/img/blog/an-easier-way-to-deploy-your-smart-contracts/teams-build.png)

The next big feature we're working on is Deployments. We already compile your contracts from your Truffle project for you when you make a commit to GitHub; why can't we migrate/deploy them as well? Further, Truffle Teams is a web application, allowing for easy integration with [MetaMask](https://metamask.io).

We're looking at this from a [DevOps](https://en.wikipedia.org/wiki/DevOps) perspective, and we're trying to create an extensible system that will support projects and teams of **any size**.

### Connect Your GitHub Repository to Truffle Teams

To get started with Truffle Teams, you must first connect your GitHub repository. This is a simple step, and we have instructions on how to do this [here](/docs/teams/quickstart).

### Setup Your Migrations Scripts

If you haven't built a Truffle project, you should really give it a try; the [Pet Shop Tutorial](/tutorial) is a great place to start as it gives a good survey of the different facets of Truffle, including the `migration` scripts. These scripts let you define the behavior of deploying your smart contracts using a language you're already familiar with. In the tutorial, you deploy a single contract, but it has the flexibility to do so much more (i.e. you can deploy one contract, get its address, and use that in the constructor when deploying another contract).

Setting up these scripts is part of the development lifecycle of creating a Truffle project, so I won't cover that here. But that's great! You should already be done with this step!!

### Commit to GitHub

Welp. That was easy. 😅

### Monitor the Status of Your Build

Head over to https://my.truffleteams.com and click on the `BUILDS` tab if you're not there already. You can see a build has been queued or has started to process. You can click on the repository name in the card to see more details. You can also get to this page by clicking on the yellow dot in GitHub next to your commit and pressing `Details`.

![Teams Builds More Details](/img/docs/teams/starting-builds-comp.png)

### All Your Tests Pass, Let's Deploy! (but only to a testnet just to be sure)

> NOTE: This is just a sneak peek of features to come! You won't be able to follow along (yet, but [stay tuned](https://share.hsforms.com/1OaTglVhGTdWk7spR6nE_AA34pbp)!).

Great! Your builds are passing, and you're ready to deploy to a testnet (i.e. Ropsten) to see if everything works.

Now head over to the `DEPLOYMENTS` tab and select your repository.

You'll now see a screen that shows a list of builds for your commits on the left.

![Deployments Empty](/img/blog/an-easier-way-to-deploy-your-smart-contracts/deployments-empty.png)

Deploying a build is as simple as hovering over the commit, pressing a button, and selecting which network you'd like to deploy to.

![Deployment Wizard Select](/img/blog/an-easier-way-to-deploy-your-smart-contracts/deployment-wizard-select.png)

Truffle Teams will then start the migration/deployment process. Each transaction is sent to the web application and MetaMask will prompt you to confirm transactions. By leveraging MetaMask, we can give you **[Ledger](https://www.ledger.com) and [Trezor](https://trezor.io) hardware wallet support too! 🔒**

![MetaMask Transaction](/img/blog/an-easier-way-to-deploy-your-smart-contracts/metamask-tx.png)

### Happy With a Released Version? Promote it to Production (aka deploy to Mainnet)

But we're not done yet! You've finished your testing on Ropsten, and you're now ready to deploy to Mainnet. With the upcoming version of Teams, you can select that deployment and promote it to production (aka Mainnet) with just a couple of clicks.

![Deployments Complete](/img/blog/an-easier-way-to-deploy-your-smart-contracts/deployments-complete.png)

## And that's it! Pretty easy if you ask me.

![Fry, Easy or Too Easy](/img/blog/an-easier-way-to-deploy-your-smart-contracts/fry-easy.jpg)

## 🎉 Don't Believe Me? Be The First to Try it at My TruffleCon 2019 Workshop! 🎉

I really hope you're going to TruffleCon; it's going to be awesome. Even more so because you can **be the first to try Truffle Teams Deployments in my workshop!** In my `Push It! Push It Real Good: Truffle Teams Intro & Deployments` (9AM-12PM on Friday, Aug, 2nd) workshop, we'll cover this entire lifecycle: hooking up your repository, getting your first build to pass, deploying to Ropsten, and finally monitoring transactions made against your contracts (we didn't talk about this here; check out the [docs](/docs/teams/deployments/contract-monitoring) for more details on contract monitoring).

Hopefully there will be time for me to answer any questions you have, and maybe even help get your own Truffle project hooked up with Truffle Teams! If not, I will be available during the office hours at 5PM on Friday! I'm also always happy to chat anytime throughout the conference!
