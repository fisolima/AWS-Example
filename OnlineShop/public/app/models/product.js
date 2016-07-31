
"use strict";

var Product = function(productName) {
	this._id = productName;
	this._quantity = 0;
	this._reserved = 0;
};

Object.defineProperty(Product.prototype, 'quantity',{
	get: function() {
		return this._quantity;
	},
	set: function(val) {
		if (!val || val < 0)
			throw new Error('Product quantity must be a natural number: ' + val);

		this._quantity = val;
	}
});

Object.defineProperty(Product.prototype, 'reserved',{
	get: function() {
		return this._reserved;
	},
	set: function(val) {
		if (!val || val < 0)
			throw new Error('Product reserved must be a natural number:' + val);

		this._reserved = val;
	}
});

Object.defineProperty(Product.prototype, 'id', {
	get: function() {
		return this._id;
	},
	set: function(val) {
		if (!val || val.length == 0)
			throw new Error('Product name cannot be empty');

		this._id = val;
	}
});

