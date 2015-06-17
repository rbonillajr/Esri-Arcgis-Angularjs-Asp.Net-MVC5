angular.module("geomarketing")
    .directive('esriMap', ['$timeout', 'bufferService', 'utilityService', function ($timeout, bufferService, utilityService) {
        return {
            template: "<div id='map'></div>",
            link: function postLink(scope, element, attrs) {
                //debugger;
                scope.buffered = false;
                var map = L.map('map').setView([8.488481600020107, -79.89260990593574], 8);

               // var icons = getIcons();
                
                var url = 'http://gis.geoinfo-int.com/arcgis/rest/services/MOBIL/MOBIL/MapServer/0';

                L.esri.Tasks.query({
                    url: url
                }).run(function (error, data, response) {

                    scope.stops = data;

                    L.geoJson(data, {
                       
                        onEachFeature: function (feature, layer) {

                            layer.bindPopup('<center><strong>' + feature.properties.STATUS + '</strong></center><br/>' +
                                           '<strong>Nombre: </strong>' + feature.properties.NOMBRE + '<br/>' +
                                           '<strong>Provincia: </strong>' + feature.properties.PROVINCIA + '<br/>' +
                                           '<strong>Distrito: </strong>' + feature.properties.DISTRITO + '<br/>' +
                                           '<strong>Corregimiento: </strong>' + feature.properties.CORREGIMIE + '<br/>' +
                                           '<strong>Categoria: </strong>' + feature.properties.CATEGORIA + '<br/>' +
                                           '<strong>Dirección: </strong>' + feature.properties.DIRECCION + '<br/>');
                        },
                        pointToLayer: function (feature, latlng) {
                            switch (feature.properties.STATUS) {

                                case 'CLIENTES':
                                    return L.marker(latlng, {
                                        icon: L.AwesomeMarkers.icon({
                                            icon: 'flag',
                                            markerColor: 'darkblue'
                                        })
                                    })
                                default:
                                    return L.marker(latlng, {
                                        icon: L.AwesomeMarkers.icon({
                                            icon: 'bookmark',
                                            markerColor: 'green'
                                        })
                                    })
                            }
                        }
                    }).addTo(map);

                });


                map.on('click', function (e) {

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
                                    //layer.bindPopup("<h4>test</h4>");
                                },
                                pointToLayer: function (feature, latlng) {
                                    return L.circleMarker(latlng);
                                },
                                style: { radius: 10, fillColor: "red", weight: 1 }
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

                var mapaBaseGeoinfo = L.esri.tiledMapLayer('http://190.97.161.17/arcgis/rest/services/GEOBI/MAPA_BASE_GEOBI/MapServer/');

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
                        mapaBaseGeoinfo
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