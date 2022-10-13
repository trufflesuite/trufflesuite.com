## Questions

| [Q: I have installed Python, but still get the "missing" or "old version" notification](#Q:-i-installed-all-of-the-pre-requisite-software-but-I-still-get-the-missing-or-old-version-notification-for-python)                                                                |
| [Q: I have installed the extension and get prompted that Git client is not installed however it is installed](#Q-i-have-installed-the-extension-and-get-prompted-that-Git-client-is-not-installed-however-it-is-installed)                                                   |
| [Q: I am using the extension to create a new Solidity project and I am getting errors when creating the project](#Q-i-am-using-the-extension-to-create-a-new-solidity-project-and-i-am-getting-errors-when-creating-the-project)                                             |

- ### Q: I installed all of the pre-requisite software, but I still get the "missing" or "old version" notification for Python

- A: It's pretty likely that Python was installed without being added to your system PATH variable (the default installation mode of Python). To resolve this problem, you need to add your Python directory to the system path. You may do this by editing your PATH variable directly, or by reinstalling/fixing your Python installation as shown below

#### Adding your Python directory to your PATH variable directly

1. On Windows, you may edit your PATH variable by going to the Windows search bar and typing "env"
   ![Find Environment Editor](../images/findEnvEditor.png)
2. Once the System Properties panel launches, select `Environment Variables`
   ![Environment Editor](../images/envEditor.png)
3. In the Environment Variables editor, select the System Variables, Path line and click Edit
   ![Edit System Variables](../images/openSystemVariables.png)
   Finally, select New to add a new entry to your PATH, then type in`C:\Python27\` (or whichever directory you installed Python to), and select OK to save
   ![Add Python to your PATH](../images/addPythonPath.png)
4. To verify your changes, open up a new command prompt and type `python --version` as shown below
   ![verify Python](../images/verifyPython.png)

#### Reinstalling/fixing the Python installation

1. On Windows, you may edit your PATH variable by going to the Windows search bar and typing "add"
   ![Add Remove Programs](../images/addRemovePrograms.png)
2. Scroll down to your Python installation and click `modify`
   ![Modify Add Remove](../images/pythonAddRemove.png)
3. In the Python dialog box, click `Change Python`
   ![Change Python](../images/changePython.png)
4. Scroll down and select the red X next to `Add python.exe to Path`, then chose the `Will be installed on local hard drive` option.
   ![Install to local HD](../images/enablePythonOnHD.png)
5. Click Next
   ![Click Next](../images/pythonClickNext.png)
6. You can verify your changes by opening up a command prompt and typing `python --version` as shown below
   ![Verify Python](../images/verifyPython.png)

- ### Q: I have installed the extension and get prompted that Git client is not installed however it is installed
  
#### The issue is caused by the fact that the git client is not added to the system path at installation. The fix is to update the path manually, details are below for Windows based machines.

1. On Windows, you may edit your PATH variable by going to the Windows search bar and typing "env"
   ![Find Environment Editor](../images/findEnvEditor.png)
2. Once the System Properties panel launches, select `Environment Variables`
   ![Environment Editor](../images/envEditor.png)
3. In the Environment Variables editor, select the System Variables, Path line and click Edit
   ![Edit System Variables](../images/openSystemVariables.png)
4. Finally, select New to add a new entry to your PATH, then type in `C:\Program Files\Git\bin\` (or whichever directory you installed Git to), and select OK to save.

- ### Q: I am using the extension to create a new solidity project and I am getting errors when creating the project

#### The issue is caused by a dependency that requires a C++ compiler to be installed. This can be remedied with a build tools installation. (NOTE: this solution pertains to Windows based operating systems only)

1. Open a Powershell shell under administrator rights, and run the following command:

```shell
npm install --global windows-build-tools
```

`NOTE: This installation will take a few minutes to install fully, so please be sure to wait to the command completely finishes.`
