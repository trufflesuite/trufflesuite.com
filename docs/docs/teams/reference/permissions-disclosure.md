---
title: Teams | Truffle Teams permissions disclosure
layout: docs.hbs
---

# Truffle Teams permissions disclosure

During installation Truffle Teams asks for various permissions. We respect your data and want to be very clear about why we ask for the following permissions.

## Repository permissions

### **Read** access to code

This allows us to list your repositories and read their contents for automated builds.

### **Read** access to administration, metadata, and pull requests

Reading metadata and pull requests allows Truffle Teams to trigger builds automatically on commits and pull requests. We read administration to show repositories you're a collaborator on in addition to directly owned repositories.

### **Read** and **Write** access to checks

We use read and write access to checks so we can have a full event loop for changing the build status displayed in the GitHub UI.

## User permissions

### **Read** access to emails

We use this to fetch your username from GitHub.
