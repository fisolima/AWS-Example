"use strict";

var UserSession = require('../objects/UserSession');
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
		logger.info('US: ', username);

		var sessions = [];

		userSessionList.forEach(function(value){
			if (value.username == username)
				sessions.push(value);
		});

		return sessions;
	},
	findById: function(id){
		return userSessionList.find(function (value){
			return value.id === id;
		});
	},
	remove: function(userSession) {
		if (!userSession)
			return;
		
		var index = userSessionList.indexOf(userSession);

		if (index < 0)
			return;

		userSessionList.splice(index, 1);

		logger.info('Removed', userSession.username);
	}
};
