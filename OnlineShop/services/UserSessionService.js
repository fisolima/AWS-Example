"use strict";

var UserSession = require('../Objects/UserSession');
var logger = require('./LogService');

var userSessionList = [];

module.exports = {
	createSession: function(username, socket){
		var userSession = new UserSession(socket.id, username, socket);
		
		userSessionList[userSession.id] = userSession;

		if (socket)
			socket.emit('authenticated', userSession.id);

		logger.info('authenticated', {id: userSession.id, username: userSession.username});
	},
	findSessionByUsername: function(username) {
		return userSessionList.filter(function(userSession){
			userSession.username == username;
		});
	},
	findSessionById: function(id){
		return userSessionList[id];
	}
};
