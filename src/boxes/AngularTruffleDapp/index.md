---
hide:
  - navigation
---


![Logo](https://i.ibb.co/TkzPNnk/1-CIJ0-LEa6-ZR17-GFZSjy2ce-Q.png)

#  Angular + Truffle = 💓 ÐAPPS
This  Trufflebox provides a base for Truffle Framework and Angular DAPP. and you can make transactions between accounts and scale you app with beautiful material design 


This  was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

1. Install truffle, Angular CLI and an Ethereum client. If you don't have a test environment 
  ```bash
  npm install -g truffle
  npm install -g @angular/cli
  npm install -g ganache-cli
  ```

2. Download the box.
  ```bash
  truffle unbox ng-es/angulartruffledapp
  ```

3. Run your Ethereum client. For Ganache CLI:
  ```bash
  ganache-cli
  ```
Note the mnemonic 12-word phrase printed on startup, you will need it later.

4. Install the dependencies and Compile and migrate your contracts, into the directory Blockchain using :
  ```bash
  npm install 
  ```
5. Change the port  in truffle-config.js
 ```
 change the port in truffle-config.js 8545 in windows the port is 7545 but in linux the defaul port is  8545
  ```
6. Navigate into the Frontend Directory 
  ```bash
  npm install & ng serve , And lets Buidl 
  ```
7. If you want to customize <===

+ __First__
Change the contract in Blockchain/contracts or make your own contract and compile and migrate

+ __Second__
Change the app/service/contract.service.ts with your builded contract .json and you custom directives and functions


## __Common errors and their solutions__

| Error | Solution |
|-------|----------|
| `Module not found: Error: Can't resolve '../../../../../Blockchain/build/contracts/Payment.json'` during `ng serve` | Run `truffle compile` |
| `Error: the tx doesn't have the correct nonce.` in MetaMask | Reset MetaMask: Settings -> Reset Account //Warning only with test accounts |
| `Error getting balance; see log.` in UI, with `Error: MetaCoin has not been deployed to detected network (network/artifact mismatch)` in browser console | Ensure you have started ganache, run `truffle migrate` and configured MetaMask to point to ganache | `Error: i cannot see my account or balance` Ensure you are logged in metamask and refresh | If you have a custom rcp in ganache you can change the dir in `src/app/contract/contract.service.ts line21 with your dir `| `Error: [ethjs-rpc] rpc error with payload` in Metamask | You may need update Ganache and restart metamask because some old vesions give 0 gas and the transaction is mark as  underpriced the error givet is errot with payload we recomend use the newest version of ganache cli  |


## Code contributions welcome!

1. Fork it
2. Add new features

```bash
git checkout -b my-new-feature
git commit -am 'Add some feature'
git push origin my-new-feature
```

3. Create a pull request
