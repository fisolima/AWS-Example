
var Q = require('q');
var logger = require('./LogService');
var topicService = require('./TopicService');
var aws = require('aws-sdk');

var startQueueListener = function(sqs, queueUrl, onError, onMessage) {
	logger.info('Queue started', queueUrl);

	var receiveMessage = Q.nbind( sqs.receiveMessage, sqs );
	var deleteMessage = Q.nbind( sqs.deleteMessage, sqs );

	var pollMessages = function() {
		receiveMessage({
			QueueUrl: queueUrl,
			WaitTimeSeconds: 3,
			VisibilityTimeout: 60
		})
		.then(function(data) {

			if (!data.Messages)
				return;// logger.info('No message detected');

			data.Messages.forEach(onMessage);

			return deleteMessage({
				QueueUrl: queueUrl,
            	ReceiptHandle: data.Messages[0].ReceiptHandle
			});
		})
		.catch(onError)
		.finally(pollMessages);
	};

	pollMessages();
};

var QueueHandler = function(queueName, topicName, onError, onMessage) {
	var sqs = new aws.SQS();

	var listQueues = Q.nbind(sqs.listQueues, sqs);
	var createQueue = Q.nbind(sqs.createQueue, sqs);
	var getQueueAttributes = Q.nbind(sqs.getQueueAttributes, sqs);
	var setQueueAttributes = Q.nbind(sqs.setQueueAttributes, sqs);

	var queue = '';
	var queueArn = '';

	listQueues({QueueNamePrefix: queueName})
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
			topicService.subscribe(queueArn, topicName);
		})
		.then(function() {
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
		})
		.then(function(data) {
			logger.info('Permission set: ' + data);
		})
		.catch(function(err) {
			logger.error('aws find queue', err);
		})
		.finally(function() {
			logger.info(queueName + ' initialized');
		});
};

module.exports = QueueHandler;
