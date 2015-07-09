angular.module("geomarketing")
    .directive('esriMap', ['$timeout', 'bufferService', 'utilityService', function ($timeout, bufferService, utilityService) {
        return {
            template: "<div id='map'></div>",
            link: function postLink(scope, element, attrs) {

                scope.buffer = function (radio, unidades) {

                    if (typeof buff != 'undefined') {
                        map.removeLayer(buff);
                    }

                    bufferService.get(radio, unidades, scope.latlng, function (buffered) {
                        buff = L.geoJson(buffered);
                        buff.addTo(map);

                        scope.inside = turf.within(scope.stops, buffered);
                        //debugger;
                        var pointsNumber = 0;

                        if (typeof pointsInside != 'undefined') {
                            map.removeLayer(pointsInside);
                        }

                        pointsInside = L.geoJson(scope.inside, {
                            onEachFeature: function (feature, layer) {
                                pointsNumber++
                                //layer.bindPopup("<h4>test</h4>"); si se quiere mostrar info del punto seleccionado
                            },
                            pointToLayer: function (feature, latlng) {
                                return L.circleMarker(latlng);
                            },
                            style: { radius: 10, fillColor: "red", weight: 1 }
                        }).addTo(map);

                    });
                }

                scope.addFeatures = function (url, filtro, callback) {
                    L.esri.Tasks.query({
                        url: url
                    }).where(filtro).run(function (error, data, response) {

                        scope.stops = data;

                        L.geoJson(data, {

                            onEachFeature: function (feature, layer) {

                                layer.bindPopup('<center><strong>' + feature.properties.STATUS + '</strong></center><br/>' +
                                               '<img src="../Content/Fotos/thumbs/' + feature.properties.fotout + '"></img><br/>' +
                                               '<strong>Nombre: </strong>' + feature.properties.NOMBRE + '<br/>' +
                                               '<strong>Ruta - Vendedor: </strong>' + feature.properties.RUTA_VENDEDOR + '<br/>' +
                                               '<strong>ABC: </strong>' + feature.properties.ABC + '<br/>' +
                                               '<strong>Provincia: </strong>' + feature.properties.PROVINCIA + '<br/>' +
                                               '<strong>Distrito: </strong>' + feature.properties.DISTRITO + '<br/>' +
                                               '<strong>Corregimiento: </strong>' + feature.properties.CORREGIMIE + '<br/>' +
                                               '<strong>Categoria: </strong>' + feature.properties.CATEGORIA + '<br/>' +
                                               '<strong>Dirección: </strong>' + feature.properties.DIRECCION + '<br/>');
                            },
                            pointToLayer: function (feature, latlng) {

                                switch (scope.verClientesPor) {
                                    case 'tipo':
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

                                    case 'ruta':
                                        switch (feature.properties.RUTA_VENDEDOR) {

                                            case 'AG1 - JOHN VARELA':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'red'
                                                    })
                                                })
                                            case 'AG2 - FELICIANO ORTEGA':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'darkred'
                                                    })
                                                })
                                            case 'AG3 - IVAN BERMUDEZ':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'lightred'
                                                    })
                                                })
                                            case 'AG4 - GABRIEL GONZALEZ':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'orange'
                                                    })
                                                })
                                            case 'DA1 - OMAR SERRANO':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'beige'
                                                    })
                                                })
                                            case 'DA2 - RAUL VILLARREAL':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'cadetblue'
                                                    })
                                                })
                                            case 'DA4 - KAREN SERRANO':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'darkgreen'
                                                    })
                                                })
                                            case 'JUAN CARLOS BARRIA':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'lightgreen'
                                                    })
                                                })
                                            case 'PA1 - ALBERTO MUÑOZ':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'blue'
                                                    })
                                                })
                                            case 'PA2 - CARLOS VARGAS':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'darkblue'
                                                    })
                                                })
                                            case 'PA3 - ROGER DE LEON':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'lightblue'
                                                    })
                                                })
                                            case 'PA4 - ARSENIO MIRANDA':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'purple'
                                                    })
                                                })
                                            case 'PA5 - JAMES RUJANO':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'cadetblue'
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
                                    case 'abc':
                                        switch (feature.properties.ABC) {

                                            case 'A':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'darkblue'
                                                    })
                                                })
                                            case 'B':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'orange'
                                                    })
                                                })
                                            case 'C':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'purple'
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
                            }
                        }).addTo(map);

                    });

                    createLegend();
                    callback(null, true);

                }
                var legend1
                function createLegend() {
                    if (legend1 instanceof L.Control) { map.removeControl(legend1); }
                    legend1 = L.control({ position: 'bottomleft' });
                    legend1.onAdd = function (map) {
                        switch (scope.verClientesPor) {
                            case 'tipo':
                                var div = L.DomUtil.create('div', 'info legend');
                                div.innerHTML = '<div class="legend"><table><tr><td><div class="awesome-marker-icon-green awesome-marker-legend">' +
                                    '<i class="glyphicon glyphicon-bookmark  icon-white"></i>' +
                                    '</div></td><td><strong>Prospectos</strong></td></tr>' +
                                    '<tr><td><div class="awesome-marker-icon-darkblue awesome-marker-legend">' +
                                    '<i class="glyphicon glyphicon-flag  icon-white"></i>' +
                                    '</div></td><td><strong>Clientes</strong></td></tr>' +
                                    '</table></div>';

                                return div;
                            case 'ruta':
                                var div = L.DomUtil.create('div', 'info legend');
                                div.innerHTML = '<div></div>';

                                return div;
                            case 'abc':
                                var div = L.DomUtil.create('div', 'info legend');
                                div.innerHTML = '<div class="legend"><table><tr><td><div class="awesome-marker-icon-green awesome-marker-legend">' +
                                    '<i class="glyphicon glyphicon-bookmark  icon-white"></i>' +
                                    '</div></td><td><strong>Prospectos</strong></td></tr>' +
                                    '<tr><td><div class="awesome-marker-icon-darkblue awesome-marker-legend">' +
                                    '<i class="glyphicon glyphicon-flag  icon-white"></i>' +
                                    '</div></td><td><strong>A</strong></td></tr>' +
                                    '<tr><td><div class="awesome-marker-icon-orange awesome-marker-legend">' +
                                    '<i class="glyphicon glyphicon-flag  icon-white"></i>' +
                                    '</div></td><td><strong>B</strong></td></tr>' +
                                    '<tr><td><div class="awesome-marker-icon-purple awesome-marker-legend">' +
                                    '<i class="glyphicon glyphicon-flag  icon-white"></i>' +
                                    '</div></td><td><strong>C</strong></td></tr>' +
                                    '</table></div>';

                                return div;

                        }


                    };
                    legend1.addTo(map);
                };
                scope.buffered = false;
                var map = L.map('map').setView([8.488481600020107, -79.89260990593574], 8);


                var url = 'http://gis.geoinfo-int.com/arcgis/rest/services/MOBIL/MOBIL/MapServer/0';
                scope.addFeatures(url, '1=1', function (error, result) {

                });

                L.control.navbar().addTo(map);

                map.on('click', function (e) {
                    if (scope.buffered) {
                        scope.latlng = e.latlng;
                        scope.winBuffer.open().center();
                    } else {
                        if (typeof buff != 'undefined') {
                            map.removeLayer(buff);
                        }
                        if (typeof pointsInside != 'undefined') {
                            map.removeLayer(pointsInside);
                        }
                    }

                });

                var mapaBaseGeoinfo = L.esri.dynamicMapLayer('http://geobi.geoinfo-int.com/arcgis/rest/services/GEOBI/MAPA_BASE_GEOBI/MapServer');

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
                    ])

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

                // Query para filtrar los datos
                scope.query = function (param, callback) {

                    map.eachLayer(function (layer) {

                        if (layer._leaflet_id > 42) {
                            map.removeLayer(layer);
                        }

                    });
                    if (param == '1=1') {
                        filtro = param;
                    } else {
                        filtro = '';
                        grupoPreview = 0;
                        _.each(param, function (item, index) {
                            debugger;
                            if (param.length == 1 || index == 0) {
                                filtro = '(' + item.filtro;
                            } else {
                                if (item.grupo != grupoPreview) {
                                    filtro = filtro + ') AND (' + item.filtro
                                }
                                else {
                                    filtro = filtro + ' OR ' + item.filtro
                                }
                            }
                            grupoPreview = item.grupo
                        });
                        filtro = filtro + ')';
                    }
                    scope.addFeatures(url, filtro, function (error, result) {
                        //if (error) {
                        //   return callback(error, null);
                        //} else {
                        //    return callback(null, result);
                        //}

                    });

                    callback(null, true);
                }

                scope.analisis = function () {
                    debugger;
                    mapaBaseGeoinfo.bringToBack();
                    mapaBaseGeoinfo.find().layers('71').text('BOCAS DEL TORO').fields('DISTRITO')
                     .run(function (error, featureCollection, response) {
                         L.geoJson(featureCollection, {
                             style: { color: 'red' },
                             onEachFeature: function (feature, layer) {
                                 layer.bindPopup(feature.properties.GNIS_NAME);
                             }
                         }).addTo(map);

                     });
                }



            }
        };
    }]);