/*!
 * ./client/controllers/register.controller.js
 *
 * Declares Register controller
 * Author: Abner Castro
 * Date: August 22nd, 2017
 */

(function () {
	'use strict';

	angular
		.module('auth.app')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$log'];

	function RegisterController($log) {
		var vm = this;

		vm.credentials = {
			name: "",
			email: "",
			password: ""
		};

		vm.submit = function () {

		}
	}
})();