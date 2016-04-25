
(function (app) { 

    'use strict';

    // Start by defining the main module and adding the module dependencies
    angular.module(app.appModuleName, app.appModuleVendorDependencies);

    // Setting HTML5 Location Mode
    angular.module(app.appModuleName).config(bootstrapConfig);

    function bootstrapConfig($locationProvider, $httpProvider){

        $locationProvider.html5Mode(true).hashPrefix('!');
        $httpProvider.interceptors.push('authInterceptor');
    }

    bootstrapConfig.$inject = ['$locationProvider', '$httpProvider'];
    
    // Define the init function for starting up the application
    function init(){
        
        // Fixing facebook bug with redirect
        if (window.location.hash && window.location.hash === '#_=_') {
            
            if (window.history && history.pushState()) {
                window.history.pushState('', document.title, window.location.pathname);
            } else {
                
                // Prevent scrolling by storing the page's current scroll offset
                var scroll = {
                    top: document.body.scrollTop,
                    left: document.body.scrollLeft
                };

                window.location.hash = '';
                
                // Restore the scroll offset, should be flicker free
                document.body.scrollTop = scroll.top;
                document.body.scrollLeft = scroll.left;
            }
        }

        // Then init the app
        angular.bootstrap(document, [app.appModuleName]);
    }

    angular.element(document).ready(init());

})(ApplicationConfiguration);