# Configuring Visual Studio code for Ethereum Blockchain development

This post was originally published by David Burela on his blog [Burela's House-o-blog](https://davidburela.wordpress.com/2016/11/18/configuring-visual-studio-code-for-ethereum-blockchain-development/). Big thanks to David for allowing us publish it here!

-------------------

[Visual Studio code](https://code.visualstudio.com/) is a great tool for editing Solidity smart contracts, and is available on Windows, Mac & Linux. There is a great plugin that enables Syntax highlighting, snippets, and compiling of the current contract (if you aren’t using an external tool) [https://github.com/juanfranblanco/vscode-solidity/](https://github.com/juanfranblanco/vscode-solidity/)

This configuration works really well with Truffle (as shown in the final screenshot). You can read how to install Truffle on Windows in [my previous post](/tutorials/how-to-install-truffle-and-testrpc-on-windows-for-blockchain-development).

## Step 1: Install Visual Studio code   
[https://code.visualstudio.com/](https://code.visualstudio.com/)

Easy option on Windows: Just install via [https://chocolatey.org/](https://chocolatey.org/) by using the command  

```
choco install VisualstudioCode –y
```

## Step 2: Install Visual Studio extensions  
Go into the extensions section, then install these plugins:

* Solidity
* Material Icon Theme
![image](https://davidburela.files.wordpress.com/2016/11/image3.png)

## Step 3: Enable icon theme  
Select `File –> Preferences –> File Icon Theme`.
![image](https://davidburela.files.wordpress.com/2016/11/image4.png)

## Final result: Sexy workspace  
![image](https://davidburela.files.wordpress.com/2016/11/image5.png)
