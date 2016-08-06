"use strict";

var path = require('path');
var logger = require('./LogService');

var errorRenderer = function(err, req, res, next){
	logger.error("Error:", err);

	res.send(JSON.parse(err));
};

module.exports =
	{
		ShowError: errorRenderer
	};
