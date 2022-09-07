---
title: Three new Ganache features to improve your developer experience
hide:
  - navigation
---

**By [Kingsley Arinze](https://twitter.com/heydamali)**

![The Merge and what it means for Truffle](./what-is-new-in-ganache.jpg)

Since the release of Ganache 7 in January, we’ve mostly focused our attention on bug fixes and UX improvements. Recently, we decided to expand our focus to also include new features that will help improve the developer experience for our users.

In addition, with the migration of Ethereum from PoW to PoS and the separation of the consensus layer from the execution layer, our users have been curious to know how Ganache is impacted and what actions they will need to take. 

The simple answer to this very important question is: although [there are changes to how Ethereum clients will work post-merge](https://consensys.net/blog/ethereum-2-0/the-four-pillars-of-the-merge-to-proof-of-stake-how-ethereum-will-evolve), Ganache users do not need to do anything since these changes to Ethereum will not affect the user and dapp development experience.

In this blog, we’ll touch on 3 of those new features that we've added to Ganache since the Ganache 7 release in January.

## Zero-config mainnet forking now available in the browser

Ganache v7.0 made it possible to run Ganache in the browser, as shown below:

```html
<script src="https://cdn.jsdelivr.net/npm/ganache@{VERSION}/dist/web/ganache.min.js"></script>

const options = {};
const provider = Ganache.provider(options);
```
Adding the above lines of code would make the Ganache blockchain simulator available in your browser, however, zero-config mainnet forking wasn't available.

Since the release of Ganache v7.3.2 users can now utilize this feature in the browser by specifying additional options during setup:

```javascript
...

const options = { fork: { network: "mainnet" } }
const provider = Ganache.provider(options);
```

You can verify that this is working by attempting to fetch a mainnet block using the **eth_getBlockByNumber** flag:

```javascript
const block = await provider.request({ method: "eth_getBlockByNumber", params: ["0xec4eb0"] });
console.log(block); // will be mainnet's block 15486640
```

## Ability to use console.log from Solidity

If you use Vyper's `print` statement or Hardhat's `console.sol` library contract for printing items to the console, you can now use these tools together with Ganache, as Ganache now understands Vyper's `print` statement, as well as Hardhat's `console.sol` library!

Development of native `console.log` support in Truffle is currently in progress, but Truffle users don't have to wait to use this feature, as they can install Ganache's `console.log` library with `npm install @ganache/console.log` and use it in their Solidity project:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@ganache/console.log/console.sol";

contract GanacheCoin {
    mapping (address => uint) balances;
    constructor() {
        balances[tx.origin] = 10000;
    }

    function sendCoin(address receiver, uint256 amount) public returns(bool sufficient) {
        if (balances[msg.sender] >= amount) {
            balances[msg.sender] -= amount;
            balances[receiver] += amount;
            console.log("send: %o coins to %o", amount, receiver);
            return true;
        } else {
            return false;
        }
    }
}
```

## New eth_getProof RPC method

Ganache now supports the **eth_getProof** RPC method, as specified by [EIP-1186](https://eips.ethereum.org/EIPS/eip-1186). This method returns some useful values, including hashes and proofs associated with the given address and storage keys. This method can be used as shown below:

```javascript
const result = provider.request({
  "method": "eth_getProof",
  "params": [
    // the address to query and generate proof for
    "0x7F0d15C7FAae65896648C8273B6d7E43f58Fa842", 
    // optional storage keys to generate proofs for
    ["0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"], 
    // the block at which to generate the proof
    "latest" 
  ]
});
```
It should return the following output:

```json
{
  "accountProof": [
    "0xf90211a...0701bc80",
    "0xf90211a...0d832380",
    "0xf90211a...5fb20c80",
    "0xf90211a...0675b80",
    "0xf90151a0...ca08080"
  ],
  "balance": "0x0",
  "codeHash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
  "nonce": "0x0",
  "storageHash": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  "storageProof": [
    {
      "key": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "proof": [
        "0xf90211a...0701bc80",
        "0xf90211a...0d832380"
      ],
      "value": "0x1"
    }
  ]
}
```

## Conclusion

At Truffle, we remain committed to improving and simplifying the user experience for dapp developers in the Web3 ecosystem by creating developer tools, resources, and educational materials. With the monumental upgrade coming to Ethereum by mid-September, we're even more excited and committed to this course.

To find out more about our suite of developer tools, visit the official [Truffle website](https://trufflesuite.com). If you have questions about The Merge and how it impacts our products feel free to start a discussion on our [Github Discussions channel](https://github.com/orgs/trufflesuite/discussions). Finally, don't forget to follow us on [Twitter](https://twitter.com/trufflesuite) for live announcements and updates.
