

// angular.module("mainApp", []);
module app {
    angular.module("mainApp", ['ngRoute', 'xplicitServices', 'productResourceMock'])
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider: ng.route.IRouteProvider): void {

        $routeProvider.when('/productList',
            {
                templateUrl: '/app/products/views/productListView.html',
                controller: 'ProductListCtrl as vm'
            })
            .when('/productDetail/:productId',
            {
                templateUrl: '/app/products/views/productDetailView.html',
                controller: 'ProductDetailCtrl as vm'
            })
            .otherwise('/productList');
        ;
    }
}

