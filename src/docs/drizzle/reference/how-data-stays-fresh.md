---
title: Drizzle | How Data Stays Fresh
layout: docs.hbs
---
# How Data Stays Fresh

1. Once initialized, Drizzle instantiates `web3` and our desired contracts, then observes the chain by subscribing to new block headers.

   ![Drizzle Sync Step 1](https://github.com/trufflesuite/drizzle/blob/master/readme/drizzle-sync1.png?raw=true)

1. Drizzle keeps track of contract calls so it knows what to synchronize.

   ![Drizzle Sync Step 2](https://github.com/trufflesuite/drizzle/blob/master/readme/drizzle-sync2.png?raw=true)

1. When a new block header comes in, Drizzle checks that the block isn't pending, then goes through the transactions looking to see if any of them touched our contracts.

   ![Drizzle Sync Step 3](https://github.com/trufflesuite/drizzle/blob/master/readme/drizzle-sync3.png?raw=true)

1. If they did, we replay the calls already in the store to refresh any potentially altered data. If they didn't we continue with the store data.

   ![Drizzle Sync Step 4](https://github.com/trufflesuite/drizzle/blob/master/readme/drizzle-sync4.png?raw=true)