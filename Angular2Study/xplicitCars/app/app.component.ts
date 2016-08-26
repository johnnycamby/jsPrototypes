
import { Component, provide } from 'angular2/core';
import { HTTP_PROVIDERS, XHRBackend } from 'angular2/http';
import {  RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import 'rxjs/Rx';

import { InMemoryBackendConfig, InMemoryBackendService, SEED_DATA } from 'a2-in-memory-web-api/core';
import { InMemoryDataService } from '../api/in-memory-data.service';
import { DashboardComponent } from './dashboard/dashboard';
import { CarsComponent, CarService } from './cars/cars';
import { CompaniesComponent, CompanyService } from './companies/companies';
import { CONFIG, MessageService } from './shared/shared';
import { EntityService, ExceptionService, ModalComponent, ModalService, SpinnerComponent, SpinnerService, ToastComponent, ToastService } from './blocks/blocks';


@Component({
    selector: 'xp-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, ModalComponent, SpinnerComponent, ToastComponent],
    providers: [
        HTTP_PROVIDERS,
        provide(XHRBackend, { useClass: InMemoryBackendService }),
        provide(SEED_DATA, { useClass: InMemoryDataService }),
        provide(InMemoryBackendConfig, { useValue: { delay: 600 } }),
        ROUTER_PROVIDERS,
        CompanyService,
        CarService,
        EntityService,
        MessageService,
        ExceptionService,
        ModalService,
        SpinnerService,
        ToastService
        ]
})
@RouteConfig([
    { path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
    { path: '/cars/...', name: 'Cars', component: CarsComponent },
    { path: '/companies/...', name: 'Companies', component: CompaniesComponent }
])
export class AppComponent {

    public menuItems = [
        { caption: 'Dashboard', link: ['Dashboard'] },
        { caption: 'Companies', link: ['Companies'] },
        { caption: 'Cars', link: ['Cars'] }
    ];

    constructor(private _messageService: MessageService, private _modalService: ModalService){}

    resetDb(){

        let msg = 'You really want to reset the database?';
        this._modalService.activate(msg).then(responseOK => {
            if(responseOK){
                this._messageService.resetDb();
            }
        });
    }

}