var util = require('util');
var logger = require('./LogService');
var orderHandler = require('./OrderHandler');
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

	var order = orderHandler.parse(messageBody);

	orderHandler.notify(order);

	logger.info('Order process message', order);
}

function processError(error) {
	logger.error('Order process error', error);
}

module.exports = {
	processMessage: processMessage,
	processError: processError
};
