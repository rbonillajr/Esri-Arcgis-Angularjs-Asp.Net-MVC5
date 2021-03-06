﻿angular.module("geomarketing")
    .directive('esriMap', ['$timeout', 'bufferService', 'utilityService', function ($timeout, bufferService, utilityService) {
        return {
            template: "<div id='map'></div>",
            link: function postLink(scope, element, attrs) {


                scope.addFeatures = function (url, filtro, callback) {
                    L.esri.Tasks.query({
                        url: url
                    }).where(filtro).run(function (error, data, response) {

                        scope.stops = data;

                        L.geoJson(data, {

                            onEachFeature: function (feature, layer) {

                                layer.bindPopup('<center><strong>' + feature.properties.STATUS + '</strong></center><br/>' +
                                               '<img src="../Content/Fotos/thumbs/' + feature.properties.fotout + '"></img><br/>' +
                                               '<img src="../Content/Fotos/thumbs/' + feature.properties.fotin + '"></img><br/>' +
                                               '<strong>Nombre: </strong>' + feature.properties.NOMBRE + '<br/>' +
                                               '<strong>Codigo: </strong>' + feature.properties.COD_CLIENT + '<br/>' +
                                               '<strong>Ruta - Vendedor: </strong>' + feature.properties.RUTA_VENDEDOR + '<br/>' +
                                               '<strong>ABC: </strong>' + feature.properties.ABC + '<br/>' +
                                               '<strong>Provincia: </strong>' + feature.properties.PROVINCIA + '<br/>' +
                                               '<strong>Distrito: </strong>' + feature.properties.DISTRITO + '<br/>' +
                                               '<strong>Corregimiento: </strong>' + feature.properties.CORREGIMIE + '<br/>' +
                                               '<strong>Categoria: </strong>' + feature.properties.CATEGORIA + '<br/>');
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
                                            case 'PA4 - ARSENIO MIRANDA':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'red'
                                                    })
                                                })
                                            case 'DA2 - RAUL VILLARREAL':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'orange'
                                                    })
                                                })
                                            case 'PA1 - ALBERTO MUÑOZ':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'lightgray'
                                                    })
                                                })
                                            case 'AG1 - JOHN VARELA':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'blue'
                                                    })
                                                })
                                            case 'PA3 - ROGER DE LEON':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'purple'
                                                    })
                                                })
                                            case 'DA1 - OMAR SERRANO':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'darkpurple'
                                                    })
                                                })
                                            case 'PA2 - CARLOS VARGAS':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'lightred'
                                                    })
                                                })
                                            case 'AG2 - FELICIANO ORTEGA':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'black'
                                                    })
                                                })
                                            case 'AG3 - IVAN BERMUDEZ':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'beige'
                                                    })
                                                })
                                            case 'AG4 - GABRIEL GONZALEZ':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'cadetblue'
                                                    })
                                                })
                                            case 'JUAN CARLOS BARRIA':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'darkred'
                                                    })
                                                })
                                            case 'DA4 - KAREN SERRANO':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'lightgreen'
                                                    })
                                                })
                                            case 'PA5 - JAMES RUJANO':
                                                return L.marker(latlng, {
                                                    icon: L.AwesomeMarkers.icon({
                                                        icon: 'flag',
                                                        markerColor: 'darkgreen'
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


                    callback(null, true);

                }

                scope.buffered = false;
                var map = L.map('map').setView([8.488481600020107, -79.89260990593574], 8);

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

                // add feature
                var url = 'http://gis.geoinfo-int.com/arcgis/rest/services/MOBIL/MOBIL/MapServer/0';
                scope.addFeatures(url, '1=1', function (error, result) {

                });

                // NavBar
                L.control.navbar().addTo(map);

                // SideBar
                scope.sidebar = L.control.sidebar('sidebar', {
                    closeButton: true,
                    position: 'left'
                });
                map.addControl(scope.sidebar);

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

                // Query para filtrar los datos
                scope.query = function (param, callback) {
                    map.spin(true);
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
                        map.spin(false);
                    });

                    callback(null, true);
                }
                scope.buffer = function (radio, unidades) {

                    if (typeof buff != 'undefined') {
                        map.removeLayer(buff);
                    }
                    mapaBaseGeoinfo.bringToBack();
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
                        map.fitBounds(pointsInside);
                    });
                }
                scope.analisis = function (layer, textSearch, fieldSearch) {

                    if (layer == '') {
                        if (typeof collection != 'undefined') {
                            map.removeLayer(collection);
                        }
                        if (typeof pointsInside != 'undefined') {
                            map.removeLayer(pointsInside);
                        }
                    } else {
                        map.spin(true);
                        mapaBaseGeoinfo.bringToBack();
                        if (typeof collection != 'undefined') {
                            map.removeLayer(collection);
                        }
                        mapaBaseGeoinfo.find().layers(layer).text(textSearch).fields(fieldSearch)
                         .run(function (error, Polygon, response) {
                             collection = L.geoJson(Polygon, {
                                 style: { color: 'yellow' },
                                 onEachFeature: function (feature, layer) {
                                     layer.bindPopup(feature.properties.GNIS_NAME);
                                 }
                             });
                             collection.addTo(map)


                             pointsWithin = turf.featurecollection([]);
                             for (var i = 0; i < Polygon.features.length; i++) {
                                 for (var j = 0; j < scope.stops.features.length; j++) {
                                     var isInside = turf.inside(scope.stops.features[j], Polygon.features[i]);
                                     if (isInside) {
                                         pointsWithin.features.push(scope.stops.features[j]);
                                     }
                                 }
                             }
                             scope.inside = pointsWithin;
                             if (typeof pointsInside != 'undefined') {
                                 map.removeLayer(pointsInside);
                             }
                             var pointsNumber = 0;
                             pointsInside = L.geoJson(pointsWithin, {
                                 onEachFeature: function (feature, layer) {
                                     pointsNumber++
                                     //layer.bindPopup("<h4>test</h4>"); si se quiere mostrar info del punto seleccionado
                                 },
                                 pointToLayer: function (feature, latlng) {
                                     return L.circleMarker(latlng);
                                 },
                                 style: { radius: 10, fillColor: "red", weight: 1 }
                             }).addTo(map);
                             map.spin(false);
                             map.fitBounds(pointsInside);
                         });
                    }
                }
            }
        };
    }]);