---
title: Teams | Usage with Truffle
layout: docs.hbs
---

# Usage with Truffle

You can use sandboxes with all of Truffle's commands that work with Ganache, including: `migrate`, `console`, and `test`!
With Truffle versions v5.1.28 and later, using a sandbox only requires the `url` field:

```javascript
module.exports = {
  networks: {
    teams: {
      url:
        "https://sandbox.truffleteams.com/ac98e539-140d-498e-818e-8284eee9d933",
      network_id: 1583853263114,
    },
  },
};
```

If you're using an older version of Truffle, you'll need to use HDWalletProvider. In addition to providing the `mnemonic` and `network_id`, we must specify the initial account index (`0`), total number of accounts (`10`), and set the `shareNonce` option to `false`. Here's a complete example:

```javascript
const HDWalletProvider = require("@truffle/hdwallet-provider");
const teamsMnemonic =
  "custom buzz situate mesh cannon number grass improve iron swim pilot cool";

module.exports = {
  networks: {
    teams: {
      provider: function () {
        return new HDWalletProvider(
          teamsMnemonic,
          "https://sandbox.truffleteams.com/ac98e539-140d-498e-818e-8284eee9d933",
          0,
          10,
          false
        );
      },
      network_id: 1583853263114,
    },
  },
};
```
