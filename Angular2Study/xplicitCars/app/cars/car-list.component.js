System.register(['angular2/core', 'angular2/router', '../blocks/blocks', './cars'], function(exports_1, context_1) {
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
    var core_1, router_1, blocks_1, cars_1;
    var CarListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (blocks_1_1) {
                blocks_1 = blocks_1_1;
            },
            function (cars_1_1) {
                cars_1 = cars_1_1;
            }],
        execute: function() {
            CarListComponent = (function () {
                function CarListComponent(_filterService, _carService) {
                    this._filterService = _filterService;
                    this._carService = _carService;
                    this.filteredCars = this.cars;
                }
                CarListComponent.prototype.filterChanged = function (searchText) {
                    this.filteredCars = this._filterService.filter(searchText, ['id', 'name'], this.cars);
                };
                CarListComponent.prototype.getCars = function () {
                    var _this = this;
                    this.cars = [];
                    this._carService.getCars().subscribe(function (cars) {
                        _this.cars = _this.filteredCars = cars;
                        _this.filterComponent.clear();
                    });
                };
                CarListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    componentHandler.upgradeDom();
                    this.getCars();
                    this._dbResetSubscription = this._carService.onDbReset.subscribe(function () { return _this.getCars(); });
                };
                CarListComponent.prototype.ngOnDestroy = function () {
                    this._dbResetSubscription.unsubscribe();
                };
                __decorate([
                    core_1.ViewChild(blocks_1.FilterTextComponent), 
                    __metadata('design:type', blocks_1.FilterTextComponent)
                ], CarListComponent.prototype, "filterComponent", void 0);
                CarListComponent = __decorate([
                    core_1.Component({
                        selector: 'xp-cars',
                        templateUrl: './app/cars/car-list.component.html',
                        directives: [blocks_1.FilterTextComponent, router_1.ROUTER_DIRECTIVES],
                        styleUrls: ['./app/cars/car-list.component.css'],
                        pipes: [blocks_1.InitCapsPipe],
                        providers: [blocks_1.FilterService]
                    }), 
                    __metadata('design:paramtypes', [blocks_1.FilterService, cars_1.CarService])
                ], CarListComponent);
                return CarListComponent;
            }());
            exports_1("CarListComponent", CarListComponent);
        }
    }
});
//# sourceMappingURL=car-list.component.js.map