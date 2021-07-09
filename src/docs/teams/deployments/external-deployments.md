---
title: Teams | External deployments
layout: docs.hbs
---
# External deployments

If you have created a deployment through a different interface than Truffle Teams, we can still monitor your deployment and contracts using contract artifact files. To create an external deployment, click **<span class="inline-menu-item"><i class="fal fa-parachute-box"></i>DEPLOYMENTS</span>**, then click **<span class="inline-button"><i class="fas fa-file-upload"></i>EXTERNAL DEPLOYMENT</span>**. From there your operating system's file picker will open. Navigate to your project's contract build folder and select the artifacts you wish to upload. You can select more than one at at time.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/add-contract-02.png" alt="Contract file picker dialog" style="width: 100%">
</figure>

Select the network where this contract is deployed -- we'll attempt to fill in the address from the artifact file. If the address does not auto-fill, but you're sure the correct network is selected, you may need to manually add it. Click <span class="inline-button">NEXT >></span> once you've confirmed all the data is correct.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/add-contract-03.png" alt="Fill in contract addresses" style="width: 100%">
</figure>

Truffle Teams will then verify that the contracts exist on the given network at the given addresses. If there are errors shown in this dialog the contracts either exist on a different network or incorrect addresses were given in the last step. Click the <span class="inline-button">CONFIRM >></span> button to begin uploading the artifacts and hooking up monitoring.

<figure>
  <img class="figure-shadow mb-2" src="/img/docs/teams/add-contract-04.png" alt="Contract address confirmation" style="width: 100%">
</figure>

<p class="alert alert-info">
<i class="far fa-info-circle"></i> <strong>Note</strong>: Monitoring for external deployments begins once the contract is added to Truffle Teams and does not currently include historical data from before that point.
</p>
