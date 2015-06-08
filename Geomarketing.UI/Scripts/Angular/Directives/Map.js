angular.module("geomarketing")
    .directive('esriMap', function ($timeout) {
        return {
            template: "<div id='map'></div>",  
            
            link: function postLink(scope, element, attrs) {
                //debugger;
                var map = L.map('map').setView([8.488481600020107, -79.89260990593574], 8);
                

                var stops = L.esri.featureLayer('http://190.97.161.17/arcgis/rest/services/MOBIL/MOBIL/MapServer/0', {
                    id: "Capa1",
                    visible: true
                }).addTo(map);


                var hydro = L.esri.tiledMapLayer('http://190.97.161.17/arcgis/rest/services/GEOBI/MAPA_BASE_GEOBI/MapServer/');

                // basemap layer groups so the hydro overlay always overlays the various basemaps
                var nationalGeographic = L.layerGroup([                        
                        L.esri.basemapLayer('NationalGeographic')
                    ]),
                    esriTopo = L.layerGroup([                        
                        L.esri.basemapLayer('Topographic')
                    ]),
                    esriShadedRelief = L.layerGroup([
                        L.esri.tiledMapLayer('ShadedReliefLabels'),                        
                        L.esri.basemapLayer('ShadedRelief')
                    ]),
                    geoinfo = L.layerGroup([
                        hydro
                    ]);

                // add default layers to map
                map.addLayer(geoinfo);

                // json object for layer switcher control basemaps
                var baseLayers = {
                    "National Geographic": nationalGeographic,
                    "Esri Topographic": esriTopo,
                    "Shaded Relief": esriShadedRelief,
                    "Geoinfo": geoinfo
                };
                
                var overlayMaps = {
                   
                };

                // add layer groups to layer switcher control
                var controlLayers = L.control.layers(baseLayers, overlayMaps).addTo(map);

                scope.query = function (param) {
                    stops.setWhere(param);
                }        

              
            }
        };
    });