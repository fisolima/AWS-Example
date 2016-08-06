
"use strict";

function Order(orderData)
{
	this._id = orderData.id;
	this._username = orderData.username;
	this._productName = orderData.productName;
	this._requestDate = orderData.requestDate;
	this._updateDate = orderData.updateDate;
	this._status = orderData.status || 'PENDING';
}

Object.defineProperty(Order.prototype, 'status',{
	get: function() {
		return this._status;
	},
	set: function(val) {
		this._status = val;
	}
});

Object.defineProperty(Order.prototype, 'id',{
	get: function() {
		return this._id;
	}
});

Object.defineProperty(Order.prototype, 'username',{
	get: function() {
		return this._username;
	}
});

Object.defineProperty(Order.prototype, 'productName',{
	get: function() {
		return this._productName;
	}
});

Object.defineProperty(Order.prototype, 'requestDate',{
	get: function() {
		return this._requestDate;
	}
});

Object.defineProperty(Order.prototype, 'updateDate',{
	get: function() {
		return this._updateDate;
	},
	set: function(val) {
		this._updateDate = val;
	}
});
