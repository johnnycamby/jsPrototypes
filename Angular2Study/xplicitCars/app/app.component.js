System.register(['angular2/core', 'angular2/http', 'angular2/router', 'rxjs/Rx', 'a2-in-memory-web-api/core', '../api/in-memory-data.service', './dashboard/dashboard', './cars/cars', './companies/companies', './shared/shared', './blocks/blocks'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, core_2, in_memory_data_service_1, dashboard_1, cars_1, companies_1, shared_1, blocks_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {},
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (in_memory_data_service_1_1) {
                in_memory_data_service_1 = in_memory_data_service_1_1;
            },
            function (dashboard_1_1) {
                dashboard_1 = dashboard_1_1;
            },
            function (cars_1_1) {
                cars_1 = cars_1_1;
            },
            function (companies_1_1) {
                companies_1 = companies_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            },
            function (blocks_1_1) {
                blocks_1 = blocks_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_messageService, _modalService) {
                    this._messageService = _messageService;
                    this._modalService = _modalService;
                    this.menuItems = [
                        { caption: 'Dashboard', link: ['Dashboard'] },
                        { caption: 'Companies', link: ['Companies'] },
                        { caption: 'Cars', link: ['Cars'] }
                    ];
                }
                AppComponent.prototype.resetDb = function () {
                    var _this = this;
                    var msg = 'You really want to reset the database?';
                    this._modalService.activate(msg).then(function (responseOK) {
                        if (responseOK) {
                            _this._messageService.resetDb();
                        }
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'xp-app',
                        templateUrl: 'app/app.component.html',
                        styleUrls: ['app/app.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, blocks_1.ModalComponent, blocks_1.SpinnerComponent, blocks_1.ToastComponent],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            core_1.provide(http_1.XHRBackend, { useClass: core_2.InMemoryBackendService }),
                            core_1.provide(core_2.SEED_DATA, { useClass: in_memory_data_service_1.InMemoryDataService }),
                            core_1.provide(core_2.InMemoryBackendConfig, { useValue: { delay: 600 } }),
                            router_1.ROUTER_PROVIDERS,
                            companies_1.CompanyService,
                            cars_1.CarService,
                            blocks_1.EntityService,
                            shared_1.MessageService,
                            blocks_1.ExceptionService,
                            blocks_1.ModalService,
                            blocks_1.SpinnerService,
                            blocks_1.ToastService
                        ]
                    }),
                    router_1.RouteConfig([
                        { path: '/dashboard', name: 'Dashboard', component: dashboard_1.DashboardComponent, useAsDefault: true },
                        { path: '/cars/...', name: 'Cars', component: cars_1.CarsComponent },
                        { path: '/companies/...', name: 'Companies', component: companies_1.CompaniesComponent }
                    ]), 
                    __metadata('design:paramtypes', [shared_1.MessageService, blocks_1.ModalService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map