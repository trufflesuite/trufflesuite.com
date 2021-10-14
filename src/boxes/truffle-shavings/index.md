---
hide:
  - navigation
---

## Truffle Shavings

![](https://github.com/okwme/truffle-shavings/blob/master/box-img-lg.png?raw=true)
### Truffle Boilerplate with solium, linguist, zeppelin, migrations, tests &tc

## Install
```
git clone git@github.com:okwme/truffle-shavings.git
cd truffle shavings
yarn

or 

npx truffle unbox okwme/truffle-shavings

// then create a .env file that looks like this:

TRUFFLE_MNEMONIC=candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
GANACHE_MNEMONIC=grid voyage cream cry fence load stove sort grief fuel room save
TESTNET_MNEMONIC=a twelve word mnemonic phrase that works with some test network buddy
INFURA_API_KEY=yOUrInfURaKEy

```

## Run
```
yarn lint:watch
```

## Test
```
truffle develop
yarn test
```

## Deploy
```
truffle develop
yarn deploy --network develop

// this just runs truffle migrate --reset --compile-all
```
