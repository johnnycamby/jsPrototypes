
(function () {
    
    'use strict';
    
    angular.module('users.services').factory('authentication', authentication);
    
    authentication.$inject = ['$window'];
    
    function authentication($window) {
        
        var auth = {
            user: $window.user
        };
        return auth;
    }
})();