---
title: Truffle 3.2.0 released
hide:
  - navigation
---

<p class="alert alert-info" style="margin-top: -2rem; margin-bottom: 3rem;">
  <strong>UPDATE</strong>: We made another minor release after this blog post was written <a href="https://github.com/trufflesuite/truffle/releases/tag/v3.2.1">upgrading web3 to 0.18.2</a> due to request of our users. <a href="https://github.com/trufflesuite/truffle/releases/tag/v3.2.1">Truffle v3.2.1</a> is now the latest release, but it still includes all the awesome stuff below.
</p>

Hi all. Great news today.

Following your feedback from the Truffle 3.0 release, we've just released Truffle 3.2.0! This release includes a [number of great new features and bug fixes](https://github.com/trufflesuite/truffle/releases/tag/3.2.0), but we're most excited about the following. I've bolded the good stuff for ya.

1. **We've built infrastructure for providing you boilerplates on demand!** Now with `truffle init` comes `truffle init webpack`, which gives you a boilerplate web application combining the web development capabilities of Webpack with the power of Truffle. More boilerplates to come to make your life easier, so stay tuned!

1. **We've added huge speed improvements to the Truffle command line tool.** Now your commands trigger in milliseconds! Go ahead, try it out. `truffle version`

1. **Solidity tests can now be given default balances** so you can use those tests to exercise sending Ether to your contracts. Big win for Solidity tests, and your sanity in general. [Documentation](/docs/truffle/testing/writing-tests-in-solidity.html#testing-ether-transactions)

1. Similarly, **Javascript abstractions got an upgrade** making it easier to send Ether directly to your contracts as well as trigger your contracts' fallback functions. You can use this feature within your tests as well as within your application. [More on that here](/docs/truffle/getting-started/interacting-with-your-contracts.html#sending-ether-to-a-contract). Also, they now use web3 0.18.2.

1. **Migrations got an extra scout badge (function parameter)**, [allowing you to view available accounts directly within your migration](/docs/truffle/getting-started/running-migrations.html#available-accounts)

1. Oh, and **there's no more naming restriction on contract names!** 🎉🎉🎉 You can now have a file called `ImABigDeal.sol` and have it define contracts under a completely different name. Woot!

1. Along with the above, **there's a new way of requiring contract artifacts within your migrations and tests**. The old way still works if your contract names match your Solidity file names, but even if they don't you can simply require the contract by name:

```javascript
// Assume `ImABigDeal.sol` defines `contract MyContract { ... }`
var MyContract = artifacts.require("MyContract");
```

There's been a lot of bug fixes too. Check out the [release notes on Github](https://github.com/trufflesuite/truffle/releases/tag/3.2.0) for a full list of changes, upgrades and fixes.

### Big thanks!

As always, we have to give you all a big thanks for being a part of the community and making Truffle better. This release would not be possible without your continued feedback, bug fixes and pull requests.

If you run into trouble with any of the above, reach out on our [community GitHub Discussions channel](https://github.com/trufflesuite/truffle/discussions) where hundreds of your fellow Trufflers congregate to answer your questions. As well, check us out [on Twitter](https://twitter.com/trufflesuite) and send us a tweet.

Cheers, and happy coding!

-- Tim
