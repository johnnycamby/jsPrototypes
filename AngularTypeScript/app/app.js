// angular.module("mainApp", []);
var app;
(function (app) {
    angular.module("mainApp", ['ngRoute', 'xplicitServices', 'productResourceMock'])
        .config(routeConfig);
    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider) {
        $routeProvider.when('/productList', {
            templateUrl: '/app/products/views/productListView.html',
            controller: 'ProductListCtrl as vm'
        })
            .when('/productDetail/:productId', {
            templateUrl: '/app/products/views/productDetailView.html',
            controller: 'ProductDetailCtrl as vm'
        })
            .otherwise('/productList');
        ;
    }
})(app || (app = {}));
//# sourceMappingURL=app.js.map