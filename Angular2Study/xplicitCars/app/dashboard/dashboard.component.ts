
import { Component, OnDestroy, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { Company, CompanyService }  from '../companies/companies';
import { ToastService } from '../blocks/blocks';


@Component({
    selector:'xp-dashboard',
    templateUrl:'app/dashboard/dashboard.component.html',
    styleUrls:['app/dashboard/dashboard.component.css']
})
export class DashboardComponent implements  OnDestroy, OnInit{

    private _dbResetSubscription: Subscription<any>;

    companies: Observable<Company[]>;

    constructor(private _companyService: CompanyService, private _router: Router, private _toastService: ToastService){}

    getCompanies(){
        this.companies = this._companyService.getCompanies()
        .catch(e => {
            this._toastService.activate(`${e}`);
            return Observable.of();
        });
    }

    gotoDetail(company: Company){
        let link = ['Companies', 'Company', {id: company.id}];
        this._router.navigate(link);
    }

    ngOnInit(){
        this.getCompanies();
        this._dbResetSubscription = this._companyService.onDbReset.subscribe(() => this.getCompanies());
    }

    ngOnDestroy(){
        this._dbResetSubscription.unsubscribe();
    }



}



