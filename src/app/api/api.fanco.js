(function (angular) {
    angular
        .module('fanco.api')
        .service('fancoApi', fancoApi);

    /**@ngInject */
    function fancoApi($http, $localStorage, $q, config) {
        var service = this;

        service.http = http;

        //////////////////////////////////

        function http(params) {
            params.url = config.fancoAPI.HOST + params.url;

            if (!!$localStorage.currentUser && !!$localStorage.currentUser.token) {
                if (!params.headers) {
                    params.headers = {};
                }
                params.headers.Authorization = 'Bearer ' + $localStorage.currentUser.token;
            }

            return $http(params)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})(window.angular);
