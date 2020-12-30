![Truffle End of Year Wrapup Banner](/img/blog/2020-is-finally-over-a-year-end-wrapup/blog-header.png)

2020 has been a trying time for us all: COVID-19 is still ravaging the world, the United States mired through one of our most contentious elections yet; basically, it’s been a rough year.

It’s not all bad though! Let’s take a look back at some positive things that came out of 2020, along with a little of what to look forward to in 2021.

## A Look Back

### ConsenSys Fold-in

This year was a busy one for Truffle, but the biggest news squeaked in just in time for the end of the year: Truffle is now a part of ConsenSys! We’re excited to collaborate with Infura, MythX, MetaMask, and more!

### Teams Enhancements

It was also a big year for Truffle Teams. We’ve added new features and enhanced existing ones to complete the core workflow Truffle Teams offers (I summarize this in our final Dapp Lifecycle webinar episode here). Big highlights include the release of:

* **Dashboard** ([Blog](/blog/get-a-birds-eye-view-with-truffle-teams-new-dashboard) | [Docs](/docs/teams/dashboard/dashboard-overview)): More incoming data begets a greater need to gain insights and properly segment that data to prevent overload. Truffle Teams new dashboard provides an overview of your application, along with ways to drill down and get further context on more narrow slices.
* **Debugger** ([Blog](/blog/debug-quickly-and-in-context-with-truffle-teams-new-debugger) | [Docs](/docs/teams/debugger/debugger-overview)): This is a huge workflow enhancement--allowing us to debug transactions in the places we're already viewing--via the deployment details screen or while monitoring individual contracts.
* **Early Access** ([Blog](/blog/try-new-features-first-with-truffle-teams-early-access)): Truffle Teams is constantly evolving. Between adding new features, polishing, and refining the app there's so much we'd love to share with the world in a faster way. Wouldn't it be nice to take those new enhancements and features for a test drive? Now you can with early access!
* **Deployment and Monitoring Improvements** ([Blog](/blog/you-decide-pipeline-or-table-view-in-truffle-teams-deployments-manager/blog/you-decide-pipeline-or-table-view-in-truffle-teams-deployments-manager) | [Docs](/docs/teams/deployments/deployments-overview)): We’ve added a table view and a deployment details page. We're also offering more insight into each deployment, by providing the cost and console output.

Before the end of this year, we’ll be releasing the Contract Manager to Early Access, completing the workflow and allowing teams to build, deploy, monitor, and debug conveniently in one place.

### Truffle’s Unstoppable Release Schedule

Going on 2 years now, Truffle has released on a weekly basis. We’re so proud of our team for their hard work and commitment to improving the lives of other developers. We don’t have any plans to stop this cadence--full steam ahead for the Truffle train!

### Debugger and Test Enhancements

2020 saw great improvements to Truffle, including debugging verified contracts with `truffle debug --fetch-external` ([Blog](/blog/debugging-verified-external-contracts-with-truffle-debugger)), support for stacktraces in tests with `truffle test --stacktrace` ([Blog](/blog/stack-tracing-with-truffle-test)), and even freshly-added support for stepping through Vyper contracts!

### Forking in Ganache – much improved!

Since the summer of 2020 saw DeFi reach a whole new level of usage, more and more people have been looking to test their code against live smart contracts on-chain. Ganache has always had its `--fork` option, but thanks to members of the community, we’ve fixed more than half a dozen critical bugs that inhibited certain use cases. Forking is more reliable than ever!

### Collaborations

2020 was a year of partnerships for Truffle, seeing us make good on the vision to become a multi-blockchain toolset.

* **Tezos** ([Blog](/blog/branching-out-announcing-tezos-support-in-truffle) | [Docs](/docs/tezos/truffle/quickstart)): Tezos is supported in Truffle! Many of the commands you’re used to are still here: compile, deploy, test, and console!
* **Corda** ([Blog](/blog/branching-out-phase-2-of-corda-flavored-ganache) | [Docs](/docs/ganache/corda/working-with-corda)): Ganache UI supports creating Corda networks! Easily create and introspect into a local Corada development network with a familiar UI.
* **Filecoin** ([Blog](/blog/announcing-collaboration-with-filecoin)): Truffle Preserve allows you to easily preserve files on IPFS and/or Filecoin.

## A Look Forward

### Continued Maturation of Truffle Teams

Truffle Teams will continue to be enhanced throughout 2021, with useful additions such as:

* **Monitoring enhancements**: receive alerts when we observe contract anomalies, such as a sudden spike in failed transactions or a drop in balance. Set up your own custom triggers for things like an event firing or a certain address interacting with your contracts.
* **Debugging public transactions**: The debugger only works for sandboxes currently, but we want to bring it to feature parity with the CLI debugger by also supporting public networks.
* **Custom Network Support**: Deploy via your own infrastructure by supplying the RPC URL. Put your DappNode to good use!
* **Continuous (Automated) Deployment**: You can already deploy manually via Truffle Team’s deployment wizard, but there may be times you know you’ll be continuously deploying your changes. For example iterating on a new feature in a sandbox.
* **Better Dashboard**: The dashboard today provides a good overview of your deployment, but we’re going to expand it to provide better drill down functionality and greater context.

### Advanced Analysis

Truffle’s been around for over 5 years now. In that time, we’ve been thinking about how smart contract systems grow and change over time. Be on the lookout for tools to better examine your contract’s deployment history, track contracts across forks, and more!

### Ganache Rewrite

Ganache is getting a tune-up! This means faster execution of your test suites--**4x faster** in the case of SushiSwap’s test suite. Also lookout for ways to test pending transactions, implementation of EIP-1193, the ability to set the account nonce (`evm_setAccountNonce`), and support for running Ganache in the browser. We’ll also begin publishing auto-generated API documentation so you always have a reference close at hand.

### The Return of the Frontend

2020 didn’t see much movement in our set of frontend libraries, [Drizzle](https://github.com/trufflesuite/drizzle). In 2021 we’ll be giving some love to the frontend in the form of easier state management, more granular tooling, and more.

### More Collaborations

As mentioned above, now that we’re a part of ConsenSys Software Inc, Truffle's going to have many opportunities to collaborate with other groups. We’d love to hear what this sparks in you! Check out our Slack group below and let us know your thoughts. Here are some links to CSI’s groups so you know what they’re about:

* [Infura](https://infura.io/)
* [MythX](https://mythx.io/)
* [ConsenSys Diligence](https://consensys.net/diligence/)
* [MetaMask](https://metamask.io/)
* [CodeFi](https://codefi.consensys.net/)
* [ConsenSys Quorum](https://consensys.net/quorum/)

## Catch us on Slack

We want Truffle the best developer tool suite in the blockchain space for new and seasoned devs alike. Let us know what you think about our plans, or if you/your team have other needs we haven't met yet.

Continue the conversation with your fellow Trufflers in our Slack community!

<div class="mt-12 text-center">
  <a class="btn btn-truffle mt-3" href="https://join.slack.com/t/truffle-community/shared_invite/zt-8wab0bnl-KcugRAqsY9yeNJYcnanfLA" target="_blank">SIGN UP FOR THE TRUFFLER SLACK</a>
</div>

Thanks!

_Josh Quintal, Product Lead & The Whole Team at Truffle_
