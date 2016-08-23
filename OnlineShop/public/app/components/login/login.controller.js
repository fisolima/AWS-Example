/* global ../node_modules/angular/angular.js */

(function(){

	//"use strict";

	var app = angular.module('app');
	
	var loginController = function($location, $rootScope, comm, userSession){
		var ctrl = this;

		ctrl.username = '';

		comm.registerEvent('authenticated', function(data) {
			console.log('Login completed: %o ' + ctrl.username, data );

			userSession.login(ctrl.username);

			$location.path('/');

			$rootScope.$apply();

			$rootScope.$broadcast('user-logged');

			var thisEvent = arguments.callee;

			comm.unregisterEvent('authenticated', thisEvent);
		});

		ctrl.login = function(){
			if (ctrl.loginForm.$valid) {
				comm.emit('authenticate', ctrl.username);
			}
			else {
				ctrl.loginForm.submitted = true;
			}
		}
	};
	
	app.component('login',{
		templateUrl: '/app/components/login/login.view.html',
		controller: ['$location', '$rootScope', 'comm', 'userSession', loginController],
		controllerAs: 'loginController'
	});
}());

