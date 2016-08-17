/*

(function(){
	
	'use strict';
	
	angular.module('mainApp').controller('searchCtrl', searchCtrl);
	
	searchCtrl.$inject = ['$location'];
	
	function searchCtrl($location){
		
		var vm = this;
		vm.search = function(){
			
			if(vm.query){
				$location.path('/results').search('q', vm.query);
			}
		}
	}
	
})();

*/


(function(){
	
	'use strict';
	
	angular.module('mainApp').controller('searchCtrl', searchCtrl);
	
	searchCtrl.$inject = ['$scope', '$location', '$timeout'];
	
	function searchCtrl($scope, $location, $timeout){
		
		var timeout;
		
		$scope.keyup = function(){
			
			//$timeout(function(){
			//	$scope.search();
			//}, 1000);
			
		   timeout = $timeout($scope.search, 1000);
		};
		
		$scope.keydown = function(){
			$timeout.cancel(timeout);
		}
		
		
		$scope.search = function(){
			
			$timeout.cancel(timeout);
			if($scope.query){
				$location.path('/results').search('q', $scope.query);
			}
		}
	}
	
})();
