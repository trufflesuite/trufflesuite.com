---
hide:
  - navigation
---

# truffle-ts-percel-box

This box is a sample that use Web3 1.0.0-beta and TypeScript 2.8, percel, metacoin box.
I'm happy if this sample is useful for learning etheruem.

## Installation

1. Install Truffle globally.
    ```javascript
    npm install -g truffle
    ```

2. Download the box. This also takes care of installing the necessary dependencies.
    ```javascript
    truffle unbox YuichiNukiyama/truffle-ts-percel-box
    ```

**NOTE**: This box depend on Web3.js 1.0.0-beta. And this package can't install on `Windows` without build-tools.
If you want to use this sample on Windows, execute following script before `truffle unbx`:
```javascript
    // You shoud execute with administrator authority.
    npm install --global --production windows-build-tools
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

5. Run the `percel` development server (outside the development console) for front-end hot reloading. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:1234
    npm run dev
    ```

6. Cleanup extra data after stop truffle and percel.
     ```javascript
    npm run clean
    ```

## Acknowledgements
I referred to the following box. Thank you for authors :smile:

- [metacoin](http://truffleframework.com/boxes/metacoin)
- [tutorialtoken](http://truffleframework.com/boxes/tutorialtoken)