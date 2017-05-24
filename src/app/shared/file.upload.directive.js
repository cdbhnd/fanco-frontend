(function () {
    'use strict';

    angular
        .module('fanco')
        .directive('fileUpload', fileUpload);

    fileUpload.$inject = ['$parse'];

    /* @ngInject */
    function fileUpload($parse) {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, element, attrs) {
            var model = $parse(attrs.fileUpload);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    }
})();

