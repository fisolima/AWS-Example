
'use strict';

var EventEmitter = require('events');

var productEmitter = new EventEmitter();

var products = [];


// test
var productIndex = 0;

setInterval(function() {
	if (products.length < 10){
		var product = {
			id: 'Prd' + products.length.toString(),
			quantity: 10,
			reserved: 10
		};

		products.push(product);

		productEmitter.emit('productUpdated', product);
	}
	else {
		if (productIndex === products.length)
			productIndex = 0;

		var product = products[productIndex++];

		product.quantity++;
		product.reserved++;

		productEmitter.emit('productUpdated', product);
	}

}, 2000);


module.exports = {
	eventEmitter: productEmitter	
};
