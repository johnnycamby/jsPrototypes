/**
 * Created by johnny on 3/2/2015.
 */


(function(app){

    'use strict';

    function leaguesCtrl(schedulerApi, $state){
        var vm = this;

        schedulerApi.getLeagues().then(function(data){
            vm.leagues = data;
        });

        vm.selectLeague = function(id){
             // TODO :select correct league
            schedulerApi.setLeagueId(id);
            $state.go('app.teams');
        }
    };


    app.controller('leaguesCtrl',['schedulerApi','$state', leaguesCtrl]);

}(angular.module('mainApp')));