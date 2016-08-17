

// endpoint :: popular/:movieId and resource is extended so that the update() is made via a 'PUT' request


(function(){
	
	'use strict';
	
	angular.module('omdbService').factory('popularMovies', popularMovies);
	
	popularMovies.$inject = ['$resource'];
	
	function popularMovies($resource){
		
		var token = 'xplicit525261!$&^!^';
		
		return $resource('popular/:movieId', {movieId: '@id'}, {
			
			update: {
				method: 'PUT',
				headers: {'authToken': token}
			},
			
			get: {
				method: 'GET',
				headers: {'authToken': token}
			},
			
			query: {
				method: 'GET',
				headers: {'authToken': token}
			},
			
			save: {
				method: 'POST',
				headers: {'authToken': token}
			},
			
			remove: {
				method: 'DELETE',
				headers: {'authToken': token}
			}
		});
	}
	
})();