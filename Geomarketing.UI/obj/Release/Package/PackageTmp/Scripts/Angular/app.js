﻿angular.module("geomarketing", ["kendo.directives", "ui.directives", "ui.filters"])
.directive('backToTop', ['$anchorScroll', '$location', function ($anchorScroll, $location) {
    return function link(scope, element) {
        element.on('click', function (event) {
            +$location.hash('');
            scope.$apply($anchorScroll);
        });
    };
}]);