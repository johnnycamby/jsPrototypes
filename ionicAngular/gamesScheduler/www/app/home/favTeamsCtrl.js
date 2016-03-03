/**
 * Created by johnny on 3/4/2015.
 */


(function (app){

    'use strict';

    function favTeamsCtrl($state,favTeams,schedulerApi ){

        var vm = this;

        vm.favTeams = favTeams.getFollowedTeams();

        vm.goToTeam = function(team){

            schedulerApi.setLeagueId(team.leagueId);
            $state.go('app.team-detail', {id: team.id });
        };

    };

    app.controller('favTeamsCtrl',['$state','favTeams','schedulerApi',favTeamsCtrl]);

}(angular.module('mainApp')));