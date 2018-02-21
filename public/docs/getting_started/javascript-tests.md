# Writing Tests in Javascript

Truffle uses the [Mocha](https://mochajs.org/) testing framework and [Chai](http://chaijs.com/) for assertions to provide you with a solid framework from which to write your Javascript tests. Let's dive in and see how Truffle builds on top of Mocha to make testing your contracts a breeze.

Note: If you're unfamiliar with writing unit tests in Mocha, please see [Mocha's documentation](https://mochajs.org/) before continuing.

## Use contract() instead of describe()

Structurally, your tests should remain largely unchanged from that of Mocha: Your tests should exist in the `./test` directory, they should end with a `.js` extension, and they should contain code that Mocha will recognize as an automated test. What makes Truffle tests different from that of Mocha is the `contract()` function: This function works exactly like `describe()` except it enables Truffle's [clean-room features](/docs/getting_started/testing#clean-room-environment). It works like this:

* Before each `contract()` function is run, your contracts are redeployed to the running Ethereum client so the tests within it run with a clean contract state.
* The `contract()` function provides a list of accounts made available by your Ethereum client which you can use to write tests.

Since Truffle uses Mocha under the hood, you can still use `describe()` to run normal Mocha tests whenever Truffle clean-room features are unnecessary.

## Use contract abstractions within your tests

Contract abstractions are the basis for making contract interaction possible from Javascript (they're basically our [flux capacitor](https://www.youtube.com/watch?v=EhU862ONFys)). Because Truffle has no way of detecting which contracts you'll need to interact with within your tests, you'll need to ask for those contracts explicitly. You do this by using the `artifacts.require()` method, a method provided by Truffle that allows you to request a usable contract abstraction for a specific Solidity contract. As you'll see in the example below, you can then use this abstraction to make sure your contracts are working properly.

For more information on using contract abstractions, see the [Interacting With Your Contracts](/docs/getting_started/contracts) section.

## Using artifacts.require()

Using `artifacts.require()` within your tests works the same way as using it within your migrations; you just need to pass the name of the contract. See the [artifacts.require() documentation](./migrations#artifacts-require-) in the Migrations section for detailed usage.

## Using web3

A `web3` instance is available in each test file, configured to the correct provider. So calling `web3.eth.getBalance` just works!

## Example

Here's an example test provided to you by `truffle init`. Note the use of the `contract()` function, the `accounts` array for specifying available Ethereum accounts, and our use of `artifacts.require()` for interacting directly with our contracts.

File: `./test/metacoin.js`

```javascript
// Specifically request an abstraction for MetaCoin
const MetaCoin = artifacts.require('MetaCoin');

before(async () => {
  meta = await MetaCoin.deployed();
});

contract('MetaCoin', accounts => {
  it('should put 10000 MetaCoin in the first account', async () => {
    accOneBalance = await meta.getBalance.call(accounts[0]);
    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });
  it('should send coin correctly', async () => {
    // Get initial balances of first and second account.
    const account_one = accounts[0];
    const account_two = accounts[1];

    const amount = 10;

    const meta = await MetaCoin.deployed();
    const balance1 = await meta.getBalance.call(account_one);
    const balance2 = await meta.getBalance.call(account_two);

    const account_one_starting_balance = balance1.toNumber();
    const account_two_starting_balance = balance2.toNumber();

    await meta.sendCoin(account_two, amount, { from: account_one });

    const balance3 = await meta.getBalance.call(account_one);
    const balance4 = await meta.getBalance.call(account_two);

    const account_one_ending_balance = balance3.toNumber();
    const account_two_ending_balance = balance4.toNumber();

    assert.equal(
      account_one_ending_balance,
      account_one_starting_balance - amount,
      "Amount wasn't correctly taken from the sender"
    );
    assert.equal(
      account_two_ending_balance,
      account_two_starting_balance + amount,
      "Amount wasn't correctly sent to the receiver"
    );
  });
});
```

This test will produce the following output:

```
Using network 'development'.

  Contract: MetaCoin
    ✓ should put 10000 MetaCoin in the first account
    ✓ should send coin correctly

  2 passing (113ms)
```

You can limit the tests being executed to a specific file as follows:

```
truffle test ./test/metacoin.js
```


## Advanced

Truffle gives you access to Mocha's configuration so you can change how Mocha behaves. See the [project configuration](/docs/advanced/configuration#mocha) section for more details.
