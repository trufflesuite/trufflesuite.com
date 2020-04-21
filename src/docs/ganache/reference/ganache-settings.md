---
title: Ganache | Ganache Settings
layout: docs.hbs
---
# Ganache Settings

You can change some features of the generated blockchain through the **Settings** pages, accessed by the gear icon in the top right corner. You'll also be prompted with the settings screen when created a [New Workspace](/docs/ganache/workspaces/creating-workspaces).

![Accessing Ganache Settings](/img/docs/ganache/ganache-settings-gear-icon.png)

<p class="text-center">*Accessing Ganache Settings*</p>

We've divided the settings into several pages:

* **Workspace** sets the workspace name and shows the currently linked Truffle or Corda projects. See our more detailed docs on [creating](/docs/ganache/workspaces/creating-workspaces) and [deleting](/docs/ganache/workspaces/deleting-workspaces) workspaces for more info.
* **Ethereum**
  * **Server** shows details about the network connection, including hostname, port, network ID, and whether to automatically mine each transaction into a block.
  * **Accounts & Keys** sets details about the number of accounts created, and whether to use a specific mnemonic or let Ganache generate its own.
  * **Chain** sets details about the actual workings of the generated blockchain, including gas limit and gas price.
  * **Advanced** toggles Google Analytics, which is useful for the Ganache team to track usage of the application.
* **Corda**
  * **Nodes** manages the nodes for the network.
  * **Notaries** manages the notaries for the network.
  * **Advanced** sets the default PostgreSQL port and toggles Google Analytics, which is useful for the Ganache team to track usage of the application.
* **About** contains information on the currently installed version of Ganache, along with links to our website and the [Ganache GitHub repository](https://github.com/trufflesuite/ganache).

After making changes, you will have to click **Restart** on the application for the changes to take effect.

![Ganache Settings](/img/docs/ganache/ganache-settings.png)

<p class="text-center">*Ganache Settings*</p>