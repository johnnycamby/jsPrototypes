
(function() {

    'use strict';

    angular.module('users').controller('editProfileController', editProfileController);

    editProfileController.$inject = ['$scope', '$http', '$location', 'Users', 'authentication'];

    function editProfileController($scope, $http, $location, Users, authentication) {

        var vm = this;

        vm.user = authentication.user;
        vm.updateUserProfile = updateUserProfile;

        function updateUserProfile(isValid) {

            vm.success = vm.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');
                return false;
            }

            var user = new Users(vm.user);

            user.$update(function(response) {
                $scope.$broadcast('show-errors-reset', 'vm.userForm');

                vm.success = true;
                authentication.user = response;
            }, function(response) {
                vm.error = response.data.message;
            });
        }

    }

})();