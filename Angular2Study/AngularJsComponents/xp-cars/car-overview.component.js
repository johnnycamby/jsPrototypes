

(function () {

    'use strict';

    window.app.component('carOverview', {
        templateUrl: '/xp-cars/car-overview.component.html',
        controller: controller,
        controllerAs: 'vm'
    });

    function controller() {
        var vm = this;
        vm.name = 'This is a car overview...';
    }
})();