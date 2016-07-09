"use strict";

var path = require('path');
var express = require('express');
var logger = require('./services/LogService');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use("/css",express.static(path.join(__dirname, "public/styles")));
app.use("/js",express.static(path.join(__dirname, "public/scripts")));
app.use("/img",express.static(path.join(__dirname, "public/resources")));

app.use('/', require('./controllers/homeController'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// app.use(function(err, req, res, next){
// 	var pagePath = path.join(__dirname, 'public', 'error.html');
//
// 	res.sendFile(pagePath);
// });

app.use(require('./services/ErrorHandler').ShowError);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    logger.info('Online Shop listening at port', port);
});

module.exports = app;
