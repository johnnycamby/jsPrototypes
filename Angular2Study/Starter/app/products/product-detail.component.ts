
import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { StarComponent } from '../shared/star.component';

@Component({
    templateUrl:'app/products/product-detail.component.html',
    directives:[StarComponent]
})
export class ProductDetailComponent {

    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;
   
    constructor(private _routerParams: RouteParams, 
                private _router: Router, 
                private _productService: ProductService){}

    ngOnInit(): void {
        let id = +this._routerParams.get('id');
       // this.pageTitle += `: ${id}`;
       this.getProduct(id);
    }   

    getProduct(id: number) {
        this._productService.getProduct(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }

    onBack() : void{
        this._router.navigate(['Products']);
    }

     onRatingClicked(message: string): void {
        this.pageTitle = 'Product Detail: ' + message;
    }

}

