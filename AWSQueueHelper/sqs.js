
var Q = require('q');
var topicService = require('./sns');
var aws = require('aws-sdk');

var config = {
	waitTime: 10,
	visibilityTimeout: 25
};


var startQueueListener = function(sqs, queueUrl, onError, onMessage) {
	var receiveMessage = Q.nbind( sqs.receiveMessage, sqs );

	var pollMessages = function() {
		receiveMessage({
			QueueUrl: queueUrl,
			WaitTimeSeconds: config.waitTime,
			VisibilityTimeout: config.visibilityTimeout
		})
		.then(function(data) {

			if (!data.Messages)
				return;

			data.Messages.forEach(function(message) {
				process.nextTick(function() {
					onMessage(message);

					sqs.deleteMessage({
						QueueUrl: queueUrl,
						ReceiptHandle: message.ReceiptHandle
					}, function(err, data) {
						if (err)
							return console.log('%o', err);
					});
				});
			});
		})
		.catch(onError)
		.finally(pollMessages);
	};

	pollMessages();
};

var loadQueue = function(queueName, topicName, onError, onMessage) {
	var sqs = new aws.SQS();

	var listQueues = Q.nbind(sqs.listQueues, sqs);
	var createQueue = Q.nbind(sqs.createQueue, sqs);
	var getQueueAttributes = Q.nbind(sqs.getQueueAttributes, sqs);
	var setQueueAttributes = Q.nbind(sqs.setQueueAttributes, sqs);

	var queue = '';
	var queueArn = '';

	return listQueues({QueueNamePrefix: queueName})
			.then(function(data) {
				var queues = data.QueueUrls || [];

				queue = queues.find(function (queueUrl) {
					return queueUrl.endsWith('/' + queueName);
				});
			})
			.then(function(){
				if (!queue)
					return createQueue({
						QueueName: queueName
					});
			})
			.then(function(data) {
				if (data)
					queue = data.QueueUrl;

				startQueueListener(sqs, queue, onError, onMessage);
			})
			.then(function() {
				return getQueueAttributes({
					QueueUrl: queue,
					AttributeNames: ['QueueArn']
				});
			})
			.then(function(data){
				queueArn = data.Attributes['QueueArn'];

				return queueArn;
			})
			.then(function(queueArn) {
				if (topicName && topicName.length > 0) {
					topicService.subscribe(queueArn, topicName);

					return true;
				}
				else {
					return false
				}
			})
			.then(function(updateQueuePermission) {
				if (updateQueuePermission) {
					var policy = {
						"Version": "2012-10-17",
						"Statement": [
							{
								"Sid": "1",
								"Effect": "Allow",
								"Principal": "*",
								"Action": "SQS:*",
								"Resource": queueArn
							}
						]
					};

					return setQueueAttributes({
						QueueUrl: queue,
						Attributes: {
								Policy: JSON.stringify(policy)
							}
						});
				}
				else {
					return null;
				}
			});
			// .then(function(data) {
			// 	logger.info('Permission set: ' + data);
			// })
			// .catch(function(err) {
			// 	logger.error('aws find queue', err);
			// })
			// .finally(function() {
			// 	logger.info(queueName + ' initialized');
			// });
};

module.exports = {
	loadQueue: loadQueue,
	config: config
};

