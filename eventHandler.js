const apiContext = require('mozu-node-sdk/clients/platform/application')();
const eventResource = require('mozu-node-sdk/clients/event/eventNotification')(apiContext);

module.exports = function(eventId){
    eventResource.getEvent({
        eventId: eventId
    })
        .then(console.log)
        .catch(console.log);
};
