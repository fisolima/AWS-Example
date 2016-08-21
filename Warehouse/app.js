"use strict";

var path = require('path');
var express = require('express');
var logger = require('./services/LogService');
var EJS  = require('ejs');

var app = express();

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.engine('html', EJS.renderFile);
app.use("/css",express.static(path.join(__dirname, "public/styles")));
app.use("/js",express.static(path.join(__dirname, "public/scripts")));
app.use("/img",express.static(path.join(__dirname, "public/resources")));

app.use('/favicon.ico', function(req, res, next){
	res.end();
});

app.use('/', require('./controllers/homeController'));
app.use('/products', require('./controllers/productController'));

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	err.url = 'URL: ' + req.originalUrl;
	next(err);
});

app.use(require('./services/ErrorHandler').ShowError);

var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;

    logger.info('Online Shop listening at port', port);
});

module.exports = app;
