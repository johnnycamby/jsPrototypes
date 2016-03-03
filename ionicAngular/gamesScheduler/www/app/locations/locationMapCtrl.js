/**
 * Created by johnny on 3/4/2015.
 */

(function(app) {

    'use strict';


    function locationMapCtrl($stateParams, schedulerApi){

        var vm = this;

        vm.locationId = Number($stateParams.id);

        vm.map = { center: {latitude: 38.897677,longitude: -77.036530 }, zoom: 12  };
        vm.options = { scrollwheel: false };

        vm.marker = {};

        schedulerApi.getLeagueData().then(function(data){



            vm.location = _.find(data.locations, {id : vm.locationId});
            vm.marker = {

                latitude: vm.location.latitude,
                longitude: vm.location.longitude,

                options:{
                    draggable:true,
                    labelContent: vm.location.name + "<br/>(Tap for directions)",
                    // labelContent: 'lat: ' + vm.marker.getPosition().lat() + ' ' + 'lon: ' + vm.marker.getPosition().lng(),
                    labelAnchor: '10 -8',
                    labelClass: 'marker-labels'
                }

            };

            vm.map.center.latitude = vm.location.latitude;
            vm.map.center.longitude = vm.location.longitude;
        });

        vm.locationClicked = function(marker){
            window.location = 'geo: ' + marker.latitude + ', ' + marker.longitude + ';u=35';
        }


    };

    app.controller('locationMapCtrl',['$stateParams','schedulerApi',locationMapCtrl]);

}(angular.module('mainApp')));
