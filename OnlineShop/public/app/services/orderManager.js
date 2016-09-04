/* global ../node_modules/angular/angular.js */

(function(){

	'use strict';

	var app = angular.module('app');

	app.factory('orderManager', ['$http', 'comm', 'userSession', function($http, comm, userSession) {
		var _orders = [];

		comm.registerEvent('orderUpdated', function(item) {
			var order = _orders.find(function(orderItem) {
				return (orderItem.id && orderItem.id === item.id)
					|| (orderItem.requestId && orderItem.requestId === item.requestId);
			});

			if (!order) {
				_orders.push(item);
			}				
			else {
				order.status = item.status;
			}				
		});

		var _addOrder = function(product) {
				var orderRequest = {
					username: userSession.getUsername(),
					productId: product.id
				};

				$http({
					method: 'POST',
					url: '/api/order',
					headers: {
						'Content-Type': 'application/json'
					},
					data: orderRequest
				})
				.then(function (response) {
						console.log('Order requested: ' + response.status);
					},function (response) {
						console.log('Order failed: ' + response.status);
				});
			};

		var service = {
			addOrder: _addOrder
		};

		Object.defineProperty(service, 'orders', {
			get: function() {return _orders;}
		});
		
		return service;
	}]);

}());
