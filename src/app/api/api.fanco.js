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

            if (!!$localStorage.currentUser && !!$localStorage.currentUser.accessToken) {
                if (!params.headers) {
                    params.headers = {};
                }
                params.headers.Authorization = 'Bearer ' + $localStorage.currentUser.accessToken;
            }

            return $http(params)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (e) {
                    if (e.status === 401) {
                        //logout current user
                        //redirect him to login state
                    }
                    return $q.reject(e);
                });
        }
    }
})(window.angular);
