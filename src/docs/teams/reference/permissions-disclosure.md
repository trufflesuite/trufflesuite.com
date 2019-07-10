---
title: Teams | Truffle Teams Permissions Disclosure
layout: docs.hbs
---
# Truffle Teams Permissions Disclosure

During installation Truffle Teams asks for various permissions. We respect your data and want to be very clear about why we ask for the following permissions.

## Repository Permissions

### **Write** access to code

GitHub defines this vaguely on signup by using "code", but we're actually only asking for read access to checks so we can display Truffle Teams' build status inline on GitHub.

### **Read** access to administration, issues, and metadata



### **Read** access to checks, commit statuses, and pull requests

Reading commit statuses and pull requests allows Truffle Teams to trigger builds automatically on those events. We use read access to checks so we can have a full event loop for changing the build status display on GitHub's inline checks (see [Write access to code]() above).

## User Permissions

### **Read** access to emails

We use this to fetch your username from GitHub.