

(function(){

    'use strict';

    window.app.component('carApp', {
        templateUrl: '/xp-cars/car-app.component.html',
        $routeConfig:[
            {path: '/list',  name: 'List', component:'carsList', useAsDefault: true},
            {path: '/about',  name: 'About', component:'xpAbout'},
            // {path: '/detail/:id/', name:'Details', component:'carDetails'},
            {path: '/detail/:id/...', name:'Details', component:'carDetails'},
            {path: '/**', redirectTo:  ['List']}
        ]
    }) 
})();