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
                    console.log(error);
                });
        }

        function createBot(user, bot) {
            return fancoApi.http({
                    method: config.httpMethods.POST,
                    url: config.fancoAPI.BOTS.replace('{{organizationId}}', user.organizationId),
                    data: {
                        service: bot.service,
                        token: bot.token
                    }
                })
                .then(function () {
                    return true;
                })
                .catch(function (error) {
                    console.log(error);
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
