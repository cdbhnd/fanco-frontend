(function (angular) {
    'use strict';

    angular
        .module('fanco')
        .directive('passwordText', passwordText);

    function passwordText() {
        return {
            link: link,
            restrict: 'A',
        };

        function link(scope, iElement, iAttrs) {
            iElement.bind('change', function () {
                iElement[0].type = 'password';
            });
            iElement.bind('focus', function () {
                iElement[0].type = 'password';
            });
        }
    }

})(window.angular);
