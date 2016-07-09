"use strict";

var logType = {
	error: 'ERROR',
	warning: 'WARNING',
	info: 'INFO'
};

var WriteLog = function(type, message, obj)
{
	console.log( type + ' - ' + message + ((obj !== undefined) ? JSON.stringify(obj) : ''));
};

var writeError = function (message, err, obj)
{
	WriteLog(logType.error, message, obj !== null ? {err: err, obj: obj} : err);
};

var writeWarning = function (message, obj)
{
	WriteLog(logType.warning, message, obj);
};

var writeInfo = function (message, obj)
{
	WriteLog(logType.info, message, obj);
};

module.exports =
{
	error: writeError,
	warn: writeWarning,
	info: writeInfo
};

