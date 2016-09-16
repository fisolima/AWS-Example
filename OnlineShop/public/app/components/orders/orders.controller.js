/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";

	var app = angular.module('app');

	var ordersController = function(orderManager) {
		var ctrl = this;
		
		ctrl.orders = orderManager.orders;

		ctrl.updateList = orderManager.updateList;
	};

	app.component('orders',{
		templateUrl: '/app/components/orders/orders.view.html',
		controller: ['orderManager', ordersController],
		controllerAs: 'ordersController'
	});
}());
