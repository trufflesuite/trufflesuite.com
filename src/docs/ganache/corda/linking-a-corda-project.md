---
title: Linking a CorDapp
layout: docs.hbs
---
# Linking a CorDapp Project

To link a project, enter the settings by clicking the gear icon in the upper right.

![Settings Icon](/img/docs/ganache/corda/corda-settings-icon.png)

You should be seeing the `WORKSPACE` settings pane; if not, you can get there by clicking the `WORKSPACE` tab in the top left.

![Workspaces Settings Pane Tab](/img/docs/ganache/corda/corda-workspaces-pane-tab.png)

From here, there is a section labeled `PROJECTS`. Beneath this box, click the button `ADD PROJECT`. A folder selection modal will appear. Select the folder of your CordApp project. Ganache will inspect the directory for folders with a `build.gradle` file containing the string `"corda"`, and if found, will automatically watch the `./build/libs` folder for new/changed `.jar` files. If the folder you choose does _not_ have a compatible `build.gradle` Ganache will watch the folder itself for new/changed `.jar` files.

After selecting the folder, you'll see it listed in the `PROJECTS` section.

![Project Listed](/img/docs/ganache/corda/corda-project-listed.png)

You can add multiple projects to a workspace. After you're finished adding projects you can click the `SAVE AND RESTART` (`SAVE WORKSPACE` if this is a new workspace) button in the top right.
