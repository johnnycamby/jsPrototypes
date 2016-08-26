

import { Component, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { CarListComponent, CarComponent, CarService } from './cars';


@Component({
    selector: 'xp-cars-root',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [CarService]
})
@RouteConfig([
    { path: '/', name: 'Cars', component: CarListComponent, useAsDefault: true },
    { path: '/list/:id', name: 'Cars', component: CarListComponent },
    { path: '/:id', name: 'Car', component: CarComponent }
])
export class CarsComponent { }