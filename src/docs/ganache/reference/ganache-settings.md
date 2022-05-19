---
title: Ganache Settings
layout: docs.hbs
---

# Ganache Settings

You can change some features of the generated blockchain through the **Settings** pages, accessed by the gear icon in the top right corner. You'll also be prompted with the settings screen when created a [New Workspace](/docs/ganache/workspaces/creating-workspaces).

The settings page will vary depending on whether you're developing on [Ethereum](#ethereum) or [Corda](#corda). After updating your settings, don't forget to [save your changes](#save-your-changes).

![Accessing Ganache Settings](/img/docs/ganache/ganache-settings-gear-icon.png)

<p class="text-center">*Accessing Ganache Settings*</p>

## Ethereum

- **Workspace** sets the workspace name and shows the currently linked Truffle projects. See our more detailed docs on [creating](/docs/ganache/workspaces/creating-workspaces) and [deleting](/docs/ganache/workspaces/deleting-workspaces) workspaces for more info.
- **Server** shows details about the network connection, including hostname, port, network ID, and whether to automatically mine each transaction into a block. These connection details need to match your [Truffle configuration](#configuring-truffle-to-connect-to-ganache).
- **Accounts & Keys** sets details about the number of accounts created, and whether to use a specific mnemonic or let Ganache generate its own.
- **Chain** sets configuration details for the genesis and parameters of the generated blockchain, including gas limit and gas price.
- **Advanced** toggles Google Analytics, which is useful for the Ganache team to track usage of the application.
- **About** contains information on the currently installed version of Ganache, along with links to our website and the [Ganache GitHub repository](https://github.com/trufflesuite/ganache).

## Corda

- **Workspace** sets the workspace name and shows the currently linked Corda projects. See our more detailed docs on [creating](/docs/ganache/workspaces/creating-workspaces) and [deleting](/docs/ganache/workspaces/deleting-workspaces) workspaces for more info.
- **Nodes** manages the nodes for the network.
- **Notaries** manages the notaries for the network.
- **Advanced** sets the default PostgreSQL port and toggles Google Analytics, which is useful for the team to improve Ganache based on anonymous usage metrics.
- **About** contains information on the currently installed version of Ganache, along with links to our website and the [Ganache GitHub repository](https://github.com/trufflesuite/ganache).

## Save your changes

After making changes, you will have to click **Restart** on the application for the changes to take effect.

![Ganache Settings](/img/docs/ganache/ganache-settings.png)

<p class="text-center">*Ganache Settings*</p>

## Configuring Truffle to connect to Ganache

To configure Truffle connect to Ganache, edit `truffle-config.js` to point
to the Ganache's IP and port, e.g.,

```
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "1234"
    }
    // live: { ... }
  }
};
```

Then you can run migration commands like `truffle migrate --network development`.
