
(function() {

    'use strict';

    angular.module('users.admin').controller('userController', userController);

    userController.$inject = ['$scope', '$state', '$window', 'authentication', 'userResolve'];

    function userController($scope, $state, $window, authentication, userResolve) {

        var vm = this;

        vm.authentication = authentication;
        vm.user = user;
        vm.remove = remove;
        vm.update = update;

        function remove(user) {

            if ($window.confirm('Are you sure you want to delete this user?')) {
                if (user) {
                    user.$remove();

                    vm.users.splice(vm.users.indexOf(user), 1);
                } else {
                    vm.user.$remove(function() {
                        $state.go('admin.users');
                    });
                }
            }
        }

        function update(isValid) {

            if (!isValid) {
                $scope.$broadcast('');

                return false;
            }

            var user = vm.user;

            user.$update(function() {
                $state.go('admin.user', {
                    userId: user._id
                });
            }, function(errorResponse) {
                vm.error = errorResponse.data.message;
            });
        }
    }
})();