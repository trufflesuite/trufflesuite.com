---
hide:
  - navigation
---

Room Thermostat Sample Application for Azure Blockchain Workbench
====================================================

Overview
---------

The room thermostat scenario expresses a workflow around thermostat installation and use. In this scenario, a person will install a thermostat and indicate who is the intended user for the thermostat. The assigned user can do things such as set the target temperature and set the mode for the thermostat.

<br />

Application Roles
------------------

| Name       | Description                                                                                         |
|------------|-----------------------------------------------------------------------------------------------------|
| Installer | A person who is responsible for installing the thermostat. |
| User | A person who uses the thermostat.  |

<br />

States
-------

| Name                 | Description                                                                                                 |
|----------------------|-------------------------------------------------------------------------------------------------------------|
| Created | Indicates that a thermostat installation has been requested. |
| InUse | Indicates that the thermostat is in use. |

<br />

Workflow Details
----------------

![](https://raw.githubusercontent.com/truffle-box/azure-room-thermostat-box/master/media/roomthermostat.png)

The room thermostat is a simple workflow to demonstrate how to use the enum data type. Once the installer has installed and started the thermostat, the user can take two main actions. As a user, you can set the target temperature to a temperature you specify, or you can set the mode to one of four modes: Off, Cool, Heat, and Auto.

<br />

Application Files
-----------------
[RoomThermostat.sol](https://raw.githubusercontent.com/truffle-box/azure-room-thermostat-box/master/contracts/RoomThermostat.sol)
