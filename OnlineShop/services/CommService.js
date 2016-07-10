"use strict";

var socketio = require('socket.io');
var logger = require('./LogService');
var userSessionService = require('./UserSessionService');

var comm = function(http){
	var io = socketio(http);

	io.set('transports', ['websocket']);

	io.on('connection', function (socket){

		logger.info('connection', socket.id);

		socket.on('authenticate', function (data){
			logger.info('authenticate', data);

			userSessionService.createSession(data, socket);
		});
		
		socket.on('disconnect', function (){
			logger.info('User disconnected', socket.id);
		});
	});
};

module.exports = comm;
