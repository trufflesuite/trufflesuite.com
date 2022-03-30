---
title: Truffle Suite

---

<p class="alert alert-warning"><i class="far fa-exclamation-triangle"></i> <strong>Archived:</strong> This tutorial has been archived and may not work as expected; versions are out of date, methods and workflows may have changed. We leave these up for historical context and for any universally useful information contained.<br/><br/>David Burela now recommends a different, updated way of doing this on his blog, which you can check out here: <a target="_blank" href="https://davidburela.wordpress.com/2017/05/12/how-to-install-truffle-testrpc-on-ubuntu-or-windows-10-with-windows-subsystem-for-linux/">How to install Truffle & TestRPC on Ubuntu or Windows 10 with ?"Windows subsystem for Linux"</a></p>

<div class="alert alert-info">
  <p class="mb-0"><i class="far fa-info-circle"></i> <strong>Update</strong>: Since this tutorial was published, we have released <a href="/docs/ganache">Ganache</a>, a personal blockchain and a replacement to the TestRPC. We have left this tutorial unaltered, but we highly recommend checking out our <a href="/ganache">Ganache Documentation</a></p>
</div>

This post was originally published by David Burela on his blog [Burela's House-o-blog](https://davidburela.wordpress.com/2016/11/18/how-to-install-truffle-testrpc-on-windows-for-blockchain-development/). Big thanks to David for allowing us publish it here!

-------------------

I have been doing a bunch of Blockchain development work, one of which was recently featured on the front page of the [Australian Financial
Review](https://www.afr.com/technology/webjet-moves-early-with-microsoft-to-create-first-blockchain-for-hotel-bookings-20161104-gshwra) and on [Microsoft’s news website](https://news.microsoft.com/en-au/2016/11/08/webjet-and-microsoft-build-first-of-a-kind-travel-industry-blockchain-solution/).

One of the trickiest things has been trying to get Windows environments correctly configured, as the tools are npm based and want to be compiled natively and assumes it is on a Linux machine. Here is the simplest install script I have found

## Step 0. Pre-step: Install Chocolatey

Install Chocolatey via [https://chocolatey.org/](https://chocolatey.org/)

## Step 1. Install Windows tools with Chocolatey:

Open a PowerShell prompt as an Administrator and run the following commands (last command optional):

```shell
$ choco install nodejs.install –y
$ choco install git –y
$ choco install VisualStudioCode -y
```

[Read more about configuring Visual Studio code for Blockchain development](/guides/configuring-visual-studio-code).
![image](https://davidburela.files.wordpress.com/2016/11/image.png)

## Step 2. Install the tools via npm:
Open a NEW PowerShell prompt as Administrator (to ensure that it reloads), then run the following commands:

```shell
$ npm install -g npm
$ npm install -g -production windows-build-tools
$ npm install -g ethereumjs-testrpc
$ npm install -g truffle
```

You may see some error messages during npm installs. Many of these are just informational / optional components failing. You can test that it is all working by trying to run the commands truffle and testrpc.
![image](https://davidburela.files.wordpress.com/2016/11/image1.png)
![image](https://davidburela.files.wordpress.com/2016/11/image2.png)

## Bonus Step: combining with Visual Studio Code

This is how I use Truffle & Visual Studio code together. Make sure you install and configure [Visual Studio Code with the Solidity extensions](https://davidburela.wordpress.com/2016/11/18/configuring-visual-studio-code-for-ethereum-blockchain-development/).

If you navigate into the folder where your files are, typing “code .” will open Visual Studio Code in the current folder. Running the command after a `truffle init` gets you up and running quickly
![image](https://davidburela.files.wordpress.com/2016/11/image_thumb6.png?w=1212&h=356)
![image](https://davidburela.files.wordpress.com/2016/11/image_thumb7.png?w=1893&h=1563)
