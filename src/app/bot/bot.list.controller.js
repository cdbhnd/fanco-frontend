(function (angular) {
    angular
        .module('fanco.bot')
        .controller('botListController', botListController);

    /**@ngInject */
    function botListController($q, $localStorage, $state, botService, notificationsService, BotModel) {
        vm = this;

        //variables and properties
        var user = $localStorage.currentUser;
        vm.bots = [];
        vm.bot = new BotModel();
        vm.showAddBotForm = false;

        //public method
        vm.addBot = addBot;
        vm.toggleAddBotForm = toggleAddBotForm;

        //////////////////////////////////
        /**Activate */
        (function () {
            getAllBots();
        })();

        //////////////////////////////////

        function addBot(formIsValid, service, tokend) {
            if (!formIsValid) {
                return;
            }
            return botService.createBot(user, vm.bot)
                .then(function (response) {
                    if (!response) {
                        notify('Something went wrong', 'error');
                    } else {
                        notify('Bot created', 'success')
                            .then(getAllBots);
                    }
                });
        }

        function toggleAddBotForm() {
            vm.showAddBotForm = !vm.showAddBotForm;
            clearFormFields();
        }

        function getAllBots() {
            return botService.getAllBots(user)
                .then(function (response) {
                    if (!response) {
                        return;
                    }
                    vm.bots = response;
                });
        }

        function notify(msg, type) {
            return $q.when(function () {
                notificationsService.notify(msg, type);
            }());
        }

        function clearFormFields() {
            vm.bot.token = "";
            vm.bot.name = "";
            vm.bot.avatar = "";
            vm.bot.service = "";
        }
    }
})(window.angular);
