"use strict";

var path = require('path');
var express = require('express');
var logger = require('./services/LogService');
var EJS  = require('ejs');
var app = express();
var http = require('http').Server(app);
var socketio = require('socket.io');
var config = require('./config.json');

var io = socketio(http);

http.listen(config.port);

logger.info('Warehouse listening on ' + config.port);

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

app.use('/', require('./controllers/HomeController'));
app.use('/products', require('./controllers/ProductController'));
app.use('/api/products', require('./apiControllers/ProductApiController'));

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	err.url = 'URL: ' + req.originalUrl;
	next(err);
});

app.use(require('./services/ErrorHandler').ShowError);

module.exports = app;
