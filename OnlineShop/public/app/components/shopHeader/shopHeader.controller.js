/* global ../node_modules/angular/angular.js */

(function(){
	
	"use strict";
	
	var app = angular.module('app');
	
	var headerController = function(){
	};
	
	app.component('shopHeader',{
		templateUrl: '/app/components/shopHeader/shopHeader.view.html',
		controller: headerController
	});
}());