class MozuEvents {

    apiContext = require('mozu-node-sdk/clients/platform/applications')();
    eventResource = require('mozu-node-sdk/clients/event/eventNotification')(this.apiContext);

    getEvent(id) {
        return this.eventResource.getEvent({
            eventId: id
        });
    }
}

module.exports = MozuEvents;