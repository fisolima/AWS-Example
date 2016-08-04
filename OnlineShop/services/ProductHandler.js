
'use strict';

var EventEmitter = require('events');
var logger = require('./LogService');
var productEmitter = new EventEmitter();

var parseProduct = function(productJson) {

	try {
		var product = JSON.parse(productJson);
	}
	catch (err) {
		logger.error("Error parse product", err, err);
	}


	if (!product || !product.id || !product.quantity || !product.reserved)
		throw new Error("Invalid product data: " + productJson);

	return product
};

module.exports = {
	eventEmitter: productEmitter,
	parse: parseProduct,
	notify: function(product) {
		productEmitter.emit('productUpdated', product);
	}
};
