System.register(['angular2/core', 'angular2/router', './company.service', './sort-companies.pipe', '../blocks/blocks'], function(exports_1, context_1) {
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
    var core_1, router_1, company_service_1, sort_companies_pipe_1, blocks_1;
    var CompanyListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (company_service_1_1) {
                company_service_1 = company_service_1_1;
            },
            function (sort_companies_pipe_1_1) {
                sort_companies_pipe_1 = sort_companies_pipe_1_1;
            },
            function (blocks_1_1) {
                blocks_1 = blocks_1_1;
            }],
        execute: function() {
            CompanyListComponent = (function () {
                function CompanyListComponent(_companyService, _filterService) {
                    this._companyService = _companyService;
                    this._filterService = _filterService;
                    this.filteredCompanies = this.companies;
                }
                CompanyListComponent.prototype.filterChanged = function (searchText) {
                    this.filteredCompanies = this._filterService.filter(searchText, ['id', 'name', 'logo'], this.companies);
                };
                CompanyListComponent.prototype.getCompanies = function () {
                    var _this = this;
                    this.companies = [];
                    this._companyService.getCompanies()
                        .subscribe(function (companies) {
                        _this.companies = _this.filteredCompanies = companies;
                        _this.filterComponent.clear();
                    });
                };
                CompanyListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    componentHandler.upgradeDom();
                    this.getCompanies();
                    this._dbResetSubscription = this._companyService.onDbReset.subscribe(function () { return _this.getCompanies(); });
                };
                CompanyListComponent.prototype.ngOnDestroy = function () {
                    this._dbResetSubscription.unsubscribe();
                };
                __decorate([
                    core_1.ViewChild(blocks_1.FilterTextComponent), 
                    __metadata('design:type', blocks_1.FilterTextComponent)
                ], CompanyListComponent.prototype, "filterComponent", void 0);
                CompanyListComponent = __decorate([
                    core_1.Component({
                        selector: 'xp-companies',
                        templateUrl: './app/companies/company-list.component.html',
                        styleUrls: ['./app/companies/company-list.component.css'],
                        directives: [blocks_1.FilterTextComponent, router_1.ROUTER_DIRECTIVES],
                        pipes: [sort_companies_pipe_1.SortCompaniesPipe],
                        providers: [blocks_1.FilterService]
                    }), 
                    __metadata('design:paramtypes', [company_service_1.CompanyService, blocks_1.FilterService])
                ], CompanyListComponent);
                return CompanyListComponent;
            }());
            exports_1("CompanyListComponent", CompanyListComponent);
        }
    }
});
//# sourceMappingURL=company-list.component.js.map