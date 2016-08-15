


(function () {

    'use strict';

    window.app.filter('groupby', function () {
        return function (items, group) {
            return items.filter(function (element, index, array) {
                return element.searchValue == group;
            });
        }
    });

    window.app.controller('designListCtrl', designListCtrl);

    designListCtrl.$inject = ['designService'];



    function designListCtrl(designService) {

        var vm = this;
        vm.searchDesign = '';
        
        vm.designs = designService.designsData;
       
        vm.count = 0;      
     
        var hasLiked = false;       
        vm.voteData = [];
        vm.searchData = [];
              
        vm.doVoting = function () {            

            vm.searchValue = document.getElementById('txtSearch').value;

            if (!hasLiked) {
                hasLiked = true;
                vm.count++;
               
                vm.voteData.push({
                    count: vm.count,
                    searchValue: vm.searchValue
                });
                
            } else {
                hasLiked = false;
                vm.count--;
               
                vm.voteData.push({
                    count: vm.count,
                    searchValue: vm.searchValue
                });
            }

            //var groupData = _.groupBy(vm.voteData, 'searchValue');                      

            //console.log(groupData);

            var search = 0;
            var count = vm.voteData.reduce(function (prevVal, elem) {
                
                return prevVal + elem.count;
            },0);
            
          
            vm.dislike = count;
            vm.like = vm.voteData.length - count;           
            vm.totalVotes = vm.voteData.length;

            vm.searchData.push({

                searchValue: vm.searchValue,
                like: vm.like,
                dislike: vm.dislike,
                totalVotes: vm.totalVotes
            });          
        };

        vm.getGroups = function () {
            var groupArray = [];

            angular.forEach(vm.searchData, function (item, idx) {
                if (groupArray.indexOf(item.searchValue) == -1) {
                    groupArray.push(item.searchValue);                   
                }
                
            });

            console.log(groupArray);

           return groupArray.sort();
        }

    }
})();