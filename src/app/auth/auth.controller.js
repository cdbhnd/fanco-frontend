(function (angular) {
    angular
        .module('fanco.auth')
        .controller('authController', authController);
    /**@ngInject */
    function authController($rootScope, $state, $ionicViewSwitcher, authService, UserModel, notificationsService, loaderService) {
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
                startLoading()
                    .then(tryLoginUser(email, pass));
            }
        }

        function logoutUser() {
            return authService.logout()
                .then(function () {
                    $ionicViewSwitcher.nextDirection('back');
                    $state.go('login');
                });
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

        function tryLoginUser(email, pass) {
            return authService.login(email, pass)
                .then(function () {
                    stopLoading()
                        .then(tryRedirectToNextState);
                })
                .catch(function (e) {
                    if (e.status === 400 || e.status === 401) {
                        stopLoading()
                            .then(notify('Wrong email and/or password', 'error'));
                    } else {
                        stopLoading()
                            .then(notify('Sorry, something went wrong', 'error'));
                    }
                });
        }

        function tryRedirectToNextState() {
            if ($state.params.goToState) {
                $state.go($state.params.goToState, $state.params.goToParams);
            } else {
                $state.go('app.publish');
            }
        }

        function resetJobsCache() {
            return jobsService.reset();
        }

        function startLoading() {
            return loaderService.startLoading();
        }

        function stopLoading() {
            return loaderService.stopLoading();
        }

        function notify(msg, type) {
            return notificationsService.notify(msg, type);
        }
    }
}(window.angular));
