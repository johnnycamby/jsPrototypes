/**
 * Created by johnny on 3/5/2015.
 */

(function(app){

    'use strict';

    function rulesCtrl(schedulerApi){

        var vm = this;

        schedulerApi.getLeagueData().then(function(data){

            vm.mainContent = data.league.rulesScreen;
        });

    };

    app.controller('rulesCtrl',['schedulerApi',rulesCtrl]);
}(angular.module('mainApp')));