(function() {
    angular
        .module('fanco.poll')
        .service('pollsService', pollsService);

    /**@ngInject */
    function  pollsService(fancoApi, config, PollModel) {

        var service = this;

        service.getPolls = getPolls;

        ////////////////////////////////////

        function getPolls(user) {
            return fancoApi.http({
                    method: config.httpMethods.GET,
                    url: config.fancoAPI.POLLS.replace('{{organizationId}}', user.organizationId)
                })
                .then(function (response) {
                    if (!response.length) {
                        return null;
                    }
                    return mapPolls(response);
                })
                .catch(function () {
                    return null;
                });
        }

        function mapPolls(rawData) {
            var mappedPolls = [];
            for (var i = 0; i < rawData.length; i++) {
                mappedPolls.push(new PollModel(rawData[i]));
            }
            return mappedPolls;
        }
    }
}());