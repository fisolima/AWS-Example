
var router = require('express').Router();
var logger = require('../services/LogService');
var bodyParser = require('body-parser');
var awsSnsService = require('aws-queue-helper/sns');

router.post('/', bodyParser.json(), function(req, res) {
	var orderRequest = req.body;

	if (!orderRequest || !orderRequest.username || !orderRequest.productId) {
		logger.error('Invalid order request: ', orderRequest);

		return res.status(400).send('Invalid order request');
	}

	logger.info('Order requested: ', orderRequest);

	awsSnsService.send('kp-order-request-topic', orderRequest);

	res.sendStatus(200);
});

module.exports = router;