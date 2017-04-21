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
                            .then(toggleAddBotForm)
                            .then(getAllBots);
                    }
                });
        }

        function toggleAddBotForm() {
            switchFormFlag()
                .then(clearFormFields);
        }

        function switchFormFlag() {
            return $q.when(function () {
                vm.showAddBotForm = !vm.showAddBotForm;
            }());
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
            return $q.when(function () {
                vm.bot = {
                    token: '',
                    name: '',
                    avatar: '',
                    service: ''
                };
            }());
        }
    }
})(window.angular);
