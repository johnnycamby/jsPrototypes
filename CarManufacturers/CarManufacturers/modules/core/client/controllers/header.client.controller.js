
(function() {

    'use strict';

    angular.module('core').controller('headerController', headerController);

    headerController.$inject = ['$scope', '$state', 'authentication', 'menuService'];

    function headerController($scope, $state, authentication, menuService) {

        var vm = this;

        vm.accountMenu = menuService.getMenu('account').items[0];
        vm.authentication = authentication;
        vm.isCollapsed = false;
        vm.menu = menuService.getMenu('topbar');

        $scope.$on('$stateChangeSuccess', stateChangeSuccess);

        function stateChangeSuccess() {
            // Collapsing the menu after navigation
            vm.isCollapsed = false;
        }
    }
})();