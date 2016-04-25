
(function () {
    
    'use strict';
    
    angular.module('users.services').factory('passwordValidator', passwordValidator);
    
    passwordValidator.$inject = ['$window'];
    
    function passwordValidator($window) {
        
        var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;
        
        var service = {
            getResult: getResult,
            getPopoverMsg: getPopoverMsg
        };
        
        return service;
        
        function getResult(password) {
            var result = owaspPasswordStrengthTest.test(password);
            return result;
        }

        function getPopoverMsg() {
            var popoverMsg = 'Please enter a passphrase or password with 10 or more characters, numbers, lowercase, uppercase, and special characters.';
            return popoverMsg;
        }
    }
})();