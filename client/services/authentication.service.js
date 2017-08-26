/*!
 * ./client/services/auth.service.js
 *
 * Declares Authentication service
 * Author: Abner Castro
 * Date: August 23rd, 2017
 */

(function () {
    'use strict';

    angular
        .module('auth.app')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$http', '$window', '$q', 'AuthEventsEmitter', 'AUTH_EVENTS', 'USER_ROLES', '$log'];

    function Authentication($http, $window, $q, AuthEventsEmitter, AUTH_EVENTS, USER_ROLES, $log) {
        var service = {
            login: login,
            register: register,
            logout: logout,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            getCurrentUser: getCurrentUser,
            isAdmin: isAdmin,
            getToken: getJwtToken
        };

        return service;

        function login(user) {
            let promise = $q((resolve, reject) => {
                $http
                    .post('/api/login', user)
                    .then(response => {
                        $log.log('SAVING TOKEN', response.data.token);
                        __saveToken(response.data.token);
                        AuthEventsEmitter.fireEvent(AUTH_EVENTS.loginSuccess);
                        resolve(getCurrentUser());
                    })
                    .catch(err => {
                        if (err) {
                            AuthEventsEmitter.fireEvent(AUTH_EVENTS.loginFailed);
                            reject(err);
                        }
                    });
            });
            return promise;
        }

        function register(user) {
            let promise = $q((resolve, reject) => {
                $http
                    .post('/api/register', user)
                    .then(response => {
                        $log.log('SAVING TOKEN', response.data.token);
                        __saveToken(response.data.token);
                        resolve(true);
                    })
                    .catch(err => {
                        if (err) {
                            reject(err);
                        }
                    });
            });
            return promise;
        }

        function logout() {
            __deleteToken();
            AuthEventsEmitter.fireEvent(AUTH_EVENTS.logoutSuccess);
        }


        function isAuthenticated() {
            var payload = __decodePayload();
            if (payload) {
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        }

        function isAuthorized(authorizedRoles) {
            if (!authorizedRoles) {
                authorizedRoles = [USER_ROLES.standard];
            } else if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated() && authorizedRoles.indexOf(__getUserRole()) !== -1);
        }

        function getCurrentUser() {
            if (isAuthenticated()) {
                var payload = __decodePayload();
                $log.log('PAYLOAD', payload);
                return {
                    email: payload.email,
                    name: payload.name
                }
            }
        }

        function isAdmin() {
            let role = __getUserRole();
            return role === USER_ROLES.admin;
        }

        function getJwtToken() {
            return __getToken();
        }

        // Internal functions

        function __saveToken(token) {
            $window.localStorage['mean-authentication-poc'] = token;
        }

        function __deleteToken() {
            $window.localStorage.removeItem('mean-authentication-poc');
        }

        function __getToken() {
            return $window.localStorage['mean-authentication-poc'];
        }

        function __decodePayload() {
            var token = __getToken();
            $log.log('TOKEN', token);
            if (token) {
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return payload;
            }
        }

        function __getUserRole() {
            if (isAuthenticated()) {
                let payload = __decodePayload();
                return (payload["role"]) ? payload["role"] : USER_ROLES.standard;
            }
        }
    }
})();