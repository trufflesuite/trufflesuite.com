---
title: Ganache | Decoded Transactions
layout: docs.hbs
---
# Decoded Transactions

Ganache will now attempt to decode transactions that are contract calls. In addition to listing the events (encoded or not) for the transaction, Ganache will show the function signature of the transaction as well as the values of the arguments.

<p class="alert alert-warning">
<strong>Why aren't my transactions being decoded?</strong> Check and make sure you've added the corresponding Truffle project with the contract that the transaction is being interacted with.
</p>

![Decoded Transaction](https://truffleframework.com/img/docs/ganache/v2-shared-seese/decoded-transaction.png)