angular.module("geomarketing")
    .controller('TabController', function () {
        var vm = this;
        vm.tab = 1;

        vm.setTab = function (newValue) {
            vm.tab = newValue;
        };

        vm.isSet = function (tabName) {
            return vm.tab === tabName;
        };
});