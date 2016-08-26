System.register(['./companies.component', './company.component', './company-list.component', './company.service', './sort-company.pipe'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (companies_component_1_1) {
                exportStar_1(companies_component_1_1);
            },
            function (company_component_1_1) {
                exportStar_1(company_component_1_1);
            },
            function (company_list_component_1_1) {
                exportStar_1(company_list_component_1_1);
            },
            function (company_service_1_1) {
                exportStar_1(company_service_1_1);
            },
            function (sort_company_pipe_1_1) {
                exportStar_1(sort_company_pipe_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=companies.js.map