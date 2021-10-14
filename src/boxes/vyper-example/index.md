---
hide:
  - navigation
---

Vyper Example Box
=================

This box contains a simple `VyperStorage` contract to show the basics of using
Vyper with Truffle.

## Installation

1. Install Truffle globally. Make sure you have v5.0.0 or higher.
    ```
    npm install -g truffle
    ```

2. Download the box. This also takes care of installing the necessary dependencies.
    ```
    truffle unbox vyper-example
    ```

3. Run the development console.
    ```
    truffle develop
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```
    compile
    migrate
    ```

5. Run the tests.
    ```
    // If inside the development console.
    test

    // If outside the development console..
    truffle test
    ```
