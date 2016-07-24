'use strict';

var mainApp = angular.module('mainApp', ['ngAnimate', 'ui.router', 'LocalStorageModule', 'ngMd5']);

mainApp.constant('env', {

});

mainApp.run(function ($rootScope, $state, authSvc, $filter, $location) {

    //initialise fastclick library on init
    FastClick.attach(document.body);

    //detect if ipad and add class to body for css selector
    //var IS_IPAD = navigator.userAgent.match(/iPad/i) != null;
    //if (IS_IPAD) {
        //adds a class that sets visibility on all wow classed elements to visible
    //    angular.element(document.body).addClass('is-ipad');
    //}

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

    });

    //$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //    if (toState.restricted !== undefined) {
    //        if (toState.restricted === true && !authSvc.authenticated) {
    //            event.preventDefault();
    //            $state.go('admin.login');
    //        }
    //    }
    //});
});