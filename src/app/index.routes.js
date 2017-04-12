(function (angular) {
    angular
        .module('{{blueprint}}')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('hello', {
                    url: '/',
                    templateUrl: 'app/hello-world/hello-world.html'
                });

            $urlRouterProvider.otherwise('/');
        }]);
})(window.angular);
