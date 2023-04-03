---
title: Default workspace configurationn
layout: docs.hbs
---

# Default workspace configuration

Every workspace has its own configuration. Each workspace's configuration is based off the Quickstart configuration at the time of workspace creation. While these can be changed, the `Quickstart` workspace starts with the below options:

#### Ethereum

```
Hostname: 127.0.0.1 - localhost
Port Number: 7545
Network ID: 5777
Automine: true
Error on Tx Failure: true

Account Default Balance: 100
Total Accounts to Generate: 10
Autogenerate HD Mnemonic: false
Lock Accounts: false

Output Logs to File: false
Verbose Logs: false
```

However, during workspace creation, the `Autogenerate HD Mnemonic` is set to `true` to maintain the same set of accounts.
