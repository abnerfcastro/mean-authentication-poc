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

    ApplicationController.$inject = ['$scope', '$location', 'AUTH_EVENTS', 'USER_ROLES', 'Authentication'];

    function ApplicationController($scope, $location, AUTH_EVENTS, USER_ROLES, $auth) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = $auth.isAuthorized;
        
        $scope.$on(AUTH_EVENTS.loginSuccess, function() {
            $location.path('/profile');
        });

        $scope.$on(AUTH_EVENTS.logoutSuccess, function() {
            $location.path('/');
        });

        $scope.$on(AUTH_EVENTS.notAuthorized, function() {
            $location.path('/profile');
        });

        $scope.$on(AUTH_EVENTS.notAuthenticated, function() {
            $location.path('/login');
        });

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        }
    }
})();