"use strict";

var path = require('path');
var express = require('express');
var logger = require('./services/LogService');
var app = express();
var http = require('http').Server(app);
var comm = require('./services/CommService')(http);
var awsService = require('./services/AWSService');

http.listen(3000);

logger.info("Online shop listening on 3000");

app.use(express.static(path.join(__dirname, 'public')));
app.use("/angular/angular.js",express.static(path.join(__dirname, "node_modules/angular/angular.js")));
app.use("/angular/angular-route.js",express.static(path.join(__dirname, "node_modules/angular-route/angular-route.js")));

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

awsService.load(path.join(__dirname, "config.json"));

module.exports = app;
