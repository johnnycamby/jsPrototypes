System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', 'rxjs/add/operator/do', 'rxjs/add/operator/catch'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1;
    var ProductService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
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
            ProductService = (function () {
                function ProductService(_http) {
                    this._http = _http;
                    this._productUrl = 'api/products/products.json';
                }
                ProductService.prototype.getProducts = function () {
                    //  Observable take advantage of generics to define the type of data it's observing
                    return this._http.get(this._productUrl).map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All: " + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                ProductService.prototype.getProduct = function (id) {
                    return this.getProducts().map(function (products) { return products.find(function (p) { return p.productId === id; }); });
                };
                ProductService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                ProductService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ProductService);
                return ProductService;
            }());
            exports_1("ProductService", ProductService);
        }
    }
});
//# sourceMappingURL=product.service.js.map