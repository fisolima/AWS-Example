"use strict";

var logger = require('./LogService');
var aws = require('aws-sdk');
var ProductQueueService = require('./ProductQueueService');
var OrderQueueService = require('./OrderQueueService');

var _load = function(configFile){

	try {
		aws.config.loadFromPath(configFile);

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
