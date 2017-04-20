(function (angular) {
    angular.module('fanco', [
            'angularMoment',
            'ionMdInput',
            'ionic',
            'ngCordova',
            'ngStorage',
            'fanco.sideMenu',
            'fanco.auth',
            'fanco.api',
            'fanco.notifications',
            'fanco.bot',
            'fanco.event'
        ])
        .run(function ($rootScope, $state, $ionicPlatform, $window, authService) {
            $ionicPlatform.ready(function () {
                if ($window.cordova && $window.cordova.plugins && $window.cordova.plugins.Keyboard) {
                    //Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                    //for form inputs)
                    $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    //Don't remove this line unless you know what you are doing. It stops the viewport
                    //from snapping when text inputs are focused. Ionic handles this internally for
                    //a much nicer keyboard experience.
                    $window.cordova.plugins.Keyboard.disableScroll(true);
                }
                if ($window.StatusBar) {
                    $window.StatusBar.styleDefault();
                }
                authService.init();
                $rootScope.current_state = $state.current;
                $rootScope.$on('$stateChangeStart', stateChangeStart);
                $rootScope.$on('$stateChangeSuccess',
                    function (event, toState) {
                        $rootScope.current_state = toState;
                    });

                function stateChangeStart(event, toState, toParams) {
                    if ((toState.data && toState.data.authRequired) && !$localStorage.currentUser) {
                        event.preventDefault();
                        $state.go('login', { goToState: toState.name, goToParams: toParams }, { reload: true });
                    }
                }
            });
        });
})(window.angular);
