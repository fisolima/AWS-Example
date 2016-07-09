"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var indexPagePath = path.join(__dirname, 'public', 'index.html');
	
	res.sendFile(indexPagePath);
});

module.exports = router;

