
(function(){
	
	'use strict';
	
	angular.module('mainApp').controller('homeCtrl', homeCtrl);
	
	homeCtrl.$inject = ['$scope', '$interval', 'omdbApi', 'popularMovies'];
	
	function homeCtrl($scope, $interval, popularMovies, omdbApi ){
		
		/*
		
		var results = [
		{
				Title: "Star Wars: Episode VII - The Force Awakens",
				Year: "2015",
				Actors: "Harrison Ford,  Daisy Ridley, John Boyega, Oscar Isaac ",
				Language: "English",
				imdbRating: "8.3",
				imdbID: "tt0251413",
				Type: "game"
			},
			{
				Title: "Star Wars: Episode V - The WEmpire Strike Back",
			    Year: "1980",
			    Actors: "Harrison Ford, Alec Guinness, Mark Hamill, James Earl Jones",
			    Language: "English",
			    imdbRating: "8.8",
			    imdbID: "tt0080684",
			    Type: "movie"
			},
			{
				Title: "Star Wars: Episode VI - Return of the Jedi",
			    Year: "1983",
			    Actors: "Harrison Ford, Alec Guinness, Mark Hamill, James Earl Jones",
			    Language: "English",
			    imdbRating: "8.3",
		     	imdbID: "tt0086190",
			    Type: "movie"
			}
	];
	*/
		
		
		var results = [];
		var idx = 0;
		
		var findMovie = function(id){
			
			omdbApi.find(id).then(function(data){
				
				$scope.result = data;
			});
		};
		
	//	popularMovies.get().then(function(data){
	    var data = ['tt0251413','tt0080684','tt0086190'];		
			results = data;
			findMovie(results[0]);
			
			$interval(function(){
			
			++idx;
			findMovie(results[idx % results.length]);
			}, 5000);
		//});

	}
	
})();