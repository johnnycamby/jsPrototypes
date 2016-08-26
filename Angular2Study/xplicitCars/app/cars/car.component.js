System.register(['angular2/core', 'angular2/router', '../blocks/blocks', '../cars/car.service'], function(exports_1, context_1) {
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
    var core_1, router_1, blocks_1, car_service_1;
    var CarComponent;
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
            function (car_service_1_1) {
                car_service_1 = car_service_1_1;
            }],
        execute: function() {
            CarComponent = (function () {
                function CarComponent(_entityService, _modalService, _routeParams, _router, _toastService, _carService) {
                    this._entityService = _entityService;
                    this._modalService = _modalService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._toastService = _toastService;
                    this._carService = _carService;
                    this.editCar = {};
                }
                CarComponent.prototype.cancel = function (showToast) {
                    if (showToast === void 0) { showToast = true; }
                    this.editCar = this._entityService.clone(this.car);
                    if (showToast) {
                        this._toastService.activate("Cancelled changed to " + this.car.name);
                    }
                };
                CarComponent.prototype.save = function () {
                    var _this = this;
                    var car = this.car = this._entityService.merge(this.car, this.editCar);
                    if (car.id == null) {
                        this._carService.addCar(car)
                            .subscribe(function (c) {
                            _this._setEditCar(c);
                            _this._toastService.activate("Successfully added " + c.name);
                            _this._gotoCars();
                        });
                        return;
                    }
                    this._carService.updateCar(this.car).subscribe(function () { return _this._toastService.activate("Successfully saved " + _this.car.name); });
                };
                CarComponent.prototype.delete = function () {
                    var _this = this;
                    var msg = "Do you really want to delete the " + this.car.name + "?";
                    this._modalService.activate(msg).then(function (responseOk) {
                        if (responseOk) {
                            _this.cancel(false);
                            _this._carService.deleteCar(_this.car)
                                .subscribe(function () {
                                _this._toastService.activate("Delete " + _this.car.name);
                                _this._gotoCars();
                            }, function (err) { return _this._handleServiceError('Delete', err); }, function () { return console.log('Delete Completed'); });
                        }
                    });
                };
                CarComponent.prototype.isAddMode = function () {
                    var id = +this._routeParams.get('id');
                    return isNaN(id);
                };
                CarComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    componentHandler.upgradeDom();
                    this._getCar();
                    this._dbResetSubscription = this._carService.onDbReset.subscribe(function () { _this._getCar(); });
                };
                CarComponent.prototype.ngOnDestroy = function () {
                    this._dbResetSubscription.unsubscribe();
                };
                CarComponent.prototype.routerCanDeactivate = function (next, prev) {
                    return !this.car || !this._isDirty() || this._modalService.activate();
                };
                CarComponent.prototype._getCar = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    if (id === 0)
                        return;
                    if (this.isAddMode()) {
                        this.car = { name: '', image: '' };
                        this.editCar = this._entityService.clone(this.car);
                        return;
                    }
                    this._carService.getCar(id).subscribe(function (car) { return _this._setEditCar(car); });
                };
                CarComponent.prototype._setEditCar = function (car) {
                    if (car) {
                        this.car = car;
                        this.editCar = this._entityService.clone(this.car);
                    }
                    else {
                        this._gotoCars();
                    }
                };
                CarComponent.prototype._gotoCars = function () {
                    var id = this.car ? this.car.id : null;
                    var route = ['Cars', { id: id }];
                    this._router.navigate(route);
                };
                CarComponent.prototype._isDirty = function () {
                    return this._entityService.propertiesDiffer(this.car, this.editCar);
                };
                CarComponent.prototype._handleServiceError = function (op, err) {
                    console.error(op + " error:" + (err.message || err));
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], CarComponent.prototype, "car", void 0);
                CarComponent = __decorate([
                    core_1.Component({
                        selector: 'xp-car',
                        templateUrl: 'app/cars/car.component.html',
                        styles: ['.mdl-textfield__label {top: 0;}'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [blocks_1.EntityService, blocks_1.ModalService, router_1.RouteParams, router_1.Router, blocks_1.ToastService, car_service_1.CarService])
                ], CarComponent);
                return CarComponent;
            }());
            exports_1("CarComponent", CarComponent);
        }
    }
});
//# sourceMappingURL=car.component.js.map