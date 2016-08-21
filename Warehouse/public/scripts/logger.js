
(function(){
	"use strict";

	var logger = {};

	com.warehouse.logger = logger;

	logger.error = function(message, code, data){
		console.log('ERROR! ' + (code.toString() || '-1') + '\n' + message + '\n' + data);
	};

	logger.info = function(message, data) {
		console.log('INFO:\n' + message + (data ? JSON.stringify(data) + '\n' : ''));
	};
}());
