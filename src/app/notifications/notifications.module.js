(function (angular) {
    angular
        .module('fanco.notifications', [])
        .constant('events', {
            SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
            notificationDisplayTime: 5000
        });
}(window.angular));
