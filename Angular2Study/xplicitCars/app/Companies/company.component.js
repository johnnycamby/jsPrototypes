System.register(['angular2/core', 'angular2/router', '../blocks/blocks', './company.service'], function(exports_1, context_1) {
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
    var core_1, router_1, blocks_1, company_service_1;
    var CompanyComponent;
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
            function (company_service_1_1) {
                company_service_1 = company_service_1_1;
            }],
        execute: function() {
            CompanyComponent = (function () {
                function CompanyComponent(_companyService, _entityService, _modalService, _routeParams, _route, _toastService) {
                    this._companyService = _companyService;
                    this._entityService = _entityService;
                    this._modalService = _modalService;
                    this._routeParams = _routeParams;
                    this._route = _route;
                    this._toastService = _toastService;
                    this.editCompany = {};
                }
                CompanyComponent.prototype.cancel = function (showToast) {
                    if (showToast === void 0) { showToast = true; }
                    this.editCompany = this._entityService.clone(this.company);
                    if (showToast) {
                        this._toastService.activate("Cancelled changes to " + this.company.name);
                    }
                };
                CompanyComponent.prototype.delete = function () {
                    var _this = this;
                    var msg = "Do you want to delete " + this.company.name + "?";
                    this._modalService.activate(msg).then(function (responseOk) {
                        if (responseOk) {
                            _this.cancel(false);
                            _this._companyService.deleteCompany(_this.company)
                                .subscribe(function () {
                                _this._toastService.activate("Delete " + _this.company.name);
                                _this._gotoCompanies();
                            });
                        }
                    });
                };
                CompanyComponent.prototype.isAddMode = function () {
                    var id = +this._routeParams.get('id');
                    return isNaN(id);
                };
                CompanyComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    componentHandler.upgradeDom();
                    this._getCompany();
                    this._dbResetSubscription = this._companyService.onDbReset.subscribe(function () { return _this._getCompany(); });
                };
                CompanyComponent.prototype.ngOnDestroy = function () {
                    this._dbResetSubscription.unsubscribe();
                };
                CompanyComponent.prototype.routerCanDeactivate = function (next, prev) {
                    return !this.company || !this._isDirty() || this._modalService.activate();
                };
                CompanyComponent.prototype.save = function () {
                    var _this = this;
                    var company = this.company = this._entityService.merge(this.company, this.editCompany);
                    if (company.id == null) {
                        this._companyService.addCompany(company)
                            .subscribe(function (char) {
                            _this._setEditCompany(char);
                            _this._toastService.activate("Successfully added " + char.name);
                            _this._gotoCompanies();
                        });
                        return;
                    }
                    this._companyService.updateCompany(company)
                        .subscribe(function () { return _this._toastService.activate("Successfully saved " + company.name); });
                };
                CompanyComponent.prototype._setEditCompany = function (company) {
                    if (company) {
                        this.company = company;
                        this.editCompany = this._entityService.clone(this.company);
                    }
                    else {
                        this._gotoCompanies();
                    }
                };
                CompanyComponent.prototype._getCompany = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    if (id === 0)
                        return;
                    if (this.isAddMode()) {
                        this.company = { name: '', overview: 'demo' };
                        this.editCompany = this._entityService.clone(this.company);
                        return;
                    }
                    this._companyService.getCompany(id).subscribe(function (company) { return _this._setEditCompany(company); });
                };
                CompanyComponent.prototype._gotoCompanies = function () {
                    var id = this.company ? this.company.id : null;
                    var route = ['Companies', { id: id }];
                    this._route.navigate(route);
                };
                CompanyComponent.prototype._handleServiceError = function (op, err) {
                    console.error(op + " error: " + (err.message || err));
                };
                CompanyComponent.prototype._isDirty = function () {
                    return this._entityService.propertiesDiffer(this.company, this.editCompany);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], CompanyComponent.prototype, "company", void 0);
                CompanyComponent = __decorate([
                    core_1.Component({
                        selector: 'xp-company',
                        templateUrl: 'app/companies/company.component.html',
                        styles: ['.mdl-textfield__label {top: 0;} #btn-save{background:maroon} #sidetext{width: 100%} #detail-img{width:80px; height:60px;}'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [company_service_1.CompanyService, blocks_1.EntityService, blocks_1.ModalService, router_1.RouteParams, router_1.Router, blocks_1.ToastService])
                ], CompanyComponent);
                return CompanyComponent;
            }());
            exports_1("CompanyComponent", CompanyComponent);
        }
    }
});
//# sourceMappingURL=company.component.js.map