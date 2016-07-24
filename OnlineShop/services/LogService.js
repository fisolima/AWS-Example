"use strict";

var logType = {
	error: 'ERROR',
	warning: 'WARNING',
	info: 'INFO'
};


var writeError = function (message, err, obj)
{
	console.error(
		logType.error +	' - ' + (new Date()) + '\n' +
		message + '\n' +
		err + '\n' +
		((obj !== undefined) ? JSON.stringify(obj) + '\n' : ''));
};

var writeWarning = function (message, obj)
{
	console.warn(
		logType.warning + ' - ' + (new Date()) + '\n' +
		message + '\n' +
		((obj !== undefined) ? JSON.stringify(obj) + '\n' : ''));
};

var writeInfo = function (message, obj)
{
	console.log(
		logType.info + ' - ' + (new Date()) + '\n' +
		message + '\n' +
		((obj !== undefined) ? JSON.stringify(obj) + '\n' : ''));
};

module.exports =
{
	error: writeError,
	warn: writeWarning,
	info: writeInfo
};

