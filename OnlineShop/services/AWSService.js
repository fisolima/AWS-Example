"use strict";

var logger = require('./LogService');
var aws = require('aws-sdk');
var ProductQueueService = require('./ProductQueueService');
var OrderQueueService = require('./OrderQueueService');
var config = require('../config.json');

var _load = function(){

	try {
		aws.config.update(
			{
				accessKeyId: config.aws.accessKeyId,
				secretAccessKey: config.aws.secretAccessKey,
				region: config.aws.region
			});

		logger.info("AWSService ready");

		var productQueue = new ProductQueueService();

		var orderQueue = new OrderQueueService();
	}
	catch (err){
		logger.error("AWSService", err);
	}
};

module.exports = {
	load: _load
};
