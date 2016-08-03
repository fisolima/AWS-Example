var QueueHandler = require('./QueueHandler');
var util = require('util');
var logger = require('./LogService');

function processMessage(message) {
	logger.info('Product process message', message);
}

function processError(error) {
	logger.error('Product process error', error);
}

function ProductQueueHandler(aws) {
	QueueHandler.call(this, aws, 'kp-shop-products', processError, processMessage);
}

util.inherits(ProductQueueHandler, QueueHandler);

module.exports = ProductQueueHandler;
