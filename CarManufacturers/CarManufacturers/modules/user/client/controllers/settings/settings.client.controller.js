
(function() {

    'use strict';

    angular.module('users').controller('settingsController', settingsController);

    settingsController.$inject = ['$scope', 'authentication'];

    function settingsController($scope, authentication) {

        var vm = this;

        vm.user = authentication.user;
    }
})();
