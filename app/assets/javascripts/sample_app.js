var SampleApp = angular.module("SampleApp", [
	"SampleAppCtrls",
	"SamplesRouter"
]);

var SamplesRouter = angular.module("SamplesRouter",["ngRoute"]);

SamplesRouter.config(["$routeProvider", function($routeProvider){
	$routeProvider.when("/samples", {
		templateUrl: "/samples/pretty_template",
		controller: "SamplesCtrl"
	})
}]);