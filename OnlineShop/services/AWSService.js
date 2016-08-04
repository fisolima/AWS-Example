"use strict";

var logger = require('./LogService');
var aws = require('aws-sdk');
var ProductQueueHandler = require('./ProductQueueHandler');
var OrderQueueHandler = require('./OrderQueueHandler');

var _load = function(configFile){

	try {
		aws.config.loadFromPath(configFile);

		logger.info("AWSService ready");

		var productQueueHandler = new ProductQueueHandler(aws);

		var orderQueueHandler = new OrderQueueHandler(aws);
	}
	catch (err){
		logger.error("AWSService", err);
	}
};

module.exports = {
	load: _load
};
