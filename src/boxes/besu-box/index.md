---
hide:
  - navigation
---

# Besu-Box
To Be Used as Truffle Box Creating API Endpoints for
Hyperledger Besu network.

We use a private blockchain for Ethereum BlockChain
Development. This personalised blockchain is made with HL Besu Client.

The Smart Contract Written in solidity language
is deployed on this Ethereum Permissioned Blockchain. Smart Contract is
Immutable hence, once deployed it can't be changed.

A truffle box to serve as the foundation of any Truffle and Express.js dApp.

This Box Uses NodeJS(Express JS) to provide API
endpoints to the Ethereum Blockchain smart contract so that this
smart contract can be used in Android/iOS Apps as well.

**Pre-Requisites**
1. [NodeJS](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
2. [NestJS](https://nestjs.com/)
3. [Docker](https://docs.docker.com/get-docker/)
4. [Truffle](https://github.com/trufflesuite/truffle)
5. [Besu Docker Image](https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Run-Docker-Image/)
6. [Curl](https://curl.haxx.se/)

**Installation**
1. Install Truffle and Nestjs globally
```
npm install -g truffle
npm install -g @nestjs/cli
```

2. Download the box. This also takes care of installing the necessary dependencies.
```
truffle unbox illuzzig/besu-box
```

3. For quick, temporary tests this guide uses /tmp/besu/dev/ as mount volumes. Make sure you create the folders first in the root dir
```
mkdir -p /tmp/besu/dev/
```

4. To run a node that mines blocks at a rate suitable for testing purposes
```javascript
// in another terminal (i.e. not in the truffle develop prompt)
// ensure you are inside the app directory when running this
npm run besu:docker
```

5. Now you can deploy your smart contracts. 
```javascript
// in another terminal (i.e. not in the truffle develop prompt)
// ensure you are inside the app directory when running this
truffle migrate --network besu
```

6. To run the Nestjs server
```javascript
// in another terminal (i.e. not in the truffle develop prompt)
// ensure you are inside the app directory when running this
npm run start:dev
```

7. In a window terminal type 
```
// in another terminal (i.e. not in the truffle develop prompt)
// ensure you are inside the app directory when running this
curl http://localhost:3000/balance/0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73 
```
As you can see this address holds all the metaCoin tokens accordin to the business logic implemented into the smart contract. Below the response
```
{"address":"0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73","balance":"10000"}
```

8. Set the variable `metaCoinAddress` (client_script/utils.js) to match the deployed MetaCoin address from `truffle migrate`. You can get the smart contract address by typing
```
// in another terminal (i.e. not in the truffle develop prompt)
// ensure you are inside the app directory when running this
truffle networks | grep -i metacoin
```
9. Launch the transfer script
```javascript
// in another terminal (i.e. not in the truffle develop prompt)
// ensure you are inside the app directory when running this
npm run transfer
```

10. The second address will receive 10 tokens from the first one. In a window terminal type 
```
// in another terminal (i.e. not in the truffle develop prompt)
// ensure you are inside the app directory when running this
curl http://localhost:3000/balance/0x627306090abaB3A6e1400e9345bC60c78a8BEf57
```
Below the response
```
{"address":"0x627306090abaB3A6e1400e9345bC60c78a8BEf57","balance":"10"}
```

11. For web service monitoring and performance metrics you can enable the APM agent in the main.ts file and visualize the incoming requests with kibana. [Read More](https://www.elastic.co/guide/en/apm/agent/nodejs/current/index.html)

**Contributors**
1. [Giuseppe Gaetano Illuzzi](https://github.com/illuzzig)
