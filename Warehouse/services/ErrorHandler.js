"use strict";

var path = require('path');
var logger = require('./LogService');

var errorRenderer = function(err, req, res, next){
	var pagePath = path.join(__dirname, '../public', 'error.html');

	logger.error("Error:", err);

	res.sendFile(pagePath);
};

module.exports =
	{
		ShowError: errorRenderer
	};
