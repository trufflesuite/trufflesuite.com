---
hide:
  - navigation
---

Truffle React TypeScript Template
---

![box-img-sm](https://github.com/LibertyLocked/truffle-react-ts-template/blob/master/box-img-sm.png?raw=true)

## Getting Started

1. Install [Truffle](http://truffleframework.com) and an Ethereum client - like [EthereumJS TestRPC](https://github.com/ethereumjs/testrpc).
    ```
    npm install -g truffle
    npm install -g ethereumjs-testrpc
    ```
1. Launch [`testrpc`](https://github.com/ethereumjs/testrpc).
    ```
    testrpc <options>
    ```
1. Migrate the contracts with truffle.
    ```
    truffle migrate
    ```
1. Run the webpack server for front-end hot reloading
    ```
    npm run dev
    ```

## Tests
This box comes with `truffle` contracts testing and front-end testing with `jest`
1. Truffle contract tests
    ```
    truffle test
    ```
1. Jest tests
    ```
    npm run test
    ```

## Building for Production
1. Migrate the contracts with truffle.
    ```
    truffle migrate
    ```
1. Create production bundle
    ```
    npm run build
    ```
1. The production build will be compiled in the `build/app` folder.

## Directory Structure
```
\build
  \app (Production app dist )
  \contracts (Migrated contracts)
\config
  \jest (Jest config and polyfills)
\contracts (Solidity source)
\migrations (Migration scripts)
\public (Public html)
\src (React app source)
\test (Contract tests)
```

## FAQ
- **My imported CSS doesn't work?**

  I use CSS modules in webpack. If you don't want it, open `webpack.config.ts`, change `modules: true` to `modules: false` under `css-loader`.

- **Can I change what gets included in the vendor bundle?**

  Open `webpack.config.ts` and edit the `vendor_bundle` array under `entry`.
