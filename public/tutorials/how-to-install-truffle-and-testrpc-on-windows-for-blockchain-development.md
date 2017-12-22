# How to install Truffle & TestRPC on Windows for Blockchain development

<p class="alert alert-info">
**Update**: Since this tutorial was published, we have released [Ganache](/ganache) a personal blockchain and a replacement to the TestRPC. We have left this tutorial unaltered, but we highly recommend checking out our [Working with Ganache](/docs/ganache/using) page.
</p>

This post was originally published by David Burela on his blog [Burela's House-o-blog](https://davidburela.wordpress.com/2016/11/18/how-to-install-truffle-testrpc-on-windows-for-blockchain-development/). Big thanks to David for allowing us publish it here!

-------------------

I have been doing a bunch of Blockchain development work, one of which was recently featured on the front page of the [Australian Financial
Review](http://www.afr.com/technology/webjet-moves-early-with-microsoft-to-create-first-blockchain-for-hotel-bookings-20161104-gshwra) and on [Microsoft’s news website](https://news.microsoft.com/en-au/2016/11/08/webjet-and-microsoft-build-first-of-a-kind-travel-industry-blockchain-solution/).

One of the trickiest things has been trying to get Windows environments correctly configured, as the tools are npm based and want to be compiled natively and assumes it is on a Linux machine. Here is the simplest install script I have found

## Step 0. Pre-step: Install Chocolatey

Install Chocolatey via [https://chocolatey.org/](https://chocolatey.org/)

## Step 1. Install Windows tools with Chocolatey:

Open a PowerShell prompt as an Administrator and run the following commands (last command optional):

```
$ choco install nodejs.install –y
$ choco install git –y
$ choco install VisualStudioCode -y  
```

[Read more about configuring Visual Studio code for Blockchain development](/tutorials/configuring-visual-studio-code).
![image](https://davidburela.files.wordpress.com/2016/11/image.png)

## Step 2. Install the tools via npm:  
Open a NEW PowerShell prompt as Administrator (to ensure that it reloads), then run the following commands:

```
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
