---
hide:
  - navigation
---

# Drizzle Truffle Ganache Docker Box

This box followed the official drizzle tutorial (https://www.trufflesuite.com/tutorials/getting-started-with-drizzle-and-react), but built on top of docker/docker-compose.

There are two docker services in `docker-compose`:

- ganache-cli (located at /ganache/..):
    - Build on top of the official ganache image `trufflesuite/ganache-cli:latest` 
    - Modified `ENTRYPOINT` to run script `ganache_with_accounts.sh`, so that everytime ganache restarts, the same Ethereum accounts were created.
    - Port `8545:8545`

- truffle-drizzle (located at /truffledrizzle/..)
    - Build on top of `node:10`
    - During the build stage, it will perform the following in order:
        - Install truffle
        - Move contract files
        - Move React files.
        - `npm ci`
    - During the run stage, it will perform the following in order:
        - truffle build
        - truffle test
        - truffle migrate
        - copy compiled contracts to the react project
        - run the react project
    - Note that since we created a volume for the React project (`- ./truffledrizzle/client/src:/client/src`), the front end code supports hot editing.
    
A few more things worth to mention:

`dev_build.sh` builds the docker images according to `docker-compose-dev.yml`
`dev_run.sh` starts the docker-compose as defined in `docker-compose-dev.yml`
`npm_install.sh` creates a temp node container, in case we want to modify `package-lock.json`. (This project does not require node to be installed on local machine! :)
