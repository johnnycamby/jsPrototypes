
import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { CompanyComponent } from './company.component';
import { CompanyListComponent }from './company-list.component';


@Component({
    selector:'xp-companies',
    template:`<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path:'/', name:'Companies', component: CompanyListComponent, useAsDefault: true },
    {path:'/list/:id', name:'Companies', component: CompanyListComponent },
    {path:'/:id', name:'Company', component: CompanyComponent}
])
export class CompaniesComponent{}