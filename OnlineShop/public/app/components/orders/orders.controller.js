/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";

	var app = angular.module('app');

	var ordersController = function(){
	};

	app.component('orders',{
		templateUrl: '/app/components/orders/orders.view.html',
		controller: ordersController,
		controllerAs: 'ordersController'
	});
}());
