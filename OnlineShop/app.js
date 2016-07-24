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
app.use("/css",express.static(path.join(__dirname, "public/styles")));
app.use("/js",express.static(path.join(__dirname, "public/scripts")));
app.use("/img",express.static(path.join(__dirname, "public/resources")));
app.use("/angular/angular.js",express.static(path.join(__dirname, "node_modules/angular/angular.js")));

app.use('/', require('./controllers/homeController'));

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	err.url = req.originalUrl;
	next(err);
});

app.use(require('./services/ErrorHandler').ShowError);

awsService.load(path.join(__dirname, "config.json"));

module.exports = app;
