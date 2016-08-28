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

router.put('/', bodyParser.json(), function(req, res, next) {
	productService.create(req.body,
		function (errorMessage) {
			res.status(400).end(errorMessage);
		},
		function (product) {
			res.status(200).end();
		});
});

router.post('/:productId/unit', function(req, res, next) {
	productService.refill(req.params.productId,
		function (errorMessage) {
			res.status(400).end(errorMessage);
		},
		function (product) {
			res.status(200).end();
		});
});

module.exports = router;
