
(function(){

    'use strict';

    window.app.component('accordionPanel',{
        templateUrl: '/xp-cars/accordion-panel.component.html',
        bindings:{
            heading:'@' // attribute nmemonic binding
        },
        require: { // way to again access to the parent controller
            "parent": "^accordion"
        },
        controller: controller,
        controllerAs:'vm',
        transclude:true
    });

    function controller(){

        var vm = this;
        vm.selected = false;

        vm.$onInit = function(){
            vm.parent.addPanel(vm);
        };

        vm.turnOn = function(){
            vm.selected = true;
        }

        vm.turnOff = function(){
            vm.selected = false;
        }

        vm.select = function(){
            vm.parent.selectPanel(vm);
        }
    }

})();