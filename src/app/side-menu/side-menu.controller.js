(function (angular) {
    angular
        .module('fanco.sideMenu')
        .controller('sideMenuController', sideMenuController);

    /**@ngInject */
    function sideMenuController($state, $ionicViewSwitcher, authService) {
        vm = this;

        vm.logout = logoutUser;

        function logoutUser() {
            return authService.logout()
                .then(function () {
                    $ionicViewSwitcher.nextDirection('back');
                    $state.go('login');
                });
        }
    }
})(window.angular);
