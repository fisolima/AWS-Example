"use strict";

var path = require('path');
var express = require('express');
var logger = require('./services/LogService');
var app = express();
var http = require('http').Server(app);
var awsService = require('./services/AWSService');
var orderController = require('./apiControllers/OrderController');
var config = require('./config.json');

require('./services/CommService')(http);

http.listen(config.port);

logger.info("Online shop listening on " + config.port);

app.use(express.static(path.join(__dirname, 'public')));
app.use("/angular/angular.js",express.static(path.join(__dirname, "node_modules/angular/angular.js")));
app.use("/angular/angular-route.js",express.static(path.join(__dirname, "node_modules/angular-route/angular-route.js")));

app.use('/api/order', orderController);

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

awsService.load();

module.exports = app;
