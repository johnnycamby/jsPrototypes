/**
 * Created by johnny on 3/2/2015.
 */

(function(app){

    'use strict';

    function teamDetailCtrl($ionicPopup,$stateParams, schedulerApi){

        var vm = this;

        vm.teamId = Number($stateParams.id);

        schedulerApi.getLeagueData().then(function(data){

        // ----- lodash methods ----------
        var team = _.chain(data.teams)
            .flatten("divisionTeams") // it's group data so flatten on 'divisionTeams' so we can query across on all teams
            .find({"id": vm.teamId}) // find a team based on team id
            .value();

      //  vm.teamName = team.name; // then extract the team name using the teamId

        // lets get team's games
        vm.games = _.chain(data.games)
            .filter(isTeamInGame)
            .map(function(item){

                var isTeam1 = (item.item1Id === vm.teamId ? true : false);
                var opponentName = isTeam1 ? item.team2 : item.team1;
                var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);

                return{

                    gameId: item.id,
                    opponent : opponentName,
                    time: item.time,
                    location: item.location,
                    locationUrl : item.locationUrl,
                    scoreDisplay: scoreDisplay,
                    homeAway: (isTeam1 ? 'vs.' : 'at')
                };
            })
            .value();


        vm.teamStanding = _.chain(data.standings)
            .flatten("divisionStandings")
            .find({"teamId" : vm.teamId})
            .value();

        });

        vm.following = false;

        // this is explicit for buttons and not for toggle control
        vm.toggleFollow = function(){
           // vm.following = !vm.following;
            if(vm.following){
                var confirmPopup = $ionicPopup.confirm(
                    {
                        title:'Unfollow ?',
                        template: 'Are you sure you want to unfollow ?'
                    });
                confirmPopup.then(function(res){
                    if(res){
                        vm.following = !vm.following;
                    }
                });
            }
            else{
                vm.following = !vm.following;
            }
        };

        // Either team1 or team2 matches the Id, thus l'l be the team in game
        function isTeamInGame(item){
            return item.team1Id === vm.teamId || item.team2Id === vm.teamId;
        }

        function getScoreDisplay(isTeam1, team1Score, team2Score){

            if(team1Score && team2Score){
                var teamScore = (isTeam1 ? team1Score : team2Score);
                var opponentScore = (isTeam1 ? team2Score : team1Score);
                var winIndicator = teamScore > opponentScore ? 'W: ' : 'L: ';

                return winIndicator + teamScore + '-' + opponentScore;
            }
            else{
                return '';
            }
        }
        //console.log("$stateParams",$stateParams);

    }


    app.controller('teamDetailCtrl',['$ionicPopup','$stateParams','schedulerApi',teamDetailCtrl]);

}(angular.module('mainApp')));