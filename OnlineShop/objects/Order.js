
"use strict";

var uuid = require('node-uuid');

function Order(orderData)
{
	if (orderData) {
		this._id = orderData.id;
		this._requestId = orderData.requestId;
		this._username = orderData.username;
		this._productId = orderData.productId;
		this._status = orderData.status || 'PENDING';
	}
	else {
		this._requestId = uuid.v1();
	}
}

Object.defineProperty(Order.prototype, 'id',{
	get: function() {
		return this._id;
	}
});

Object.defineProperty(Order.prototype, 'requestId',{
	get: function() {
		return this._requestId;
	}
});

Object.defineProperty(Order.prototype, 'username',{
	get: function() {
		return this._username;
	},
	set: function(val) {
		this._username = val;
	}
});

Object.defineProperty(Order.prototype, 'productId',{
	get: function() {
		return this._productId;
	},
	set: function(val) {
		this._productId = val;
	}
});

Object.defineProperty(Order.prototype, 'status',{
	get: function() {
		return this._status;
	},
	set: function(val) {
		this._status = val;
	}
});

module.exports = Order;