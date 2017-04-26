(function (angular) {
    angular
        .module('fanco')
        .directive('listItemActions', listItemActions);

    /**@ngInject */
    function listItemActions($ionicActionSheet) {
        return {
            link: link,
            restrict: 'A',
            scope: {
                item: '=',
                buttons: '=',
                deleteAction: '='
            }
        };

        function link(scope, iElement, iAttrs) {

            scope.openActions = openActions;

            function openActions(bot) {
                var hideSheet = $ionicActionSheet.show({
                    buttons: buttons,
                    destructiveText: 'Delete',
                    cancelText: 'Cancel',
                    cancel: function() {
                        hideSheet();
                    },
                    buttonClicked: function(buttonIndex, buttonObj) {
                        if (buttonObj && buttonObj.action) {
                            buttonObj.action(scope.item);
                        }
                    },
                    destructiveButtonClicked: function() {
                        if (scope.deleteAction) {
                            return scope.deleteAction()
                                .then(hideSheet);
                        } else {
                            return hideSheet();
                        }
                    }
                });
            }
        }
    }
})(window.angular);
