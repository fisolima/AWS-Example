"use strict";

var UserSession = require('../Objects/UserSession');
var logger = require('./LogService');

var userSessionList = [];

module.exports = {
	create: function(username, socket){
		var userSession = new UserSession(socket.id, username, socket);
		
		userSessionList.push(userSession);

		if (socket)
			socket.emit('authenticated', userSession.id);

		logger.info('authenticated', {id: userSession.id, username: userSession.username});
	},
	findByUsername: function(username) {
		return userSessionList.filter(function(value){
			return value.username == username;
		});
	},
	findById: function(id){
		return userSessionList.find(function (value){
			return value.id === id;
		});
	}
};
