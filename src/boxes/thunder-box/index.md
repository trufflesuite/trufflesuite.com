---
hide:
  - navigation
---

# ThunderCore Truffle Box

The box has all you need to get started with building dapps on [ThunderCore](https://www.thundercore.com).

<image src="https://raw.githubusercontent.com/thundercore/thunder-box/master/box-img-lg.png" width="240" />

## Installation

First ensure you are in a new and empty directory. Besides, you have `nodejs` and `yarn` (optional) in your environment.

1. Run the unbox command via npx and skip to step 3.

```bash
npx truffle unbox thundercore/thunder-box
```

2. Alternatively, you can install Truffle globally and run the unbox command. Make sure you have truffle v 5.0.0 above.

```bash
npm install -g truffle # (yarn global add truffle)
truffle unbox thundercore/thunder-box
```

3. Run the development console.

```bash
truffle develop
```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.

```bash
compile
migrate
```

5. Alternatively, you can run the following instructions to compile and migrate the smart contracts.

```bash
npm run compile # (yarn comile)
npm run migrate # (yarn migrate)
```

6. clean up builded contracts

```bash
npm clean # (yarn clean)
```

7. lint your contract. More detail regarding the linter can be found [here](https://github.com/duaraghav8/Ethlint) 

```bash
npm run lint
npm run lint:fix 
```

## Develop on Thunder Testnet and Mainnet

0. Get the thunder tokens  
  You can get Thunder tokens at: 
  
    - https://faucet-testnet.thundercore.com
    - https://faucet.thundercore.com
  
    for testnet and mainnet, respectively.  
    Remember to point Metamask's current network to thunder-mainnet (https://mainnet-rpc.thundercore.com) or thunder-testnet (https://testnet-rpc.thundercore.com/) after creating those two networks via Avatar -> Settings -> Networks .

1. Setup the control of accounts for deployment
  Either:
    - Write your 12-word mnemonic (seed phrase) to a file named .mnemonic
    - Export your account private keys, one per line, to a file named .private-keys

    ```bash
    # If you use private keys
    mv .private-keys.template .private-keys

    # in .private-keys file, put your private keys
    e59cb5e369b65eee650f90f3280cbe8039db81335943ac7a88df5f4df...
    d92a96fa691a7c31b2e2891de05cacc85d562b128afa6bb8f7108aac7...

    # If you prefer mnemonic
    mv .mnemonic.template .mnemonic

    # In .mnemonic file, put your mnemonic
    dog cat apple bird ...
    ```
    

2. Compile and migrate your contract for testnet and mainnet

    ```bash
    # Compile to testnet
    npm run compile:testnet
    # is equal to 
    truffle compile --network thunder-testnet

    # ---

    # Compile to mainnet
    npm run compile:mainnet
    # is equal to 
    truffle compile --network thunder-mainnet

    # ---

    # Migrate to testnet
    npm run migrate:testnet
    # is equal to 
    truffle migrate --network thunder-testnet

    # ---

    # Migrate to mainnet
    npm run migrate:mainnet
    # is equal to 
    truffle migrate --network thunder-mainnet
    ```

