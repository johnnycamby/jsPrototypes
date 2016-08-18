

(function(){

    'use strict';

    window.app.component('carsList', {
        templateUrl:'/xp-cars/cars-list.component.html',
        controllerAs: 'vm',
        controller: controller,
        bindings:{
            "$router":"<"
        }
    });


   controller.$inject = ['$http'];

    function controller($http){

        var vm = this;
        vm.cars = [];

        vm.$onInit = function(){
            fetchCars($http).then(function(cars){
                vm.cars = cars;
            });
        }

        vm.goTo = function(id){
            // vm.$router.navigate(['Details', {id:id}]);
             vm.$router.navigate(['Details', {id:id}, 'Overview']);
        };

        vm.setRating = function(car, newRating){
            car.rating = newRating;
        }

        vm.upRating = function(car){

            if(car.rating < 5){
                car.rating += 1;
            }
        }

        vm.downRating = function(car){

             if(car.rating > 1){
                car.rating -= 1;
            }
        }
    }

    function fetchCars($http){

        return $http.get('./data/cars.json').then(function(response){
            return response.data;
        });
    }
})();