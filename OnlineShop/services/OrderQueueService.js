var QueueHandler = require('./QueueService');
var util = require('util');
var logger = require('./LogService');
var orderHandler = require('./OrderHandler');
var aws = require('aws-sdk');

function processMessage(message) {
	logger.info('Order process message', message);

	var order = orderHandler.parse(message.Body);

	orderHandler.notify(order);
}

function processError(error) {
	logger.error('Order process error', error);
}

function OrderQueueHandler() {
	QueueHandler.call(this, 'kp-shop-orders', 'kp-order-topic', processError, processMessage);
}

util.inherits(OrderQueueHandler, QueueHandler);

module.exports = OrderQueueHandler;
