$(function(){
  $('#premiumNotifyButton').click(handleOutboundLinkClicks);
});

function handleOutboundLinkClicks(event) {
  ga('send', 'event', {
    eventCategory: 'Outbound Link',
    eventAction: 'click',
    eventLabel: 'event.target.href',
    transport: 'beacon'
  });
}