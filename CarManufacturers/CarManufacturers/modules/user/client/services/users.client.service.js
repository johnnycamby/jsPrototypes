

(function () {

    'use strict';

    angular.module('users.services').factory('usersService', usersService);

    usersService.$inject = ['$resource'];

    function usersService($resource) {

        return $resource('api/users', {}, {
            update: {
                method: 'PUT'
            }
        });
    }

    angular.module('users.admin.services').factory('adminService', adminService);

    adminService.$inject = ['$resource'];

    function adminService($resource) {

        return $resource('api/users/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }

})();