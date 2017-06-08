(function() {

    angular
        .module('fanco.poll')
        .controller('pollsController', pollsController);

    /**@ngInject */
    function pollsController(pollsService, authService, loaderService) {

        var vm = this;

        vm.user = null;
        vm.polls = [];

        /** Activate function */
        (function () {
            startLoading()
                .then(getCurrentUser)
                .then(loadAllPolls)
                .then(stopLoading);
        }());

        function getCurrentUser() {
            return authService.getCurrentUser()
                .then(function(user) {
                    vm.user = user;
                    return true;
                });
        }

        function loadAllPolls() {
            return pollsService.getPolls(vm.user)
                .then(function(polls) {
                    vm.polls = polls;
                    return true;
                });
        }

        function startLoading() {
            return loaderService.startLoading();
        }

        function stopLoading() {
            return loaderService.stopLoading();
        }
    }

}(window.angular));