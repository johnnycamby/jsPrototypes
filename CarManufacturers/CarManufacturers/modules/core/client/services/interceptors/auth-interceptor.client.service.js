
(function() {
    'use strict';

    angular.module('core').factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$q', '$injector', 'authentication'];

    function  authInterceptor($q, $injector, authentication) {

        var service = {
            responseError: responseError
        };

        return service;

        function  responseError(rejection) {

            if (!rejection.config.ignoreAuthModule) {

                switch (rejection.status) {
                case 401:
                    // Deauthenticate the global user
                        authentication.user = null;
                        $injector.get('$state').transitionTo('authentication.signin');
                        break;
                    case 403:
                        $injector.get('$state').transitionTo('forbidden');
                        break;
              
                }
            }
            
            // otherwise, default behaviour
            return $q.reject(rejection);
        }
    }
})();