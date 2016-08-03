"use strict";

var logger = require('./LogService');
var aws = require('aws-sdk');
var ProductQueueHandler = require('./ProductQueueHandler');

var _load = function(configFile){

	try {
		aws.config.loadFromPath(configFile);

		logger.info("AWSService ready");

		var productQueueHandler = new ProductQueueHandler(aws);

		// var params = {
		// 	MessageBody: JSON.stringify({type: 'mytype', data: 'myData'}),
		// 	QueueUrl: 'https://sqs.eu-central-1.amazonaws.com/883872337366/aws-example-shop',
		// 	DelaySeconds: 0
		// };
		//
		// sqs.sendMessage(params, function(err, data) {
		// 	if(err) {
		// 		logger.error("AWSService sqs send", err);
		// 	}
		// 	else {
		// 		logger.info("AWSService sqs send", data);
		// 	}
		// });
		//
		// var receiveParams = {
		// 	QueueUrl: 'https://sqs.eu-central-1.amazonaws.com/883872337366/aws-example-shop',
		// 	VisibilityTimeout: 600 // 10 min wait time for anyone else to process.
		// };
		//
		// sqs.receiveMessage(receiveParams, function(err, data) {
		// 	if(err) {
		// 		logger.error("AWSService sqs receive", err);
		// 	}
		// 	else {
		// 		logger.info("AWSService sqs receive", data);
		// 	}
		// });
	}
	catch (err){
		logger.error("AWSService", err);
	}
};

module.exports = {
	load: _load
};
