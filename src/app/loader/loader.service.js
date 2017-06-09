(function (angular) {
    angular
        .module('fanco.loader')
        .service('loaderService', loaderService);

    /**@ngInject */
    function loaderService($ionicLoading) {
        var service = this;

        //variables and properties

        //public methods
        service.startLoading = startLoading;
        service.stopLoading = stopLoading;

        //////////////////////////////////

        function startLoading() {
            return $ionicLoading.show({
                template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
            });
        }

        function stopLoading() {
            return $ionicLoading.hide();
        }

    }
})(window.angular);
