(function (angular) {
    angular
        .module('fanco.auth')
        .controller('authController', authController);
    /**@ngInject */
    function authController($rootScope, $state, $ionicViewSwitcher, authService, UserModel, notificationsService) {
        var vm = this;

        //variables and properties
        vm.user = new UserModel();
        vm.userNotLoggedIn = false;

        //public methods
        vm.loginUser = loginUser;
        vm.logoutUser = logoutUser;

        //////////////////////////////////
        /**Activate */
        (function () {
            ensureUserIsNotLoggedIn();
        }());

        //////////////////////////////////

        function loginUser(formIsValid, email, pass) {
            if (formIsValid) {
                return authService.login(email, pass)
                    .then(function () {
                        tryRedirectToNextState();
                    })
                    .catch(function (e) {
                        if (e.status === 400 || e.status === 401) {
                            notificationsService.notify('Wrong email and/or password', 'error');
                        }

                        if (e.status === 500) {
                            notificationsService.notify('Sorry, something went wrong', 'error');
                        }
                    });
            }
        }

        function ensureUserIsNotLoggedIn() {
            return authService.getCurrentUser()
                .then(function (user) {
                    if (!!user) {
                        //Redirect user to the next screen if he is already logged in
                        tryRedirectToNextState();
                        return false;
                    }
                    vm.userNotLoggedIn = true;
                    return true;
                });
        }

        function logoutUser() {
            return authService.logout()
                .then(function () {
                    $ionicViewSwitcher.nextDirection('back');
                    $state.go('login');
                });
        }

        function resetJobsCache() {
            return jobsService.reset();
        }

        function tryRedirectToNextState() {
            if ($state.params.goToState) {
                $state.go($state.params.goToState, $state.params.goToParams);
                return;
            }
            $state.go('app.publish');
        }
    }
}(window.angular));
