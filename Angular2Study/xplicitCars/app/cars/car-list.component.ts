
import { Component, OnDestroy, OnInit, ViewChild } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { FilterTextComponent, FilterService, InitCapsPipe } from '../blocks/blocks';
import {Car, CarService } from './cars';

@Component({
    selector:'xp-cars',
    templateUrl:'./app/cars/car-list.component.html',
    directives:[FilterTextComponent, ROUTER_DIRECTIVES],
    styleUrls:['./app/cars/car-list.component.css'],
    pipes:[InitCapsPipe],
    providers:[FilterService]
})
export class CarListComponent implements OnDestroy , OnInit {

    private _dbResetSubscription: Subscription<any>;

    cars: Car[];
    filteredCars = this.cars;
    @ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;

    constructor(private _filterService: FilterService, private _carService: CarService){}

    filterChanged(searchText: string){
        this.filteredCars = this._filterService.filter(searchText, ['id', 'name'], this.cars);
    }

    getCars(){
        this.cars = [];
        this._carService.getCars().subscribe(cars => {
            this.cars = this.filteredCars = cars;
            this.filterComponent.clear();
        });
    }


    ngOnInit(){
        componentHandler.upgradeDom();
        this.getCars();
        this._dbResetSubscription = this._carService.onDbReset.subscribe(() => this.getCars());
    }

    ngOnDestroy(){
        this._dbResetSubscription.unsubscribe();
    }
}