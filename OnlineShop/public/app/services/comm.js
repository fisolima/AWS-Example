/* global ../node_modules/angular/angular.js */
/* global ../node_modules/socket.io/lib/socket.js */

(function(){

	"use strict";

	var app = angular.module('app');

	app.factory('comm', ['$rootScope', function($rootScope){
		var _webSocket = null;

		var _eventListener = {};

		var _invokeEvents = function(eventId, data) {
			console.log('emitted ' + eventId);

			if (!_eventListener.hasOwnProperty(eventId))
				return;

			_eventListener[eventId].forEach(function(callback) {
				callback(data);
			});

			$rootScope.$digest();
		};

		var _registerEvent = function(eventId, callback) {
			if (!_eventListener.hasOwnProperty(eventId))
				_eventListener[eventId] = [];

			_eventListener[eventId].push(callback);
		};

		var _unregisterEvent = function(eventId, callback) {
			if (!_eventListener.hasOwnProperty(eventId))
				return;

			_eventListener[eventId].pop(callback);
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

			_webSocket.on('authenticated', function (data){
				_invokeEvents('authenticated', data);
			});

			_webSocket.on('productUpdated', function (data){
				_invokeEvents('productUpdated', data);
			});

			_webSocket.on('orderUpdated', function (data){
				_invokeEvents('orderUpdated', data);
			});
		};

		var _disconnect = function() {
			if (!_webSocket)
				return;
			
			_webSocket.disconnect();

			_webSocket = null;
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
