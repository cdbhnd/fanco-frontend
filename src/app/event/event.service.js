(function (angular) {
    angular
        .module('fanco.event')
        .service('eventService', eventService);

    /**@ngInject */
    function eventService(fancoApi, config, EventModel) {
        var service = this;

        //variables and properties

        //public methods
        service.getAllEvents = getAllEvents;
        service.sendEvent = sendEvent;
        service.removeEvent = removeEvent;

        //////////////////////////////////

        function getAllEvents(user) {
            return fancoApi.http({
                    method: config.httpMethods.GET,
                    url: config.fancoAPI.EVENTS.replace('{{organizationId}}', user.organizationId)
                })
                .then(function (response) {
                    if (!response.length) {
                        return null;
                    }
                    return mapEvents(response);
                })
                .catch(function () {
                    return null;
                });
        }

        function removeEvent(event, user) {
            return fancoApi.http({
                    method: config.httpMethods.DELETE,
                    url: config.fancoAPI.EVENTS.replace('{{organizationId}}', user.organizationId) + '/' + event.id
                })
                .then(function (response) {
                    return true;
                })
                .catch(function () {
                    return false;
                });
        }

        function sendEvent(user, event) {
            return fancoApi.http({
                    method: config.httpMethods.POST,
                    url: config.fancoAPI.EVENTS.replace('{{organizationId}}', user.organizationId),
                    data: {
                        type: event.type,
                        content: event.content
                    }
                })
                .then(function () {
                    return true;
                })
                .catch(function () {
                    return false;
                });
        }

        function mapEvents(rawData) {
            var mappedEvents = [];
            for (var i = 0; i < rawData.length; i++) {
                mappedEvents.push(new EventModel(rawData[i]));
            }
            return mappedEvents;
        }
    }
})(window.angular);
