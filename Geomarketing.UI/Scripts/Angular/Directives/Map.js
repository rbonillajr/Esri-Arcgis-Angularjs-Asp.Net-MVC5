angular.module("geomarketing")
    .directive('esriMap', ['$timeout', 'bufferService', 'utilityService', function ($timeout, bufferService, utilityService) {
        return {
            template: "<div id='map'></div>",
            link: function postLink(scope, element, attrs) {
                //debugger;
                scope.buffered = false;
                var map = L.map('map').setView([8.488481600020107, -79.89260990593574], 8);

                var icons = getIcons();
                //var stops = L.esri.featureLayer('http://gis.geoinfo-int.com/arcgis/rest/services/MOBIL/MOBIL/MapServer/0', {
                //    pointToLayer: function (geojson, latlng) {

                //        return L.marker(latlng, {
                //            icon: icons[geojson.properties['STATUS']]
                //        });
                //    }

                //}).addTo(map);
                //stops.bindPopup(function (error, identifyResults) {
                        
                //        return '<center><strong>' + identifyResults.feature.properties['STATUS'] + '</strong></center><br/>' +
                //               'Nombre: ' + identifyResults.feature.properties['NOMBRE'] + '<br/>' +
                //               'Provincia: ' + identifyResults.feature.properties['PROVINCIA'] + '<br/>' +
                //               'Distrito: ' + identifyResults.feature.properties['DISTRITO'] + '<br/>' +
                //               'Corregimiento: ' + identifyResults.feature.properties['CORREGIMIE'] + '<br/>' +
                //               'Categoria: ' + identifyResults.feature.properties['CATEGORIA'] + '<br/>' +
                //               'Dirección: ' + identifyResults.feature.properties['DIRECCION'] + '<br/>';

                //    });
                
                
                var url = 'http://gis.geoinfo-int.com/arcgis/rest/services/MOBIL/MOBIL/MapServer/0';
                
                L.esri.Tasks.query({
                    url: url
                }).run(function (error, data, response) {
                    
                    scope.stops = data;
                                       
                    L.geoJson(data, {
                        style: function (feature) {                           
                            return {
                                weight: 1,
                                opacity: .25,
                                color: "#333",
                                fillColor: "#0000ff",
                                fillOpacity: 0.75
                            }
                        },
                        onEachFeature: function (feature, layer) {
                           
                            layer.bindPopup('<center><strong>' + feature.properties.STATUS + '</strong></center><br/>' +
                                           'Nombre: ' + feature.properties.NOMBRE + '<br/>' +
                                           'Provincia: ' + feature.properties.PROVINCIA + '<br/>' +
                                           'Distrito: ' + feature.properties.DISTRITO + '<br/>' +
                                           'Corregimiento: ' + feature.properties.CORREGIMIE + '<br/>' +
                                           'Categoria: ' + feature.properties.CATEGORIA + '<br/>' +
                                           'Dirección: ' + feature.properties.DIRECCION + '<br/>');
                        }
                    }).addTo(map);

                });
                              

                map.on('click', function (e) {
                    debugger;
                    if (scope.buffered) {

                        if (typeof buff != 'undefined') {
                            map.removeLayer(buff);
                        }

                        bufferService.get(50, 'kilometers', e.latlng, function (buffered) {
                            buff = L.geoJson(buffered);
                            buff.addTo(map);

                            var inside = turf.within(scope.stops, buffered);

                            var pointsNumber = 0;

                            if (typeof pointsInside != 'undefined') {
                                map.removeLayer(pointsInside);
                            }

                            pointsInside = L.geoJson(inside, {
                                onEachFeature: function (feature, layer) {
                                    pointsNumber++
                                    layer.bindPopup("<h4>test</h4>");
                                },
                                pointToLayer: function (feature, latlng) {
                                    return L.circleMarker(latlng);
                                },
                                style: { radius: 8, fillColor: "red", weight: 1 }
                            }).addTo(map);
                        });                     
                        

                    } else {
                        if (typeof buff != 'undefined') {
                            map.removeLayer(buff);
                        }
                        if (typeof pointsInside != 'undefined') {
                            map.removeLayer(pointsInside);
                        }
                    }
                });

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
                map.addLayer(esriTopo);

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
                    var filtro = '';
                    _.each(param, function (item, index) {
                        if (param.length == 1 || index == 0) {
                            filtro = item;
                        } else {
                            filtro = filtro + ' AND ' + item
                        }
                    })
                    stops.setWhere(filtro);
                }

                function getIcons() {
                    return {
                        CLIENTES: L.icon({
                            iconUrl: '/Content/Images/bluepin.png',
                            iconRetinaUrl: '/Content/Images/bluepin.png',
                            iconSize: [27, 31],
                            iconAnchor: [13.5, 17.5],
                            popupAnchor: [0, -11]
                        }),
                        PROSPECTOS: L.icon({
                            iconUrl: '/Content/Images/orangepin.png',
                            iconRetinaUrl: '/Content/Images/orangepin.png',
                            iconSize: [27, 31],
                            iconAnchor: [13.5, 13.5],
                            popupAnchor: [0, -11]
                        })
                    }
                }

            }
        };
    }]);