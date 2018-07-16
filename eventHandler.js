const apiContext = require('mozu-node-sdk/clients/platform/application')();
const eventResource = require('mozu-node-sdk/clients/event/eventNotification')(apiContext);

module.exports = function(eventId){
    eventResource.getEvent({
        eventId: eventId
    })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
}
