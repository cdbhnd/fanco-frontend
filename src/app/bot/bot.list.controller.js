(function (angular) {
    angular
        .module('fanco.bot')
        .controller('botListController', botListController);

    /**@ngInject */
    function botListController($q, $localStorage, $state, $ionicActionSheet, botService, notificationsService, BotModel, loaderService, $ionicPopup, clipboard) {
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
            getAllBots()
                .then(function() {
                    vm.bot.service = 'viber';
                    console.dir(vm);
                });
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
            return startLoading()
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
                            .then(toggleAddBotForm)
                            .then(getAllBots);
                    }
                });
        }

        function openActions(bot) {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Get Shareable Link', action: copyShareableLink }
                ],
                destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function() {
                    hideSheet();
                },
                buttonClicked: function(buttonIndex, buttonObj) {
                    if (buttonObj.action) {
                        buttonObj.action(bot);
                    }
                    return true;
                },
                destructiveButtonClicked: function() {
                    botService.removeBot(bot, user)
                        .then(getAllBots)
                        .then(hideSheet);
                }
            });
        }

        function copyShareableLink(bot) {
            clipboard.copy(bot.shareableLink)
                .then(function() {
                    $ionicPopup.alert({
                        title: 'Shareable Link copied to the clipboard',
                    });
                })
                .catch(function() {});
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
                vm.bot.token = '';
                vm.bot.name = '';
                vm.bot.avatar = '';
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
