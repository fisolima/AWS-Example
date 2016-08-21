
(function(){
	"use strict";

	var comm = {};

	com.warehouse.comm = comm;

	var processRequest = function(method, url, onError, onSuccess) {
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				switch (xhr.status)
				{
					case 200:
						onSuccess(xhr.responseText);
						break;

					default:
						onError(xhr.status, xhr.responseText);
						break;
				}
			}
		};

		xhr.open(method, url, true);

		xhr.send();
	};

	comm.get = function(url, onError, onSuccess) {
		processRequest('GET', url, onError, onSuccess);
	};

	comm.post = function(url, onError, onSuccess) {
		processRequest('POST', url, onError, onSuccess);
	};
}());
