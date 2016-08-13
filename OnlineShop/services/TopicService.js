
var Q = require('q');
var logger = require('./LogService');

var topics = [];
var snsClient = null;

var subscribeQueue = function(aws, sqsQueueEndpoint, topicName) {
	snsClient = snsClient || new aws.SNS();

	var topic = null;

	var listTopics = Q.nbind(snsClient.listTopics, snsClient);
	var createTopic = Q.nbind(snsClient.createTopic, snsClient);
	var subscribe = Q.nbind(snsClient.subscribe, snsClient);

	var defer = Q.defer();

	defer.resolve(function() {
		topic = topics.find(function (item){
			return item.name == topicName;
		});
	})
	.then(function() {
		if (topic === null)
			return listTopics({});
	})
	.then(function(data) {
		if (topic) return;

		if (data) {
			var arn = data.Topics.find(function (item){
				return item.TopicArn.endsWith(':' + topicName);
			});

			if (arn && arn.length > 0)
				return {
					TopicArn: arn
				};
		}

		if (!topic)
			return createTopic({Name: topicName});
	})
	.then(function(data) {
		if (topic) return;

		topic = {
			name: topicName,
			arn: data.TopicArn
		};

		topics.push(topic);
	})
	.then(subscribe({
		Protocol: 'sqs',
		TopicArn: topic.arn,
		Endpoint: sqsQueueEndpoint
	}))
	.catch(function(err) {
		logger.error("SNS subscribe of " + topicName, err);
	})
	.finally(function(){
		logger.info("Subscription to " + topicName + " terminated");
	});
};

var sendObject = function(topicName, obj) {
};

module.exports = {
	subscribe: subscribeQueue,
	send: sendObject
};