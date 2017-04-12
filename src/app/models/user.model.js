(function (angular) {
    angular
        .module('fanco')
        .factory('UserModel', userModelFactory);

    /**@ngInject */
    function userModelFactory() {
        function UserModel(data) {
            this.firstName = (data && data.firstName) ? data.firstName : '';
            this.lastName = (data && data.lastName) ? data.lastName : '';
            this.userName = (data && data.userName) ? data.userName : '';
            this.email = (data && data.email) ? data.email : '';
            this.password = (data && data.password) ? data.password : '';
            this.organizationId = (data && data.organizationId) ? data.organizationId : '';
            this.id = (data && data.id) ? data.id : '';
            this.token = (data && data.token) ? data.token : '';
        }
        return UserModel;
    }
})(window.angular);
