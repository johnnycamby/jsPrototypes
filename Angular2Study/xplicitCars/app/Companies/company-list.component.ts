
import { Component, OnDestroy, OnInit, ViewChild } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { Observable, Subscription } from 'rxjs/Rx';

import {Company, CompanyService } from './company.service';
import { SortCompaniesPipe } from './sort-companies.pipe';
import { FilterService, FilterTextComponent } from '../blocks/blocks';


@Component({
    selector:'xp-companies',
    templateUrl:'./app/companies/company-list.component.html',
    styleUrls:['./app/companies/company-list.component.css'],
    directives:[FilterTextComponent, ROUTER_DIRECTIVES],
    pipes:[SortCompaniesPipe],
    providers:[FilterService]
})
export class CompanyListComponent implements OnDestroy, OnInit{

    private _dbResetSubscription: Subscription<any>;

    companies: Company[];
    filteredCompanies = this.companies;
    @ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;

    constructor(private _companyService: CompanyService, private _filterService: FilterService){}

    filterChanged(searchText: string){
        this.filteredCompanies = this._filterService.filter(searchText, ['id', 'name','logo'], this.companies );
    }

    getCompanies(){
        this.companies = [];

        this._companyService.getCompanies()
        .subscribe(companies => {
            this.companies = this.filteredCompanies = companies;
            this.filterComponent.clear();
        });
    }


    ngOnInit(){

        componentHandler.upgradeDom();
        this.getCompanies();
        this._dbResetSubscription = this._companyService.onDbReset.subscribe(() => this.getCompanies());
    }

    ngOnDestroy(){
        this._dbResetSubscription.unsubscribe();
    }

}