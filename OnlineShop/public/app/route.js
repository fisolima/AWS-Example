/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";

	var app = angular.module('app');

	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$routeProvider
			.when('/login', {
				template: '<login></login>'
			})
			.when('/', {
				template: '<div>Order list</div>'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode({
                 enabled: true,
                 requireBase: false
          });
	}]);
}());
