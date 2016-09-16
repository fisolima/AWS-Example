"use strict";

var async = require('async');
var uuid = require('node-uuid');
var awsSnsService = require('aws-queue-helper/sns');

var orders = [];

var addOrder = function(order) {
	if (!order)
		return;

	order.id = order.id || uuid.v1();

	order.status = 'REGISTERED';

	orders.push(order);

	awsSnsService.send('kp-order-topic', order);
};

var findOrders = function(filter, onComplete) {
	async.filter(orders, function(item, callback) {
		var itemValidated = true;

		if (filter) {
			if (filter.username)
				itemValidated &= item.username === filter.username;

			if (filter.productId)
				itemValidated &= item.productId === filter.productId;
		}

		callback(null, itemValidated);
	},
	onComplete);
};

module.exports = {
	add: addOrder,
	find: findOrders
};
