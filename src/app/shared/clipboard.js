(function (angular) {
    angular
        .module('fanco')
        .service('clipboard', clipboard);

    /**@ngInject */
    function clipboard($q) {
        var service = this;

        service.copy = copyTextToClipboard;

        ////////////////////////////////////////////

        function copyTextToClipboard(text) {
            var textArea = document.createElement("textarea");

            textArea.style.position = 'fixed';
            textArea.style.top = 0;
            textArea.style.left = 0;
            textArea.style.width = '2em';
            textArea.style.height = '2em';
            textArea.style.padding = 0;
            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.boxShadow = 'none';
            textArea.style.background = 'transparent';
            textArea.value = text;

            document.body.appendChild(textArea);

            textArea.select();

            var defered = $q.defer();
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
                document.body.removeChild(textArea);
                defered.resolve();
            } catch (err) {
                console.log('Oops, unable to copy');
                document.body.removeChild(textArea);
                defered.reject();
            }
            return defered.promise;
        }
    }
})(window.angular);
