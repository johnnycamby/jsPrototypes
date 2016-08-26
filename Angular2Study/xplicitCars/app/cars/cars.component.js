System.register(['angular2/core', 'angular2/router', './cars'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, cars_1;
    var CarsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (cars_1_1) {
                cars_1 = cars_1_1;
            }],
        execute: function() {
            CarsComponent = (function () {
                function CarsComponent() {
                }
                CarsComponent = __decorate([
                    core_1.Component({
                        selector: 'xp-cars-root',
                        template: "<router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [cars_1.CarService]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Cars', component: cars_1.CarListComponent, useAsDefault: true },
                        { path: '/list/:id', name: 'Cars', component: cars_1.CarListComponent },
                        { path: '/:id', name: 'Car', component: cars_1.CarComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], CarsComponent);
                return CarsComponent;
            }());
            exports_1("CarsComponent", CarsComponent);
        }
    }
});
//# sourceMappingURL=cars.component.js.map