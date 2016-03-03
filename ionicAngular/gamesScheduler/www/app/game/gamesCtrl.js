/**
 * Created by johnny on 3/3/2015.
 */

(function(app){

    'use strict';

    function gamesCtrl($stateParams,schedulerApi){

        var vm = this;

        var gameId = Number($stateParams.id);

        schedulerApi.getLeagueData().then(function(data){

            vm.game = _.find(data.games, {'id': gameId});
        });
    }

    app.controller('gamesCtrl',['$stateParams','schedulerApi',gamesCtrl])

}(angular.module('mainApp')));