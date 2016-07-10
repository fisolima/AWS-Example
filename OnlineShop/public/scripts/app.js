/* global com */

"use strict";

com.shop.app = (function(){

	var _username = '';
	var _webSocket = null;

	var headerUserLoggedPanel = $('#headerUserLogged');
	var loginSection = $('#loginSection');
	var shopSection = $('#shopSection');

	var setupInterface = function(){
		headerUserLoggedPanel.css('display','none');
		shopSection.css('display','none');

		var loginButton = $('#loginSignIn');
		var loginUsernameText = $('#loginUsername');

		loginButton.prop("disabled",true);

		loginUsernameText.on('input propertychange paste', function() {
			loginButton.prop("disabled", loginUsernameText.val().length === 0);
		});

		loginButton.click(function(){
			var username = loginUsernameText.val();

			login(username);
		});

		$('#headerSignOut').click(function(){
			logout();
		});
	};

	var finalizeAuthentication = function (id){
		console.log('finalize: ' + id);

		headerUserLoggedPanel.css('display','block');
		loginSection.css('display','none');
		shopSection.css('display','block');

		headerUserLoggedPanel.find('label').html('Welcome ' + _username + ' (' + id + ')');
	};

	var connect = function(username){
		_webSocket = io({transports: ['websocket']});

		_webSocket.on('connect', function(){
			console.log('connected');
		});

		_webSocket.on('disconnect', function(){
			console.log('disconnected');
		});

		_webSocket.on('authenticated', function (data){
			finalizeAuthentication(data);

			sessionStorage.setItem('com.shop.username', username);
		});

		_webSocket.emit('authenticate', username);
	};

	var login = function(username){
		_username = username;

		console.log(_username);

		connect(_username);
	};

	var logout  = function(){
		_username = '';

		if (_webSocket)
			_webSocket.disconnect();

		_webSocket = null;

		sessionStorage.removeItem('com.shop.username');

		headerUserLoggedPanel.css('display','none');
		loginSection.css('display','block');
		shopSection.css('display','none');
	};

	return {
		startup: function(){
			setupInterface();

			console.log('Online Shop ready');

			var username = sessionStorage.getItem('com.shop.username');

			if (username)
				login(username);
		},
		getUsername: function(){return _username;}
	};
}());
