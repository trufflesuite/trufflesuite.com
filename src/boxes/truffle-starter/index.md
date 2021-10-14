---
hide:
  - navigation
---

![Caster.io logo](https://caster.io/assets/cio_logo-369287ed535e10c1e2291304f48ed0ccb9ed4d29ab2d0c6ba82634789f7d4c38.png)
# Caster.io Truffle Starter Box

Use this [Truffle Framework](http://truffleframework.com) starter box with the [Caster.io](https://caster.io) Blockchain track lessons.

## Installation
- Install truffle globally `npm install truffle -g`
- Unpack the box with `truffle unbox CasterIO/truffle-starter`

## Using Docker

If you encounter issues building the project locally, you can use the provided Docker image.

_Note:_ This method will not update your Docker image each time you change the code. After every code change, you will need to redeploy your docker container using the following steps:

```
# deploy your Solidity contract
truffle migrate

# build the Docker image
docker build -t caster_truffle:latest .

# launch the Docker container
docker run -p 3000:3000 caster_truffle:latest
```
