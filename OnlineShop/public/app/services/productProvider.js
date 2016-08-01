/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";
	
	var app = angular.module('app');
	
	app.factory('productProvider', ['comm', function(comm){
		var _products = [];

		comm.registerEvent('productUpdated', function (item) {
			var product = _products.find(function(product){
				return product.id === item.id;
			});
			
			if (!product) {
				product = new Product(item.id);

				_products.push(product);
			}
			
			product.quantity = item.quantity;
			product.reserved = item.reserved;
		});

		var server = {};

		Object.defineProperty(server, 'products', {
			get: function() {return _products;}
		});

		return server;
	}]);
}());
