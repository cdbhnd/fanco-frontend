(function (angular) {
    angular
        .module('fanco.bot')
        .service('botService', botService);

    /**@ngInject */
    function botService(fancoApi, config, BotModel) {
        var service = this;

        //variables and properties

        //public methods
        service.getAllBots = getAllBots;
        service.createBot = createBot;
        service.removeBot = removeBot;

        //////////////////////////////////

        function getAllBots(user) {
            return fancoApi.http({
                    method: config.httpMethods.GET,
                    url: config.fancoAPI.BOTS.replace('{{organizationId}}', user.organizationId)
                })
                .then(function (response) {
                    if (!response.length) {
                        return null;
                    }
                    return mapBots(response);
                })
                .catch(function (error) {
                    return null;
                });
        }

        function removeBot(bot, user) {
            return fancoApi.http({
                    method: config.httpMethods.DELETE,
                    url: config.fancoAPI.BOTS.replace('{{organizationId}}', user.organizationId) + '/' + bot.id
                })
                .then(function (response) {
                    return true;
                })
                .catch(function (error) {
                    return false;
                });
        }

        function createBot(user, bot) {
            return fancoApi.http({
                    method: config.httpMethods.POST,
                    url: config.fancoAPI.BOTS.replace('{{organizationId}}', user.organizationId),
                    data: {
                        service: bot.service,
                        token: bot.token,
                        name: bot.name,
                        avatar: bot.avatar
                    }
                })
                .then(function () {
                    return true;
                })
                .catch(function (error) {
                    return false;
                });
        }

        function mapBots(rawData) {
            var mappedBots = [];
            for (var i = 0; i < rawData.length; i++) {
                mappedBots.push(new BotModel(rawData[i]));
            }
            return mappedBots;
        }
    }
})(window.angular);
