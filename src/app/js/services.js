urlHelperSvc.$inject = ['env'];

mainApp.factory('urlHelperSvc', urlHelperSvc);

function urlHelperSvc(env) {
    var service = {};

    service.themePath = function(item) {
        return './shared/themes/' + env.brand + '/' + item;
    };
    
    service.contentPath = function(item) {
        return './shared/content/'; 
    };

    return service;
}


mainApp.factory('fetchDetailPagesSvc', fetchDetailPagesSvc);
fetchDetailPagesSvc.$inject = ['$rootScope', '$filter'];

function fetchDetailPagesSvc($rootScope, $filter) {

    var service = {};

    //filter out the json data and return the matching resource based on url stateparam
    service.filterPages = function(detailParamsName, allListData) {
        var detailPages = allListData.data;
        return detailPages.filter(function(detailPage) {
            //couldn't get $filter to inject need to fix this, same filter as safeUrl to match the url
            return $filter('safeUrl')(detailPage.name) == detailParamsName;
        });
    }

    return service;
}


mainApp.factory('pageAnchorsSvc', pageAnchorsSvc);
pageAnchorsSvc.$inject = ['$rootScope', '$filter'];

function pageAnchorsSvc($rootScope) {
    var service = {};
    //pass anchors to the navCtrl
    service.updateAnchors = function(anchors) {
        $rootScope.$broadcast('updatedPageAnchors', anchors);
    };

    return service;
}


mainApp.factory('pageTitleSvc', pageTitleSvc);
pageTitleSvc.$inject = ['$rootScope'];

function pageTitleSvc($rootScope) {
    var service = {};
    service.pageTitle = "";
    service.updatePageTitle = function(pageTitle) {
        service.pageTitle = pageTitle;
        $rootScope.$broadcast('updatedPageTitle', service.pageTitle);
    };
    service.clearPageTitle = function() {
        service.pageTitle = "";
        $rootScope.$broadcast('updatedPageTitle', service.pageTitle);
    };
    return service;
}

mainApp.factory('authSvc', authSvc);
authSvc.$inject = ['$rootScope', '$http', '$filter', 'localStorageService', 'md5', '$q'];

function authSvc($rootScope, $http, $filter, localStorageService, md5, $q) {
    var authServiceFactory = {};
    
    authServiceFactory.authenticated = false;
    authServiceFactory.displayName = '';

    var _authentication = null;

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication = authData;
            _identifyUser();
        }
        else {
            _authentication = {
                authorized: false,
                username: null
            };
        }
    };

    var _identifyUser = function () {
        authServiceFactory.authenticated = true;
        authServiceFactory.displayName = _authentication.username;
    };

    authServiceFactory.login = function (username, password, persist) {

        var cleanedUsername = username.toLowerCase().trim();
        var hashedPw = md5.createHash(password.trim());

        // Note: this is not proper security. Demonstration purposes only!
        var hardcodedUsername = 'guest';
        var hardcodedPassword = 'fcf41657f02f88137a1bcf068a32c0a3'; // guest123

        if (cleanedUsername == hardcodedUsername && hashedPw == hardcodedPassword) {
            _authentication.authorized = true;
            _authentication.username = username;


            if (persist !== undefined && persist) {
                localStorageService.set('authorizationData', _authentication);
            }

            _identifyUser();

            return true;
        }

        return false;
    };

    authServiceFactory.logout = function () {       
        _authentication = {
            authorized: false,
            username: null
        };

        localStorageService.clearAll();


        authServiceFactory.authenticated = false;
        authServiceFactory.displayName = '';
    };

    // Fill immediately on init
    _fillAuthData();

    return authServiceFactory;
}


mainApp.factory('$modal', modalService);
modalService.$inject = ['$rootScope', '$compile', '$timeout'];

function modalService($rootScope, $compile, $timeout) {
    var service = {};

    //prepare for modal
    var $body = angular.element(document.body);
    var $modalContent;
    $timeout(function() {
        $modalContent = angular.element(document.getElementById('modal-content'));
    }, 1000);

    service.openModal = function(params) {
        //make sure modal has been selected
        if(!$modalContent.length) {
            $modalContent = angular.element(document.getElementById('modal-content'));
        }

        //clear out old one incase has been opened before and append new modal include
        $modalContent.empty();
        $modalContent.append($compile("<div class=\"modal-container\" ng-include=\"'shared/partials/modals/" + params + ".html'\"></div>")($rootScope));
        $timeout(function() {
            $body.addClass('modal-open');
        }, 500)
    };
    
    service.closeModal = function() {
        $body.removeClass('modal-open');
    };

    return service;
}