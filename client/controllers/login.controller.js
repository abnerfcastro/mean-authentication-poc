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
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$log', '$location', 'Authentication'];

	function LoginController($log, $location, $authentication) {
		var vm = this;

		vm.credentials = {
			email: "",
			password: ""
		};

		vm.submit = function () {
			$authentication
				.login(vm.credentials)
				.then(() => {
					// redirects to profile
					$location.path('/profile');
				})
				.catch(err => {
					console.log(err);
				})
		}
	}
})();