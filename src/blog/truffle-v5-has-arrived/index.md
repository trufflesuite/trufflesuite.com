---
title: Truffle v5 has arrived!
hide:
  - navigation
---

We have just released the most awaited version of Truffle just in time for the
holidays! There are SO many exciting things that we would like to mention that
will make your Truffle experience a rich one. Highlighted below are the new
exciting things Truffle has to offer.

👯 [Download Truffle v5](/truffle) or check out the
full [Release Notes](https://github.com/trufflesuite/truffle/releases/tag/v5.0.0). 👯

- **Bring your own compiler!** You can now choose any solc-js version
  available at solc-bin. Just tell Truffle which version you want to use and it
  will automatically fetch it for you! This feature also includes the ability to
  use Docker and native binaries in an advanced way.

- **Web3 1.0** - The truffle-contract package is now using Web3.js 1.0! This
  will greatly improve error handling!

- **New migrations command** - In v5, the `migrate` command has been completely
  rewritten. We have included better error messages: e.g., when a deployment fails
  Truffle will notify you and give you an idea of possible fixes. Truffle will
  now also give you more information about what is going on when you deploy a
  contract. This includes cost summaries and real time status updates about the
  amount of time a transaction has been pending.

  Dry run simulations also now run automatically if you are deploying to a known
  public network and using the `--interactive` flag on the command line will give
  you a prompt between dry runs and real deployments.

  Another improvement is the ability to configure the amount of block confirmations
  in between deployments. This allows the user to specify the number of blocks to
  wait before transactions time out.

- **Usage analytics** - Usage analytics have been added and users can opt-in by
  running `truffle config --enable-analytics`. We think this feature will be a
  vital tool that will help us to make informed decisions about the future of Truffle
  and to determine what is most valuable to our users. When enabled, Truffle will
  collect information about your version number, the commands you run, and
  whether commands succeed or fail. And of course, it will do so in an anonymous
  fashion.

- **`truffle run <command>`** - Truffle now gives users the ability to create
  custom command plugins. This feature is still in its infancy so let us know
  what you think!

- **Vyper support** - Another added feature is that Truffle will now compile
  `*.vy` contracts. We have published a Truffle Box to help you get started
  with Vyper. You can access it by running:

  ```shell
  $ truffle unbox vyper-example
  ```

  (Make sure you have [Vyper](https://vyper.readthedocs.io/en/latest/installing-vyper.html) installed.)

- **Solidity v0.5.0** - Truffle also now ships with Solidity v0.5.0 by default.
  Solidity v0.4.xx is still supported and can be used by specifying the version
  you wish to use in your Truffle config.

- **Structured function parameters** - Truffle has been upgraded to use
  Web3.js v1.0. This has allowed us to include support for passing/returning
  ‘struct’s in Solidity functions. To use this ability, you need to specify the
  following at the top of your contracts:

```solidity
pragma experimental ABIEncoderV2
```

This feature allows you to use complex function arguments and have the values
returned so that they can interact with other contracts via truffle-contract’s
JS interface.

- **Help system** - Now access Truffle’s built in help system by running:

  ```shell
  $ truffle help <command>
  ```

  This allows you to see all the available options for the command as well as a
  description of what it does.

- **Unique `truffle develop` mnemonics** - Truffle will now generate random mnemonics
  that will persist only for you. Use caution with crypto security when working
  with mnemonics and private keys!

- **Debugger improvements** - v5 includes debugger breakpoints! Add breakpoints
  using the ’b’ command and remove them using the ‘B’ command. Additionally we
  have added mapping support for the debugger!

- **`truffle init` / `truffle unbox`** - These commands have been improved and
  you are now asked if you want to overwrite files in the case of name conflicts
  in the target directory. A force option (--force) has also been added in the
  case where you wish to overwrite the files automatically and avoid the
  prompt.

- **`async`/`await`** - Support for async/await syntax in the Truffle console
  is also now available!

Looking towards the future we intend to add third-party plugins and
hope through our fancy, improved analaytics to provide features the community
needs most!

![V5 Breaking Changes](/img/blog/truffle-v5-blog-media/breaking-changes-photo-v5.png)

**Thank you to all who have helped make this release of Truffle possible! We
hope you enjoy this new Truffle release and ask that you let us know if you have
any suggestions or problems on our GitHub Discussion or GitHub issues page!**

[Get started with Truffle v5 today!](/truffle)
