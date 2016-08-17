

describe('Search Controller', function(){
	
	var $scope;
	var $location;
	var $timeout;
	
	
	beforeEach(module('mainApp'));
	
	beforeEach(inject(function(_$controller_ , _$location_ , _$timeout_){
		
		$location = _$location_;
		$timeout = _$timeout_;
		$scope = {};	
		
		_$controller_('searchCtrl', {$scope: $scope, $location: _$location_,  $timeout: _$timeout_ });
		
	}));
	
	it('should  redirect to the query results page for non-empty query', function(){
		
		$scope.query = 'star wars';
		$scope.search();
		
		expect($location.url()).toBe('/results?q=star%20wars');
	});
	
	it('should not redirect to query results for empty query', function(){
		
		$scope.query = '';
		$scope.search();
		expect($location.url()).toBe('');
	});
	
	it('should redirect after 1 second of keyboard inactivity', function(){
		
		$scope.query = 'star wars';
		$scope.keyup();
		//$timeout.flush(500);
		//$timeout.verifyNoPendingTasks();
		$timeout.flush();
		expect($timeout.verifyNoPendingTasks).not.toThrow();
		expect($location.url()).toBe('/results?q=star%20wars');
	});
	
	it('should cancel timeout in keydown', function(){
		$scope.query = 'star wars';
		$scope.keydown();
		expect($timeout.verifyNoPendingTasks).not.toThrow();
	});
	
	it('should cancel timeout on search', function(){
		
		$scope.query = 'star wars';
		$scope.keyup();
		$scope.search();
		expect($timeout.verifyNoPendingTasks).not.toThrow();
	});
});























/*
describe('Search Controller', function(){
	
	var $scope;
	var $location;
     var vm ;
	var $controller;
	
	//beforeEach(module('omdbService'));
	beforeEach(module('mainApp'));
	
	beforeEach(inject(function(_$controller_ , _$location_){
		vm = this;
		$location = _$location_;
		$controller = _$controller_;
				
		/*
		var fn = function($scope){
			
			$scope.search = function(){
				
				if($scope.query){
					$location.path('/results').search('q', $scope.query);
				}
			}
		}
		
		_$controller_(fn, {$scope: $scope, $location: $location });
		
			
	}));
	
	it('should  redirect to the query results page for non-empty query', function(){
		
		vm = _$controller_('searchCtrl', {$location: $location }, {vm.query: 'star wars'});	
		vm.search();
		
		expect($location.url()).toBe('/results?q=star%20wars');
	});
	
	it('should not redirect to query results for empty query', function(){
		
	    vm = _$controller_('searchCtrl', {$location: $location }, {vm.query: ''});		
		vm.search();
		expect($location.url()).toBe('');
	});
	
});

*/




