(function (angular) {
    angular
        .module('fanco.event')
        .controller('eventController', eventController);

    /**@ngInject */
    function eventController($q, $localStorage, $ionicScrollDelegate, eventService, EventModel, $filter) {
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
            return eventService.sendEvent(user, message)
                .then(function (response) {
                    if (response) {
                        getAllEvents()
                            .then(function () {
                                $ionicScrollDelegate.scrollBottom();
                            })
                            .then(function () {
                                vm.newEvent.content = '';
                            });
                    }
                });
        }

        function getAllEvents() {
            return eventService.getAllEvents(user)
                .then(function (response) {
                    if (!response) {
                        return;
                    } else {
                        response = $filter('orderBy')(response, 'timestamp', false);
                        if (response.length > 20) {
                            vm.newestEvents = response.slice((response.length - 20), response.length);
                            vm.allEvents = response;
                        } else {
                            vm.allEvents = response;
                        }
                    }
                });
        }
    }
})(window.angular);
