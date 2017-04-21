(function (angular) {
    angular
        .module('fanco')
        .factory('ScheduleModel', scheduleModelFactory);

    /**@ngInject */
    function scheduleModelFactory(moment) {
        function scheduleModel(data) {
            this.timestamp = (data && data.timestamp) ? moment(data.timestamp) : '';
            this.description = (data && data.description) ? data.description : '';
            this.alarm = (data && data.alarm) ? data.alarm : false;
        }
        return scheduleModel;
    }
})(window.angular);
