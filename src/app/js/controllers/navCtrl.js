mainApp.controller('navCtrl', navCtrl);

navCtrl.$inject = ['$rootScope', '$scope', '$filter', '$location', '$state', '$window', '$timeout'];

function navCtrl($rootScope, $scope, $filter, $location, $state, $window, $timeout) {
    var vm = this;

    vm.currentPageTitle = "";
    vm.openNav = false;

    $scope.$on('updatedPageTitle', function(event, data) {
       vm.currentPageTitle = data;
    });

    //toggle burger menu opening
    vm.toggleBurgerMenu = function() {
        $rootScope.burgerMenuOpen = ($rootScope.burgerMenuOpen) ? false : true;
        
        if($rootScope.burgerMenuOpen) {
            vm.openNav = true;
        } else {
            vm.openNav = false;
        }
    };
}