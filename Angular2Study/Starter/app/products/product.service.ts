
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {IProduct} from './product';

/*
  ----------- Observables and Reactive Extensions ----------------------------------
   Observable 
   - is an array whose items arrive asynchronously over time
   - help manage asynchronous data, E.g data from a backend service
   - proposed feature for ES 2016
   - are in the angular2's event-system and http-client service
   - method(s) register to an Observable to receive an asynchronous notification as new data arrives,
     the method is notified incase of no data or occurrance of an error
   - it works like an array thus one can use a 'map()'  operator to transform the incoming data.

   --- difference btn Promise & Observable ----
   Promise                                   Observable
   - returns a single value                  - works with multiple values over time
   - not cancellable                         - is cancellable
                                             - supports map, filter, reduce and similar operators

   Reactive Extensions
   - angular2 uses a 3rd party library called Reactive Extensions(RxJS) to use Observable.
   - represent a data sequence as an Observable sequence
*/

@Injectable()
export class ProductService{

    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http){}

    getProducts(): Observable<IProduct[]>{

        //  Observable take advantage of generics to define the type of data it's observing
        return this._http.get(this._productUrl).map((response: Response) => <IProduct[]> response.json())
        .do(data => console.log("All: " + JSON.stringify(data)))
        .catch(this.handleError);
    }

    getProduct(id: number): Observable<IProduct>{
        return this.getProducts().map((products: IProduct[]) => products.find(p => p.productId === id));
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}