(function (angular) {
    angular
        .module('fanco.schedule')
        .controller('scheduleController', scheduleController);

    /**@ngInject */
    function scheduleController($q, $localStorage, $ionicScrollDelegate, scheduleService, ScheduleModel, notificationsService, moment) {
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

        //////////////////////////////////
        /**Activate */
        (function () {
            getAllSchedules();
        })();

        //////////////////////////////////

        function addSchedule(formIsValid) {
            if (!formIsValid) {
                return;
            }
            createTimestamp(vm.rawTimestamp)
                .then(function () {
                    return scheduleService.createSchedule(user, vm.newSchedule)
                        .then(function (response) {
                            if (!response) {
                                notify('Something went wrong', 'error');
                            } else {
                                notify('Bot created', 'success')
                                    .then(getAllSchedules);
                            }
                        });
                });
        }

        function toggleAddScheduleForm() {
            switchFormFlag()
                .then(clearFormFields);
        }

        function getAllSchedules() {
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

        function notify(msg, type) {
            return $q.when(function () {
                notificationsService.notify(msg, type);
            }());
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
                    alarm: ''
                };
            }());
        }

        function createTimestamp(raw) {
            return $q.when(function () {
                vm.newSchedule.timestamp = raw.slice(0, 4) + '-' + raw.slice(4, 6) + '-' + raw.slice(6, 8) + 'T' + raw.slice(8, 10) + ':' + raw.slice(10, 12) + ':00Z';
            }());
        }

        // function scrollBottom() {
        //     return $ionicScrollDelegate.scrollBottom();
        // }
    }
})(window.angular);
