(function (angular) {
    angular
        .module('fanco.event')
        .controller('eventController', eventController);

    /**@ngInject */
    function eventController($q, $localStorage, $ionicScrollDelegate, eventService, EventModel) {
        vm = this;

        //variables and properties
        var user = $localStorage.currentUser;
        vm.events = [];
        vm.newEvent = {
            type: 'message',
            content: ''
        }

        //public method
        vm.sendNewEvent = sendNewEvent;

        //////////////////////////////////
        /**Activate */
        (function () {
            getAllEvents()
                .then(function () {
                    $ionicScrollDelegate.scrollBottom();
                });
        })();

        //////////////////////////////////

        function sendNewEvent(message) {
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
                    }
                    vm.events = response;
                });
        }
    }
})(window.angular);
