"use strict";

var path = require('path');
var express = require('express');
var logger = require('./services/LogService');
var app = express();
var http = require('http').Server(app);
var config = require('../config.json');

require('./services/CommService')(http);

http.listen(config.onlineShop.port);

logger.info("Online shop listening on " + config.onlineShop.port);

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use("/angular/angular.js",express.static(path.join(__dirname, "node_modules/angular/angular.js")));
app.use("/angular/angular-route.js",express.static(path.join(__dirname, "node_modules/angular-route/angular-route.js")));

app.use('/api/order', require('./apiControllers/OrderController'));
app.use('/api/products', require('./apiControllers/ProductController'));

app.get('*',function(req, res, next) {
	var indexPagePath = path.join(__dirname, 'public', 'index.html');

	res.sendFile(indexPagePath);
});

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	err.url = 'URL: ' + req.originalUrl;
	next(err);
});

app.use(require('./services/ErrorHandler').ShowError);

var awsHelper = require('aws-queue-helper');
var awsSQSHelper = require('aws-queue-helper/sqs');

awsHelper.load(config.aws, function(err, aws) {
	if (err)
		return logger.error("AWS initialization", err);

	logger.info("AWS ready");

	var productQueueService = require('./services/ProductQueueService');

	awsSQSHelper
		.loadQueue('kp-shop-products', 'kp-product-topic', productQueueService.processError, productQueueService.processMessage)
		.then(function(data) {
			if (data)
				logger.info('Permission set: ', data);
		})
		.catch(function(err) {
			logger.error('aws find queue', err);
		})
		.finally(function() {
			logger.info('kp-shop-products initialized');
		});

	var orderQueueService = require('./services/OrderQueueService');

	awsSQSHelper
		.loadQueue('kp-shop-orders', 'kp-order-topic', orderQueueService.processError, orderQueueService.processMessage)
		.then(function(data) {
			if (data)
				logger.info('Permission set: ', data);
		})
		.catch(function(err) {
			logger.error('aws find queue', err);
		})
		.finally(function() {
			logger.info('kp-shop-orders initialized');
		});
});

module.exports = app;
