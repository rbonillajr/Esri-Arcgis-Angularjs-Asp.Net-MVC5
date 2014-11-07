angular.module('geomarketing.services', []);
angular.module('geomarketing', ['geomarketing.services', 'kendo.directives', 'ui.directives', 'ui.filters'])
.directive('backToTop', ['$anchorScroll', '$location', function ($anchorScroll, $location) {
    return function link(scope, element) {
        element.on('click', function (event) {
            +$location.hash('');
            scope.$apply($anchorScroll);
        });
    };
}]);
