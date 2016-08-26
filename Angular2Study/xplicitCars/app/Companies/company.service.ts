
import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';

import { ExceptionService, SpinnerService } from '../blocks/blocks';
import { CONFIG, MessageService } from '../shared/shared';

let companiesUrl = CONFIG.baseUrls.companies;

export interface Company {
    id: number;
    name: string;
    overview: string;
    logo: string;
}

@Injectable()
export class CompanyService {

    constructor(private _http: Http,
        private _exceptionService: ExceptionService,
        private _messageService: MessageService,
        private _spinnerService: SpinnerService) {
        this._messageService.state.subscribe(state => this.getCompanies());
    }

    getCompanies() {
        this._spinnerService.show();
        return this._http.get(companiesUrl)
            .map((response: Response) => <Company[]>response.json().data)
           // .do(data => console.log(data))
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

    getCompany(id: number) {
        this._spinnerService.show();

        return this._http.get(`${companiesUrl}/${id}`)
            .map((response: Response) => response.json().data)
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

    addCompany(company: Company) {

        let body = JSON.stringify(company);
        this._spinnerService.show();

        return this._http
            .post(`${companiesUrl}`, body)
            .map(res => res.json().data)
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

    deleteCompany(company: Company) {
        this._spinnerService.show();

        return this._http.delete(`${companiesUrl}/${company.id}`)
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

    onDbReset = this._messageService.state;

    updateCompany(company: Company) {
        let body = JSON.stringify(company);
        this._spinnerService.show();

        return this._http.put(`${companiesUrl}/${company.id}`, body)
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }



}