var QueueHandler = require('./QueueHandler');
var util = require('util');
var logger = require('./LogService');

function processMessage(message) {
	logger.info('Order process message', message);
}

function processError(error) {
	logger.error('Order process error', error);
}

function OrderQueueHandler(aws) {
	QueueHandler.call(this, aws, 'kp-shop-orders', processError, processMessage);
}

util.inherits(OrderQueueHandler, QueueHandler);

module.exports = OrderQueueHandler;
