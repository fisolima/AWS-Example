"use strict";

var productService = require('../services/ProductService');
var express = require('express');
var router = express.Router();
var logger = require('../services/LogService');

router.get('/', function(req, res, next) {
	logger.info("Product list requested through View");

	res.render('productsView.html', {products: productService.get()});
});

module.exports = router;
