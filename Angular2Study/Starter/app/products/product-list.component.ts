
import {Component, OnInit} from 'angular2/core'
import {ROUTER_DIRECTIVES} from 'angular2/router'

import {IProduct} from './product'
import {ProductFilterPipe} from './product-filter.pipe'
import {StarComponent} from '../shared/star.component'
import {ProductService} from './product.service';

/*
  --------- Component Lifecycle Hooks -------------------------
  OnInit   : perform component initialization after Angular has initialized the data-bound properties, 
             - good for retrieving data from a backend service
  OnChange : perform any action after Angular sets data-bound input properties 
  OnDestroy: perform any cleanup(s) before Angular destroys the component
*/

@Component({
   // selector: 'xp-products',
    templateUrl:'app/products/product-list.component.html',
    styleUrls:['app/products/product-list.component.css'],
    pipes:[ProductFilterPipe],
    directives:[StarComponent, ROUTER_DIRECTIVES]
})
export class ProductListComponent implements OnInit{

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    displayImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    products: IProduct[];    

    constructor(private _productService: ProductService) {}


    ngOnInit() : void {
        this._productService.getProducts().subscribe(
            products => this.products = products,
            error => this.errorMessage = <any>error );
    }

    toggleImage(): void {
        this.displayImage = !this.displayImage;
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}