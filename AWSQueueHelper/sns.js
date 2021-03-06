
var Q = require('q');
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
					console.log("Creating topic: " + topicName);

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

	return findOrCreateTopic(topicName)
			.then(function(topic) {
				return subscribe({
					Protocol: 'sqs',
					TopicArn: topic.arn,
					Endpoint: queueArn
				})
			});
};

var sendObject = function(topicName, obj) {
	snsClient = snsClient || new aws.SNS();

	var publish = Q.nbind(snsClient.publish, snsClient);

	return findOrCreateTopic(topicName)
			.then(function(topic) {
				return publish({
					Message: JSON.stringify(obj),
					TopicArn: topic.arn
				});
			});
};

module.exports = {
	subscribe: subscribeQueue,
	send: sendObject
};