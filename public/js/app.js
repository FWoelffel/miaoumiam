var MiaouMiam = angular.module('MiaouMiam', ['ovts', 'ui.bootstrap', 'toaster'])
    .config(['$animateProvider', function($animateProvider){
        $animateProvider.classNameFilter(/^((?!(fa|btn)).)*$/);
    }]);