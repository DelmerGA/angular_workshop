var SampleAppCtrls = angular.module("SampleAppCtrls",[])


SampleAppCtrls.controller("SamplesCtrl",["$scope", "$http", 
	function($scope, $http){
	$scope.samples = [
		  {name: "goose", description: "top gun pilot"},
		  {name: "uranium hexafluoride gas", description: "fights with nickel" },
		  {name: "mongoose", description: "fights with snakes"}
	];

	$http.get("/samples.json").success(function(data){
		console.log(data)
		$scope.samples = $scope.samples.concat(data);
	});
	$scope.addSample = function(){

	};

}]);