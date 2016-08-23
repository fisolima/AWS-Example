
'use strict';

var EventEmitter = require('events');
var logger = require('./LogService');
var http = require('http');
var config = require('../config.json');

var productEmitter = new EventEmitter();

var parseProduct = function(productJson) {
	var product = {};
	
	try {
		product = JSON.parse(productJson);
	}
	catch (err) {
		return logger.error("Error parse product", err);
	}

	if (!product || !product.id || !product.quantity || !product.reserved)
		throw new Error("Invalid product data: " + productJson);

	return product;
};

var getList = function(callback) {
	http.get(
		config.warehouseUrl + '/api/products',
		function(res) {
			var body = '';

			res.on('data', function(data){
				body += data;
			});

			res.on('end', function(){
				callback(JSON.parse(body));
		});
	});
};

module.exports = {
	on: function(messageId, callback) {
		productEmitter.on(messageId, callback);
	},
	parse: parseProduct,
	notify: function(product) {
		productEmitter.emit('productUpdated', product);
	},
	getList: getList
};
