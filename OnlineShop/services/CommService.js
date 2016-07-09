"use strict";

var socketio = require('socket.io');
var logger = require('./LogService');

var comm = function(http){
	var io = socketio(http);

	io.set('transports', ['websocket']);

	io.on('connection', function (socket){
		logger.info('User connected', socket.id);

		socket.on('disconnect', function (){
			logger.info('User disconnected', socket.id);
		});
	});
};

module.exports = comm;
