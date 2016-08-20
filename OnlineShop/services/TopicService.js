
var Q = require('q');
var logger = require('./LogService');
var aws = require('aws-sdk');

var topics = [];
var snsClient = null;

var findOrCreateTopic = function(topicName) {
	snsClient = snsClient || new aws.SNS();

	var listTopics = Q.nbind(snsClient.listTopics, snsClient);
	var createTopic = Q.nbind(snsClient.createTopic, snsClient);

	var topic = null;

	return Q.fcall(function() {
				topic = topics.find(function (item){
					return item.name == topicName;
				});
			})
			.then(function() {
				if (!topic)
					return listTopics({});
			})
			.then(function(data) {
				if (topic)
					return topic;

				if (data) {
					var currentTopic = data.Topics.find(function (item){
						return item.TopicArn.endsWith(':' + topicName);
					});

					if (currentTopic)
						return currentTopic;
				}

				if (!topic) {
					logger.info("Creating topic: " + topicName);

					return createTopic({Name: topicName});
				}
			})
			.then(function(data) {
				if (topic)
					return topic;

				topic = {
					name: topicName,
					arn: data.TopicArn
				};

				topics.push(topic);

				return topic;
			});
};

var subscribeQueue = function(queueArn, topicName) {
	snsClient = snsClient || new aws.SNS();

	var subscribe = Q.nbind(snsClient.subscribe, snsClient);

	findOrCreateTopic(topicName)
		.then(function(topic) {
			return subscribe({
				Protocol: 'sqs',
				TopicArn: topic.arn,
				Endpoint: queueArn
			})
		})
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