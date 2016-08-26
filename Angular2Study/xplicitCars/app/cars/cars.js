System.register(['./car.component', './car.service', './car-list.component', './cars.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (car_component_1_1) {
                exportStar_1(car_component_1_1);
            },
            function (car_service_1_1) {
                exportStar_1(car_service_1_1);
            },
            function (car_list_component_1_1) {
                exportStar_1(car_list_component_1_1);
            },
            function (cars_component_1_1) {
                exportStar_1(cars_component_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=cars.js.map