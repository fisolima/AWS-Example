"use strict";

var path = require('path');
var express = require('express');
var logger = require('./services/LogService');
var EJS  = require('ejs');
var app = express();
var http = require('http').Server(app);
var socketio = require('socket.io');
var config = require('../config.json');

var io = socketio(http);

http.listen(config.checkout.port);

logger.info('Warehouse listening on ' + config.checkout.port);

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.engine('html', EJS.renderFile);

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use("/css",express.static(path.join(__dirname, "public/styles")));
app.use("/js",express.static(path.join(__dirname, "public/scripts")));
app.use("/img",express.static(path.join(__dirname, "public/resources")));

app.use('/favicon.ico', function(req, res, next){
	res.end();
});

app.use('/', require('./controllers/homeController'));


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

	var orderRequestQueueService = require('./services/OrderRequestQueueService');

	awsSQSHelper
		.loadQueue('kp-checkout-order-request', 'kp-order-request-topic', orderRequestQueueService.processError, orderRequestQueueService.processMessage)
		.then(function(data) {
			if (data)
				logger.info('Permission set: ', data);
		})
		.catch(function(err) {
			logger.error('aws find queue', err);
		})
		.finally(function() {
			logger.info('kp-checkout-orders initialized');
		});
});

module.exports = app;
