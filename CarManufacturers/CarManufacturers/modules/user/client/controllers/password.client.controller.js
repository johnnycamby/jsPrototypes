
(function() {

    'use strict';

    angular.module('users').controller('passwordController', passwordController);

    passwordController.$inject = ['$scope', '$stateParams', '$http', '$location', 'authentication', 'passwordValidator'];

    function passwordController($scope, $stateParams, $http, $location, authentication, passwordValidator) {

        var vm = this;

        vm.resetUserPassword = resetUserPassword;
        vm.askForPasswordReset = askForPasswordReset;
        vm.authentication = authentication;
        vm.getPopoverMsg = passwordValidator.getPopoverMsg;

        if (vm.authentication.user) {
            $location.path('/');
        }

        function askForPasswordReset(isValid) {

            vm.success = vm.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.forgotPasswordForm');
                return false;
            }

            $http.post('/api/auth/forgot', vm.credentials).success(function(response) {

                vm.credentials = null;
                vm.success = response.message;
            }).error(function(response) {
                vm.credentials = null;
                vm.error = response.message;
            });
        }

        function resetUserPassword(isValid) {

            vm.success = vm.error = null;

            
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.resetPasswordForm');
                return false;
            }

            $http.post('/api/auth/reset/' + $stateParams.token, vm.passwordDetails).success(function(response) {

                vm.passwordDetails = null;
                authentication.user = response;
                $location.path('/password/reset/success');
            }).error(function(response) {
                vm.error = response.message;
            });
        }

    }
})();