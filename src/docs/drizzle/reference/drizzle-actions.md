---
title: Drizzle | Drizzle Actions
layout: docs.hbs
---
# Drizzle Actions

Drizzle emits many different actions that we can hook into with Middlewares. For more information about writing middlewares for Drizzle, [see the Drizzle and Contract Events guide](/guides/drizzle-and-contract-events).

The main categories of actions pertain to:
* [Accounts](#accounts)
* [Blocks](#blocks)
* [Drizzle](#drizzle)
* [Contract Events](#contract-events)
* [Transactions](#transactions)

## Accounts

### `ACCOUNTS_FETCHING`
Fired when Drizzle begins fetching accounts.

### `ACCOUNTS_FETCHED`
Fired once Drizzle has successfully fetched accounts.
```
{
  accounts
}
```
**`accounts` (array)**: An array of account addresses.

<!--
### `ACCOUNTS_FAILED`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.
```
{
  error
}
```
`error` (object): An error object.
-->

### `ACCOUNT_BALANCE_FETCHED`
Fired when an account balance has been successfully fetched. 
```
{
  address: balance
}
```
**`balance` (int)**: The account balance, indexed by account `address` (string) in gwei.

### `ACCOUNTS_POLLING`
Fired when Drizzle begins polling for account changes.

## Blocks

<!--### `BLOCK_RECEIVED`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `BLOCKS_FAILED`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `BLOCK_FOUND`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.-->

### `BLOCK_PROCESSING`
```
{
  block
}
```
**`block` (object)**: The block object returned by web3. See the [web3 getBlock documentation](https://web3js.readthedocs.io/en/1.0/web3-eth.html?highlight=getBlock#id45) for the block object's structure.

<!--### `BLOCKS_LISTENING`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `BLOCKS_POLLING`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.-->

## Drizzle

<!--### `DRIZZLE_INITIALIZING`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.-->

### `DRIZZLE_INITIALIZED`
Fire when drizzle has finished initializing. Once this has fired, web3 and accounts have been intialized.

<!--### `DRIZZLE_FAILED`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

## Contracts

### `GETTING_CONTRACT_VAR`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `GOT_CONTRACT_VAR`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `ERROR_CONTRACT_VAR`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `CONTRACT_SYNC_IND`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `CONTRACT_SYNCED`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `CONTRACT_SYNCING`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `DELETE_CONTRACT`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `CALL_CONTRACT_FN`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `SEND_CONTRACT_TX`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `ADD_CONTRACT`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `CONTRACT_INITIALIZING`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `CONTRACT_INITIALIZED`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.-->

## Contract Events

<!--### `LISTEN_FOR_EVENT`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.-->

### `EVENT_FIRED`
Fired when a contract event has been fired.
```
{
  name,
  event
}
```
**`name` (string)**: The name of the event.

**`event` (object)**: The event object returned by web3. See the [web3 Contract Event documentation](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#contract-events-return) for the event object's structure.

<!--### `EVENT_CHANGED`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.

### `EVENT_ERROR`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.-->

## Transactions

<!--### `PUSH_TO_TXSTACK`
A sentence about the event, such as: conditions under which it fires, what it contains, etc.-->

### `TX_BROADCASTED`
```
{
  txHash,
  stackId
}
```
**`txHash` (string)**: The transaction hash.

**`stackId` (int)**: An integer representing an index in the `transactionStack`.

### `TX_CONFIRMATION`
```
{
  confirmationReceipt,
  txHash
}
```
**`confirmationReceipt` (object)**: The confirmation receipt returned by web3. See the [web3 getTransactionReceipt documentation](https://web3js.readthedocs.io/en/1.0/web3-eth.html?highlight=confirmation#eth-gettransactionreceipt-return) for the receipt object's structure.

**`txHash` (string)**: The transaction hash.

### `TX_SUCCESSFUL`
```
{
  receipt,
  txHash
}
```
**`receipt` (object)**: The transaction receipt returned by web3. See the [web3 getTransactionReceipt documentation](https://web3js.readthedocs.io/en/1.0/web3-eth.html?highlight=confirmation#eth-gettransactionreceipt-return) for the receipt object's structure.

**`txHash` (string)**: The transaction hash.

### `TX_ERROR`
```
{
  error,
  stackTempKey
}
```
**`error` (object)**: An error object, containig a `message`, if provided. Empty object if the transaction failed as a result of user rejection via their wallet.

**`stackTempKey` (string)**: If the transaction experienced an erorr before broadcasting (such as a rejection), this key will be filled on the `transactionStack` rather than a transaction hash to prevent stack index collisions.
