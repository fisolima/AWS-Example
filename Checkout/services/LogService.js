"use strict";

var logType = {
	error: 'ERROR',
	warning: 'WARNING',
	info: 'INFO'
};


var writeError = function (message, obj)
{
	var e = (obj instanceof Error) ? obj : new Error('stackquery');

	console.error(
		logType.error +	' - ' + (new Date()) + '\n' +
		message + '\n' +
		((obj !== undefined) ? JSON.stringify(obj) : '') + '\n' +
		e.stack + '\n');
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

