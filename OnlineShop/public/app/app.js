/* global ../node_modules/angular/angular.js */

(function (){
	
	'use strict';
	
	var app = angular.module('app', ['ngRoute']);
	
	app.controller('appController', ['$scope',function($scope){
		// $scope.testMessage = 'Hello Pippo!';
		//
		// $scope.activityDialogVisible = false;
		// $scope.activityDialogMessage = '';
		//
		// $scope.testDialog = function() {
		// 	$scope.activityDialogVisible = true;
		// };
		//
		// setInterval(function() {
		// 	$scope.activityDialogMessage = (new Date()).toISOString();
		// }, 1500)
	}]);
	
}());
