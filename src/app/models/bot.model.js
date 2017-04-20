(function (angular) {
    angular
        .module('fanco')
        .factory('BotModel', botModelFactory);

    /**@ngInject */
    function botModelFactory() {
        function botModel(data) {
            this.id = (data && data.id) ? data.id : '';
            this.organizationId = (data && data.organizationId) ? data.organizationId : '';
            this.service = (data && data.service) ? data.service : '';
            this.token = (data && data.token) ? data.token : '';
            this.name = (data && data.name) ? data.name : '';
            this.avatar = (data && data.avatar) ? data.avatar : '';
        }
        return botModel;
    }
})(window.angular);
