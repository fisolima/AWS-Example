"use strict";

var productService = require('../services/ProductService');
var express = require('express');
var router = express.Router();
var logger = require('../services/LogService');
var bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
	logger.info("Product list requested through View");

	res.render('productsView.html', {products: productService.get()});
});

router.post('/', bodyParser.json(), function(req, res, next) {

	var product = req.body;

	if (!product || !product.id) {
		logger.error("Invalid product format", product);

		return res.status(400).end("Invalid product format");
	}

	var existingProduct = productService.get().find(function (item) {
			return item.id == product.id;
		});

	if (existingProduct) {
		logger.error("Product already exists");

		return res.status(400).end("Product already exists");
	}

	logger.info("Product creation:");

	productService.create(product);

	res.status(200).end();
});

module.exports = router;
