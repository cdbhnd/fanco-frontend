(function (angular) {
    angular
        .module('fanco')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('app', {
                    url: '/app',
                    templateUrl: 'app/side-menu/side-menu.html',
                    controller: 'sideMenuController',
                    controllerAs: 'vm'
                })
                .state('app.hello', {
                    url: '/hello',
                    templateUrl: 'app/hello-world/hello-world.html'
                });
            $urlRouterProvider.otherwise('/app/hello');
        }]);
})(window.angular);
