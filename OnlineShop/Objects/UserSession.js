"use strict";

var userSession = function(id, username, socket){
	this.id = id;
	this.username = username;
	this.socket = socket;
};

module.exports = userSession;
