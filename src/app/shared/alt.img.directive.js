(function (angular) {
    angular
        .module('fanco')
        .directive('altImage', altImage);

    function altImage() {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, iElement, iAttrs) {
            iElement.bind('error', function () {
                angular.element(this).attr("src", iAttrs.altImage);
            });
        }
    }
})(window.angular);
