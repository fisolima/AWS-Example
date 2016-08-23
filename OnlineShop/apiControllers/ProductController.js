"use strict";

var productHandler = require('../services/ProductHandler');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	productHandler.getList(function (products){
		res.status(200).json(products);
	});
});

module.exports = router;
