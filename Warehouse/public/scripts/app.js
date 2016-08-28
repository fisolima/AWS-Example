
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

	app.addProduct = function() {
		var productId = document.getElementById('productId').value;

		com.warehouse.comm.put( '/products',
			{id: productId},
			function(status, data) {
				com.warehouse.logger.error("Product creation failed", status, data);
			},
			function (data) {
				com.warehouse.app.loadProducts();
			});
	};

	app.addProductUnit = function (control) {
		var productId = control.getAttribute('data-product-id');

		com.warehouse.comm.post( '/products/' + encodeURIComponent(productId) + '/unit',
			null,
			function(status, data) {
				com.warehouse.logger.error("Product unit increase failed", status, data);
			},
			function(data) {
				com.warehouse.app.loadProducts();
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
