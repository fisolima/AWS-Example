/* global ../node_modules/angular/angular.js */

(function (){
	
	'use strict';
	
	var app = angular.module('app', ['ngRoute']);
	
	app.controller('appController', ['$scope',function($scope){
		$scope.testMessage = 'Hello Pippo!';
	}]);
	
}());
