"use strict";

var socketio = require('socket.io');
var logger = require('./LogService');
var userSessionService = require('./UserSessionService');
var productHandler = require('./ProductHandler');

var comm = function(http) {
	var io = socketio(http);

	io.set('transports', ['websocket']);

	io.on('connection', function (socket){

		logger.info('connection', socket.id);

		socket.on('authenticate', function (data){
			logger.info('authenticate', data);

			userSessionService.create(data, socket);
		});
		
		socket.on('disconnect', function (){
			var userSession = userSessionService.findById(socket.id);

			if (userSession) {
				userSessionService.remove(userSession);

				logger.info('User disconnected', userSession.username);
			}
		});
	});

	productHandler.on('productUpdated', function(product) {
		io.sockets.emit('productUpdated', product);
	});
};

module.exports = comm;
