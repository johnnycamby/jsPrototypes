
(function () {
    
    'use strict';
    
    angular.module('users').directive('passwordValidator', passwordValidator);
    
    passwordValidator.$inject = ['passwordValidator'];
    
    function passwordValidator(passwordValidator) {
        
        var directive = {
            require: 'ngModel',
            link: link
        };
        
        return directive;
        
        function link(scope, element, attrs, ngModel) {

            ngModel.$validators.requirements = function(password) {

                var status = true;

                if (password) {
                    var result = passwordValidator.getResult(password);
                    var requirementIdx = 0;

                    var requirementsMeter = [
                        {
                            color: 'danger',
                            progress: '20'
                        }, {
                            color: 'warning',
                            progress: '40'
                        }, {
                            color: 'info',
                            progress: '60'
                        }, {
                            color: 'primary',
                            progress: '80'
                        }, {
                            color: 'success',
                            progress: '100'
                        }
                    ];

                    if (result.errors.length < requirementsMeter.length) {
                        requirementIdx = requirementsMeter.length - result.errors.length - 1;
                    }

                    scope.requirementsColor = requirementsMeter[requirementIdx].color;
                    scope.requirementsProgress = requirementsMeter[requirementIdx].progress;

                    if (result.errors.length) {
                        scope.getPopoverMsg = passwordValidator.getPopoverMsg();
                        scope.passwordErrors = result.errors;
                        status = false;
                    } else {
                        scope.getPopoverMsg = '';
                        scope.passwordErrors = [];
                        status = true;
                    }
                }
                return status;
            };
        }
    }
})();