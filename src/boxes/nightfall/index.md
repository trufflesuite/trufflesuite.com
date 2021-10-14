---
hide:
  - navigation
---

# Nightfall Truffle Box

The easiest way to get started on [Nightfall](https://github.com/EYBlockchain/nightfall).

## Supported hardware & prerequisites

Mac and Linux machines with at least 16GB of memory and 10GB of disk space are supported.

Nightfall requires the following software to run:

- [Docker](https://docs.docker.com/v17.12/install/)
  - Launch Docker Desktop (on Mac, it is on the menu bar) and set memory to 8GB with 4GB of swap
    space (minimum - 12GB memory is better) or 16GB of memory with 512MB of swap. **The default
    values for Docker Desktop will NOT work. No, they really won't**.
- [Node](https://nodejs.org/en/) (tested with 10.15.3) with npm and node-gyp
  - If running macOS, install Xcode then run `xcode-select —install` to install command line tools.
  - Note: Currently will not work with node v12. To check the node version, run `node --version`. If using mac/brew, then you may need to run `brew install node@10` and `brew link --overwrite node@10 --force`
- [Python](https://www.python.org/downloads/)
  - Be sure npm is setup to use v2.7 of python, not python3. To check the python version, run `python --version`
  - You may need to run `npm config set python /usr/bin/python2.7` (or wherever your python 2 location is)

## Installation

First ensure you are in a new and empty directory.

1. Run the `unbox` command via `npx` and skip to step 3. This will install all necessary dependencies.
   ```js
   npx truffle unbox nightfall
   ```

2. Alternatively, you can install Truffle globally and run the `unbox` command.
    ```javascript
    npm install -g truffle
    truffle unbox nightfall
    ```

3. Start Docker.
    
4. In the root project directory, we generate the keys and constraint files for our [Zero Knowledge Proofs](https://blog.decentriq.ch/zk-snarks-primer-part-one/). This is about 7GB and depends on randomness for security. **This step can take a while, depending on your hardware (1-3 hours)**. Before you begin, check once more you have provisioned enough memory for Docker.
    ```javascript
    npm run setup
    ```

5. Alternatively, you can generate specific verification keys and constraint files one at time using a prompt.
    ```javascript
    npm run setup-prompt
    ```

6. Now, run the development console.
    ```javascript
    truffle develop
    ```

7. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```
    
8. Execute the script provided for registering Zero Knowledge Proof verification keys on-chain. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    exec scripts/registerVks.js
    ```
    
9. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // inside the development console.
    test

    // outside the development console..
    truffle test
    ```

## FAQ

* __How do I use this with Ganache-CLI?__

    It's as easy as modifying the config file! [Check out our documentation on adding network configurations](http://truffleframework.com/docs/advanced/configuration#networks).

* __Where can I find more documentation?__

    This box is a marriage of [Truffle](http://truffleframework.com/), [Nightfall](https://github.com/EYBlockchain/nightfall), and [ZoKrates](https://zokrates.github.io/). Any of them would be a great place to start!


# Acknowledgements
This software uses [ZoKrates](https://hub.docker.com/r/michaelconnor/zok) which is [licensed](https://github.com/Zokrates/ZoKrates/blob/master/LICENSE) under [LGPL3](https://www.gnu.org/licenses/lgpl-3.0.en.html).
