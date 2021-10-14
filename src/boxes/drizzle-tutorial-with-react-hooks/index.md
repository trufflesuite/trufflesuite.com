---
hide:
  - navigation
---

# Drizzle tutorial with React Hooks

<img src="https://truffleframework.com/img/drizzle-logomark.svg" alt="drizzle_logo" title="drizzle_logo" width="100" />

I created a complete **React Hooks** version of this [**Drizzle tutorial**](https://www.trufflesuite.com/tutorials/getting-started-with-drizzle-and-react).

![DApp demo](https://media.giphy.com/media/TdQVda1SmPNaU2gN4J/giphy.gif)

You will need to install Node.js and Truffle, as stated in the tutorial - see "Setting up the development environment".

See the ReactJS [guidance on using hooks](https://reactjs.org/docs/hooks-reference.html) and [Drizzle](https://www.trufflesuite.com/drizzle) for further details on implementing hooks in your project.

## To get this box ##

1. Create a new directory.

2. In the new directory, run ```truffle unbox atkinsonholly/Drizzle-tutorial-with-React-Hooks```. This should pull the box contents to the new local directory.

## After unboxing ##

In the client directory:

```
npm install
```


In the main project directory:

```
truffle develop
```

Then, in the Truffle developer console: 
```
compile
```

and then:
```
migrate
```

To test your smart contract(s), in truffle's developer console:
```
test
```

Now that you have successfully launched your Solidity contract onto your local blockchain, go into the client directory:

```
cd client
```

Run the project by entering the following:

```
npm start
```

To see your project in the browser, go to http://localhost:3000/

You can test your DApp by entering the following:

```
npm test
```

## Troubleshooting ##

You may need to install Xcode to use this box on macOS, see [node-gyp](https://github.com/nodejs/node-gyp) on Github. 
The following command may be useful if you encounter issues with this: ```xcode-select --install```.
