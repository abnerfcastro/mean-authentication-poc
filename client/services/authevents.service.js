/*!
 * ./client/services/authevents.service.js
 *
 * Declares AuthEvents service to handle authentication events
 * Author: Abner Castro
 * Date: August 23rd, 2017
 */

(function() {
    'use strict';

    angular
        .module('auth.app')
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .factory('AuthEventsEmitter', AuthEventsEmitter);

    AuthEventsEmitter.$inject = ['$rootScope'];

    function AuthEventsEmitter($rootScope) {
        var service = {
            fireEvent:fireEvent
        };

        return service;

        ////////////////

        function fireEvent(event) {
            $rootScope.$broadcast(event);
        }
    }
})();