
var router = require('express').Router();
var logger = require('../services/LogService');
var bodyParser = require('body-parser');
var awsSnsService = require('aws-queue-helper/sns');
var Order = require('../objects/Order');
var orderHandler = require('../services/OrderHandler');

router.post('/', bodyParser.json(), function(req, res) {
	var orderRequest = req.body;

	if (!orderRequest || !orderRequest.username || !orderRequest.productId) {
		logger.error('Invalid order request: ', orderRequest);

		return res.status(400).send('Invalid order request');
	}

	var order = new Order();

	order.username = orderRequest.username;
	order.productId = orderRequest.productId;
	order.status = 'REQUESTED';

	logger.info('Order requested: ', order);

	var orderModel = orderHandler.convertToClientModel(order);

	logger.info('Order requested model: ', orderModel);

	orderHandler.notify(orderModel);

	awsSnsService.send('kp-order-request-topic', orderModel);

	res.sendStatus(200);
});

module.exports = router;