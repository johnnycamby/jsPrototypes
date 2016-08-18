
(function () {

    'use strict';

    window.app.component('carManufacturer', {
        templateUrl: '/xp-cars/car-manufacturer.component.html',
        controller: controller,
        controllerAs: 'vm'
    });

    function controller() {
        var vm = this;
        vm.name = "This is a manufacture's details...";
    }
})();