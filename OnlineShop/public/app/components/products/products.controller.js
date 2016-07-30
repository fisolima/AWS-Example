/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";

	var app = angular.module('app');

	var productsController = function() {

		var ctrl = this;

		ctrl.products = [];

		ctrl.addProduct = function(){
			ctrl.products.push(
				{
					name: 'product_' + (ctrl.products.length + 1).toString(),
					quantity: (ctrl.products.length + 1) * 2,
					reserved: (ctrl.products.length + 1)
				});
		};

		ctrl.buyProduct = function(product){
			console.log("%o", product);
		};
	};

	app.component('products',{
		templateUrl: '/app/components/products/products.view.html',
		controller: productsController,
		controllerAs: 'productsController'
	});
}());
