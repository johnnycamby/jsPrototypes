
import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';

import { ExceptionService, SpinnerService } from '../blocks/blocks';
import { CONFIG, MessageService } from '../shared/shared';


let carsUrl = CONFIG.baseUrls.cars;

export interface Car{
    id:number;
    name:string;
    rating:number;
    image:string;
}

@Injectable()
export class CarService{

    constructor(private _http: Http,
    private _exceptionService: ExceptionService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService){

        this._messageService.state.subscribe(state => this.getCars());
    }

    getCars(){
        this._spinnerService.show();
        return this._http.get(carsUrl)
        .map((response: Response) => response.json().data)
        .catch(this._exceptionService.catchBadResponse)
        .finally(() => this._spinnerService.hide());
    }

    getCar(id:number){
        this._spinnerService.show();
        return this._http.get(`${carsUrl}/${id}`)
        .map((response: Response) => response.json().data)
        .catch(this._exceptionService.catchBadResponse)
        .finally(() => this._spinnerService.hide());
    }

    addCar(car: Car){
        let body = JSON.stringify(car);
        this._spinnerService.show();
        return this._http
        .post(`${carsUrl}`, body)
        .map(res => res.json().data)
        .catch(this._exceptionService.catchBadResponse)
        .finally(() => this._spinnerService.hide());
    }

    deleteCar(car:Car){
        this._spinnerService.show();
        return this._http
        .delete(`${carsUrl}/${car.id}`)
        .catch(this._exceptionService.catchBadResponse)
        .finally(() => this._spinnerService.hide());
    }

    onDbReset = this._messageService.state;

    updateCar(car: Car){
        let body = JSON.stringify(car);
        this._spinnerService.show();
        return this._http
        .put(`${carsUrl}/${car.id}`, body)
        .catch(this._exceptionService.catchBadResponse)
        .finally(() => this._spinnerService.hide());
    }
}