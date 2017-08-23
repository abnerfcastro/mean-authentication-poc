
(function() {
    'use strict';

    angular
        .module('auth.app')
        .directive('navigation', navigation);

    navigation.$inject = ['$log'];
    function navigation($log) {
        // Usage:
        //  <navigation></navigation>
        // Creates:
        //
        var directive = {
            controller: NavigationController,
            controllerAs: 'vm',
            templateUrl: 'partials/navigation',
            restrict: 'E'            
        };
        return directive;        
    }
    /* @ngInject */
    function NavigationController () {
        var vm = this;

        vm.isLoggedIn = false;

        vm.currentUser = function () {

        }
    }
})();