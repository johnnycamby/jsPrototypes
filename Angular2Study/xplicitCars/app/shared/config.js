System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CONFIG;
    return {
        setters:[],
        execute: function() {
            exports_1("CONFIG", CONFIG = {
                baseUrls: {
                    config: 'command/config',
                    resetDb: 'command/resetDb',
                    companies: 'api/companies.json',
                    cars: 'api/cars.json'
                }
            });
        }
    }
});
//# sourceMappingURL=config.js.map