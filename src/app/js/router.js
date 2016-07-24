mainApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
    .state('app', {
        abstract: true,
        templateUrl: './shared/views/shared/base-layout.html',
        restricted: true,
        resolve: {

        }
    })
    .state('app.home', {
        url: '/home',
        templateUrl: './shared/views/home.html',
        restricted: true,
        resolve: {

        },
        controller: onboardingCtrl,
        controllerAs: 'onboarding'
    })
    .state('app.about', {
        url: '/about',
        templateUrl: './shared/views/about.html',
        restricted: true,
        resolve: {

        },
        controller: onboardingCtrl,
        controllerAs: 'onboarding'
    })
    .state('admin.login', {
        url: '/login',
        templateUrl: './shared/views/login.html',
        restricted: false,
        controller:loginCtrl,
        controllerAs: 'login'
    })
});
