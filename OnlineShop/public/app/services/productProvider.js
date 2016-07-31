/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";
	
	var app = angular.module('app');
	
	app.factory('productProvider', ['$rootScope', 'comm', function($rootScope, comm){
		var _products = [];

		// test
		setInterval(function() {
			if (_products.length < 10){
				var product = new Product('Prd' + _products.length.toString());

				product.quantity = 10;
				product.reserved = 10;

				_products.push(product);
			}
			else {
				_products.forEach(function(product){
					product.quantity++;
					product.reserved++;
				});
			}

			$rootScope.$apply();
		}, 2000);

		var server = {};

		Object.defineProperty(server, 'products', {
			get: function() {return _products;}
		});

		return server;
	}]);
}());
