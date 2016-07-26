/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";

	var app = angular.module('app');

	var productsController = function(){
	};

	app.component('products',{
		templateUrl: '/app/components/products/products.view.html',
		controller: productsController,
		controllerAs: 'productsController'
	});
}());
