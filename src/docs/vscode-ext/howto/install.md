Below we have detailed instructions for getting all the requirements installed for the extension to work properly.

## Background

The main issues we see when installing from scratch or on a new machine for the first time is around privileges and the compiler chains in node.js. It's not always easy to get right but if you read the background below you'll understand why we are asking you to do it this way for the least amount of hassle.

## TLDR-1; Node is hard to get right for a beginner - Even on Windows - 💣

On Windows, surprisingly, node.js will install, mostly, ok. It will try to install the compilers it needs and setup the global folders where packages get installed to and things will work. If the compilers fail to install (this happens on Windows 10 more than Windows 11 for us) you can make a trip to the VSCode build tools downloader and install them after you install node.js. On Windows 11 we found the installer worked but did take A LONG TIME to install with no feedback via the command line installer, so be patient, it could take 30-40 minutes easily.

After this, you will generally be ok, install GIT as needed and then your probably gonna be ok to install Truffle and Ganache as global packages.

## TLDR-2; Node is hard to get right for a beginner - On a Mac - 😩

On a Mac, especially later OS versions 10.x and greater, there is a lot more security on installing software. Generally the global install of `node.js` from the node website WILL NOT WORK properly without a lot of work/hassle. This is to do with the way it installs itself into system level folders. When you come to install global dependencies it will not give you permission. This resorts in many people heading to StackOverflow (admit it, that was you...) and going oh yeah, some guy called `DemonH$CK0rZ-12` recommends I just add `sudo` or `su` before I run these commands and its all good. Please don't, `sudo` is not a good idea, especially for something like node and globally installed packages that will be on your path or perhaps run as a superuser when installing. Bad stuff can happen.

But it's not all doom and gloom, the way most people do this is via a package manager. NVM is the best and most widely used tool to do this. It's pretty easy to install and once those steps are done you will have a nicely installed version of node and swapping to a newer or alternative version will be very easy. It also doesn't superuser privileges and is very easy to remove later on if you really need to. Full details to follow:

## Time to install 🏃🏻‍♀️💨💨💨💨

Below are the guides for each Operating System.

## Windows 💻

We have tested on Windows 10/11 and these instructions work if you have never installed node or git before.

### Node.JS - Standard Install

As we said this is the best steps for installing and getting a good working node.js and compiler chain installed ready to go.

1. Head to: [node.js](https://nodejs.org/en/). Download the LTS version (16.14.0 LTS at the time of writing).
1. Install the downloaded `.msi` file in your `Downloads` folder.
    1. Ensure you check this box on the `Tools for Native Modules` screen of the installer: ![node tools for native modules screen](https://user-images.githubusercontent.com/951378/157370051-3c7a5fd3-72bd-4896-acef-a723bd20d19a.png)

    1. If you didn't you will have to follow the steps here: [https://github.com/nodejs/node-gyp#on-windows](https://github.com/nodejs/node-gyp#on-windows)
1. You will also be asked if you want to install the tools at the end of the main installer screens. This will pop up a powershell window and there will be a few prompts inside asking you to agree `yes/no` to each question. Answer `yes` to them all and you will get all the build tools installed. You may have to approve a few elevated commands with the windows security popups. Again, accept all of these and you will have it all installed.
1. If the above steps fail for some reason (and we have seen this more on Windows 10, and even then 1 machine this happens and another it doesn't... ) you will need to install these manually.
    1. The easiest way is to go here and install the Visual Studio build tools with this installer: [https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools)
    1. Select the build tools option and download and install. This is quite big (at least 1GB) so can take a while.

Once thats installed you can head over to a command prompt and type in: `node --version` and you should get back something like:

```shell
C:\Users\vitalik>node --version
v16.14.0
```

Also check NPM is installed ok:

```shell
C:\Users\vitalik>npm --version
8.3.1
```

If you get back version numbers like these then you are all set!

### GIT

GIT is quite simple for Windows. You need to install the binary from the GIT website: [https://git-scm.com/downloads](https://git-scm.com/downloads)

1. Select the windows installer, download it and then click on the installer in your `Downloads` folder.
1. Selecting the default options is fine, if you're not used to using `VIM` as the commit editor or the command line too much perhaps changing the default editor to `nano` would be better.

Once thats all done, you can head to a new command prompt (it's important to open a new command prompt as the PATH will be updated) try the following:

```shell
C:\Users\vitalik>git version
git version 2.35.1.windows.2

```

### Truffle & Ganache

To install these dependencies you can do this inside the extension itself on the requirements page. Just clicking on the `Install Truffle Suite` and `Install Ganache` buttons will install if all the above has been setup correctly.

To check these have been installed correctly via the extension, the easiest way to check this is via the output view in VSCode.

1. In VSCode, open the output channel like this: ![VSCode-outputconsole](https://user-images.githubusercontent.com/951378/157374538-8a329eb4-de10-4445-b93d-f7059d43857a.gif)
1. Check the console output and look for any errors or success. If you see something that looks like an error you can use this output to send to us in an issue.

## MacOS 🖥

### Node.JS - Use NVM

On MacOS the easiest method is to use NVM. Follow the instructions to get this installed and we can then install node at the end. It's a few more steps but this will work more reliably than other methods.

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

#### Install your Node Version

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

### GIT

Git is normally installed via the command line tools for OSX dialog. If it hasn't installed you can do it by typing this into the shell:

```shell
> xcode-select --install
```

A few popups will appear and then install some binaries (1GB+) and you should be able see if git is installed (preferably in a new terminal, path may be updated...)

```shell
❯ git --version
git version 2.32.0 (Apple Git-132)
```

Phew! we made it! After this its pretty much plain sailing onto Truffle and Ganache from VSCode.

### Truffle & Ganache

These can be installed from the requirements page or in your command line if you prefer:

```shell
> npm i -g truffle
> npm i -g ganache
```

This will install the latest versions of both binaries. The actions in the requirements page inside the extension do exactly the same thing.

To check these have been installed correctly via the extension, the easiest way to check this is via the output view in VSCode.

1. In VSCode, open the output channel like this: ![VSCode-outputconsole](https://user-images.githubusercontent.com/951378/157374538-8a329eb4-de10-4445-b93d-f7059d43857a.gif)
1. Check the console output and look for any errors or success. If you see something that looks like an error you can use this output to send to us in an issue.

## Ubuntu 🐧

We have tested installing everything on Ubuntu 20 and the steps are almost identical to the MacOS ones above. NVM works the same, you might need to use the second installer script using `wget`.

### GIT

The only difference will be for GIT. You want to install this via the terminal using:

```shell
sudo apt install git
```

And the rest should be the same.

## Final Checks ✅

Once this is all installed you can restart your VSCode in either platform (MacOS or Windows) and if the requirements screen doesn't appear then you are good to go. If it does appear then please follow the help below to get some info to submit for a issue and we will do our best to help you out. (See below...)

## Help, I still have problems! 😢

At this point if things aren't working it's probably best to ask a question on the issues tab here in this project with as much info as you can on the issue and what you have done, machine/OS versions etc and we will do our best to help or update these docs.

You can get some output for anything that might have had an error in the plugin like this: 

1. In VSCode, open the output channel like this: ![VSCode-outputconsole](https://user-images.githubusercontent.com/951378/157374538-8a329eb4-de10-4445-b93d-f7059d43857a.gif)

1. Check the console output and look for any errors or success. If you see something that looks like an error you can use this output to send to us in an issue.

## I'm done, whats next? 🎉

Well at this point you are able to create a new bare bones project or open a Truffle Box from the actions panel and login to Infura or setup a local Ganache instance to work against. The world is your oyster as they say. Go knock it out of the park and enjoy using the extension.