angular.module("geomarketing")
    .controller('ViewerController',['$scope', function ($scope) {
        var vm = this;
        vm.tab = 1;

        vm.setTab = function (newValue) {
            vm.tab = newValue;
        };

        vm.isSet = function (tabName) {
            return vm.tab === tabName;
        };
        console.log($scope);

        
        vm.ver = function (checked) {
            
            ////Adding map leyers 
            //var e = true;
            if (checked)
            {
                featurelayer = new esri.layers.FeatureLayer("http://190.97.161.17/arcgis/rest/services/DEMOS/DEMO_MAPFRE/MapServer/0",
                    {
                        id: "capa3",
                        visible: true,
                        infoTemplate: new esri.InfoTemplate(" ", "${BARRIO}"),
                        outFields: ["*"]
                    });
                $scope.map.addLayer(featurelayer);
            }
            else
            {
                $scope.map.graphics.clear();
                $scope.map.infoWindow.hide();

                $scope.map.removeLayer(featurelayer);
            }

        };

        
    }]);