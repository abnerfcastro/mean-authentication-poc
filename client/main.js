/*!
 * ./client/main.js
 *
 * Defines main Angular file
 * Author: Abner Castro
 * Date: August 22nd, 2017
 */

(function() {
    'use strict';

    angular.module('auth.app', ['ngRoute']);

    angular
        .module('auth.app')
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'partials/index'
                })
                .when('/register', {
                    templateUrl: 'partials/register',
                    controller: 'RegisterController',
                    controllerAs: 'vm'
                })
                .when('/login', {
                    templateUrl: 'partials/login',
                    controller: 'LoginController',
                    controllerAs: 'vm'
                })
                .otherwise({ redirectTo: '/' });

                $locationProvider.html5Mode(true);
        }]);

})();