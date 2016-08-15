
(function () {

    'use strict';

    window.app.factory('designService', designService);

    designService.$inject = ['$http'];

    function designService($http) {

        var designsData = [];
        loadData();

        var svc = {
            designsData: designsData,
            voteDesign: voteDesign
        };

        return svc;

        function loadData() {
            $http.get('http://api.spreadshirt.net/api/v1/shops/205909/designs',
                {
                    transformResponse: function (cnv) {
                        var x2Json = new X2JS();
                        var aftCnv = x2Json.xml_str2json(cnv);
                        return aftCnv;
                    }
                })
                .success(function (data) {
                    angular.forEach(data, function (item) {
                        designsData.addRange(item.design);                        
                    });
                });
        }

        function voteDesign(){}

        
    }
})();


