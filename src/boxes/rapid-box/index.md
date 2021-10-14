---
hide:
  - navigation
---

# Rapid Box
A quick start truffle box to host REST APIs interacting with Smart Contracts.

## Key features
Rapid Box allows your to focus on development of your Smart Contracts and exposing them through an API service, without spending time bridging Contract ABIs into your Express project.

- The box takes care of auto-loading Truffle Contract definitions into the `Contracts` helper.
- The `Contracts` helper also exposes the `web3` object for RPC operations like `getAccounts`.
- Server start accepts RPC endpoint as a parameter making it easy to switch between environments.

#### Example
Exposing an endpoint to get value from SimpleStorage.
```
// Contracts helper
const Contracts = require('./app/contracts.js');

...
// Get storage contract value
app.get('/storage', function (req, res) {
    Contracts.SimpleStorage.deployed().then(function (instance) {
        instance.get.call().then(function (value) {
            res.json({
                value: value
            });
        });
    });
});
```

### Setup
To unbox to your workspace.
```
truffle unbox hexeight/rapid-box
```
### Development
Continue to use truffle as usual ;)
```
  Compile contracts: truffle compile
  Migrate contracts: truffle migrate
  Test contracts:    truffle test
  Run server:        npm start -- --rpc <RPC endpoint>
```

### Run
To run the API service, the RPC endpoint parameter is required. This allows switching RPC endpoints during development.

For example:
```
# Note that npm start requires the extra -- to different between npm arguments and your script arguments.
npm start -- --rpc http://localhost:8545
OR
node server.js --rpc http://localhost:8545
```

#### Feedback
Feel free to send in pull-requests and raise issues with any feedback.
