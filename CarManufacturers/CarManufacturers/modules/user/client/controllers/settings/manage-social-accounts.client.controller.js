
(function() {

    'use strict';

    angular.module('users').controller('socialAccountsController', socialAccountsController);

    socialAccountsController.$inject = ['$scope', '$http', 'authentication'];

    function socialAccountsController($scope, $http, authentication) {

        var vm = this;

        vm.user = authentication.user;
        vm.hasConnectedAdditionalSocialAccounts = hasConnectedAdditionalSocialAccounts;
        vm.isConnectedSocialAccount = isConnectedSocialAccount;
        vm.removeUserSocialAccount = removeUserSocialAccount;
        
        // Check if there are additional accounts
        function hasConnectedAdditionalSocialAccounts() {
            return ($scope.user.additionalProvidersData && Object.keys(($scope.user.additionalProvidersData).length));
        }
        
        // Check if provider is already in use with current user
        function isConnectedSocialAccount(provider) {
            return vm.user.provider === provider || (vm.user.additionalProvidersData && vm.user.additionalProvidersData[provider]);
        }

        function removeUserSocialAccount(provider) {

            vm.success = vm.error = null;

            $http.delete('/api/users/accounts', {
                params: {
                    provider:provider
                }
            }).success(function(response) {
                vm.success = true;
                vm.user = authentication.user = response;
            }).error(function(response) {
                vm.error = response.message;
            });
        }
    }
})();