System.register(['angular2/core', 'angular2/router', 'rxjs/Rx', '../companies/companies', '../blocks/blocks'], function(exports_1, context_1) {
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
    var core_1, router_1, Rx_1, companies_1, blocks_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (companies_1_1) {
                companies_1 = companies_1_1;
            },
            function (blocks_1_1) {
                blocks_1 = blocks_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(_companyService, _router, _toastService) {
                    this._companyService = _companyService;
                    this._router = _router;
                    this._toastService = _toastService;
                }
                DashboardComponent.prototype.getCompanies = function () {
                    var _this = this;
                    this.companies = this._companyService.getCompanies()
                        .catch(function (e) {
                        _this._toastService.activate("" + e);
                        return Rx_1.Observable.of();
                    });
                };
                DashboardComponent.prototype.gotoDetail = function (company) {
                    var link = ['Companies', 'Company', { id: company.id }];
                    this._router.navigate(link);
                };
                DashboardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.getCompanies();
                    this._dbResetSubscription = this._companyService.onDbReset.subscribe(function () { return _this.getCompanies(); });
                };
                DashboardComponent.prototype.ngOnDestroy = function () {
                    this._dbResetSubscription.unsubscribe();
                };
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'xp-dashboard',
                        templateUrl: 'app/dashboard/dashboard.component.html',
                        styleUrls: ['app/dashboard/dashboard.component.css']
                    }), 
                    __metadata('design:paramtypes', [companies_1.CompanyService, router_1.Router, blocks_1.ToastService])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
//# sourceMappingURL=dashboard.component.js.map