
(function() {
   
    'use strict';

    angular.module('core').run(routeFilter);

    routeFilter.$inject = ['$rootScope', '$state', 'authentication'];

    function routeFilter($rootScope, $state, authentication) {

        $rootScope.$on('$stateChangeStart', stateChangeStart);
        $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

        function stateChangeStart(event, toState, toParams, fromState, fromParams) {
            
            // Check authentication before changing state
            if (toState.data && toState.data.roles && toState.data.roles.length > 0) {

                var allowed = false;
                
                for (var i = 0, roles = toState.data.roles; i < roles.length; i++) {

                    if ((roles[i] === 'guest') || (authentication.user && authentication.user.roles !== undefined && authentication.user.roles.indexOf(roles[i]) !== -1)) {
                        allowed = true;
                        break;
                    }
                }

                if (!allowed) {
                    event.preventDefault();

                    if (authentication.user !== undefined && typeof authentication.user === 'object' ) {
                        $state.transitionTo('forbidden');
                    } else {
                        $state.go('authentication.signin').then(function() {
                            // Record previous state
                            storePreviousState(toState, toParams);
                        });
                    }
                }
            }
        }

        function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
            storePreviousState(fromState, fromParams);
        }

       function storePreviousState(state, params) {
           // only store this state if it shouldn't be ignored
           if (!state.data || !state.data.ignore) {
               $state.previous = {
                   state: state,
                   params: params,
                   href: $state.href(state, params)
               };
           }
        }
    }
})();