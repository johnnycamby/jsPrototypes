
describe('Home Controller', function(){
	
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
	
	var $scope;
	var $interval;
	var omdbApi
	
	
	beforeEach(module('mainApp'));
	
	beforeEach(inject(function(_$location_, _$interval_, _omdbApi_) {
		$scope = {};
		$interval = _$interval_;
		omdbApi = _omdbApi_;
	}));
	
	beforeEach(inject(function(_$q_, _popularMovies_){
		
		spyOn(_popularMovies_, 'get').and.callFake(function(){
			
			var deferred = _$q_.defer();
			deferred.resolve(['tt0251413','tt0080684','tt0086190']);
			return deferred.promise;
		});
	}));
			   
    beforeEach(inject(function(_$q_, _$controller_){
		
		spyOn(omdbApi, 'find').and.callFake(function(){
			
			var deferred = _$q_.defer();
			var args = _omdbApi_.find.calls.mostRecent().args[0];
			
			if(args === 'tt0251413'){
				deferred.resolve(results[0]);
			}else if(args === 'tt0080684'){
				deferred.resolve(results[1]);
			}else if(args === 'tt0086190'){
				deferred.resolve(results[2]);
			}else{
				deferred.reject();
			}
			
			return deferred.promise;
		});
	}))			   
			   
	// include '$rootScope' since we are resolving promises in the test to call the $apply()
	
	beforeEach(inject(function(_$controller_, _$rootScope_,  _popularMovies_){		
		
		_$controller_('homeCtrl', {$scope: $scope , _$interval_: $interval, omdbApi: omdbApi, popularMovies: _popularMovies_ });
		
		_$rootScope_.$apply();
	}));
	
	it('should rotate movies every  5 seconds', function(){
		
		expect($scope.result.Title).toBe(results[0].Title);
		$interval.flush(5000);
		expect($scope.result.Title).toBe(results[1].Title);
		$interval.flush(5000);
		expect($scope.result.Title).toBe(results[2].Title);
		$interval.flush(5000);
		expect($scope.result.Title).toBe(results[0].Title);
	});
});