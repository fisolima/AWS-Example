
'use strict';

var EventEmitter = require('events');
var logger = require('./LogService');
var userSessionService = require('./UserSessionService');

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

module.exports = {
	on: function(messageId, callback) {
		orderEmitter.on(messageId, callback);
	},
	parse: parseOrder,
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
