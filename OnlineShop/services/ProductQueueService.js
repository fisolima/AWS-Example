var util = require('util');
var logger = require('./LogService');
var productHandler = require('./ProductHandler');
var aws = require('aws-sdk');

function processMessage(message) {
	var messageBody, type;

	var bodyParse = JSON.parse(message.Body);

	type = bodyParse.Type || 'SQSMessage';

	switch (type) {
		case 'SQSMessage':
			messageBody = message.Body;
			break;
		case 'Notification':
			messageBody = bodyParse.Message;
			break;
	}

	logger.info('Product process message', messageBody);
	
	var product = productHandler.parse(messageBody);
	
	productHandler.notify(product);
}

function processError(error) {
	logger.error('Product process error', error);
}

module.exports = {
	processMessage: processMessage,
	processError: processError
};
