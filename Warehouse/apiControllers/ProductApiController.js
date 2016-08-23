"use strict";

var productService = require('../services/ProductService');
var express = require('express');
var router = express.Router();
var logger = require('../services/LogService');

router.get('/', function(req, res, next) {

	logger.info("Product list requested through API");

	var products = productService.get().map(function(item){
		return {
			id: item.id,
			quantity: item.available + item.orders.length,
			reserved: item.orders.length
		};
	});

	res.status(200).json(products);
});

module.exports = router;
