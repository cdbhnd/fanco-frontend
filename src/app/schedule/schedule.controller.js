(function (angular) {
    angular
        .module('fanco.schedule')
        .controller('scheduleController', scheduleController);

    /**@ngInject */
    function scheduleController($q, $localStorage, $ionicScrollDelegate, $ionicActionSheet, moment, scheduleService, ScheduleModel, notificationsService, loaderService) {
        vm = this;

        //variables and properties
        var user = $localStorage.currentUser;
        vm.schedules = [];
        vm.rawTimestamp = '';
        vm.newSchedule = new ScheduleModel();
        vm.showAddScheduleForm = false;

        //public method
        vm.addSchedule = addSchedule;
        vm.toggleAddScheduleForm = toggleAddScheduleForm;
        vm.openActions = openActions;

        //////////////////////////////////
        /**Activate */
        (function () {
            getAllSchedules();
        })();

        //////////////////////////////////

        function openActions(schedule) {
            var hideSheet = $ionicActionSheet.show({
                buttons: [],
                destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function() {
                    hideSheet();
                },
                destructiveButtonClicked: function() {
                    scheduleService.removeSchedule(schedule, user)
                        .then(getAllSchedules)
                        .then(hideSheet);
                }
            });
        }

        function addSchedule(formIsValid) {
            if (!formIsValid) {
                return;
            }
            startLoading()
                .then(createTimestamp(vm.rawTimestamp))
                .then(createSchedule);
        }

        function toggleAddScheduleForm() {
            switchFormFlag()
                .then(clearFormFields);
        }

        function getAllSchedules() {
            startLoading()
                .then(tryGetAllSchedules)
                .finally(stopLoading);
        }

        function createSchedule() {
            return scheduleService.createSchedule(user, vm.newSchedule)
                .then(function (response) {
                    if (!response) {
                        stopLoading()
                            .then(notify('Something went wrong', 'error'));
                    } else {
                        stopLoading()
                            .then(notify('Schedule created', 'success'))
                            .then(toggleAddScheduleForm)
                            .then(getAllSchedules);
                    }
                });
        }

        function tryGetAllSchedules() {
            return scheduleService.getAllSchedules(user)
                .then(function (response) {
                    if (!response) {
                        return;
                    }
                    vm.schedules.length = 0;
                    for (var i = 0; i < response.length; i++) {
                        if (!(moment(response[i].timestamp).isBefore(moment()))) {
                            vm.schedules.push(response[i]);
                        }
                    }
                });
        }

        function switchFormFlag() {
            return $q.when(function () {
                vm.showAddScheduleForm = !vm.showAddScheduleForm;
            }());
        }

        function clearFormFields() {
            return $q.when(function () {
                vm.rawTimestamp = '';
                vm.newSchedule = {
                    timestamp: '',
                    description: '',
                    alarm: false
                };
            }());
        }

        function createTimestamp(raw) {
            return $q.when(function () {
                var hourSegment = parseInt(raw.slice(8, 10));
                console.log(raw);
                vm.newSchedule.timestamp = raw.slice(4, 8) + '-' + raw.slice(2, 4) + '-' + raw.slice(0, 2) + 'T' + (hourSegment - 2) + ':' + raw.slice(10, 12) + ':00Z';
            }());
        }

        function notify(msg, type) {
            return notificationsService.notify(msg, type);
        }

        function startLoading() {
            return loaderService.startLoading();
        }

        function stopLoading() {
            return loaderService.stopLoading();
        }
    }
})(window.angular);
