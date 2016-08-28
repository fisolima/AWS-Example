"use strict";

var awsSnsService = require('aws-queue-helper/sns');
var logger = require('./LogService');

var products = [
	{id: "Cof-Dom", available: 0, orders: []},
	{id: "Move-Dax", available: 0, orders: []},
	{id: "Anzozcore", available: 0, orders: []},
	{id: "Geolab", available: 0, orders: []},
	{id: "Blacklight", available: 0, orders: []},
	{id: "Doublekix", available: 0, orders: []},
	{id: "Tree-Tough", available: 0, orders: []},
	{id: "Whitesoldox", available: 0, orders: []},
	{id: "X-lux", available: 0, orders: []}
];

var getProducts = function() {
	return products;
};

var _notifyProductUpdate = function(product) {
	process.nextTick(function() {
		awsSnsService.send('kp-product-topic',
		{
			id: product.id,
			quantity: product.available + product.orders.length,
			reserved: product.orders.length
		})
		.catch(function(err) {
			logger.error("Send object to SNS", err);
		})
		.finally(function(){
			logger.info("Processed product creation");
		});
	});
};

var createProduct = function(product, onError, onSuccess) {
	var msg;

	if (!product || !product.id) {
		msg = "Invalid product format";

		logger.error(msg, product);

		return onError(msg);
	}

	var existingProduct = products.find(function (item) {
			return item.id == product.id;
		});

	if (existingProduct) {
		msg = "Product already exists";

		logger.error(msg);

		return onError(msg);
	}

	product.available = 0;
	product.orders = [];

	products.push(product);

	_notifyProductUpdate(product);

	onSuccess(product);
};

var refillProduct = function(productId, onError, onSuccess) {
	var product = products.find(function(item){
		return item.id == productId;
	});

	var msg;

	if (!product) {
		msg = "Product doesn't exists";

		logger.error(msg, productId);

		return onError(msg);
	}

	product.available++;

	_notifyProductUpdate(product);

	onSuccess(product);
};

var reserveProductUnit = function(productId, orderId, onError, onSuccess) {
	var product = products.find(function(item){
		return item.id == productId;
	});

	var msg;

	if (!product) {
		msg = "Product doesn't exists";

		logger.error(msg, productId);

		return onError(msg);
	}

	if (product.available === 0) {
		msg = "Not enough product units";

		logger.error(msg, productId);

		return onError(msg);
	}

	var order = product.orders.find(function(item) {
		return item == orderId;
	});

	if (!order) {
		msg = "Order already registered";

		logger.error(msg, {product: productId, order: orderId});

		return onError(msg);
	}

	product.available--;
	product.orders.push(orderId);

	_notifyProductUpdate(product);

	onSuccess(product);
};

module.exports = {
	get: getProducts,
	create: createProduct,
	refill: refillProduct,
	reserve: reserveProductUnit
};