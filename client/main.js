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

    // Defines User roles and Authentication Events
    angular
        .module('auth.app')
        .constant('USER_ROLES', {
            admin: 'admin',
            standard: 'standard'
        });

    angular
        .module('auth.app')
        .config(['$routeProvider', '$locationProvider', '$httpProvider', 'jwtOptionsProvider', 'USER_ROLES',
            function ($routeProvider, $locationProvider, $httpProvider, jwtOptionsProvider, USER_ROLES) {
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
                        controller: 'ApplicationController',
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
                        controllerAs: 'vm',
                        data: {
                            authorizedRoles: [USER_ROLES.admin, USER_ROLES.standard]
                        }
                    })
                    .when('/dashboard', {
                        templateUrl: 'partials/dashboard',
                        data: {
                            authorizedRoles: [USER_ROLES.admin]
                        }
                    })
                    .otherwise({
                        redirectTo: '/'
                    });

                $locationProvider.html5Mode(true);
        }])
        .run(['$rootScope', '$log', 'Authentication', 'AuthEventsEmitter', 'AUTH_EVENTS', function ($rootScope, $log, $auth, AuthEventsEmitter, AUTH_EVENTS) {
            $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
                // if ($location.path() === '/profile' && !$auth.isAuthenticated()) {
                //     $log.log(`You're not authorized to visit /profile. Please sign in.`);
                //     $location.path('/');
                // } else if ($location.path() === '/dashboard' && (!$auth.isAuthenticated() || !$auth.isAdmin())) {
                //     $log.log(`You're not authorized to visit /dashboard. Please sign in as a admin user.`);
                //     $location.path('/');
                // } else if ($location.path() === '/profile') {
                //     $log.log(`You are authorized to visit /profile.`);
                // }
                if (nextRoute.data) {
                    var authorizedRoles = nextRoute.data.authorizedRoles;
                    if (!$auth.isAuthorized(authorizedRoles)) {
                        event.preventDefault();
                        if ($auth.isAuthenticated()) {
                            AuthEventsEmitter.fireEvent(AUTH_EVENTS.notAuthorized);
                        } else {
                            AuthEventsEmitter.fireEvent(AUTH_EVENTS.notAuthenticated);
                        }
                    }
                }
            });
        }])

})();