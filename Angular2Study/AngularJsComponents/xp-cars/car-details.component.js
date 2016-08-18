
(function () {

    'use strict';

    window.app.component('carDetails', {
        templateUrl: '/xp-cars/car-details.component.html',
        $routeConfig: [
            { path: '/overview', name: 'Overview', component: 'carOverview' },
            { path: '/manufacturer', name: 'Manufacturer', component: 'carManufacturer' },
        ],
        // $canActivate: canActivate,
        controllerAs: 'vm',
        controller: controller
    });

    controller.$inject = ['$timeout']

    // One can inject say an $http service that calls back to web-server to find out info about
    // the current user if he/she is allowed to get to this component
    // Here we are just simulating it by using the $timeout service

    // function canActivate($timeout){
    //     // returning a promise instead of returning a true/false immediately
    //     return $timeout(function(){
    //         return true;
    //     }, 2000);
    // }

    function controller() {
        var vm = this;
        // next - route one is going to
        // previous - route one is coming from
        vm.$routerOnActivate = function (next, previous) {
            //console.log(next);
            vm.id = next.params.id;
        };
    }
})();