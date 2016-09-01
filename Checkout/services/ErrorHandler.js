"use strict";

var path = require('path');
var logger = require('./LogService');

var errorRenderer = function(err, req, res, next){
	logger.error("Error:", err);

	res.status(400).send(err ? JSON.stringify(err) : "Unknown error");
};

module.exports =
	{
		ShowError: errorRenderer
	};
