(function (angular) {
    angular
        .module('fanco.notifications')
        .service('notificationsService', notificationsService);

    /**@ngInject */
    function notificationsService($rootScope, events) {
        var s = this;

        //public methods
        s.notify = notify;

        //////////////////////////////

        function notify(message, type) {
            if (!message) {
                return;
            }

            var data = {
                message: message,
                type: type || 'default'
            };

            $rootScope.$broadcast(events.SHOW_NOTIFICATION, data);
        }
    }
})(window.angular);
