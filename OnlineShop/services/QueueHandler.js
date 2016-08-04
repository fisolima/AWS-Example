
var Q = require('q');
var logger = require('./LogService');

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
		// process message
		.then(function(data) {

			if (!data.Messages)
				return;// logger.info('No message detected');

			data.Messages.forEach(onMessage);

			return deleteMessage({
				QueueUrl: queueUrl,
            	ReceiptHandle: data.Messages[ 0 ].ReceiptHandle
			});
		})
		// delete message
		// .then(function(message) {
		// 	logger.info('Message deletes', message);
		// })
		// handle error
		.catch(onError)
		// next message
		.finally(pollMessages);
	};

	pollMessages();
};

var QueueHandler = function(aws, queueName, onError, onMessage) {
	var sqs = new aws.SQS();

	sqs.listQueues({QueueNamePrefix: queueName}, function(err, data) {
		if (err)
			return logger.error('aws find queue', err, err);

		var queues = data.QueueUrls || [];

		var queue =  queues.find(function (queueUrl) {
			return queueUrl.endsWith('/' + queueName);
		});

		if (!queue) {
			sqs.createQueue({QueueName: queueName}, function(err, data) {
				if (err)
					return logger.error('aws create queue', err, err);

				logger.info('Queue created', data);

				startQueueListener(sqs, data.QueueUrl, onError, onMessage);
			});
		}
		else {
			logger.info('Queue found', queue);

			startQueueListener(sqs, queue, onError, onMessage);
		}
	});
};

module.exports = QueueHandler;
