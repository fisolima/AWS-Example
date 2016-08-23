/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";
	
	var app = angular.module('app');
	
	app.factory('productProvider', ['$http','comm', function($http, comm) {
		var _products = [];

		var addOrUpdateProduct = function(prd) {
			var product = _products.find(function(product){
				return product.id === prd.id;
			});

			if (!product) {
				product = new Product(prd.id);

				_products.push(product);
			}

			product.quantity = prd.quantity;
			product.reserved = prd.reserved;
		};

		comm.registerEvent('productUpdated', addOrUpdateProduct);

		var server = {};

		Object.defineProperty(server, 'products', {
			get: function() {return _products;}
		});

		server.update = function(){
			console.log('product updated');

			$http.get('/api/products')
				.then(
					// success
					function(res) {
						res.data.forEach(addOrUpdateProduct);
					},
					// error
					function(res) {
						console.log(res.data || 'product request failed');
						console.log(res.status);
					});
		};

		return server;
	}]);
}());
