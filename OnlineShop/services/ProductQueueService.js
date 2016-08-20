var QueueHandler = require('./QueueService');
var util = require('util');
var logger = require('./LogService');
var productHandler = require('./ProductHandler');
var aws = require('aws-sdk');

function processMessage(message) {
	logger.info('Product process message', message);
	
	var product = productHandler.parse(message.Body);
	
	productHandler.notify(product);
}

function processError(error) {
	logger.error('Product process error', error);
}

function ProductQueueHandler() {
	QueueHandler.call(this, 'kp-shop-products', 'kp-product-topic', processError, processMessage);
}

util.inherits(ProductQueueHandler, QueueHandler);

module.exports = ProductQueueHandler;
