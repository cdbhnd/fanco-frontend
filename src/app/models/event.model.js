(function (angular) {
    angular
        .module('fanco')
        .factory('EventModel', eventModelFactory);

    /**@ngInject */
    function eventModelFactory(moment) {
        function eventModel(data) {
            this.id = (data && data.id) ? data.id : '';
            this.organizationId = (data && data.organizationId) ? data.organizationId : '';
            this.type = (data && data.type) ? data.type : '';
            this.content = (data && data.content) ? data.content : '';
            this.postedBy = (data && data.postedBy) ? data.postedBy : '';
            this.timestamp = (data && data.timestamp) ? moment(data.timestamp) : '';
            this.sent = (data && data.sent) ? data.sent : true;
        }
        return eventModel;
    }
})(window.angular);
