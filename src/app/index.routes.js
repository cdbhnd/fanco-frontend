(function (angular) {
    angular
        .module('fanco')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/auth/auth.login.html',
                    controller: 'authController',
                    controllerAs: 'vm'
                })
                .state('app', {
                    url: '/app',
                    templateUrl: 'app/side-menu/side-menu.html',
                    controller: 'sideMenuController',
                    controllerAs: 'vm'
                })
                .state('app.publish', {
                    url: '/publish',
                    templateUrl: 'app/event/events.html',
                    controller: 'eventController',
                    controllerAs: 'vm'
                })
                .state('app.bots', {
                    url: '/bots',
                    templateUrl: 'app/bot/bot.list.html',
                    controller: 'botListController',
                    controllerAs: 'vm'
                });
            $urlRouterProvider.otherwise('/login');
        }]);
})(window.angular);
