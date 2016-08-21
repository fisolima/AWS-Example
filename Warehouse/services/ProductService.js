"use strict";

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

var refillProduct = function(productId) {
	var product = products.find(function(item){
		return item.id == productId;
	});

	if (!product) {
		logger.error("Product doesn't exists", productId);

		return false;
	}

	product.available++;

	// TODO send notification

	return true;
};

var reserveProductUnit = function(productId, orderId) {
	var product = products.find(function(item){
		return item.id == productId;
	});

	if (!product) {
		logger.error("Product doesn't exists", productId);

		return false;
	}

	if (product.available === 0) {
		logger.error("Not enough product units", productId);

		return false;
	}

	var order = product.orders.find(function(item) {
		return item == orderId;
	});

	if (!order) {
		logger.error("Order already registered:", {product: productId, order: orderId});

		return false;
	}

	product.available--;
	product.orders.push(orderId);

	// TODO send notification

	return true;
};

module.exports = {
	get: getProducts,
	refill: refillProduct,
	reserve: reserveProductUnit
};