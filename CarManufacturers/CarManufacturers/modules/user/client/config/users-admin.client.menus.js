

(function() {

    'use strict';

    angular.module('users.admin').run(menuConfig);

    menuConfig.$inject = ['menuService'];

    function menuConfig(menuService) {

        menuService.addSubMenuItem('topbar', 'admin', {
            title: 'Manage Users',
            state: 'admin.users'
        });
    }
})();