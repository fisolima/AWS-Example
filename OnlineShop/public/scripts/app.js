/* global com */

"use strict";

com.shop.app = (function(){

	var _username = '';

	var setupInterface = function(){
		$('#headerUserLogged').css('display','none');

		$('#loginSignIn').prop("disabled",true);

		$('#loginUsername').on('input propertychange paste', function() {
			$('#loginSignIn').prop("disabled", $('#loginUsername').val().length === 0);
		});

		$('#loginSignIn').click(function(){
			var username = $('#loginUsername').val();

			login(username);
		});
	};

	var login = function(username){
		_username = username;

		console.log(_username);
		
		// var socket = io({transports: ['websocket']});
		//
		// socket.on('connect', function(){
		// 	console.log('connected');
		// });
		//
		// socket.on('confirm', function(data){
		//   console.log(JSON.stringify(data));
		// });
		//
		// socket.on('disconnect', function(){
		// 	console.log('disconnected');
		// });
	};

	var logout  = function(){
		_username = '';
	};

	return {
		startup: function(){
			setupInterface();

			console.log('Online Shop ready');
		},
		getUsername: function(){return _username;}
	};
}());
