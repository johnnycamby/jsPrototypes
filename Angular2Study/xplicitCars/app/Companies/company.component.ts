
import { Component, Input, OnDestroy, OnInit } from 'angular2/core';
import { CanDeactivate, ComponentInstruction, RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { EntityService, ModalService, ToastService } from '../blocks/blocks';
import { Company, CompanyService } from './company.service';

@Component({
    selector: 'xp-company',
    templateUrl: 'app/companies/company.component.html',
    styles: ['.mdl-textfield__label {top: 0;} #btn-save{background:maroon} #sidetext{width: 100%} #detail-img{width:80px; height:60px;}' ],
    directives: [ROUTER_DIRECTIVES]
})
export class CompanyComponent implements OnDestroy, OnInit {

    private _dbResetSubscription: Subscription<any>;

    @Input() company: Company;
    editCompany: Company = <Company>{};

    constructor(private _companyService: CompanyService,
        private _entityService: EntityService,
        private _modalService: ModalService,
        private _routeParams: RouteParams,
        private _route: Router,
        private _toastService: ToastService) { }

    cancel(showToast = true) {
        this.editCompany = this._entityService.clone(this.company);

        if (showToast) {
            this._toastService.activate(`Cancelled changes to ${this.company.name}`);
        }
    }

    delete() {
        let msg = `Do you want to delete ${this.company.name}?`;

        this._modalService.activate(msg).then(responseOk => {
            if (responseOk) {
                this.cancel(false);
                this._companyService.deleteCompany(this.company)
                    .subscribe(() => {
                        this._toastService.activate(`Delete ${this.company.name}`);
                        this._gotoCompanies();
                    });
            }
        });
    }

    isAddMode() {
        let id = +this._routeParams.get('id');
        return isNaN(id);
    }

    ngOnInit() {

        componentHandler.upgradeDom();
        this._getCompany();
        this._dbResetSubscription = this._companyService.onDbReset.subscribe(() => this._getCompany());
    }

    ngOnDestroy() {
        this._dbResetSubscription.unsubscribe();
    }

    routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
        return !this.company || !this._isDirty() || this._modalService.activate();
    }

    save() {

        let company = this.company = this._entityService.merge(this.company, this.editCompany);

        if (company.id == null) {
            this._companyService.addCompany(company)
                .subscribe(char => {
                    this._setEditCompany(char);
                    this._toastService.activate(`Successfully added ${char.name}`);
                    this._gotoCompanies();
                });
            return;
        }
        this._companyService.updateCompany(company)
            .subscribe(() => this._toastService.activate(`Successfully saved ${company.name}`));
    }

    private _setEditCompany(company: Company) {
        if (company) {
            this.company = company;
            this.editCompany = this._entityService.clone(this.company);
        } else {
            this._gotoCompanies();
        }
    }

    private _getCompany() {

        let id = +this._routeParams.get('id');

        if (id === 0)
            return;
        if (this.isAddMode()) {
            this.company = <Company>{ name: '', overview: 'demo' };
            this.editCompany = this._entityService.clone(this.company);
            return;
        }

        this._companyService.getCompany(id).subscribe(company => this._setEditCompany(company));
    }

    private _gotoCompanies() {
        let id = this.company ? this.company.id : null;
        let route = ['Companies', { id: id }];
        this._route.navigate(route);
    }

    private _handleServiceError(op: string, err: any) {
        console.error(`${op} error: ${err.message || err}`)
    }

    private _isDirty() {
        return this._entityService.propertiesDiffer(this.company, this.editCompany);
    }

}