
(function () {
    
    'use strict';
    
    angular.module('core.admin.routes').config(routeConfig);
    
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin',
            {
            abstract: true,
            url: '/admin',
            template: '<ui-view/>',
            data: {
                roles: ['admin']
            }
        });
    }
})();