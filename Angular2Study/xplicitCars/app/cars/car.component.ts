
import { Component, Input, OnDestroy, OnInit } from 'angular2/core';
import { CanDeactivate, ComponentInstruction, RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { EntityService, ModalService, ToastService } from '../blocks/blocks';
import {Car, CarService } from '../cars/car.service';


@Component({
    selector: 'xp-car',
    templateUrl: 'app/cars/car.component.html',
    styles: ['.mdl-textfield__label {top: 0;}'],
    directives: [ROUTER_DIRECTIVES]
})
export class CarComponent implements CanDeactivate, OnDestroy, OnInit {

    private _dbResetSubscription: Subscription<any>;

    @Input() car: Car;
    editCar: Car = <Car>{};

    constructor(private _entityService: EntityService,
        private _modalService: ModalService,
        private _routeParams: RouteParams,
        private _router: Router,
        private _toastService: ToastService,
        private _carService: CarService) { }

    cancel(showToast = true) {
        this.editCar = this._entityService.clone(this.car);
        if (showToast) {
            this._toastService.activate(`Cancelled changed to ${this.car.name}`);
        }
    }

    save() {
        let car = this.car = this._entityService.merge(this.car, this.editCar);
        if (car.id == null) {
            this._carService.addCar(car)
                .subscribe(c => {
                    this._setEditCar(c);
                    this._toastService.activate(`Successfully added ${c.name}`);
                    this._gotoCars();
                });
            return;
        }
        this._carService.updateCar(this.car).subscribe(() => this._toastService.activate(`Successfully saved ${this.car.name}`));
    }

    delete() {
        let msg = `Do you really want to delete the ${this.car.name}?`;

        this._modalService.activate(msg).then((responseOk) => {
            if (responseOk) {
                this.cancel(false);
                this._carService.deleteCar(this.car)
                    .subscribe(() => {
                        this._toastService.activate(`Delete ${this.car.name}`);
                        this._gotoCars();
                    },
                    (err) => this._handleServiceError('Delete', err),
                    () => console.log('Delete Completed'));
            }
        });
    }

    isAddMode() {
        let id = +this._routeParams.get('id');
        return isNaN(id);
    }

    ngOnInit() {
        componentHandler.upgradeDom();
        this._getCar();
        this._dbResetSubscription = this._carService.onDbReset.subscribe(() => { this._getCar(); });
    }

    ngOnDestroy() {
        this._dbResetSubscription.unsubscribe();
    }

    routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
        return !this.car || !this._isDirty() || this._modalService.activate();
    }

    private _getCar() {
        let id = +this._routeParams.get('id');

        if (id === 0)
            return;
        if (this.isAddMode()) {
            this.car = <Car>{ name: '', image: '' };
            this.editCar = this._entityService.clone(this.car);
            return;
        }
        this._carService.getCar(id).subscribe((car: Car) => this._setEditCar(car));
    }

    private _setEditCar(car: Car) {
        if (car) {
            this.car = car;
            this.editCar = this._entityService.clone(this.car);
        } else {
            this._gotoCars();
        }
    }

    private _gotoCars() {
        let id = this.car ? this.car.id : null;
        let route = ['Cars', { id: id }];
        this._router.navigate(route);
    }

    private _isDirty() {
        return this._entityService.propertiesDiffer(this.car, this.editCar);
    }

    private _handleServiceError(op: string, err: any) {
        console.error(`${op} error:${err.message || err}`);
    }


}