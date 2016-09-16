"use strict";

var logger = require('./LogService');
var orderService = require('./OrderService');

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

	logger.info('Order process message', messageBody);

	orderService.add(JSON.parse(messageBody));
}

function processError(error) {
	logger.error('Order process error', error);
}

module.exports = {
	processMessage: processMessage,
	processError: processError
};