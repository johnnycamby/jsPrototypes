
(function(){
	
	'use strict';
	
	
	angular.module('mainApp').controller('resultsCtrl', resultsCtrl);
	
	resultsCtrl.$inject = ['$scope', '$location', 'omdbApi'];
	
	function resultsCtrl($scope, $location, omdbApi){
		
		
		/*
		$scope.results = [];
		
		$scope.results.push({data: {Title: 'Star Wars: Episode VII - The Force Awakens'}});
		$scope.results.push({data: {Title: 'Star Wars: Episode V - The WEmpire Strike Back'}});
		$scope.results.push({data: {Title: 'Star Wars: Episode VI - Return of the Jedi'}});
		*/
		
		var query = $location.search().q;
		
		omdbApi.search('star wars').then(function(data){
			$scope.results = data.Search;
		}).catch(function(){
			$scope.errorMessage = 'Something went wrong!';
		});
	}
	
})();