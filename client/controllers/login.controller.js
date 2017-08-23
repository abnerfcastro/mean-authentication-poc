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

    LoginController.$inject = ['$log'];

    function LoginController($log) {
        var vm = this;

        vm.credentials = {
            email: "",
            password: ""
        };

        vm.submit = function () {

        }
    }
})();