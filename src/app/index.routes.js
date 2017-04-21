(function (angular) {
    angular
        .module('fanco')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/auth/auth.login.html',
                    controller: 'authController',
                    controllerAs: 'vm',
                    cache: false
                })
                .state('app', {
                    url: '/app',
                    templateUrl: 'app/side-menu/side-menu.html',
                    controller: 'sideMenuController',
                    controllerAs: 'vm',
                    cache: false
                })
                .state('app.publish', {
                    url: '/publish',
                    templateUrl: 'app/event/events.html',
                    controller: 'eventController',
                    controllerAs: 'vm',
                    cache: false
                })
                .state('app.bots', {
                    url: '/bots',
                    templateUrl: 'app/bot/bot.list.html',
                    controller: 'botListController',
                    controllerAs: 'vm',
                    cache: false
                });
            $urlRouterProvider.otherwise('/login');
        }]);
})(window.angular);
