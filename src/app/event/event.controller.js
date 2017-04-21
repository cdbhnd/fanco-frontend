(function (angular) {
    angular
        .module('fanco.event')
        .controller('eventController', eventController);

    /**@ngInject */
    function eventController($q, $localStorage, $ionicScrollDelegate, eventService, EventModel, $filter, moment) {
        vm = this;

        //variables and properties
        var user = $localStorage.currentUser;
        vm.newestEvents = [];
        vm.allEvents = [];
        vm.showAllEvents = false;
        vm.newEvent = {
            type: 'message',
            content: ''
        }

        //public method
        vm.sendNewEvent = sendNewEvent;
        vm.toggleAllEvents = toggleAllEvents;

        //////////////////////////////////
        /**Activate */
        (function () {
            getAllEvents()
                .then(function () {
                    $ionicScrollDelegate.scrollBottom();
                });
        })();

        //////////////////////////////////

        function toggleAllEvents() {
            vm.showAllEvents = !vm.showAllEvents;
        }

        function sendNewEvent(message) {
            if (!message.content) {
                return;
            }
            var eventModel = new EventModel({
                type: 'message',
                content: message.content,
                postedBy: user.email,
                timestamp: moment()
            });
            eventModel.sent = false;
            vm.newestEvents.push(eventModel);
            vm.allEvents.push(eventModel);
            vm.newEvent.content = '';
            $ionicScrollDelegate.scrollBottom();
            return eventService.sendEvent(user, eventModel)
                .then(getAllEvents)
                .then(function() {
                    $ionicScrollDelegate.scrollBottom();
                });
        }

        function getAllEvents() {
            return eventService.getAllEvents(user)
                .then(function (response) {
                    response = $filter('orderBy')(response, 'timestamp', false);
                    if (response.length > 20) {
                        vm.newestEvents = response.slice((response.length - 20), response.length);
                        vm.allEvents = response;
                    } else {
                        vm.newestEvents = response;
                    }
                });
        }
    }
})(window.angular);
