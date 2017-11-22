# Working with Ganache

[Ganache](/ganache) is an application that generates a personal blockchain you can use to run tests, execute commands, deploy contracts, and inspect state.

![Ganache logo](/docs/ganache/images/ganache-logo.png)

It is available in both a graphical format and as a terminal application (which was previously known as the TestRPC). Ganache is available for Windows, macOS, and Linux.

## Installation

### Ganache

Installation of Ganache is only a few steps. [Download](https://github.com/trufflesuite/ganache/releases) the appropriate version for your OS:

* Windows: `Ganache-a.b.c.appx`
* macOS: `Ganache-a.b.c.dmg`
* Linux: `Ganache-a.b.c.AppImage`

Double click on the downloaded file, follow the prompts, and you're up and running.

### Ganache CLI

If you are interested in only the command-line application (previously known as the TestRPC), you can get it through npm.

```shell
npm install -g ganache-cli
```

This page will focus only on the graphical interface. Please see the [README](https://github.com/trufflesuite/ganache-cli/blob/master/README.md) for more information on Ganache CLI.

## Main interface

When you first launch Ganache, the screen will show some details about the server, and also list out a number of accounts. You'll note that each account has been given 100 ether, to make testing of transactions much easier.

![Ganache](/docs/ganache/images/accounts.png)

*Ganache accounts*

There are four pages available:

* The **Accounts** page shows the accounts generated. This is the default view.
* The **Blocks** page shows each block as mined on the blockchain, along with gas used and transactions.
* The **Transactions** page lists all transactions run against the blockchain.
* The **Logs** page shows the logs for the server, which is useful for debugging. 

Also note that you can search for block numbers or transaction hashes from a search box at the top.



## Settings

You can change some features of the generated blockchain through the **Settings** pages, accessed by the gear icon in the top right corner.

![Ganache Settings](/docs/ganache/images/settings.png)

*Ganache Settings*


* The **Server** page shows details about the network connection, including hostname, port, network ID, and whether to automatically mine each transaction into a block.
* The **Accounts & Keys** page sets details about the number of accounts created, and whether to use a specific mnemonic or let Ganache generate its own.
* The **Chain** page sets details about the actual workings of the generated blockchain, including gas limit and gas price.
* The **Advanced** page toggles Google Analytics, which is useful for the Ganache team to track usage of the application.

After making changes, you will have to click **Restart** on the application for the changes to take effect.