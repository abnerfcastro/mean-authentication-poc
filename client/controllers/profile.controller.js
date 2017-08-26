/*!
 * ./client/controllers/profile.controller.js
 *
 * Declares Profile controller
 * Author: Abner Castro
 * Date: August 24th, 2017
 */

(function() {
    'use strict';

    angular
        .module('auth.app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$location', 'Authentication'];

    function ProfileController($location, Authentication) {
        var vm = this;

        vm.user = {}

        vm.logout = function () {
            Authentication.logout();
            $location.path('/');
        }

        vm.isAdmin = function () {
            return Authentication.isAdmin();
        }

        activate();

        ////////////////

        function activate() {
            vm.user = Authentication.getCurrentUser();
        }
    }
})();