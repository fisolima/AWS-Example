var QueueHandler = require('./QueueHandler');
var util = require('util');
var logger = require('./LogService');
var orderHandler = require('./OrderHandler');

function processMessage(message) {
	logger.info('Order process message', message);

	var order = orderHandler.parse(message.Body);

	orderHandler.notify(order);
}

function processError(error) {
	logger.error('Order process error', error);
}

function OrderQueueHandler(aws) {
	QueueHandler.call(this, aws, 'kp-shop-orders', processError, processMessage);
}

util.inherits(OrderQueueHandler, QueueHandler);

module.exports = OrderQueueHandler;
