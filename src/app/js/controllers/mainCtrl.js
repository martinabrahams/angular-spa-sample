mainApp.controller('mainCtrl', mainCtrl);

mainCtrl.$inject = ['$rootScope', '$state', '$timeout', '$filter', '$location', 'authSvc'];

function mainCtrl($rootScope, $state, $timeout, $filter, $location, authSvc) {
    var vm = this;

    $rootScope.burgerMenuOpen = false;

    $rootScope.$on('$stateChangeStart', function(event) {
        $timeout(function() {
            vm.loaded = false;
        },0);
    });
    $rootScope.$on('$stateChangeSuccess', function(event) {
        $timeout(function() {
            vm.loaded = true;
        },650);
    });

    vm.authSvc = authSvc;

    vm.logoutUser = function () {
        vm.authSvc.logout();
        $state.go('admin.login');
    };

}
