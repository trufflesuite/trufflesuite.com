# Building and testing a frontend app with Truffle

<p class="alert alert-info">
**Update**: While this tutorial was originally written for Truffle 3, we have updated it to be fully compatible with newer versions of Truffle. We have kept some of the language unaltered, except where necessary. 
</p>

Truffle 3 is out and switched to less opinionated build process that allows any build pipeline to be plugged in. We're going to take advantage of that feature today, and build a frontend app with a custom pipeline.

## Intended audience

This is written for those familiar with Truffle and Ethereum, who want a sense of how to structure a frontend application for easy development and testing. This example uses [webpack](https://webpack.js.org/), but familiarity with other build tools is enough background.

## What does a build process need to do in Truffle?

In general, simple: Turn all higher level code (like ES6, SASS, JSX, templates, etc.) into vanilla JavaScript/HTML/CSS artifacts, and then move those artifacts into the `build/` folder alongside our contract artifacts.

## What this tutorial does

Uses [webpack](https://webpack.js.org/) to compile the application's frontend code and move the artifacts into the `build/` folder.

## Getting started

Once you have Truffle installed, run `truffle unbox webpack` in an **empty** directory to pull down the [Truffle Box for this tutorial](/boxes/webpack) for this tutorial. If you're familiar with the [MetaCoin Truffle Box](/boxes/metacoin)), you'll notice your old friends `Metacoin.sol` and `ConvertLib.sol` are there. But now, running `truffle build` does this:

```shell
Error building:

No build configuration specified. Can't build.

Build failed. See above.
```

That's ok! Truffle is getting out of your way and letting you control the build process. Our new process is specified in `webpack.config.js`. More on this later.

## Compile, migrate, and ...

In order to interact with contracts, we need them deployed on a network! The default network is configured in `truffle.js`:

```javascript
networks: {
  development: {
    host: '127.0.0.1',
    port: 7545,
    network_id: '*' // Match any network id
  }
}
```

This is the default setting for [Ganache](/docs/ganache/using), though you can change this to use any connection you'd like.

<p class="alert alert-info">
**Note**: Read more about [setting up Ganache](/docs/ganache/using). You can also use [Truffle Develop](/docs/getting_started/console), which launches a personal blockchain for testing and is built directly into Truffle, no separate installation required.
</p>

Let's get the contracts on the network:

First run `truffle compile`. This will compile the `.sol` contracts into `.json` artifacts (specified in the [`truffle-contract`](https://github.com/trufflesuite/truffle-contract) library). They will appear in `build/contracts/*.json`. Now we can include contracts in our app with a simple `import` or `require` statement:

```javascript
// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'
```

Next, make sure you have a blockchain running, and then run `truffle migrate`. This will deploy the contracts onto the default network running at `127.0.0.1:7545`.

### ... (webpack) build

All that's left is to use webpack to compile the app and place it in the `build/` folder. A simple `npm run dev` and we're done! This will build the app and serve it on `http://127.0.0.1:8080`. Relevant configs here:

```javascript
// file: package.json
...
  "scripts": {
    "lint": "eslint ./",
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
...
```

```javascript
// file: webpack.config.js
...
entry: './app/javascripts/app.js',
output: {
  path: path.resolve(__dirname, 'build'),
  filename: 'app.js'
},
plugins: [
  // Copy our app's index.html to the build folder.
  new CopyWebpackPlugin([
    { from: './app/index.html', to: 'index.html' }
  ])
],
...
```

You can find more information on webpack concepts on [webpack's website](https://webpack.js.org/concepts/). Notice we didn't *have* to use webpack here, but Truffle comes with a handy webpack demo that gets us started quickly. We _could_ replace the webpack config with a `Gruntfile`, for instance, and use Grunt instead. Truffle don't care no mo'.

## The app

As previously mentioned, the command `npm run dev` builds the app and serves it with a local web server. (This is equivalent to running `npm run build` and then `truffle serve`, but we've done it in one step for convenience.) To see it, navigate to [http://127.0.0.1:8080](http://127.0.0.1:8080). You should see:

![](/tutorials/images/MetaCoin_running.png)

That's it, all done! Happy Truffling!

## Extra: Webpack + Docker + Travis CI

If you want to see how to deploy a frontend app using Docker and Travis build pipeline, check out [my frontend example](https://github.com/dougvk/truffle3-frontend-example) for added goodness.
