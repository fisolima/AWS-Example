/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";

	var app = angular.module('app');
	
	var loginController = function($location, userSession){
		var ctrl = this;

		ctrl.username = '';

		ctrl.login = function(){
			if (ctrl.loginForm.$valid)
			{
				userSession.login(ctrl.username);

				$location.path('/');
			}
			else
			{
				ctrl.loginForm.submitted = true;
			}
		}
	};
	
	app.component('login',{
		templateUrl: '/app/components/login/login.view.html',
		controller: ['$location','userSession', loginController],
		controllerAs: 'loginController'
	});
}());

