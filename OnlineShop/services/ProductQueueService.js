var QueueHandler = require('./QueueService');
var util = require('util');
var logger = require('./LogService');
var productHandler = require('./ProductHandler');

function processMessage(message) {
	logger.info('Product process message', message);
	
	var product = productHandler.parse(message.Body);
	
	productHandler.notify(product);
}

function processError(error) {
	logger.error('Product process error', error);
}

function ProductQueueHandler(aws) {
	QueueHandler.call(this, aws, 'kp-shop-products', processError, processMessage);
}

util.inherits(ProductQueueHandler, QueueHandler);

module.exports = ProductQueueHandler;
