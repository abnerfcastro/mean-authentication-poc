
(function() {
    'use strict';

    angular
        .module('auth.app')
        .directive('navigation', navigation);

    navigation.$inject = ['$log', 'Authentication'];

    function navigation($log, $auth) {
        // Usage:
        //  <navigation></navigation>
        // Creates:
        //  navigation bar
        var directive = {
            controller: NavigationController,
            controllerAs: 'vm',
            templateUrl: 'partials/navigation',
            restrict: 'E'
        };
        return directive;
    }

    /* @ngInject */
    var NavigationController = ['$scope', 'AUTH_EVENTS', 'Authentication', function($scope, AUTH_EVENTS, $auth) {
        var vm = this;

        vm.isAuthenticated = $auth.isAuthenticated();

        vm.currentUser = $auth.getCurrentUser();

        $scope.$on(AUTH_EVENTS.loginSuccess, function () {
            vm.isAuthenticated = $auth.isAuthenticated();
            vm.currentUser = $auth.getCurrentUser();
        });

        $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
            vm.isAuthenticated = $auth.isAuthenticated();
            vm.currentUser = null;
        });

        vm.logout = function () {
            $auth.logout();
        }
    }]

})();