/**
 * Created by johnny on 3/2/2015.
 */

(function(app){

    'use strict';

    function locationsCtrl(schedulerApi){

        var vm = this;

        schedulerApi.getLeagueData().then(function(data){
            vm.locations = data.locations;
        });
    }

    app.controller('locationsCtrl',['schedulerApi',locationsCtrl]);

}(angular.module('mainApp')));