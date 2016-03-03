/**
 * Created by johnny on 3/2/2015.
 */

(function(app){

    'use strict';

    function standingsCtrl(schedulerApi){

        var vm = this;

        schedulerApi.getLeagueData().then(function(data){
            vm.standings = data.standings;
        });
    }

    app.controller('standingsCtrl',['schedulerApi',standingsCtrl]);

}(angular.module('mainApp')));