"use strict";

var chalk = require('chalk');

var logType = {
	error: 'ERROR',
	warning: 'WARNING',
	info: 'INFO'
};


var writeError = function (message, err, obj)
{
	console.log(
		chalk.red(logType.error) +
		' ' +
		chalk.white(message) +
		'\n' +
		chalk.yellow(err) +
		'\n' +
		chalk.green((obj !== undefined) ? JSON.stringify(obj) : '')
	);
};

var writeWarning = function (message, obj)
{
	console.log(
		chalk.yellow(logType.warning) +
		' ' +
		chalk.white(message) +
		'\n' +
		chalk.green((obj !== undefined) ? JSON.stringify(obj) : '')
	);
};

var writeInfo = function (message, obj)
{
	console.log(
		chalk.blue(logType.info) +
		' ' +
		chalk.white(message) +
		'\n' +
		chalk.green((obj !== undefined) ? JSON.stringify(obj) : '')
	);
};

module.exports =
{
	error: writeError,
	warn: writeWarning,
	info: writeInfo
};

