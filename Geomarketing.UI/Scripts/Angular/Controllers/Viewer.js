angular.module('geomarketing')
    .controller('ViewerController', ['$scope', 'toolBarService', function (scope, toolBarService) {
        var vm = this;
        
        vm.toolbarOptions = toolBarService.options;
        
        vm.ver = function (checked) {
            
            ////Adding map leyers 
            //var e = true; 
            if (checked)
            {
                //http://190.97.161.17/arcgis/rest/services/DEMOS/DEMO_MAPFRE/MapServer/0
                featurelayer = new esri.layers.FeatureLayer("http://190.97.161.17/arcgis/rest/services/MOBIL/MOBIL/MapServer/0",
                    {
                        id: "capa3",
                        visible: true,
                        infoTemplate: new esri.InfoTemplate(" ", "${GENERALES.PDV} <br/> <img src='../Content/Fotos/${GENERALES.fotout}'  height='200' width='200'/>"),
                        outFields: ["*"]
                    });
                scope.map.addLayer(featurelayer);
            }
            else
            {
                scope.map.graphics.clear();
                scope.map.infoWindow.hide();

                scope.map.removeLayer(featurelayer);
            }

        };

        
    }]);