
import {Pipe, PipeTransform} from 'angular2/core';
import {Company} from './company.service';


@Pipe({ name: 'sortCompanies' })
export class SortCompaniesPipe implements PipeTransform {

    transform(value: Company[], args: any[]) {

        if (!value || !value.sort) {
            return value;
        }

        return value.sort((a: Company, b: Company) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    }
}