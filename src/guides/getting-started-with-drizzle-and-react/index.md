---
hide:
  - navigation
---

# Getting Started with Drizzle and React

Drizzle is the newest member of the Truffle Suite and our first front-end development tool. At its core, **Drizzle** takes care of synchronizing your contract data, transaction data and more from the blockchain to a [Redux](https://redux.js.org/) store. There are also higher-level abstractions on top of the base `drizzle` library; tools for React compatibility ([`drizzle-react`](/docs/drizzle/react/react-integration.html)) and a set of ready-to-use React components ([`drizzle-react-components`](/docs/drizzle/react/react-components.html)).

We're going to focus on the lower levels today, taking you through setting up a Truffle project with React and Drizzle from scratch. This way we can gain the best understanding of how Drizzle works under the hood. With this knowledge, you can leverage the full power of Drizzle with any front-end framework of your choosing, or use the higher-level React abstractions with confidence.

This will be a very minimal tutorial focused on setting and getting a simple string stored in a contract. It's meant for those with a basic knowledge of Truffle, who have some knowledge of JavaScript and React.js, but who are new to using Drizzle.

<p class="alert alert-info">
<i class="far fa-info-circle"></i> <strong>Note</strong>: For Truffle basics, please read through the Truffle <a href="/guides/pet-shop">Pet Shop</a> tutorial before proceeding.
</p>

In this tutorial we will be covering:

1. Setting up the development environment
2. Creating a Truffle project from scratch
3. Writing the smart contract
4. Compiling and migrating the smart contract
5. Testing the smart contract
6. Creating our React.js project
7. Wiring up the front-end client
8. Wire up the React app with Drizzle
9. Write a component to read from Drizzle
10. Write a component to write to the smart contract

## Setting up the development environment

There are a few technical requirements before we start. Please install the following:

*   [Node.js v12+ LTS and npm](https://nodejs.org/en/) (comes with Node)

### Truffle

Once we have those installed, we only need one command to install Truffle:

```shell
npm install -g truffle
```

To verify that Truffle is installed properly, type `truffle version` on a terminal. If you see an error, make sure that your npm modules are added to your path.

### Create-React-App

Finally, since this is a React.js tutorial, we will be creating our React project with [Create-React-App](https://github.com/facebook/create-react-app/).

You won't have to do anything if you have NPM version 5.2 or above. You can check your NPM version by running `npm --version`. If you do not, then you will need to install the tool globally with this command:

```shell
npm install -g create-react-app
```

## Creating a Truffle project

1. Truffle initializes in the current directory, so first create a directory in your development folder of choice and then move inside it.

    ```shell
    mkdir drizzle-react-tutorial
    cd drizzle-react-tutorial
    ```

2. Now we're ready to spawn our empty Truffle project by running the following command:

    ```shell
    truffle init
    ```

Let's take a brief look at the directory structure that was just generated.

### Directory structure

The default Truffle directory structure contains the following:

* `contracts/`: Contains the [Solidity](https://solidity.readthedocs.io/) source files for our smart contracts. There is an important contract in here called `Migrations.sol`, which we'll talk about later.
* `migrations/`: Truffle uses a migration system to handle smart contract deployments. A migration is an additional special smart contract that keeps track of changes.
* `test/`: Contains both JavaScript and Solidity tests for our smart contracts.
* `truffle-config.js`: Truffle configuration file.

## Writing our smart contract

We'll add a simple smart contract called MyStringStore.

1. Create a new file named `MyStringStore.sol` in the `contracts/` directory.

2. Add the following content to the file:

   ```solidity
   pragma solidity ^0.8.0 <0.9.0;

   contract MyStringStore {
     string public myString = "Hello World";

     function set(string memory x) public {
       myString = x;
     }
   }
   ```

Since this isn't a Solidity tutorial, all you need to know about this is:

* We've created a public string variable named `myString` and initialized it to "Hello World". This automatically creates a getter (since it's a public variable) so we don't have to write one ourselves.
* We've created a setter method that simply sets the `myString` variable with whatever string is passed in.

## Launching a test blockchain with Truffle Develop

Before we move ahead, let's first launch our test blockchain with the Truffle Develop console.

Open up a new terminal, navigate to the project directory, and run the following command:

```shell
truffle develop
```

This will spawn a new blockchain that listens on `127.0.0.1:9545` by default.

## Compiling and migrating the smart contract

Now we are ready to compile and migrate our contract.

### Compilation

In the Truffle Develop console, type the following command:

```shell
compile
```

<p class="alert alert-info">
<strong>Note</strong>: If you're on Windows and encountering problems running this command, please see the documentation on <a href="/docs/truffle/reference/configuration.html#resolving-naming-conflicts-on-windows">resolving naming conflicts on Windows</link>.
</p>

You should see output similar to the following:

```
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/MyStringStore.sol...
Writing artifacts to ./build/contracts
```

### Migration

Now that we've successfully compiled our contracts, it's time to migrate them to the blockchain!

<p class="alert alert-info">
  <strong>Note</strong>: Read more about migrations in the <a href="/docs/getting_started/migrations">Truffle documentation</a>.
</p>

To create our own migration script.

1. Create a new file named `2_deploy_contracts.js` in the `migrations/` directory.

2. Add the following content to the `2_deploy_contracts.js` file:

   ```javascript
   const MyStringStore = artifacts.require("MyStringStore");

   module.exports = function(deployer) {
     deployer.deploy(MyStringStore);
   };
   ```

3. Back in our Truffle Develop console, migrate the contract to the blockchain.

   ```shell
   migrate
   ```

   You should see the migrations being executed in order, with the details of each migration listed.

## Testing the smart contract

Before we proceed, we should write a couple tests to ensure that our contract works as expected.

1. Create a new file named `MyStringStore.js` in the `test/` directory.

1. Add the following content to the `MyStringStore.js` file:

   ```javascript
   const MyStringStore = artifacts.require("./MyStringStore.sol");

   contract("MyStringStore", accounts => {
     it("should store the string 'Hey there!'", async () => {
       const myStringStore = await MyStringStore.deployed();

       // Set myString to "Hey there!"
       await myStringStore.set("Hey there!", { from: accounts[0] });

       // Get myString from public variable getter
       const storedString = await myStringStore.myString.call();

       assert.equal(storedString, "Hey there!", "The string was not stored");
     });
   });
   ```

### Running the tests

1. Back in the Truffle Develop console, run the tests:

   ```shell
   test
   ```

1. If all the tests pass, you'll see console output similar to this:

   ```
   Using network 'develop'.

   Contract: MyStringStore
     ✓ should store the string 'Hey there!' (98ms)

   1 passing (116ms)
   ```

Awesome! Now we know that the contract actually works.

## Creating our React.js project

Now that we are done with the smart contract, we can write our front-end client with React.js! In order to do this, open another terminal, navigate to your project directory, and simply run this command (if you have NPM version 5.2 or above):

```shell
npx create-react-app client
```

**If you have an older version of NPM**, make sure Create-React-App is installed globally as per the instructions in the [Setting up the development environment](#create-react-app) section and then run the following:

```shell
create-react-app client
```

This should create a `client` directory in your Truffle project and bootstrap a barebones React.js project for you to start building your front-end with.

## Wiring up the front-end client

Since Create-React-App's default behavior disallows importing files from outside of the `src` folder, we need to bring the contracts from our `build` folder inside `src`. We can copy and paste them every time we compile our contracts, but a better way is to simply configure Truffle to put the files there.

In the `truffle-config.js` file, replace the contents with the following:

```javascript
const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts")
};
```

This will make sure to output the contract build artifacts directory inside your React project. But this also means we'll have to restart our Truffle Develop console. Press `CTRL + C` to exit out of the Truffle Develop console and then start it again with `truffle develop`.

From there, make sure you run the `compile` and `migrate` commands again so that the new build artifacts will be output into the new folder. If you are encountering issues, try `migrate --reset` for a clean migration from scratch.

### Install Drizzle

This is the most delicious part, we install Drizzle. Make sure you are in the `client` directory and then run the following:

```shell
npm install @drizzle/store
```

And that's it for dependencies! Note that we don't need to install Web3.js or @truffle/contract ourselves. Drizzle contains everything we need to work reactively with our smart contracts.

## Wire up the React app with Drizzle

Before we go further, let's start our React app by running the follow command inside our `client` directory:

```shell
npm start
```

This will serve the front-end under `localhost:3000`, so open that up in your browser.

<p class="alert alert-info">
<strong>Note</strong>: Make sure to use an incognito window if you already have MetaMask installed (or disable MetaMask for now). Otherwise, the app will try to use the network specified in MetaMask rather than the develop network under `localhost:9545`.
</p>

If the default Create-React-App page loaded without any issues, you may proceed.

### Setup the store

The first thing we need to do is to setup and instantiate the Drizzle store. We are going add the following code to `client/src/index.js`:

```javascript
// import drizzle functions and contract artifact
import { Drizzle } from "@drizzle/store";
import MyStringStore from "./contracts/MyStringStore.json";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [MyStringStore],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
};

// setup drizzle
const drizzle = new Drizzle(options);
```

First, we imported the tools from Drizzle as well as the contract definition.

We then built our options object for Drizzle, which in this case is just specifying the specific contract we want to be loaded by passing in the JSON build artifact.

And finally, we created the `drizzleStore` and used that to create our `drizzle` instance which we will pass in as a prop to our `App` component.

Once that is complete, your `index.js` should look something like this:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import drizzle functions and contract artifact
import { Drizzle } from "@drizzle/store";
import MyStringStore from "./contracts/MyStringStore.json";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [MyStringStore],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
};

// setup drizzle
const drizzle = new Drizzle(options);

ReactDOM.render(
  <React.StrictMode>
    <App drizzle={drizzle} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

Note again that the `drizzle` instance is passed into the `App` component as props.

### Wire up the App component

Now that we have a `drizzle` instance to play around with, we can go into `client/src/App.js` to start working with the React API. By default `create-react-app` will generate the App component as a React functional component. For the purpose of this tutorial we will replace the entire contents of `client/src/App.js` with a Class component as it will simplify state and lifecycle management for the component. The important parts of the App component will be explained below.

Replace the contents of `client/src/App.js` with the following:

```javascript
import React from 'react';

class App extends React.Component {

  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return <div className="App">Drizzle is ready</div>;
  }
}
```

#### Adding state variables

First, we set up our state variables inside our App component:

```javascript
state = { loading: true, drizzleState: null };
```

We use two state variables here:

1. `loading` — Indicates if Drizzle has finished initializing and the app is ready. The initialization process includes instantiating `web3` and our smart contracts, fetching any available Ethereum accounts and listening (or, in cases where subscriptions are not supported: polling) for new blocks.
2. `drizzleState` — This is where we will store the state of the Drizzle store in our top-level component. If we can keep this state variable up-to-date, then we can simply use simple `props` and `state` to work with Drizzle (i.e. you don't have to use any Redux or advanced React patterns).

#### Adding some initialization logic

Next we have provided the `componentDidMount` lifecycle method for the component. The `componentDidMount` lifecycle method will run after the component output has been rendered to the DOM. This allows us to run some initialization logic.

```javascript
componentDidMount() {
  const { drizzle } = this.props;

  // subscribe to changes in the store
  this.unsubscribe = drizzle.store.subscribe(() => {

    // every time the store updates, grab the state from drizzle
    const drizzleState = drizzle.store.getState();

    // check to see if it's ready, if so, update local component state
    if (drizzleState.drizzleStatus.initialized) {
      this.setState({ loading: false, drizzleState });
    }
  });
}
```

First, we grab the `drizzle` instance from the props, then we call `drizzle.store.subscribe` and pass in a callback function. This callback function is called whenever the Drizzle store is updated. Note that this store is actually a Redux store under the hood, so this might look familiar if you've used Redux previously.

Whenever the store is updated, we will try to grab the state with `drizzle.store.getState()` and then if Drizzle is initialized and ready, we will set `loading` to false, and also update the `drizzleState` state variable.

By doing this, `drizzleState` will always be up-to-date and we also know exactly when Drizzle is ready so we can use a loading component to let the user know.

#### Unsubscribing from the store

Note that we assign the return value of `subscribe()` to a class variable `this.unsubscribe`. This is because it is always good practice to unsubscribe from any subscriptions you have when the component un-mounts. In order to do this, we save a reference to that subscription (i.e. `this.unsubscribe`), and inside `componentWillUnmount`, we have the following:

```javascript
componentWillUnmount() {
  this.unsubscribe();
}
```

This will safely unsubscribe when the App component un-mounts so we can prevent any memory leaks.

#### Replace the `render` method

Finally, we have replaced the boilerplate render method with something that applies to us better:

```javascript
render() {
  if (this.state.loading) return "Loading Drizzle...";
  return <div className="App">Drizzle is ready</div>;
}
```

In the next section, we will replace "Drizzle is ready" with an actual component that will read from the store. If you refresh your browser and run this app now, you should see "Loading Drizzle..." briefly flash on screen and then subsequently "Drizzle is ready".

## Write a component to read from Drizzle

First, let's create a new file at `client/src/ReadString.js` and paste in the following:

```javascript
import React from "react";

class ReadString extends React.Component {
  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    console.log(drizzle);
    console.log(drizzleState);
  }

  render() {
    return <div>ReadString Component</div>;
  }
}

export default ReadString;
```

And then inside `App.js`, import the new component with this statement:

```javascript
import ReadString from "./ReadString";
```

Now modify your `App.js` render method so that we pass in the `drizzle` instance from props as well as the `drizzleState` from the component state:

```javascript
render() {
  if (this.state.loading) return "Loading Drizzle...";
  return (
    <div className="App">
      <ReadString
        drizzle={this.props.drizzle}
        drizzleState={this.state.drizzleState}
      />
    </div>
  );
}
```

Go back to the browser and open up your console. You should see that the two `console.log` statements are working and they are displaying both the `drizzle` instance as well as a `drizzleState` that is fully initialized.

What this tells us is that the `drizzleState` we get in this component will always be fully ready once this component mounts. At this point, you can take some time to explore the `drizzle` instance object as well as the `drizzleState` object.

### `drizzle` instance and `drizzleState`

For the most part, `drizzleState` is there for you to read information from (i.e. contract state variables, return values, transaction status, account data, etc.), whereas the `drizzle` instance is what you will use to actually get stuff done (i.e. call contract methods, the Web3 instance, etc.).

### Wiring up the `ReadString` component

Now that we have access to our `drizzle` instance and the `drizzleState`, we can put in the logic that allows us read the smart contract variable we are interested in. Here is what the full code of `ReadString.js` should look like:

```javascript
import React from "react";

class ReadString extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.MyStringStore;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["myString"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { MyStringStore } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const myString = MyStringStore.myString[this.state.dataKey];

    // if it exists, then we display its value
    return <p>My stored string: {myString && myString.value}</p>;
  }
}

export default ReadString;
```

If everything is working, your app should display "Hello World". But first, let's walk through what we did here.

#### When the component mounts

```javascript
componentDidMount() {
  const { drizzle } = this.props;
  const contract = drizzle.contracts.MyStringStore;

  // let drizzle know we want to watch the `myString` method
  const dataKey = contract.methods["myString"].cacheCall();

  // save the `dataKey` to local component state for later reference
  this.setState({ dataKey });
}
```

When the component mounts, we first grab a reference to the contract we are interested in and assign it to `contract`.

We then need to tell Drizzle to keep track of a variable we are interested in. In order to do that, we call the `.cacheCall()` function on the `myString` getter method.

What we get in return is a `dataKey` that allows us to reference this variable. We save this to the component's state so we can use it later.

#### The `render` method

```javascript
render() {
  // get the contract state from drizzleState
  const { MyStringStore } = this.props.drizzleState.contracts;

  // using the saved `dataKey`, get the variable we're interested in
  const myString = MyStringStore.myString[this.state.dataKey];

  // if it exists, then we display its value
  return <p>My stored string: {myString && myString.value}</p>;
}
```

From the `drizzleState`, we grab the slice of the state we are interested in, which in this case is the `MyStringStore` contract. From there, we use the `dataKey` we saved from before in order to access the `myString` variable.

Finally, we write `myString && myString.value` to show the value of the variable if it exists, or nothing otherwise. And in this case, it should show "Hello World" since that is the string the contract is initialized with.

### Quick Recap

The most important thing to get out of this section here is that there are two steps to reading a value with Drizzle:

1. First, you need to let Drizzle know what variable you want to watch for. Drizzle will give you a `dataKey` in return and you need to save it for later reference.
2. Second, due to the asynchronous nature of how Drizzle works, you should be watching for changes in `drizzleState`. Once the variable accessed by the `dataKey` exists, you will be able to get the value you are interested in.

## Write a component to write to the smart contract

Of course, simply reading a pre-initialized variable is no fun at all; we want something that we can interact with. In this section, we will create an input box where you can type a string of your choice and have it save to the blockchain forever!

First, let's create a new file `client/src/SetString.js` and paste in the following:

```javascript
import React from "react";

class SetString extends React.Component {
  state = { stackId: null };

  handleKeyDown = e => {
    // if the enter key is pressed, set the value with the string
    if (e.keyCode === 13) {
      this.setValue(e.target.value);
    }
  };

  setValue = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.MyStringStore;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["set"].cacheSend(value, {
      from: drizzleState.accounts[0]
    });

    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  render() {
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}

export default SetString;
```

At this point, import and include it inside `App.js` just like you did with the `ReadString` component:

```javascript
import SetString from "./SetString";

// ...

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <ReadString
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <SetString
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    );
  }
```

At this point, the app should work and you should try it out. You should be able to type something into the input text box, hit Enter, and Drizzle's react store will automatically display the new string.

Next, let's go through `SetString.js` step-by-step.

### General structure

First let's take a look at the general React.js boilerplate that we need.

```javascript
class SetString extends React.Component {
  state = { stackId: null };

  handleKeyDown = e => {
    // if the enter key is pressed, set the value with the string
    if (e.keyCode === 13) {
      this.setValue(e.target.value);
    }
  };

  setValue = value => { ... };

  getTxStatus = () => { ... };

  render() {
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}
```

In this component, we will have an input text box for the user to type in a string, and when the Enter key is pressed, the `setValue` method will be called with the string as a parameter.

Also, we will display the status of the transaction. The `getTxStatus` method will return a string displaying the status of the transaction by referencing a `stackId` state variable (more on this later).

### Submitting the transaction

```javascript
setValue = value => {
  const { drizzle, drizzleState } = this.props;
  const contract = drizzle.contracts.MyStringStore;

  // let drizzle know we want to call the `set` method with `value`
  const stackId = contract.methods["set"].cacheSend(value, {
    from: drizzleState.accounts[0]
  });

  // save the `stackId` for later reference
  this.setState({ stackId });
};
```

We first assign the contract from the `drizzle` instance into `contract`, and then we call `cacheSend()` on the method we are interested in (i.e. `set`). Then we pass in the string we want to set (i.e. `value`) as well as our transaction options (in this case, just the `from` field). Note that we can get our current account address from `drizzleState.accounts[0]`.

What we get in return is a `stackId`, which is a reference to the transaction that we want to execute. Ethereum transactions don't receive a hash until they're broadcast to the network. In case an error occurs before broadcast, Drizzle keeps track of these transactions by giving each it's own ID. Once successfully broadcasted, the `stackId` will point to the transaction hash, so we save it in our local component state for later usage.

### Tracking transaction status

```javascript
getTxStatus = () => {
  // get the transaction states from the drizzle state
  const { transactions, transactionStack } = this.props.drizzleState;

  // get the transaction hash using our saved `stackId`
  const txHash = transactionStack[this.state.stackId];

  // if transaction hash does not exist, don't display anything
  if (!txHash) return null;

  // otherwise, return the transaction status
  return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
};
```

Now that we have a `stackId` saved into our local component state, we can use this to check the status of our transaction. First, we need the `transactions` and `transactionStack` slices of state from `drizzleState`.

Then, we can get the transaction hash (assigned to `txHash`) via `transactionStack[stackId]`. If the hash does not exist, then we know that the transaction has not been broadcasted yet and we return null.

Otherwise, we display a string to show the status of our transaction. Usually, this will either be "pending" or "success".

# The End

Congratulations! You have taken a huge step to understanding how Drizzle works. Of course, this is only the beginning. You can use tools like [`Drizzle`](https://github.com/trufflesuite/drizzle) in your dapp to help reduce the boilerplate code that you would have to write.

Alternatively, you could also bootstrap your Drizzle dapp with our [Truffle box](https://github.com/truffle-box/drizzle-box).
