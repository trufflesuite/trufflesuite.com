---
title: Unlinking a Corda Project
layout: docs.hbs
---
# Unlinking a Corda Project

<p class="alert alert-warning"><i class="far fa-exclamation-triangle"></i> <strong>Warning:</strong> Once a Cordapp has been installed on a node, removing it can result in node start-up failure. For this reason, Ganache will _not_ remove installed CorDapps from existing nodes and notaries.</p>

If you no longer want a Corda project linked to a workspace, go to the `WORKSPACE` settings pane the same way you did when [linking the project](/docs/ganache/truffle-projects/linking-a-truffle-project).

To remove a Corda project from the workspace, click on the project folder in the `PROJECTS` list and then click the `REMOVE PROJECT` button.

![Project Selected](/img/docs/ganache/corda/corda-project-selected.png)

When you're done, click the `SAVE AND RESTART` (`SAVE WORKSPACE` if this is a new workspace) button in the top right.
