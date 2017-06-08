(function (angular) {
    angular
        .module('fanco')
        .factory('PollModel', pollModelFactory);

    /**@ngInject */
    function pollModelFactory(moment) {
        function pollModel(data) {
            this.pId = (data && data.pId) ? data.pId : '';
            this.options = (data && data.options) ? data.options : '';
            this.deadline = (data && data.deadline) ? moment(data.deadline) : null;
            this.active = (data && data.active) ? data.active : false;
            this.name = (data && data.name) ? data.name : "";
        }
        return pollModel;
    }
})(window.angular);
