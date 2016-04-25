
(function (window) {
    'use strict';

    var appModuleName = 'xplictApp';

    var service = {
        appModuleName: appModuleName,
        appModuleVendorDependencies: [],
        registerModule: registerModule
    };

    window.ApplicationConfiguration = service;
    
    // Add a new vertical module
    function registerModule(moduleName, dependencies){

         // Create angular module
        angular.module(moduleName, dependencies || []);

         // Add the module to the AngularJS configuration file
        angular.module(appModuleName).requires.push(moduleName);
    }
})(window);