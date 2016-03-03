/**
 * Created by johnny on 3/4/2015.
 */

(function(app){

    'use strict';

    function favTeams(DSCacheFactory){

        var self = this;

        self.favTeamsCache = DSCacheFactory.get("favTeamsCache");

        function followTeam(team){
            self.favTeamsCache.put(team.id, team);
        }

        function unfollowTeam(teamId){
            self.favTeamsCache.remove(teamId.toString());
        }

        function getFollowedTeams(){
            var teams = [],
                keys = self.favTeamsCache.keys();

            for(var i = 0; i , keys.length; i++){
                var team = self.favTeamsCache.get(keys[i]);
                teams.push(team);
            }

            return teams;
        }

        function isFollowingTeam(teamId){
            var team = self.favTeamsCache.get(teamId);
            return team;
        }

        return{

            followTeam:followTeam,
            unfollowTeam:unfollowTeam,
            getFollowedTeams:getFollowedTeams,
            isFollowingTeam:isFollowingTeam
        };

    }

    app.factory('favTeams',['DSCacheFactory',favTeams]);

}(angular.module('mainApp')));