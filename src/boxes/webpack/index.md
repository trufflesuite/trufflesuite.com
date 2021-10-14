---
hide:
  - navigation
---

# Webpack Truffle Box

This box is our most bare official implementation with Webpack.

Includes contracts, migrations, tests, user interface, and webpack build pipeline.

## Installation

First ensure you are in a new and empty directory.

1. Run the `unbox` command via `npx` and skip to step 3.
   ```js
   npx truffle unbox webpack
   ```

2. Alternatively, you can install Truffle globally and run the `unbox` command.
    ```javascript
    npm install -g truffle
    truffle unbox webpack
    ```

3. Run the development console.
    ```javascript
    truffle develop
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

5. In the `app` directory, we build and run our frontend. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // in another terminal (i.e. not in the truffle develop prompt)
    cd app
    npm run dev
    ```

6. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // inside the development console.
    test

    // outside the development console..
    truffle test
    ```

7. To build the application for production, use the build script in the `app` folder. A production build will be in the `app/dist` folder.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run build
    ```

## FAQ

* __Where is my production build?__

    The production build will be in the `app/dist` folder after running `npm run build` in the `app` folder.

* __Where can I find more documentation?__

    This box is a marriage of [Truffle](http://truffleframework.com/) and a [Webpack](https://webpack.js.org/) setup. Either one would be a great place to start!