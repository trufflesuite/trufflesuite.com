---
title: Install Truffle for VSCode
---

# Install the Truffle for VSCode dependencies

This page provides instructions for installing the Truffle for VSCode dependencies on each
operating system.

## Windows

Install the following dependencies if you don't have them already.

### Node.js

1. Download the LTS version of [Node.js](https://nodejs.org/en/).
1. Install the downloaded `.msi` file in your `Downloads` folder.
    1. Ensure you check the following box on the `Tools for Native Modules` screen of the installer:
       ![node tools for native modules screen](https://user-images.githubusercontent.com/951378/157370051-3c7a5fd3-72bd-4896-acef-a723bd20d19a.png)
    1. If you didn't check the box, [follow these steps](https://github.com/nodejs/node-gyp#on-windows).
1. When asked if you want to install the tools at the end of the main installer screen, answer `yes`
   for all.
   You may have to approve a few elevated commands with the Windows security popups.
1. If the previous step fails:
    1. Install the Visual Studio build tools with [this installer](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools).
    1. Select the build tools option and download and install.
       This is at least 1 GB, so it can take 30-40 minutes.

In a command prompt, check if you installed Node.js successfully:

```shell
C:\Users\vitalik>node --version
v16.14.0
```

Also, check if NPM is installed:

```shell
C:\Users\vitalik>npm --version
8.3.1
```

If version numbers are returned, you're all set.

### Git

1. Download the [Git binary](https://git-scm.com/downloads) for Windows.
1. Select the installer in your `Downloads` folder.
1. You can select the default installation options, or change them to your needs.

In a new command prompt, check if you installed Git properly:

```shell
C:\Users\vitalik>git version
git version 2.35.1.windows.2
```

### Truffle and Ganache

To install these dependencies you can do this inside the extension itself on the requirements page.
Just clicking on the `Install Truffle Suite` and `Install Ganache` buttons will install if all the
above has been set up correctly.

To check these have been installed correctly via the extension, the easiest way to check this is via
the output view in VSCode.

1. In VSCode, open the output channel:
   ![VSCode-outputconsole](https://user-images.githubusercontent.com/951378/157374538-8a329eb4-de10-4445-b93d-f7059d43857a.gif)
1. Check the console output and look for any errors or success.
   If you see something that looks like an error you can use this output to send to us in an issue.

## MacOS

### Node.js

On MacOS the easiest method is to use NVM.
Follow the instructions to get this installed and we can then install node at the end. It's a few more steps but this will work more reliably than other methods.

#### Install NVM

1. Open up a terminal. To do this easily press `command+space` and the search panel will pop up. Type in `terminal.app` and select the terminal application and open it.
1. Open up the following url [https://github.com/nvm-sh/nvm#installing-and-updating](https://github.com/nvm-sh/nvm#installing-and-updating) and copy the script for installing NVM into the terminal and press `<enter>` key.

```shell
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

This will install NVM and at the end you can check it installed ok by trying:

```shell
❯ nvm --version
0.39.0
```

If you have issues, the NVM github page up above has a lot of information on issues you may encounter.

#### Install your Node version

Now NVM is installed its time to install node itself. Lets install the LTS version which will make our life easier.

In the same shell as before type the following to install and configure our node version.

```shell
> nvm install --lts
<you will see some install info>
Installing latest LTS version.
Downloading and installing node v16.14.0...
Downloading https://nodejs.org/dist/v16.14.0/node-v16.14.0-darwin-x64.tar.xz...
################################################################################################################################### 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v16.14.0 (npm v8.3.1)
Installing default global packages from /usr/local/opt/nvm/default-packages...
npm install -g --quiet faker-cli typescript yarn

added 5 packages, and audited 6 packages in 5s

found 0 vulnerabilities
❯ nvm use --lts
Now using node v16.14.0 (npm v8.3.1)
```

Now check node is all working:

```shell
❯ node --version
v16.14.0
❯ npm --version
8.3.1
```

You did it! WAGMI FTW!

### Git

Git is normally installed via the command line tools for OSX dialog.
If it hasn't installed you can do it by typing this into the shell:

```shell
> xcode-select --install
```

A few popups will appear and then install some binaries (1GB+) and you should be able see if git is installed (preferably in a new terminal, path may be updated...)

```shell
❯ git --version
git version 2.32.0 (Apple Git-132)
```

### Truffle and Ganache

These can be installed from the requirements page or in your command line if you prefer:

```shell
> npm i -g truffle
> npm i -g ganache
```

This will install the latest versions of both binaries. The actions in the requirements page inside the extension do exactly the same thing.

To check these have been installed correctly via the extension, the easiest way to check this is via the output view in VSCode.

1. In VSCode, open the output channel like this: ![VSCode-outputconsole](https://user-images.githubusercontent.com/951378/157374538-8a329eb4-de10-4445-b93d-f7059d43857a.gif)
1. Check the console output and look for any errors or success. If you see something that looks like an error you can use this output to send to us in an issue.

## Ubuntu

We have tested installing everything on Ubuntu 20 and the steps are almost identical to the MacOS ones above. NVM works the same, you might need to use the second installer script using `wget`.

### Git

The only difference will be for GIT. You want to install this via the terminal using:

```shell
sudo apt install git
```

And the rest should be the same.

## Final checks

Once this is all installed you can restart your VSCode in either platform (MacOS or Windows) and if the requirements screen doesn't appear then you are good to go. If it does appear then please follow the help below to get some info to submit for a issue and we will do our best to help you out. (See below...)

## Help, I still have problems!

At this point if things aren't working it's probably best to ask a question on the issues tab here in this project with as much info as you can on the issue and what you have done, machine/OS versions etc and we will do our best to help or update these docs.

You can get some output for anything that might have had an error in the plugin like this: 

1. In VSCode, open the output channel like this: ![VSCode-outputconsole](https://user-images.githubusercontent.com/951378/157374538-8a329eb4-de10-4445-b93d-f7059d43857a.gif)

1. Check the console output and look for any errors or success. If you see something that looks like an error you can use this output to send to us in an issue.

## Next steps

Well at this point you are able to create a new bare bones project or open a Truffle Box from the actions panel and login to Infura or setup a local Ganache instance to work against. The world is your oyster as they say. Go knock it out of the park and enjoy using the extension.