var MiaouMiam = angular.module('MiaouMiam', ['vr.directives.slider', 'ui.bootstrap', 'toaster'])
    .config(['$animateProvider', function($animateProvider){
        $animateProvider.classNameFilter(/^((?!(fa|btn)).)*$/);
    }]);