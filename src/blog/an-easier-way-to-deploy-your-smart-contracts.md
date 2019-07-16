<div class="post-trufflecon-box mb-5">
  **[TruffleCon 2019](https://www.trufflesuite.com/trufflecon2019)** is happening August 2-4 on Microsoft’s campus in Redmond, WA. This year’s event will include 60+ speakers from the blockchain ecosystem, along with hands-on workshops geared toward novice users and expert builders alike. The Truffle team is ramping up for TruffleCon 2019 by writing a daily blog post about everything that’s on our minds. We hope you enjoy and we’ll see you in Redmond!

  <div class="text-center">
    <a class="btn btn-truffle mt-3" href="/trufflecon2019">Get your Ticket for TruffleCon 2019 Today</a>
  </div>
</div>

**TL;DR** - Deploying your contracts shouldn't be difficult, and should be flexible. I give a sneak peek at the next feature we're building: an **easy to use interface to deploy your Truffle projects with [Truffle Teams](https://trufflesuite.com/teams)**! It's going to be awesome, and **you can be the first to use it**! I'll be giving a **workshop (9AM-12PM on Friday, 8/2) at [TruffleCon 2019](https://www.trufflesuite.com/trufflecon2019)** which goes through the entire Truffle Teams lifecycle, including the **never-before-used Deployments interface**! See you there!

---

You've finished implementing your `\<insert_correct_capitalization_for_dapp>,` you've tested it on [Ganache](https://trufflesuite.com/ganache), and you're ready to push it to a testnet or Mainnet! Congratula—oh wait.

## TODO: IMAGE

It's not that easy.

There are a handful of solutions, and none have _really_ made it painlessly easy. Even our own `truffle migrate` (aka `truffle deploy`) is still sub-optimal.

Well it's about to get a whole lot easier with Truffle Teams. **TODO: add link to skip to the good stuff**

## The Many Not-So-Easy Ways to Deploy Your Smart Contracts

So what's wrong with what's already made? Why make _yet another_ tool? I hear you. I'm all for not reinventing the wheel. However, let's take a look at what **is** available.

### Remix

Oh [Remix](https://remix.ethereum.org), we all have fond memories of you. And many people still use Remix for all sorts of use cases! Remix gives you an in-browser Ethereum IDE, letting you develop, compile, test, debug, and deploy smart contracts for Ethereum. And it's probably the least amount of work needed to throw a single smart contract (i.e. only 1 `.sol` file) onto a testnet or Mainnet.

Remix (apparently they just released a new layout of the app; I'm basing this on the `0.7.7` version) gives you a simple `Deploy` button. This will send a transaction to a `web3` provider of your choice (many use [MetaMask](https://metamask.io)), and you're off to the races!

Great, right?

Well, Remix gets harder to use as you add more contracts, import 3rd party contracts, etc. It's definitely flexible and able to handle these, but it's not my personal preference to develop large, complex `\<insert_correct_capitalization_for_dapps>`.

### Truffle CLI

Enter [Truffle](https://trufflesuite.com/truffle). It's a fantastic (not to toot our own horns) framework that lets you develop in a flexible and extensible way. It provides structure (sure, you can call this opinionated) to keep a sane way to manage this chaotic world of Web 3.0.

It even gives you a mechanism to define what deploying (or what Truffle calls: migrating) means for your application. You can specify what contracts get deployed in which order, with whatever arguments (maybe they depend on the deployment of a past contract).

**And it's as easy as running `truffle migrate`!**

And if you were deploying to [Ganache](https://trufflesuite.com/ganache), that'd be entirely true, with very minimal amount of configuration.

But that's not the case when we start talking about testnets or Mainnet.

The **easiest** way to deploy to an external network is by using [Truffle's HD Wallet Provider](https://www.trufflesuite.com/docs/truffle/reference/configuration#providers). However, this requires you to somehow get your mnemonic or private key into the `truffle-config.js` config file, **without committing it to your provider source control provider (PLEASE don't do this). To use an account you created with MetaMask, you'd need to go to MetaMask, export your private key (or your mnemonic 😱), and creating the boilerplate code to read in the key from the environment variable.

This isn't that bad, but it's also a bit too much config for me. I'd much rather use MetaMask directly to authenticate.

### A Self-Made Management Web Interface

Some devs will create a small front-end web interface which uses `web3` JS calls to deploy their smart contracts. I have done this personally in my [Game of Thrones Death Pool](https://seesemichaelj.github.io/game-of-thrones-death-pool) project, and I chalked it up to "well I can put this on a website and others can deploy their own versions."

Sometimes this is necessary, but it's more work if it's not absolutely needed for your application.

## My Version of an Ideal Deployment Interface

In an ideal world, I'd like these features in a deployment interface:

- Let's you use MetaMask directly for signing transactions (Remix ✔️ | Truffle ❌ | Custom Webapp ✔️)
  - A bonus win here is support for Ledger and Trezor wallets!
- I can use a framework/toolset/etc. that lets me build complex apps and supports complexe deployment processes (Remix ❌ | Truffle ✔️ | Custom Webapp ✔️)
- I don't need to do a lot of work to go from finishing development to deploying (Remix ✔️ | Truffle ✔️ | Custom Webapp ❌)

## Introducing: Truffle Teams Deployments

If you haven't heard about our latest tool, [Truffle Teams](https://trufflesuite.com/teams), you really should check it out. Truffle Teams gives you zero-config Continuous Integration (CI) for your Truffle projects, and it also lets you monitor your deployed contracts. Truffle Teams is our solution to taking the power our other tools provide and meshing them into a cohesive application that enables collaboration within teams (even teams of 1!).

The next big feature we're working on is Deployments. We already compile your contracts from your Truffle project for you when you make a commit to GitHub; why can't we migrate/deploy them as well? Further, Truffle Teams is a web application, allowing for easy integration with [MetaMask](https://metamask.io).

### Setup Your Migrations Scripts

### Commit to GitHub

### Monitor the Status of Your Build

### All Your Tests Pass, Let's Deploy! (but just to a testnet to save money)

### Happy With a Released Version? Promote it to Production (aka deploy to mainnet)

All you need to do is setup your `migrations` scripts (which you should have done already if you were testing locally with [Ganache](https://trufflesuite.com/ganache)), commit to [GitHub](https://github.com), wait for Truffle Teams to finish building your commit, and select the network of your chosing to deploy your build! Truffle Teams will handle the network configuration in `truffle-config.js` for you, and will provide transactions for you to **sign with MetaMask directly. You can even sign with a Ledger or Trezor hardware wallet!**.

## 🎉 Be The First to Try it With Me at My TruffleCon 2019 Workshop! 🎉


<div class="post-trufflecon-box mt-5 text-center">
  Get your ticket for TruffleCon 2019 Today

  <div class="mt-3">
    <a class="btn btn-truffle" href="/trufflecon2019">Get your Ticket for TruffleCon 2019 Today</a>
  </div>
</div>
