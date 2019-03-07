---
title: Truffle | Installation
layout: docs.hbs
---
# Installation

```bash
npm install -g truffle
```

## Requirements

* NodeJS v8.9.4 or later
* Windows, Linux or Mac OS X

Truffle also requires that you have a running Ethereum client which supports the standard JSON RPC API (which is nearly all of them). There are many to choose from, and some better than others for development. We'll discuss them in detail in the [Choosing an Ethereum client](/docs/getting_started/client) section.

## Recommendations for Windows

If you're running Truffle on Windows, you may encounter some naming conflicts that could prevent Truffle from executing properly. Please see [the section on resolving naming conflicts](/docs/advanced/configuration#resolving-naming-conflicts-on-windows) for solutions.


## Recommendations for Linux

I you're running Truffle on Linux or MacOS X, you should not install it with sudo, otherwise you might encounter some permission issues. It is recommended to install truffle as a normal user. Before we can install truffle as a normal user we have to cleanup the system. It is also recommended to install nodejs and npm with nvm (node version manager). An advantage of nvm is that you can run different node versions on the same machine.

### Cleanup node and npm
#### Remove all packages which have been installed with `sudo npm install -g`
First we want to find out which packages have been installed with `sudo npm install -g`.
Get a list of all installed packages:

```bash
$ sudo npm list -g --depth=0
```

```
/usr/lib 
|--ganache-cli@6.1.8 
|--npm@6.7.0 
+--truffle@5.0.3
```

Now we want to remove them

`$ sudo npm remove -g anache-cli`

`$ sudo npm remove -g truffle`

`$ sudo npm remove -g npm`


If you have additional packages in the tree, you can also remove them.


### Remove node
If you installed node with a the package manager of your Linux distro you can delete the package and skip Remove node and Remove npm. If you installed it manually you have to delete it manually.

We have to find out where node is installed before we can delete it.

`$ whereis node`

in my case I get the following output

`node: /usr/bin/node /usr/share/man/man1/node.1.gz`

find the location of node_modules node and delete it

`$ sudo rm /usr/bin/node /usr/share/man/man1/node.1.gz`


### Remove npm
We have to find out where npm is installed before we can delete it.

`$ sudo whereis npm`

in my case I get the follwing output:

`npm: /usr/bin/npm /usr/share/man/man1/npm.1.gz /usr/share/man/man1/npm.1`

`$ sudo ls -l /usr/bin/npm`

`lrwxrwxrwx 1 root root 38 Feb  4 08:47 /usr/bin/npm -> ../lib/node_modules/npm/bin/npm-cli.js`

`$ sudo rm -rf /usr/bin/npm /usr/lib/node_modules/npm/bin/npm`

`$ sudo rm -rf /usr/share/man/man1/npm.1.gz /usr/share/man/man1/npm.1`

Depending on the linux distribution you might have different paths

Now that we have cleaned up everything we can start with the installation of nvm and node

## Installation of node and npm with nvm
### Install nvm (node version manager)
See: https://github.com/creationix/nvm

`$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`

In order to load the new environment you have to close your console and open a new one


### Install node.js with nvm
`$ nvm install node # "node" is an alias for the latest version`

### Install the latest npm version
`$ npm install -g npm`


### Delete and reset the npm prefix
See: https://stackoverflow.com/questions/34718528/nvm-is-not-compatible-with-the-npm-config-prefix-option

`$ npm config delete prefix`

`$ npm config set prefix $NVM_DIR/versions/node/v11.10.0`

## Install truffle and other packages as a normal user
`$ npm install -g truffle`

## Check the installation
`$ whereis truffle`

If everything went as expected truffle should be installed in:

`~/.nvm/versions/node/v11.10.0/bin/truffle`

Install the other packages which you had installed as sudo, such as ganache-cli or create-react-app.

