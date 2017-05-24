(function (angular) {
    angular
        .module('fanco.event')
        .controller('eventController', eventController);

    /**@ngInject */
    function eventController($q, $localStorage, $ionicScrollDelegate, $ionicActionSheet, $filter, eventService, EventModel, moment, loaderService) {
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
        vm.eventMode = 'message';

        //public method
        vm.sendNewEvent = sendNewEvent;
        vm.toggleAllEvents = toggleAllEvents;
        vm.uploadImage = uploadImage;
        vm.image = null;
        vm.openActions = openActions;
        vm.switchToMode = switchToMode; 

        //////////////////////////////////
        /**Activate */
        (function () {
            getAllEvents();
        })();

        //////////////////////////////////

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
                //.then(getAllEvents)
                .then(function () {
                    $ionicScrollDelegate.scrollBottom();
                });
        }

        function uploadImage() {
            if (!vm.image) {
                return false;
            }
            startLoading();
            var formData = new FormData();
            formData.append('fileName', vm.image);
            return eventService.uploadImageEvent(user.organizationId, formData)
                .then(getAllEvents)
                .then(stopLoading)
                .then(function () {
                    $ionicScrollDelegate.scrollBottom();
                });
        }

        function switchToMode(mode) {
            vm.eventMode = mode;
        }

        function openActions(event) {
            var hideSheet = $ionicActionSheet.show({
                buttons: [],
                destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function() {
                    hideSheet();
                },
                destructiveButtonClicked: function() {
                    eventService.removeEvent(event, user)
                        .then(getAllEvents)
                        .then(hideSheet);
                }
            });
        }

        function toggleAllEvents() {
            vm.showAllEvents = !vm.showAllEvents;
        }

        function getAllEvents() {
            startLoading()
                .then(tryGetAllEvents)
                .then(scrollBottom)
                .finally(stopLoading);
        }

        function tryGetAllEvents() {
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

        function scrollBottom() {
            return $ionicScrollDelegate.scrollBottom();
        }

        function startLoading() {
            return loaderService.startLoading();
        }

        function stopLoading() {
            return loaderService.stopLoading();
        }
    }
})(window.angular);
