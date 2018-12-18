We have released the most awaited version of Truffle just in time for the
holidays! There are SO many exciting things to mention that will make your
Truffle experience a rich one. Highlighted below are the new exciting things
Truffle has to offer.

[Download Truffle v5!](https://truffleframework.com/truffle)

- **Bring your own compiler!!!!** You can now choose any solc-js version
  available at solc-bin just tell Truffle which one you want and it will get
  it. This includes the ability to use docker and native binary in an advanced
  way.

- **Web3 1.0** - the truffle-contract command is now using web3.js 1.0! This
  will be great for error handling!

- **New Migrations Command** - in v5 this command has been completely
  rewritten. We have included better error messages, when a deployment fails
  Truffle will tell you and give you an idea of possible fixes. Truffle will
  now also give your more information about what is going on when you deploy a
  contract, cost summaries and real time status updates about the amount of a
  time a transaction has been pending. Dry run simulations now run
  automatically if you deploy to a known public network. Using the
  ‘— interactive’ flag on the command line will give you a prompt between dry
  runs and real deployments. The ability to configure the amount of block
  confirmations in between deployments. Allowing user to specify the amount of
  blocks to wait before timing out. Web3 has this value hardcoded at 50 blocks,
  which can pose a problem when deploying large contracts at the lower end of
  gas price range. 

- **User Analytics** - have been added and users can opt-in by running
  ‘truffle config --enable-analytics’. This is vital in making informed
  decisions about future of Truffle and deciding what is most valuable to our
  users. When enabled Truffle will collect information about your version
  number, the commands you run, and whether commands succeed or fail, all
  annoyomously.

- **`truffle run <command>`** -  Truffle now gives users the ability to create
  custom command plugins.

- **Vyper support** - Truffle will now compile `*.vy` contracts. We have
  published a Truffle Box to help you get started with Vyper you can access it
  by running:  

  ```
  $ truffle unbox vyper-example
  ```

  (Make sure you have [Vyper](https://vyper.readthedocs.io/en/latest/installing-vyper.html) installed.)

- **Solidity v0.5.0** - Truffle now uses solidity v0.5.0 by default.
  Solidity v0.4.xx is still supported and can be used by specifying the version
  in your Truffle config.

-  **Structured function parameters** - Truffle has been upgraded to use
   the latest Web3.js v1.0, it includes support for passing/returning ‘struct’s
   in Solidity functions. To use this you need to specify it at the top of your
   contracts using:

  ```
  $ pragma experimental ABIEncoderV2
  ```

  This feature allows you to use complex function arguments and have the values
  returned in Solidity and interact with the resulting contracts via
  truffle-contract’s JS interface.

- **Help system** - Now access Truffle’s built in help system by running:
  ```
  $ truffle help <command>
  ```

  This allows you to see all the available options for the command as well as a
  description of what it does.

- **Unique truffle mnemonics** - Truffle will now generate random mnemonics
  that will persist only for you. Use caution with crypto security when working
  with mnemonics and private keys!!!!!

- **Debugger Improvements** - v5 includes debugger breakpoints! Add breakpoints
  using the ’b’ command and remove them using the ‘B’ command. Additionally we
  have added mapping support for the debugger!

- **`truffle init` / `truffle unbox`** - These commands have been improved you
  are now asked if you want to overwrite files. A force command has also been
  added to overwrite the files automatically.

- **`async`/`await`** - now supported in Truffle consoles.

Looking towards the future we are hoping to add third-party plugins, and we
hope through our fancy improved analaytics to provide features the community
needs most!

{{#> breakout}}
  ![V5 Breaking Changes](/img/blog/truffle-v5-blog-media/breaking-changes-photo-v5.png)
{{/breakout}}

**Thank you to all who have helped make this release of Truffle possible! We
hope you enjoy this new Truffle release! Let us know if you have any
suggestions or problems on our community Gitter channel or on our GitHub
page!**

[Download Truffle v5!](https://truffleframework.com/truffle)
