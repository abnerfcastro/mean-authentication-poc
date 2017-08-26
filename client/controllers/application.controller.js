/*!
 * ./client/controllers/application.controller.js
 *
 * Declares the Application controller
 * Author: Abner Castro
 * Date: August 22nd, 2017
 */

(function () {
    'use strict';

    angular
        .module('auth.app')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$scope', 'USER_ROLES', 'Authentication'];

    function ApplicationController($scope, USER_ROLES, $auth) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = $auth.isAuthorized;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        }
    }
})();