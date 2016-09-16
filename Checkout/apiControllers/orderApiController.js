"use strict";

var express = require('express');
var router = express.Router();
var orderService = require('../services/OrderService');
var logger = require('../services/LogService');

router.get('/:username', function(req, res, next) {
	orderService.find({username: req.params.username}, function(err, orders) {
		logger.info('Orders of ' + req.params.username, orders);

		res.json(orders);
	});
});

module.exports = router;
