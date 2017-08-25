/*!
 * ./client/main.js
 *
 * Defines main Angular file
 * Author: Abner Castro
 * Date: August 22nd, 2017
 */

(function () {
    'use strict';

    angular.module('auth.app', ['ngRoute', 'angular-jwt']);

    angular
        .module('auth.app')
        .config(['$routeProvider', '$locationProvider', '$httpProvider', 'jwtOptionsProvider', function ($routeProvider, $locationProvider, $httpProvider, jwtOptionsProvider) {
            jwtOptionsProvider.config({
                tokenGetter: ['Authentication', function ($auth) {
                    return $auth.getToken();
                }]
            });

            $httpProvider.interceptors.push('jwtInterceptor');

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
                .when('/profile', {
                    templateUrl: 'partials/profile',
                    controller: 'ProfileController',
                    controllerAs: 'vm'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        }])
        .run(['$rootScope', '$location', '$log', 'Authentication', function ($rootScope, $location, $log, $auth) {
            $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
                if ($location.path() === '/profile' && !$auth.isAuthenticated()) {
                    $log.log(`You're not authorized to visit /profile. Please sign in.`);
                    $location.path('/');
                } else if ($location.path() === '/profile') {
                    $log.log(`You are authorized to visit /profile.`);
                }
            });
        }])

})();