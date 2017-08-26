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

    LoginController.$inject = ['$scope', '$rootScope', '$log', '$location', 'AUTH_EVENTS', 'Authentication'];

    function LoginController($scope, $rootScope, $log, $location, AUTH_EVENTS, $auth) {
        var vm = this;

        vm.credentials = {
            email: "",
            password: ""
        };

        vm.submit = function () {
            $log.log('here');
            $auth
                .login(vm.credentials)
                .then((user) => {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.setCurrentUser(user);
                    $location.path('/profile');
                })
                .catch(err => {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    console.log(err);
                })
        }
    }
})();