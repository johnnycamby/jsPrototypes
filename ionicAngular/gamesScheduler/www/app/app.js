/**
 * Created by johnny on 3/2/2015.
 */


(function(){

    'use strict';

  var app = angular.module('mainApp',
      [
          'ionic',
          'angular-data.DSCacheFactory',
          'uiGmapgoogle-maps',
          'ui.router'
      ])

   app.run(['$ionicPlatform','DSCacheFactory',function($ionicPlatform,DSCacheFactory){

        $ionicPlatform.ready(function(){

        // hide the accessory bar by default(remove this to show accessory bar)
        if(window.cordova && window.cordova.plugins.keyboard){
            cordova.plugins.keyboard.hideKeyboardAccessoryBar(true);
        }

        if(window.StatusBar){
            // org.apache.cordova.statusbar required
            statusBar.styleDefault();
        }

            DSCacheFactory('leagueDataCache', {storageMode: 'localStorage', maxAge: 5000, deleteOnExpire: 'aggressive'});
            DSCacheFactory('leaguesCache', {storageMode: 'localStorage', maxAge: 5000, deleteOnExpire: 'aggressive'});
            DSCacheFactory('myTeamsCache', {storageMode: 'localStorage'});
            DSCacheFactory('staticCache', {storageMode: 'localStorage'});

        });
    }])

       app.config( function($urlRouterProvider, $stateProvider){

        // used if no state is matched thus used as a fallback
          // $urlRouterProvider.otherwise('/app/teams');
          $urlRouterProvider.otherwise('/home/leagues');

        $stateProvider
            // Parent state,
            // this state is abstract so one cannot navigate to it directly,
            // Must contain an 'ui-view' in
            .state('home',{
                abstract:true,
                url:'/home',
                templateUrl:'app/home/home.html'
            })

            .state('home.leagues',{
                url:'/leagues',
                views:{
                    'tab-leagues':{
                        templateUrl:'app/home/leagues.html'
                    }
                }

            })

            .state('home.favTeams',{
                url:'/favTeams',
                views:{
                    'tab-favTeams':{
                        templateUrl:'app/home/favTeams.html'
                    }
                }

            })

            .state('app',{
                abstract:true,
                url:'/app',
                templateUrl:'app/layout/menu-layout.html'
            })

            .state('app.teams',{
                url:'/teams',
                views:{
                    'mainContent':{
                        templateUrl:'app/teams/teams.html'
                    }
                }
            })

            .state('app.team-detail',{
                url:'/teams/:id',
                views:{
                    'mainContent':{
                        templateUrl:'app/teams/team-detail.html'
                    }
                }

            })

            .state('app.game',{
                url:'/game/:id',
                views:{
                    'mainContent':{
                        templateUrl:'app/game/game.html'
                    }
                }
            })

            .state('app.standings',{
                url:'/standings',
                views:{
                    'mainContent':{
                        templateUrl:'app/standings/standings.html'
                    }
                }
            })

            .state('app.locationMap',{
                url:'/locationMap/:id',
                views:{
                    'mainContent':{
                        templateUrl:'app/locations/locationMap.html'
                    }
                }
            })

            .state('app.locations',{
                url:'/locations',
                views:{
                    'mainContent':{
                        templateUrl:'app/locations/locations.html'
                    }
                }
            })

            .state('app.rules',{
                url:'/rules',
                views:{
                    'mainContent':{
                        templateUrl:'app/rules/rules.html'
                    }
                }
            })
        ;



    });
}());