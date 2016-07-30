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
				template: '<div class="main">' +
								'<products></products>' +
								'<orders></orders>' +
							'</div>'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode({
                 enabled: true,
                 requireBase: false
          });


	}]);
	
	app.run(['$rootScope','$location','comm', 'userSession',function($rootScope, $location, comm, userSession) {

		console.log("app.run");

		if (userSession.isAuthenticated()){
			comm.emit('authenticate', userSession.getUsername());
		}

		$rootScope.$on('$locationChangeStart', function(event,next,current) {
			if (!userSession.isAuthenticated())
				$location.path('/login');
		});
	}]);
}());
