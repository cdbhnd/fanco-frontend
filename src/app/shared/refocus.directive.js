(function (angular) {
    angular
        .module('fanco')
        .directive('refocus', refocus);

    function refocus() {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, iElement, iAttrs) {
            iElement.bind('focusout', function () {
                angular.element(this).focus();
            });
        }
    }
})(window.angular);
