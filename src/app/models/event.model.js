(function (angular) {
    angular
        .module('fanco')
        .factory('EventModel', eventModelFactory);

    /**@ngInject */
    function eventModelFactory() {
        function eventModel(data) {
            this.id = (data && data.id) ? data.id : '';
            this.organizationId = (data && data.organizationId) ? data.organizationId : '';
            this.type = (data && data.type) ? data.type : '';
            this.content = (data && data.content) ? data.content : '';
            this.postedBy = (data && data.postedBy) ? data.postedBy : '';
            this.timestamp = (data && data.timestamp) ? data.timestamp : '';
        }
        return eventModel;
    }
})(window.angular);
