mainApp.controller('onboardingCtrl', onboardingCtrl);

onboardingCtrl.$inject = ['$rootScope', '$q', '$filter', 'pageTitleSvc', '$scope'];

function onboardingCtrl($rootScope, $q, $filter, pageTitleSvc, $scope) {
    var vm = this;

    vm.pageTitle = 'Home Page';
    vm.pageTitleUrlFriendly = $filter('safeUrl')(vm.pageTitle);

    //set service pageTitle up so nav knows about it
    pageTitleSvc.updatePageTitle(vm.pageTitle);

    vm.myAnchors = [];

    $scope.$on('$destroy', function() {
        pageTitleSvc.clearPageTitle();
    });

}