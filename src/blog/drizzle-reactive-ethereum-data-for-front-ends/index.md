---
title: Drizzle - Reactive Ethereum Data for Front-ends
hide:
  - navigation
---

Today we're proud to announce the addition of a new product to the Truffle Suite: Drizzle. Drizzle is a collection of front-end libraries that make writing dapp front-ends easier and more predictable.

The core is based on a Redux store. We take care of synchronizing your contract data, transaction data and more. Things stay fast because you declare what to keep in sync. Importantly, this means you have access to the spectacular development tools around Redux. **Want to time travel through your recent transactions? You can do that with a slider.**

  <video width="640" height="480" controls>
    <source src="/img/blog/drizzle-some-chaindata-on-your-ui/drizzle-time-travel.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>

Drizzle's architecture is completely modular. This means you never lose access to the underlying web3 functionality you already know--drizzle as much or as little as you like. We've created two packages for use with React, but the core functionality is contained in the base `drizzle` module itself. If you're familiar with Redux, it's not a stretch to create an Angular library or use it for something other than a webapp.

  ![Drizzle Modules](/img/blog/drizzle-some-chaindata-on-your-ui/drizzle-modules.png)

Want to dive in right away? `truffle unbox drizzle` and you've got a full example dapp. Need more info? Read on!

## The Libraries

### Drizzle

The core library responsible for web3, account and contract instantiation; wiring up the necessary synchronizations and providing additional contract functionality.

[GitHub Repo](https://github.com/trufflesuite/drizzle)

### Drizzle React

Provides a DrizzleProvider component and drizzleConnect helper method to make it easier to connect Drizzle with your React app.

[GitHub Repo](https://github.com/trufflesuite/drizzle-react)

### Drizzle React Components

A library of useful components for common dapp functions. Currently includes:
*   `LoadingContainer`: Wraps your app, ensuring it waits for web3 and contract instantiation and displays relevant feedback if something goes wrong.
*   `ContractData`: Displays contract call output.
*   `ContractForm`: Automatically generates a form for contract transactions.

[GitHub Repo](https://github.com/trufflesuite/drizzle-react-components)

## The Box

Shown in the video above, this box makes use of all of Drizzle's libraries in a finished example dapp.

[GitHub Repo](https://github.com/truffle-box/drizzle-box)

**Help us grow this baby!** What do you want to see from Drizzle? More components? More options? To put it another way: what are you sick of doing on the front-end?

![Drizzle Baby](/img/blog/drizzle-some-chaindata-on-your-ui/baby.jpg)

We're excited to hear your feedback and can't wait to see what you'll build! 

-- Josh & the Truffle Team
