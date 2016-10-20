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
				order.id = order.id || item.id;
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

		service.updateList = function(){
			console.log('order updated');

			$http.get('/api/order/' + userSession.getUsername())
				.then(
					// success
					function(res) {
						_orders.length = 0;

						console.log('%o', res.data);

						res.data.forEach(function(order) {
							_orders.push(order);
						});
					},
					// error
					function(res) {
						console.log(res.data || 'product request failed');
						console.log(res.status);
					});
		};

		Object.defineProperty(service, 'orders', {
			get: function() {return _orders;}
		});
		
		return service;
	}]);

}());
