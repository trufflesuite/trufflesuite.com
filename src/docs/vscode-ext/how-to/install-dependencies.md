---
title: Install Truffle for VSCode
---

# Install the Truffle for VSCode dependencies

This page provides instructions for installing the Truffle for VSCode dependencies on
[Windows](#windows), [MacOS](#macos), and [Ubuntu](#ubuntu).
Once the dependencies are installed, when you restart VSCode the requirements page no longer appears.

## Windows

Install the following dependencies if you don't have them already.

### Node.js

1. Download the LTS version of [Node.js](https://nodejs.org/en/).
1. Install the downloaded `.msi` file in your `Downloads` folder.
    Check the following box on the **Tools for Native Modules** screen of the installer:

    ![node tools for native modules screen](https://user-images.githubusercontent.com/951378/157370051-3c7a5fd3-72bd-4896-acef-a723bd20d19a.png)

    If you didn't check the box, [follow these steps](https://github.com/nodejs/node-gyp#on-windows).

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

Version numbers should be returned.

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

In VSCode, on the Truffle for VSCode requirements page, select `Install Truffle Suite` and
`Install Ganache`.

Check if you installed Truffle and Ganache successfully using the output channel in VSCode:

![VSCode-outputconsole](https://user-images.githubusercontent.com/951378/157374538-8a329eb4-de10-4445-b93d-f7059d43857a.gif)

You should see no error messages.

## MacOS

### Node.js

On MacOS, install Node.js reliably by using Node Version Manager (NVM).

#### Install NVM
   
Copy the [NVM install script](https://github.com/nvm-sh/nvm#installing-and-updating) into the terminal:

```shell
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

Check if you installed NVM successfully:

```shell
❯ nvm --version
0.39.0
```

#### Install Node

Install the LTS version of Node.js in the same terminal window:

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

Check if you installed Node.js and npm successfully:

```shell
❯ node --version
v16.14.0
❯ npm --version
8.3.1
```

### Git

Git is usually already installed on MacOS.
If you don't have Git installed, enter the following into the terminal:

```shell
> xcode-select --install
```

In a new terminal window, check if you installed Git successfully:

```shell
❯ git --version
git version 2.32.0 (Apple Git-132)
```

### Truffle and Ganache

You can install Truffle and Ganache from the Truffle for VSCode requirements page
[as for Windows](#windows), or you can install them using the command line:

```shell
> npm i -g truffle
> npm i -g ganache
```

This installs the latest versions of both binaries.

## Ubuntu

Installing Node.js, Truffle, and Ganache on Ubuntu is the same [as for MacOS](#macos).
You might need to [install NVM](#install-nvm) using the second `wget` install script.

### Git

Enter the following into the terminal:

```shell
sudo apt install git
```

In a new terminal window, check if you installed Git successfully:

```shell
❯ git --version
git version 2.32.0 (Apple Git-132)
```