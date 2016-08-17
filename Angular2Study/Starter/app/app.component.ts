
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx'; // Load all features
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router'

import {ProductListComponent} from './products/product-list.component';
import {WelcomeComponent} from './home/welcome.component';
import {ProductService} from './products/product.service';
import {ProductDetailComponent} from './products/product-detail.component';

@Component({
    // this is a directive
    // only required if a component l'l be nested in another component
    selector: 'xp-app', 
    template: `
    <div>
       <nav class="navbar navbar-default">
         <div class='container-fluid'>
           <a class='navbar-brand'>{{pageTitle}}</a>
           <ul class='nav navbar-nav'>
              <li><a [routerLink]="['Welcome']">Home</a></li>
              <li><a [routerLink]="['Products']">Product List</a></li>
           </ul>
         </div>
       </nav>
       <div>
         <router-outlet></router-outlet>
       </div>
    <div>
    `,
    directives: [ROUTER_DIRECTIVES],
    // this service l'l be shared throughout the application thus use root component to register the service'
     providers: [ProductService, HTTP_PROVIDERS, ROUTER_PROVIDERS]
})
@RouteConfig([
    {path: '/welcome', name: 'Welcome', component: WelcomeComponent, useAsDefault: true},
    {path: '/products', name: 'Products', component: ProductListComponent},
    {path: '/product/:id', name: 'ProductDetail', component: ProductDetailComponent}
])
export class AppComponent{
    pageTitle: string = 'Xplicit Homer Manager ::-';
}