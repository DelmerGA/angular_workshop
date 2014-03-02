# Angular Workshop
## An Brief Introduction


|Objective|
|	:---	|
| To identify the basic compenents of a Angular application and integrate them together in a manner that creates a canonical example for one to further develop or rexamine afterward.|

### Outline
	
========

* A First `ng-app`
	* Setup JS-Bin
	* Add Library `angular 1.2.1`
	* Setup an `ng-app`
		* Seeing `ng-model`, and [two_way_data_binding](http://docs.angularjs.org/guide/databinding)
	* Setup an `ng-controller`
		* The `ng-controller` directive
			* A controller function
		* Using [$scope](http://docs.angularjs.org/guide/scope) in a controller
		* Using the `ng-repeat` directive
			* A new `$scope`
			* Iterating through an `Array`
			* Iterating through `(key, values)` in an `Array`
		* Using some actions
			* `ng-sumbit`
			* `ng-click`
	* Modularizing 
		* An app module
		* A controller module
* A Basic Rails App (Using Rails 4 or 3, won't assume a particular gem)
	*  Setting up a Sample App	
		*  Setup `config/routes`
		* generate a `SamplesController` with methods.
	* Download [Angular](http://code.angularjs.org/1.2.13/angular-1.2.13.zip) into `vendor/assets/javascripts`
	* Setup a modular `SampleApp`
	* Setup a modular `SampleAppCtrl`
		* Using `$http`
	* Setup with  `ngRoute` 
	* Setup with `ngResource`
	

========

### Intro with JS-Bin (to be determined later)

### Intro With Rails

Let's begin a project in a directory of your choosing:

	rails new sample_app
	....
	cd sample_app

To get angular you can do one of the following 

	curl -G http://code.angularjs.org/1.2.13/angular-1.2.13.zip > vendor/assets/javascripts && open vendor/assets/javascripts/angular
	
and just `rm vendor/assets/javascripts/angular`, which might be a little over the top and UNIX-y, or you can [download it from here](http://code.angularjs.org/1.2.13/angular-1.2.13.zip), open it, and then 

	mv "~/Downloads/angular-1.2.13" vendor/assets/javascripts/
	

### Including Angular

We need to load our `angular.min.js`, so we add the following to the `assets/javascripts/application.js`

`/application.js`

	...
	//= require jquery
	//= require jquery_ujs
	//= require turbolinks
	// ***** ADD ANGULAR HERE *****
	//= require angular-1.2.13/angular.min
	// *****
	//= require_tree .


### Generating a controller

Let's start off with a controller called `SamplesController` for our `SampleApp`

	rails g controller samples index


`/samples/index.html.erb`

	<div ng-app>
		<input type="text" ng-model="name" placeholder="name">
		<p> HELLO, {{name}}! </p>
	</div>

Now we modify our routes

	SampleApp::Application.routes.draw do
		root to: "samples#index"
		resources :samples
	end

If angular has loaded correctly then this example should be working at [localhost:3000](localhost:3000)

### A Modular App

Change `<div ng-app>` in the index to `ng-app="SampleApp"`

`/samples/index.html.erb`

	<div ng-app="SampleApp">
		...
	</div>


Create a `sample_app.js` in `app/assets/javascripts` and define a `SampleApp` module in it.

`/assets/javascripts/sample_app.js`

	var SampleApp = angular.module("SampleApp",[]);

### Adding A Modular Controller

	
Create a `samples_controller.js` in `app/assets/javascripts` and define a `SampleAppCtrls` module in it.


`/assets/javascripts/samples_controller.js`

	var SampleAppCtrls = angular.module("SampleAppCtrls",[]);
	
	SampleAppCtrls.controller("SamplesCtrl", ["$scope", function($scope){
	
	}]);

Now we can add `SampleAppCtrls` as a module in `sample_app.js`, i.e.


`/assets/javascripts/sample_app.js`

	var SampleApp = angular.module("SampleApp",[
		"SampleAppCtrls"
	]);


#### Adding functionality to our controller

Let's define some `fakeSamples` in the `SamplesCtrl`

`/assets/javascripts/samples_controller.js`
	
	...
	
	SampleAppCtrls.controller("SamplesCtrl", ["$scope", function($scope){
		// fakeSamples
		$scope.fakeSamples = [
			 {name: "bunny", description: "fluffy"}
			,{name: "Green Stuff", description: "meh"}
			,{name: "elephant", description: "big"}
			];
		
	}]);


Now we need to display these `fakeSamples` in a view for our `SamplesCtrl`

`/samples/index.html.erb`

	<div ng-app="SampleApp">
		...
		<!-- NOTE HERE THE  ng-controller-->
		<div ng-controller="SamplesCtrl">
		
			<!--  NOTE HERE THE ng-repeat over the items defined
					in our SamplesCtrl -->
			<div ng-repeat="sample in fakeSamples">
				A {{sample.name}} looked {{sample.description}}
			</div>
		</div>
		
		...
	</div>
	
### Adding a router

We can handle routing by loading the `ngRoute` module. We begin this by adding the `angular-route` script into our `appliction.js`

`/application.js`

	//= require jquery
	//= require jquery_ujs
	//= require turbolinks
	// ***** ADD ANGULAR HERE *****
	//= require angular-1.2.13/angular.min
	// ***** ADD ANGULAR ROUTER HERE *****
	//= require angular-1.2.13/angular-route.min
	//*****
	//= require_tree .
	

Now we can update our `sample_app.js` to include a router module.


`/assets/javascripts/sample_app.js`

	var SampleApp = angular.module("SampleApp",[]);
	
	// Create our Sample module with `ngRoute` dependency
	var SamplesRouter = angular.module("SamplesRouter", ["ngRoute"]);
	
Next we need to configure our route to respond to certain paths

`/assets/javascripts/sample_app.js`

	SamplesRouter.config(["$routeProvider",
		function($routeProvider, $httpProvider){
		$routeProvider.when("/samples", {
			// Note here the path is just "/samples/pretty_template"
			templateUrl: "/samples/pretty_template",
			controller: "SamplesCtrl"
		})
	}]);


Note we add this `/samples/pretty_template` path to our routes

`config/routes.rb`

	SampleApp::Application.routes.draw do
		root to: "samples#index"
		
		# pretty template
		get "/samples/pretty_template" to: "samples#pretty_template"
		resources :samples
	end

Note we add the `/samples/pretty_template` view and method

`samples_controller.rb`

	class SamplesController < ApplicationController
	  def index
	  end
	
	  def pretty_template
	  	render layout: false
	  end
	end


`/samples/pretty_template.html.erb`

	<div style="color:blue; padding: 10px;"ng-repeat="sample in fakeSamples">
		{{sample.name}} is {{sample.description}}
	</div>

	
Now all that is left is to render the view in the index.html, and we change it to look as follows.

	<div ng-app="SampleApp">
		<input type="text" ng-model="name" placeholder="name">
		<p> HELLO, {{name}}! </p>

		<a href="#/samples"> pretty format</a>
		<div ng-view>
		</div>
	</div>
	

### Making Requests


	