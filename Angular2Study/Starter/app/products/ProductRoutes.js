System.register(['./product-list.component', './product-detail.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var product_list_component_1, product_detail_component_1;
    var ProductRoutes;
    return {
        setters:[
            function (product_list_component_1_1) {
                product_list_component_1 = product_list_component_1_1;
            },
            function (product_detail_component_1_1) {
                product_detail_component_1 = product_detail_component_1_1;
            }],
        execute: function() {
            exports_1("ProductRoutes", ProductRoutes = [
                { path: 'products', component: product_list_component_1.ProductListComponent },
                { path: 'product/:id', component: product_detail_component_1.ProductDetailComponent }
            ]);
        }
    }
});
//# sourceMappingURL=ProductRoutes.js.map