
'use strict';

var EventEmitter = require('events');
var logger = require('./LogService');
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

module.exports = {
	on: function(messageId, callback) {
		productEmitter.on(messageId, callback);
	},
	parse: parseProduct,
	notify: function(product) {
		productEmitter.emit('productUpdated', product);
	}
};
