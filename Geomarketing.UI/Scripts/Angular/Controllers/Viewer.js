angular.module('geomarketing')
    .controller('ViewerController', ['$scope', function (scope) {
        var vm = this;
        vm.selected;
        vm.data = [
                { text: "Disponibilidad", value: 7 },
                { text: "Exhibidores", value: 9 },
                { text: "Comunicación Interna", value: 10 }
               
        ];
        vm.filtroMarca = {
            Mobil: false,
            Shell: false,
            Castrol: false,
            Valvoline: false,
            Chevron: false
        }
        vm.filtros = function () {
            $('#yesButton').click(function (e) {
                debugger;
                filtro = [];

                if (vm.filtroMarca.Mobil)
                {
                    filtro.push("GENERALES.MOBIL=1");
                }
                if (vm.filtroMarca.Shell) {
                    filtro.push("GENERALES.SHELL=1");
                }
                if (vm.filtroMarca.Castrol) {
                    filtro.push("GENERALES.CASTROL=1");
                }
                if (vm.filtroMarca.Valvoline) {
                    filtro.push("GENERALES.VALVOLINE =1");
                }
                if (vm.filtroMarca.Chevron) {
                    filtro.push("GENERALES.CHEVRON  =1");
                }
                scope.query(filtro);
                vm.window.close();
            });

            $('#noButton').click(function (e) {
                vm.window.close();
            });
            vm.window.open().center();
        };

        vm.buffer = function () {
            if (scope.buffered) {
                scope.buffered = false;
            }
            else {
                scope.buffered = true;
            }
            //scope.setBuffered();
            
        };
        vm.toolbarOptions = {
            items: [
                { type: "button", text: "Filtros", click: vm.filtros },
                { type: "button", text: "Analisis" },
                { type: "button", text: "Buffer", togglable: true, toggle: vm.buffer }
            ]
        };
        //vm.map = {
        //    center: {
        //        lng: -80.1649963378998,
        //        lat: 8.41538419245198
        //    },
        //    zoom: 8,
        //    basemap: 'topo',
        //    logo: false,
        //    sliderOrientation: 'horizontal',
        //    sliderPosition: 'top-right'
        //};
        //esriRegistry.get('map').then(function (map) {


        //    esriLoader('esri/dijit/LocateButton').then(function (locateButton) {
        //        var LocateButton = new locateButton({ map: map }, 'LocateButton');
        //        LocateButton.startup();

        //    });
        //    esriLoader('esri/dijit/HomeButton').then(function (homeButton) {

        //        var HomeButton = new homeButton({ map: map }, 'homeButton');
        //        HomeButton.startup();
        //    });

        //    esriLoader('esri/dijit/OverviewMap').then(function (overviewMap) {

        //        var OverviewMap = new overviewMap({ map: map }, dojo.byId("overviewDiv"));
        //        OverviewMap.startup();
        //    });

        //    //var basemapGallery = new esri.dijit.BasemapGallery({
        //    //                                showArcGISBasemaps: true,
        //    //                                map: map
        //    //}, dojo.byId("basemapGallery"));

        //    esriLoader('esri/dijit/BasemapGallery').then(function (basemapGallery) {

        //        var BasemapGallery = new basemapGallery({
        //            showArcGISBasemaps: true,
        //            map: map
        //        }, dojo.byId("overviewDiv"));

        //        esriLoader('esri/dijit/BasemapLayer').then(function (basemapLayer) {

        //            var BasemapLayer = new basemapLayer({ url: 'http://190.97.161.17/arcgis/rest/services/GEOBI/MAPA_BASE_GEOBI/MapServer/' }, dojo.byId("BasemapLayer"));

        //            esriLoader('esri/dijit/Basemap').then(function (basemap) {
        //                var Basemap = new basemap({
        //                    layers: [BasemapLayer],
        //                    title: "Geoinfo",
        //                    id: 'Geoinfo'
        //                });

        //                BasemapGallery.add(Basemap);
        //                BasemapGallery.select('Geoinfo');
        //                BasemapGallery.startup();
        //            });
        //        });

        //    });


        //esriLoader('dojo/_base/lang').then(function (lang) {
        //    lang.hitch(this, function (response) {

        //        var layers = response.itemInfo.itemData.operationalLayers;


        //        /* Optionally add settings icon and custom content to first layer */
        //        var first = layers.length - 1;
        //        // Add id for custom settings button
        //        layers[first].settingsId = "myCustomSettings";
        //        // add id for custom content div
        //        layers[first].customContentId = "myCustomContent";

        //        esriLoader('application/TableOfContents').then(function (tableOfContents) {

        //            var TableOfContents = new tableOfContents({
        //                map: map
        //            }, 'TableOfContents');
        //            TableOfContents.startup();
        //        });
        //    });
        //});


        //});

        //vm.ver = function (checked) {

        //    ////Adding map leyers 
        //    //var e = true; 
        //    if (checked) {
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
        //    else {
        //        scope.map.graphics.clear();
        //        scope.map.infoWindow.hide();

        //        scope.map.removeLayer(featurelayer);
        //    }

        //};




    }]);