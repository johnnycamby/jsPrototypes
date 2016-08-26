System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FilterService;
    return {
        setters:[],
        execute: function() {
            FilterService = (function () {
                function FilterService() {
                }
                FilterService.prototype.filter = function (data, props, originalList) {
                    var filteredList;
                    if (data && props && originalList) {
                        data = data.toLowerCase();
                        var filtered = originalList.filter(function (item) {
                            var match = false;
                            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                                var prop = props_1[_i];
                                if (item[prop].toString().toLowerCase().indexOf(data) > -1) {
                                    match = true;
                                    break;
                                }
                            }
                            return match;
                        });
                        filteredList = filtered;
                    }
                    else {
                        filteredList = originalList;
                    }
                    return filteredList;
                };
                return FilterService;
            }());
            exports_1("FilterService", FilterService);
        }
    }
});
//# sourceMappingURL=filter-text.service.js.map