angular.module('geomarketing')
    .controller('ViewerController', ['$scope', 'toolBarService','esriLoader', 'esriRegistry', function (scope, toolBarService, esriLoader, esriRegistry) {
        var vm = this;
        
        vm.toolbarOptions = toolBarService.options;
        vm.map = {
            center: {
                lng: -80.1649963378998,
                lat: 8.41538419245198
            },
            zoom: 8,
            basemap: 'topo',
            logo: false,
            sliderOrientation: 'horizontal',
            sliderPosition: 'top-right'
        };
        esriRegistry.get('map').then(function (map) {
            esriLoader('esri/dijit/LocateButton').then(function (locateButton) {
                var LocateButton = new locateButton({ map: map }, 'LocateButton');
                LocateButton.startup();
             
            });
            esriLoader('esri/dijit/HomeButton').then(function (homeButton) {

                var HomeButton = new homeButton({ map: map }, 'homeButton');
                HomeButton.startup();
            });

            esriLoader('esri/dijit/OverviewMap').then(function (overviewMap) {
             
                var OverviewMap = new overviewMap({ map: map }, dojo.byId("overviewDiv"));
                OverviewMap.startup();
            });
        });
        vm.ver = function (checked) {
            
        //    ////Adding map leyers 
        //    //var e = true; 
        //    if (checked)
        //    {
        //        //http://190.97.161.17/arcgis/rest/services/DEMOS/DEMO_MAPFRE/MapServer/0
        //        featurelayer = new esri.layers.FeatureLayer("http://190.97.161.17/arcgis/rest/services/MOBIL/MOBIL/MapServer/0",
        //            {
        //                id: "capa3",
        //                visible: true,
        //                infoTemplate: new esri.InfoTemplate(" ", "${GENERALES.PDV} <br/> <img src='../Content/Fotos/${GENERALES.fotout}'  height='200' width='200'/>"),
        //                outFields: ["*"]
        //            });
        //        scope.map.addLayer(featurelayer);
        //    }
        //    else
        //    {
        //        scope.map.graphics.clear();
        //        scope.map.infoWindow.hide();

        //        scope.map.removeLayer(featurelayer);
        //    }

        };

        
    }]);