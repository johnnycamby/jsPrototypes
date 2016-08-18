

(function () {

    'use strict';

    window.app.component('accordion', {
        templateUrl: '/xp-cars/accordion.component.html',
        transclude: true,
        controller: controller        
    });

    function controller() {
        var vm = this;

        var panels = [];

        vm.selectPanel = function (panel) {
            for (var i in panels) {
                if (panel === panels[i]) {
                    panels[i].turnOn();
                } else {
                    panels[i].turnOff();
                }
            }
        };


        vm.addPanel = function (panel) {

            panels.push(panel);

            if (panels.length > 0) {
                panels[0].turnOn();
            }
        }
    }


})();