/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";

	var app = angular.module('app');

	var productsController = function($scope, productProvider, orderManager) {
		var ctrl = this;

		ctrl.products = productProvider.products;

		ctrl.reserveProduct = function(product) {
			orderManager.addOrder(product);
		};

		ctrl.updateList = productProvider.update;
	};

	app.component('products',{
		templateUrl: '/app/components/products/products.view.html',
		controller: ['$scope','productProvider', 'orderManager', productsController],
		controllerAs: 'productsController'
	});
}());
