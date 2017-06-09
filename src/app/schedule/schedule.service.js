(function (angular) {
    angular
        .module('fanco.schedule')
        .service('scheduleService', scheduleService);

    /**@ngInject */
    function scheduleService(fancoApi, config, ScheduleModel) {
        var service = this;

        //public methods
        service.getAllSchedules = getAllSchedules;
        service.createSchedule = createSchedule;
        service.removeSchedule = removeSchedule;

        //////////////////////////////////

        function getAllSchedules(user) {
            return fancoApi.http({
                    method: config.httpMethods.GET,
                    url: config.fancoAPI.SCHEDULES.replace('{{organizationId}}', user.organizationId)
                })
                .then(function (response) {
                    if (!response.length) {
                        return null;
                    }
                    return mapSchedules(response);
                })
                .catch(function () {
                    return null;
                });
        }

        function createSchedule(user, schedule) {
            return fancoApi.http({
                    method: config.httpMethods.POST,
                    url: config.fancoAPI.SCHEDULES.replace('{{organizationId}}', user.organizationId),
                    data: schedule
                })
                .then(function () {
                    return true;
                })
                .catch(function () {
                    return false;
                });
        }

        function removeSchedule(schedule, user) {
            return fancoApi.http({
                    method: config.httpMethods.DELETE,
                    url: config.fancoAPI.SCHEDULES.replace('{{organizationId}}', user.organizationId) + '/' + schedule.id
                })
                .then(function (response) {
                    return true;
                })
                .catch(function () {
                    return false;
                });
        }

        function mapSchedules(rawData) {
            var mappedSchedules = [];
            for (var i = 0; i < rawData.length; i++) {
                mappedSchedules.push(new ScheduleModel(rawData[i]));
            }
            return mappedSchedules;
        }
    }
})(window.angular);
