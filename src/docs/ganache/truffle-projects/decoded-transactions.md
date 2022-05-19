---
title: Decoded Transactions
layout: docs.hbs
---
# Decoded Transactions

Ganache will now attempt to decode transactions that are contract calls. In addition to listing the events (encoded or not) for the transaction, Ganache will show the function signature of the transaction as well as the values of the arguments.

<p class="alert alert-warning">
<i class="far fa-exclamation-triangle"></i> <strong>Why aren't my transactions being decoded?</strong> Check and make sure you've added the corresponding Truffle project with the contract that the transaction is being interacted with.
</p>

![Decoded Transaction](/img/docs/ganache/v2-shared-seese/decoded-transaction.png)
