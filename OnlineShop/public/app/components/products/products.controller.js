/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";

	var app = angular.module('app');

	var productsController = function(productProvider, orderManager) {
		var ctrl = this;

		ctrl.products = productProvider.products;

		ctrl.reserveProduct = function(product) {
			orderManager.addOrder(product);
		};
	};

	app.component('products',{
		templateUrl: '/app/components/products/products.view.html',
		controller: ['productProvider', 'orderManager', productsController],
		controllerAs: 'productsController'
	});
}());
