
'use strict';

var EventEmitter = require('events');
var logger = require('./LogService');
var userSessionService = require('./UserSessionService');
var Order = require('../objects/Order');

var orderEmitter = new EventEmitter();

var parseOrder = function(orderJson) {
	var order = {};

	try {
		order = JSON.parse(orderJson);
	}
	catch (err) {
		return logger.error("Error parse order", err);
	}

	if (!order || !order.id || !order.username || !order.productName)
		throw Error("Invalid product data: " + orderJson);

	return order;
};

var orderToClientModel = function (order) {
	if (!order)
		return logger.error("Invalid order object");

	if (!(order instanceof Order))
		return logger.error("Input object is not an instant of Order", order);

	return {
		id: order.id,
		requestId: order.requestId,
		username: order.username,
		productId: order.productId,
		status: order.status
	};
};

module.exports = {
	on: function(messageId, callback) {
		orderEmitter.on(messageId, callback);
	},
	parse: parseOrder,
	convertToClientModel: orderToClientModel,
	notify: function(order) {
		var sessions = userSessionService.findByUsername(order.username);

		if (sessions) {
			sessions.forEach(function(session) {
				process.nextTick(function() {
					session.socket.emit('orderUpdated', order);
				});
			});
		}
	}
};
