"use strict";

var productService = require('../services/ProductService');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('productsView.html', {products: productService.get()});
});

module.exports = router;
