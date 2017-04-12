(function (angular) {
    angular
        .module('fanco.auth')
        .service('authService', authService);

    /**@ngInject */
    function authService($q, $rootScope, fancoApi, config, $localStorage, UserModel) {
        var service = this;

        //public methods
        service.init = init;
        service.login = login;
        service.logout = logout;
        service.getCurrentUser = getCurrentUser;

        //////////////////////////////////

        function init() {
            if (!!$localStorage.currentUser) {
                setCurrentUser($localStorage.currentUser);
            }
        }

        function login(email, password) {
            return fancoApi.http({
                    method: config.httpMethods.POST,
                    url: config.fancoAPI.LOGIN,
                    data: {
                        email: email,
                        password: password
                    }
                })
                .then(function (data) {
                    var u = {
                        email: email
                    };
                    angular.merge(u, data);
                    return setCurrentUser(u);
                });
        }

        function logout() {
            return $q.when(function () {
                delete $localStorage.currentUser;
                delete $rootScope.currentUser;
                return true;
            }());
        }

        function getCurrentUser() {
            return $q.when(function () {
                if (!!$localStorage.currentUser) {
                    return $localStorage.currentUser;
                }
                return null;
            }());
        }

        function setCurrentUser(userData) {
            var userModel = new UserModel(userData);
            $localStorage.currentUser = userModel;
            $rootScope.currentUser = userModel;
            $rootScope.$watch('currentUser', function () {
                $localStorage.currentUser = $rootScope.currentUser;
            }, true);
            return userModel;
        }
    }
})(window.angular);
