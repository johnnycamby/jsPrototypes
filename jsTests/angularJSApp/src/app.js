(function(){
	
	'use strict';
	
	angular.module('mainApp', [ 'omdbService', 'ui.bootstrap', 'ngRoute'])
	
	.config(function($routeProvider){
		
		$routeProvider
		.when('/',   
			  {
			templateUrl: 'movie-core/views/home.html',
			controller: 'homeCtrl'
			
		})
		.when('/results',   
			  {
			templateUrl: 'movie-core/views/results.html',
			controller: 'resultsCtrl'
			
		})
		.otherwise({
			redirectTo: '/'
		});
	});
	
	
	
})();