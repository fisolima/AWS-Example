
var aws = require('aws-sdk');

var load = function(config, callback) {
	try {
		aws.config.update(
		{
			accessKeyId: config.accessKeyId,
			secretAccessKey: config.secretAccessKey,
			region: config.region
		});

		callback(null, aws);
	}
	catch (err) {
		callback(err, null);
	}
};

module.exports = {
	load: load
};
