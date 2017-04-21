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

        function mapSchedules(rawData) {
            var mappedSchedules = [];
            for (var i = 0; i < rawData.length; i++) {
                mappedSchedules.push(new ScheduleModel(rawData[i]));
            }
            return mappedSchedules;
        }
    }
})(window.angular);
