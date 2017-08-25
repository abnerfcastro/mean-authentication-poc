
(function() {
    'use strict';

    angular
        .module('auth.app')
        .directive('navigation', navigation);

    navigation.$inject = ['$log', 'Authentication'];
    function navigation($log, $authentication) {
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
	var NavigationController = ['Authentication', function($authentication) {
		var vm = this;
	
		vm.isAuthenticated = $authentication.isAuthenticated();
	
		vm.currentUser = $authentication.getCurrentUser();
		
		vm.logout = function () {
			$authentication.logout();
		}
	}]
	
})();