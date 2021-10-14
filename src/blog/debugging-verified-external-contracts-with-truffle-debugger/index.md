---
title: Debugging verified external contracts with Truffle Debugger
hide:
  - navigation
---

![Truffle Teams Redesign Banner](/img/blog/debugging-verified-external-contracts-with-truffle-debugger/blog-header.png)

Let's say you're crafting a clever flashloan transaction that interacts with
five different DeFi dapps -- but on trying it, it doesn't work as expected.  You
open the transaction in Truffle Debugger to get a closer look at what went
wrong.  But how will you debug a transaction that the debugger doesn't have the
source code for?

Well, new in Truffle release v5.1.29 is the debugger's `--fetch-external` flag!
This new flag tells the debugger to search [Etherscan's repository of verified
contracts](https://etherscan.io/contractsVerified) and automatically
download and compile those sources.  As long as all the contracts you're
interacting with are verified on Etherscan, you're good to go!

This means you'll be able to debug Mainnet / Görli / Ropsten / etc. transactions
that interact with external contracts _without the need to have external
contract source code available locally_!

Now, before you get too excited, some caveats apply:
- This only works with Solidity contracts, since @truffle/debugger only supports
  Solidity at this time.
- While using this feature, you won't be able to load and unload transactions
  in the debugger like normal; you'll have to quit and restart to change
  transactions.
- In order to be able to use the debugger and have it find the right source to
  download for your network, you'll need to connect to an archive node that
  offers the `debug_traceTransaction` JSON RPC method. (See Geth's [Management
  APIs](https://github.com/ethereum/go-ethereum/wiki/Management-APIs)).

That last one is a pretty big caveat, but **there's good news here**! Our
sibling SaaS project, [Truffle Teams](https://www.trufflesuite.com/teams), now
lets you [simulate live
networks](https://www.trufflesuite.com/blog/sandbox-forking-with-truffle-teams)
via the free Sandbox feature. This works without requiring you to run your own
node or to pay for someone else to run their own node, since Truffle Teams
offers 1 free sandbox per GitHub organization!

Of course, you're free to use the debugger with whatever compatible Ethereum
node you like, including command-line Ganache; but here's how to use Truffle
Teams, which offers so much more, for this feature.

### Example: Debug ENS in a [mostly] empty Truffle project!
<a href="/img/blog/debugging-verified-external-contracts-with-truffle-debugger/debug-example1.png" target="_blank"><img width="100%" alt="Click to enlarge" src="/img/blog/debugging-verified-external-contracts-with-truffle-debugger/debug-example1.png">Click to enlarge</a>

This screenshot shows `truffle debug` stepping through a Görli transaction to the ENS registry. Once you upgrade to Truffle v5.1.29, you can recreate this by doing the following:

1. Find the [Görli ENS contract page on
Etherscan](https://goerli.etherscan.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e).

2. Find a recent transaction hash. (See [example from
screenshot](https://goerli.etherscan.io/tx/0x79381a69eb828558f2728900615109eb7bdeb6d216af130142341da15cc6fecd).)

3. [Sign up / login to Truffle Teams](https://my.truffleteams.com/) and make a
free Sandbox that forks off Görli. **Note**: At the moment, you'll have to make
sure that you manually specify that the Sandbox should use the same network ID
as the chain it's forked from (in this case, 5).  In the future, however, this
step will be handled automatically.  You can read more about Sandboxes in [our
earlier blog post on the
subject](https://www.trufflesuite.com/blog/sandbox-forking-with-truffle-teams).

4. Copy your sandbox JSON RPC url to the clipboard.

5. Run `truffle init` and add this to your new `truffle-config.js` (replacing `"<paste RPC url>"` with your clipboard contents from step 4):
  ```javascript
  module.exports = {
    /* ... rest of truffle-config.js ... */
    networks: {
      /* ... rest of networks ... */
      sandbox: {
        url: "<paste RPC url>",
        network_id: 5
      }
    }
  }
  ```
5a. _Optional_. If you have an [Etherscan API key](https://etherscan.io/apis) or
feel like making one, you can specify that as well in your `truffle-config.js`
to speed up downloads:
  ```javascript
  module.exports = {
    /* ... rest of truffle-config.js ... */
    etherscan: {
      // replace this with your API key
      apiKey: "0123456789abcdef0123456789abcdef"
    }
  }
  ```
  
6. Copy the transaction hash from step 2 and run the following (replacing
`<transaction hash>` with the `0x`-prefixed transaction hash):
  ```
  truffle debug <transaction hash> --network sandbox --fetch-external
  ```

And that's it!  You're now debugging an ENS transaction in an empty Truffle
project.  You can step through and set breakpoints; inspect both decoded
variables and the raw binary state; and get return values, revert messages, and
stacktraces just like normal.

Now this example is a minimal one just to show how things work.  But it will
work just as well in your existing projects on transactions that feature your
contracts in your project interacting with external verified contracts deployed
on live networks.

Right now "verified contracts" just means contracts verified on Etherscan, but
we're also looking at supporting the new
[Sourcify](https://github.com/ethereum/sourcify) project, which provides a more
decentralized alternative to Etherscan's repository. We plan to add this in an
upcoming release.  But as of right now, you can use this feature with
Etherscan's large library of verified contracts!

**Update**: As of Truffle v5.1.32, [Sourcify](https://github.com/ethereum/sourcify) is now supported!  Truffle
Debugger will now check both [Etherscan](https://etherscan.io/) and [Sourcify](https://github.com/ethereum/sourcify) for verified
contract sources!

Hope you find this as exciting as we do! Thanks for using Truffle!
