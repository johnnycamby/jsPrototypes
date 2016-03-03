/**
 * Created by johnny on 3/2/2015.
 */

(function(app){

    'use strict';

    function teamsCtrl(schedulerApi,$scope){

        var vm = this;

        vm.loadList = function(forceRefresh){

            schedulerApi.getLeagueData().then(function(data){
                vm.teams = data.teams;
            }).finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        vm.loadList(false);

    };

    app.controller('teamsCtrl',['schedulerApi','$scope',teamsCtrl]);

}(angular.module('mainApp')));