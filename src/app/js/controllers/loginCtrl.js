mainApp.controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$state', 'authSvc'];

function loginCtrl($scope, $state, authSvc) {
    var vm = this;

    vm.authService = authSvc;

    $scope.submitLogin = function (loginform, loginInfo) {
        console.log(loginform)
        if(loginform.$valid) {
            var authenticated = vm.authService.login(loginInfo.username, loginInfo.password, true);

            if (authenticated)
            {
                $state.go('app.home');
            }
            else
            {
                $scope.error = "Login details incorrect";
            }
        }
    };
}