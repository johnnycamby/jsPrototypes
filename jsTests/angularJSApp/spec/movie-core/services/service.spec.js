
describe('omdb service', function(){
	
	var movieData = {
		Title: "Star Wars",
		Year: "1983",
		Rated: "N/A",
		Released: "01 May 1983",
		Runtime: "N/A",
		Genre: "Action, Adventure, Sci-Fi",
		Director: "N/A",
		Writer: "N/A",
		Actors: "Harrison Ford, Alec Guinness, Mark Hamill, James Earl Jones",
		Plot: "N/A",
		Language: "English",
		Country: "USA",
		Awards: "N/A",
		Poster: "N/A",
		Metascore: "N/A",
		imdbRating: "7.9",
		imdbVotes: "342",
		imdbID: "tt0251413",
		Type: "game",
		Response: "True"
	};	
	
	var omdbApi = {};
	var $httpBackend;
	
    /*	
	beforeEach(angular.mock.module('mainApp'));
	beforeEach(angular.mock.inject(function(_omdbApi_){			
			omdbApi = _omdbApi_; 
		}));
	*/
	
	beforeEach(module('omdbService'));
	//beforeEach(module('mainApp'));
	beforeEach(inject(function(_omdbApi_, _$httpBackend_){			
		
		omdbApi = _omdbApi_; 
		$httpBackend = _$httpBackend_;
		 
		}));
	
	it('should handle error', function(){
		
		var response;
		
		$httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0251413').respond(500);
		
		omdbApi.find('tt0251413').then(function(data){
			
			response = data;
			
		}).catch(function(){
			response = 'Error!';
		});
		
		$httpBackend.flush();
		
		expect(response).toEqual('Error!');
	});
	
	
	it('should return search movie data', function(){	
		
		var response;
		var expectedUrl = 'http://www.omdbapi.com/?v=1&s=star%20wars';
		
		//var expectedUrl = function(url){
		//	return url.indexOf('http://www.omdbapi.com') !== -1;
		//}
		
		//var expectedUrl = /http:\/\/www.omdbapi.com\/\?v=1&s=star%20wars/;
		
		$httpBackend.when('GET', expectedUrl).respond(200, movieData);
		
		//console.log(angular.mock.dump(movieData));
		
		//expect(omdbApi.search('star wars')).toEqual(movieData);
		
		omdbApi.search('star wars').then(function(data){
			response = data;
		});
		
		// conntrol the flow asynchrously 'flush()' l'l resolve all the configured http requests that have been called by the code under test.
		$httpBackend.flush();
		expect(response).toEqual(movieData);
	});
	
	it('should return movie data by id', function(){	
		
		var response;
		$httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0251413').respond(200, movieData);
		
		omdbApi.find('tt0251413').then(function(data){
			response = data;
		});
		
		$httpBackend.flush();
		
		expect(response).toEqual(movieData);
	})
	
});