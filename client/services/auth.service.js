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

    Authentication.$inject = ['$http', '$window', '$q', '$log'];

    function Authentication($http, $window, $q, $log) {
        var service = {
            login: login,
            register: register,
            logout: logout,
            isAuthenticated: isAuthenticated,
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
        }


        function isAuthenticated() {
            var payload = __decodePayload();
            if (payload) {
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
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
            var payload = __decodePayload();
            return payload["role"] === "admin";
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
                $log.log('decoding 1', payload);
                payload = $window.atob(payload);
                $log.log('decoding 2', payload);
                payload = JSON.parse(payload);
                $log.log('decoding 3', payload);
                return payload;
            }
        }
    }
})();