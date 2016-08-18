

(function () {

    'use strict';

    function buildEntries(value, max) {
        var entries = [];

        for (var i = 1; i <= max; i++) {
            var icon = i <= value ? 'glyphicon-star' : 'glyphicon-star-empty';
            entries.push(icon);
        }

        return entries;
    }

    window.app.component('carRating', {
        templateUrl: '/xp-cars/car-rating.component.html',
        bindings: {
            value: '<', // input-bindings mnemonics
            max: "<",
            setRating:'&' // raise an event mnemonics
        },
        //transclude: true,
        controllerAs: 'vm',
        controller: controller
    });

    function controller() {
        var vm = this;

        vm.$onInit = function () {
            vm.entries = buildEntries(vm.value, vm.max);
        };

        vm.$onChanges = function () {
            vm.entries = buildEntries(vm.value, vm.max);
        }
    }
})();