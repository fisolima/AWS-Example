/* global ../node_modules/angular/angular.js */

(function(){

	'use strict';

	var app = angular.module('app');

	app.factory('orderManager', ['comm', 'userSession', function(comm, userSession) {
		var _orders = [];

		var service = {
			addOrder: function(product) {
				// test
				_orders.push({
					username: userSession.getUsername(),
					productName: product.id
				});
			}
		};

		Object.defineProperty(service, 'orders', {
			get: function() {return _orders;}
		});
		
		return service;
	}]);

}());
