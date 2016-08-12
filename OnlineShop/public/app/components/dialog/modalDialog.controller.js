/* global ../node_modules/angular/angular.js */

(function(){

	"use strict";

	var app = angular.module('app');

	var dialogController = function() {
		var ctrl = this;

		ctrl.message = ctrl.message || '<empty>';
		ctrl.dialogVisible = ctrl.dialogVisible || false;

		ctrl.hide = function() {
			ctrl.dialogVisible = !ctrl.dialogVisible;
		};
	};

	app.component('modalDialog', {
		bindings: {
			message: '=',
			dialogVisible: '='
		},
		templateUrl: '/app/components/dialog/modalDialog.view.html',
		controller: dialogController,
		controllerAs: 'dialogController'
	});
}());
