/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";

	var app = angular.module('app');

	app.service('userSession', function(){
		var _username = '';

		this.isAuthenticated = function (){
			return _username && _username.length !== 0;
		};

		this.login = function(username){
			_username = username;
		};

		this.logout = function (){
			_username = '';
		};

		this.getUsername = function(){
			return _username;
		};
	});
}());
