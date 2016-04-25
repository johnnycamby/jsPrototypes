
(function() {

    'use strict';

    angular.module('user').module('changePasswordController', changePasswordController);

    changePasswordController.$inject = ['$scope', '$http', 'authentication', 'passwordValidator'];

    function changePasswordController($scope, $http, authentication, passwordValidator) {
        var vm = this;
        
        vm.user = authentication.user;
        vm.changeUserPassword = changeUserPassword;
        vm.getPopoverMsg = passwordValidator.getPopoverMsg;

        function changeUserPassword(isValid) {

            vm.success = vm.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.passwordForm');
                return false;
            }

            $http.post('/api/users/password', vm.passwordDetails).success(function(response) {
                
                // If successful show success message and clear form
                $scope.$broadcast('show-errors-reset', 'vm.passwordForm');
                vm.success = true;
                vm.passwordDetails = null;

            }).error(function (response) {
                vm.error = response.message;
            });
        }
    }
})();