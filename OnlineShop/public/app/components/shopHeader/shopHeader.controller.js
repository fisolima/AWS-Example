/* global ../node_modules/angular/angular.js */

(function(){
	
	"use strict";
	
	var app = angular.module('app');
	
	var headerController = function($location, comm, userSession){
		var ctrl = this;

		ctrl.isAuthenticated = userSession.isAuthenticated;

		ctrl.getUsername = userSession.getUsername;

		ctrl.logout = function(){
			comm.disconnect();
			
			userSession.logout();

			$location.path('/login');
		}
	};
	
	app.component('shopHeader',{
		templateUrl: '/app/components/shopHeader/shopHeader.view.html',
		controller: ['$location', 'comm', 'userSession', headerController],
		controllerAs: 'headerController'
	});
}());