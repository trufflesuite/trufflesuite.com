---
hide:
  - navigation
---

# Truffle CI Box

<div>

[![Build Status](https://travis-ci.org/NFhbar/truffle-ci-box.svg?branch=master)](https://travis-ci.org/NFhbar/truffle-ci-box)
[![Coverage Status](https://coveralls.io/repos/github/NFhbar/truffle-ci-box/badge.svg?branch=master)](https://coveralls.io/github/NFhbar/truffle-ci-box?branch=master)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/NFhbar/truffle-ci-box/pulls)

</div>

This box comes with everything you need to start a truffle project with Travis-ci and Coveralls integration. It also includes solium, eslint, and several common testing helpers.

## Installation

1. Install Truffle and Ganache CLI globally.
    ```javascript
    npm install -g truffle
    npm install -g ganache-cli
    ```
2. Download the box.
    ```javascript
    truffle unbox NFhbar/truffle-ci-box
    ```
3. Create a `.env` file in the root directory and add your private key.
    ```
    RINKEBY_PRIVATE_KEY="MyPrivateKeyHere..."
    ROPSTEN_PRIVATE_KEY="MyPrivateKeyHere..."
    ```
4. Update the Travis and Coveralls badges in the `README` file to point to your own repository.

5. Change any lint or solium rules that you like, and feel free to modify the scripts or anything else you want!
