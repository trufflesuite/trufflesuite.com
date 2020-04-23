
# Truffle Suite Website - https://www.trufflesuite.com

Our website is built with [Metalsmith](http://www.metalsmith.io/), using Handlebars templates and a combination of HTML and markdown for page content.

Check out [the contribution guide](https://github.com/trufflesuite/trufflesuite.com/blob/master/CONTRIBUTING.md) to get a lay of the land.

## Contributing

We welcome all contributions, typo corrections, and general feedback. See our [full contribution guide](https://github.com/trufflesuite/trufflesuite.com/blob/master/CONTRIBUTING.md) for details on site architecture and how you could help.

**Please base your changes and target your PR against the `develop` branch, not `master`**

If you find an issue while browsing, most pages have a GitHub link to the directory containing their source files. Look out for the "See a way to make this page better?" links.

## Dependencies

Install `yarn` if you haven't already:

```
npm install -g yarn
```

## Getting Started
Download zip file or git clone repo:

```
git clone https://github.com/trufflesuite/trufflesuite.com.git
```

Navigate into the directory in terminal:

```
cd trufflesuite.com/
yarn
```

## Run dev build
In terminal run:

```
yarn dev
```

Navigate to **[localhost:9000](http://localhost:9000)**/port specified in your terminal

To view Browsersync settings navigate to **[localhost:3001](http://localhost:3001)**

## Compile to a production build

In terminal run:

```
yarn build
```

Navigate to ./build folder for the compiled files.


