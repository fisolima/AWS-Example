/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";

	var app = angular.module('app');

	app.service('userSession', function() {
		var service = this;

		service.isAuthenticated = function() {
			var username = service.getUsername();

			return username && username.length !== 0;
		};

		service.login = function(username) {
			if (service.isAuthenticated())
				return;

			sessionStorage.setItem('os-username', username);
		};

		service.logout = function() {
			sessionStorage.removeItem('os-username');
		};

		service.getUsername = function(){
			return sessionStorage.getItem('os-username');
		};
	});
}());
