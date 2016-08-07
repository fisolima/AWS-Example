
var router = require('express').Router();
var logger = require('../services/LogService');
var bodyParser = require('body-parser');

router.post('/', bodyParser.json(), function(req, res) {
	var orderRequest = req.body;

	if (!orderRequest || !orderRequest.username || !orderRequest.productName) {
		logger.error('Invalid order request: ', orderRequest);

		return res.status(400).send('Invalid order request');
	}

	logger.info('Order requested: ', orderRequest);

	// TODO send order request message

	res.sendStatus(200);
});

module.exports = router;