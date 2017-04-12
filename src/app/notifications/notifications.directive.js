(function (angular) {
    angular
        .module('fanco.notifications')
        .directive('fancoNotifications', fancoNotifications);

    function fancoNotifications() {
        return {
            controller: notificationsController,
            restrict: 'A',
            templateUrl: 'app/notifications/notifications.html'
        };

        function notificationsController($scope, $element, $rootScope, $timeout, events) {
            initialize();
            $scope.hideNotification = initialize;

            $rootScope.$on(events.SHOW_NOTIFICATION, function (event, payload) {
                $scope.showNotification = true;
                $scope.message = payload.message;
                $scope.type = payload.type;

                $timeout(initialize, events.notificationDisplayTime);
            });

            function initialize() {
                $scope.showNotification = false;
                $scope.message = '';
                $scope.type = '';
            }
        }
    }
})(window.angular);
