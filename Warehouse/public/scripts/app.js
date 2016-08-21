
(function(){
	"use strict";

	var app = {};

	com.warehouse.app = app;

	app.initialized = false;

	app.loadProducts = function() {
		com.warehouse.comm.get( '/products',
			function(status, data){
				com.warehouse.logger.error("Product list request failed", status, data);

				document.getElementById('productSection').innerHTML = 'An error occurred in the request, see logs';
			},
			function (data) {
				document.getElementById('productSection').innerHTML = data;
			});
	};

	window.onload = function() {
		if (com.warehouse.app.initialized)
			return;

		com.warehouse.logger.info("Starting...");

		com.warehouse.app.initialized = true;

		com.warehouse.app.loadProducts();

		com.warehouse.logger.info("Started");
	};
}());
