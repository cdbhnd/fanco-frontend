(function (angular) {
    angular
        .module('fanco.bot')
        .controller('botListController', botListController);

    /**@ngInject */
    function botListController($q, $localStorage, $state, $ionicActionSheet, botService, notificationsService, BotModel, loaderService) {
        vm = this;

        //variables and properties
        var user = $localStorage.currentUser;
        vm.bots = [];
        vm.bot = new BotModel();
        vm.showAddBotForm = false;

        //public method
        vm.addBot = addBot;
        vm.toggleAddBotForm = toggleAddBotForm;
        vm.openActions = openActions;

        //////////////////////////////////
        /**Activate */
        (function () {
            getAllBots();
        })();

        //////////////////////////////////

        function addBot(formIsValid, service, tokend) {
            if (!formIsValid) {
                return;
            } else {
                startLoading()
                    .then(createBot)
            }
        }

        function toggleAddBotForm() {
            switchFormFlag()
                .then(clearFormFields);
        }

        function getAllBots() {
            startLoading()
                .then(tryGetAllBots)
                .finally(stopLoading);
        }

        function createBot() {
            return botService.createBot(user, vm.bot)
                .then(function (response) {
                    if (!response) {
                        stopLoading()
                            .then(notify('Something went wrong', 'error'));
                    } else {
                        stopLoading()
                            .then(notify('Bot created', 'success'))
                            .then(toggleAddBotForm)
                            .then(getAllBots);
                    }
                });
        }

        function openActions(bot) {
            var hideSheet = $ionicActionSheet.show({
                buttons: [],
                destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function() {
                    hideSheet();
                },
                destructiveButtonClicked: function() {
                    botService.removeBot(bot, user)
                        .then(getAllBots)
                        .then(hideSheet);
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

        function tryGetAllBots() {
            return botService.getAllBots(user)
                .then(function (response) {
                    if (!response) {
                        return;
                    }
                    vm.bots = response;
                });
        }

        function switchFormFlag() {
            return $q.when(function () {
                vm.showAddBotForm = !vm.showAddBotForm;
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

        function notify(msg, type) {
            return notificationsService.notify(msg, type);
        }

        function startLoading() {
            return loaderService.startLoading();
        }

        function stopLoading() {
            return loaderService.stopLoading();
        }
    }
})(window.angular);
