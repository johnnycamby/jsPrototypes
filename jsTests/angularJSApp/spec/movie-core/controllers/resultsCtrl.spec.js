
describe('Results Controller', function(){
	
	var results = {
		
		"Search": [
			
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
		]
	};
	
	
	var $controller;
	var $scope;
	var $location;
	var $q;
	var $rootScope;
	var omdbApi;
		
	//beforeEach(module('omdbService'));
	beforeEach(module('mainApp'));
	
	beforeEach(inject(function(_$controller_ , _$location_, _$q_ , _$rootScope_ , _omdbApi_){
		
		$controller = _$controller_;
		$scope = {};
		$location = _$location_;
		$rootScope = _$rootScope_;
		$q = _$q_;
		omdbApi = _omdbApi_;
	}));
	
	it('should set result status to error', function(){
		
		
		spyOn(omdbApi, 'search').and.callFake(function(){
			
			var deferred = $q.defer();
			deferred.reject(results);
			
			return deferred.promise;
		});
		$location.search('q', 'star wars');
		$controller('resultsCtrl', { $scope: $scope });		
		$rootScope.$apply();	
		expect($scope.errorMessage).toBe('Something went wrong!');
		
		
	});
	
	it('should load search results', function(){
		
		spyOn(omdbApi, 'search').and.callFake(function(){
			
			var deferred = $q.defer();
			deferred.resolve(results);
			return deferred.promise;
		});
		
		$location.search('q', 'star wars');
		$controller('resultsCtrl', {$scope: $scope });
		$rootScope.$apply();		
		expect($scope.results[0].Title).toBe(results.Search[0].Title);
		expect($scope.results[1].Title).toBe(results.Search[1].Title);
		expect($scope.results[2].Title).toBe(results.Search[2].Title);
		expect(omdbApi.search).toHaveBeenCalledWith('star wars');
	});
	
		
	
});