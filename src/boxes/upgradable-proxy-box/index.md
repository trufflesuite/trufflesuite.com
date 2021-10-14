---
hide:
  - navigation
---

# Upgradable-Proxy-Box

This box comes with everything you need to build upgradable-proxy contracts. We also
have a simple react-app shipped along with it that you can use to see
how __you can update a contract without losing any data__.

## Installation

First ensure that you are in an empty repository.




1. Create a new directory and unbox the box using `unbox` command using truffle
```bash
mkdir proxyBox
cd proxyBox
truffle unbox pranav-singhal/upgradable-proxy-box
```
2. Install the box dependencies

```bash
yarn install
```

3. Run the development console
```bash
truffle dev
```
 OR
 ```bash
truffle develop
```
4. In the console now open run the `compile` and `migrate`

```js
compile // compile the contracts
```
```js
migrate // migrate the contracts
```
This will compile and migrate your contracts. It will also create the ABIs and put them inside the `app` folder

5. Go into your `app` folder and `yarn install` the react app

```bash
cd app
yarn install
```

6. In the same folder, `yarn start ` the react app

```bash
yarn start
```


## How it Works

The box has three parts

1. Contracts

> There are 4 Primary Contracts
>1. *TokenStorage.sol* - The contract that stores all the storage variables, their getter and setter functions.
>All storage variables must be defined inside this contract
>2. *TokenProxy.sol* - This contract acts as the face of entire Dapp, all the calls from the client (web3) are made to this contract
>and this contract delagates request to the implementation contract.
>3. *Token_V0.sol* - The first version of the implementation contract
>4. *Token_V1.sol* - The second version of the implementation contract

For Providing upgradeable nature to the Dapp, we write deploy 3 different contracts instead of just one. These contracts work hand in hand as shown in the flow chart below.
###Flow Chart

![flowchart](https://github.com/cds-amal/upgradable-proxy-box/blob/master/app/src/assets/flowChart.jpeg)

The basic idea is to separate the **storage from the business logic**. Hence the Storage( [TokenStorage.sol](./contracts/TokenStorage.sol) ) (which includes, mappings and all the state variables) is deployed in a separate contract
with all the getters and setters.
The Implementation Contract( [Token_V0.sol](./contracts/Token_V0.sol) & [Token_V1.sol](./contracts/Token_V1.sol) ) makes use of the storage contract for all of it's state variables.<br>

The Proxy Contract( [Token Proxy.sol](./contracts/TokenProxy.sol) ) acts as the face of all the contracts. This contract delegates call to the **implementation contract which then uses Storage Contract**.

Now, everytime we need to upgrade our implementation logic, we just need to deploy **a new Implementation Contract**, and then call the `upgradeTo` function on Proxy Contract so that it starts delegating its call to the
latest implementation contract. And hence, the storage is preserved and the calls from the browser are still made to the same Proxy Contract.


[You can read more about how these contracts work here](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2)



2. Web3

> the `Web3` folder inside the app directory gives you code for how
>to use the web3.js library to write Dapp code that can be used between
>different versions of your dapp.
>

3. React App
> using the contracts and the web3 code, we have built a sample dapp that
>provides a dynamic interface that changes with different versions
>of the Dapp.
>
>![App](https://github.com/cds-amal/upgradable-proxy-box/blob/master/app/src/assets/app.png)


## Contributors

1. [Arvind Kalra](https://github.com/arvindkalra)
2. [Pranav Singhal](https://github.com/pranav-singhal)

> Also checkout [this](https://github.com/arvindkalra/express-box) box that we've previously
>built to see how to use
>express with your Dapp

