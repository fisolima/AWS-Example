/* global ../node_modules/angular/angular.js */
/* global ../node_modules/socket.io/lib/socket.js */

(function(){

	"use strict";

	var app = angular.module('app');

	app.factory('comm', ['$rootScope', function($rootScope){
		var _webSocket = null;

		var _registeredEvents = [];

		var _invokeEvents = function(eventId, data) {
			console.log('emitted ' + eventId);

			var registeredEvent = _registeredEvents.find(function(event) {
				return event.eventId == eventId;
			});

			if (!registeredEvent)
				return;

			registeredEvent.callbacks.forEach(function(cb) {
				cb(data);
			});

			$rootScope.$digest();
		};

		var _activateRegisteredEvents = function() {
			if (!_webSocket)
				return;

			_registeredEvents.forEach(function(registeredEvent) {
				if (!registeredEvent.activated) {
					_webSocket.on(registeredEvent.eventId, function (data){
						_invokeEvents(registeredEvent.eventId, data);
					});

					registeredEvent.activated = true;
				}
			});
		};

		var _registerEvent = function(eventId, callback) {
			var registeredEvent = _registeredEvents.find(function(event) {
				return event.eventId == eventId;
			});

			if (!registeredEvent) {
				registeredEvent = {
					eventId: eventId,
					callbacks: [],
					activated: false
				};

				_registeredEvents.push(registeredEvent);
			}

			registeredEvent.callbacks.push(callback);

			_activateRegisteredEvents();
		};

		var _unregisterEvent = function(eventId, callback) {
			var registeredEvent = _registeredEvents.find(function(event) {
				return event.eventId == eventId;
			});

			if (!registeredEvent)
				return;

			var index = registeredEvent.callbacks.indexOf(callback);

			if (index >= 0)
				registeredEvent.callbacks = registeredEvent.callbacks.splice(index, 1);
		};

		var _connect = function() {
			if (_webSocket === null)
				_webSocket = io({transports: ['websocket']});

			_webSocket.on('connect', function(){
				_invokeEvents('connected', null);
			});

			_webSocket.on('disconnect', function(){
				_invokeEvents('disconnect', null);
			});

			_activateRegisteredEvents();
		};

		var _disconnect = function() {
			if (!_webSocket)
				return;

			_webSocket.disconnect();

			_webSocket = null;

			_registeredEvents.forEach(function(registeredEvent) {
				registeredEvent.activated = false;
			});
		};

		var _emit = function(eventId, data){
			_connect();

			_webSocket.emit(eventId, data);
		};

		return {
			registerEvent: _registerEvent,
			unregisterEvent: _unregisterEvent,
			connect: _connect,
			disconnect: _disconnect,
			emit: _emit
		};
	}]);
}());
