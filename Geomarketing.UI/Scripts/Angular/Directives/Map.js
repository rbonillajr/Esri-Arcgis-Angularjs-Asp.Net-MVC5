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
                
                var url = 'http://gis.geoinfo-int.com/arcgis/rest/services/MOBIL/MOBIL/MapServer/0/query?where=objectid+%3D+objectid&outfields=*&f=json';
                utilityService.arcgisToFeatureCollection(url, function (error, featureCollection) {
                    debugger;
                    var geojson = L.geoJson(featureCollection, {
                        pointToLayer: function (geojson, latlng) {
                            
                                    return L.marker(latlng, {
                                        icon: icons[geojson.properties['STATUS']]
                                    });
                                }
                    }).addTo(map);

                    map.fitBounds(geojson.getBounds());

                    geojson.bindPopup(function (error, identifyResults) {
                        debugger
                        return '<center><strong>' + identifyResults.feature.properties['STATUS'] + '</strong></center><br/>' +
                               'Nombre: ' + identifyResults.feature.properties['NOMBRE'] + '<br/>' +
                               'Provincia: ' + identifyResults.feature.properties['PROVINCIA'] + '<br/>' +
                               'Distrito: ' + identifyResults.feature.properties['DISTRITO'] + '<br/>' +
                               'Corregimiento: ' + identifyResults.feature.properties['CORREGIMIE'] + '<br/>' +
                               'Categoria: ' + identifyResults.feature.properties['CATEGORIA'] + '<br/>' +
                               'Dirección: ' + identifyResults.feature.properties['DIRECCION'] + '<br/>';

                    });
                });

                

                map.on('click', function (e) {
                    debugger;
                    if (scope.buffered) {

                        if (typeof buff != 'undefined') {
                            map.removeLayer(buff);
                        }

                        bufferService.get(50, 'kilometers', e.latlng, function (buff) {
                            buff.addTo(map);
                        });

                        debugger;
                        var features = response.operationalLayers[0].featureCollection.layers[0].featureSet.features;
                        var idField = response.operationalLayers[0].featureCollection.layers[0].layerDefinition.objectIdField;

                        // empty geojson feature collection
                        var featureCollection = {
                            type: 'FeatureCollection',
                            features: []
                        };

                        for (var i = features.length - 1; i >= 0; i--) {
                            // convert ArcGIS Feature to GeoJSON Feature
                            var feature = L.esri.Util.arcgisToGeojson(features[i], idField);
                            debugger;
                            // unproject the web mercator coordinates to lat/lng
                            var latlng = L.Projection.Mercator.unproject(L.point(feature.geometry.coordinates));
                            feature.geometry.coordinates = [latlng.lng, latlng.lat];

                            featureCollection.features.push(feature);
                        }

                        var geojson = L.geoJson(featureCollection).addTo(map);

                        map.fitBounds(geojson.getBounds());


                        //var stationsInside = turf.within(L.esri.Util.arcgisToGeojson(stops), buff);

                        //var stationsNumber=0;
                        //var gasstationsinside =L.geoJson(stationsInside, {
                        //    onEachFeature: function(feature, layer) {
                        //        stationsNumber++
                        //        layer.bindPopup("<h4>test</h4>"); 
                        //    }, 
                        //    pointToLayer: function (feature, latlng) { 
                        //        return L.circleMarker(latlng); 
                        //    }, 
                        //    style:{ radius: 8, fillColor: "red", weight: 1 } 
                        //}).addTo(map);

                    } else {
                        if (typeof buff != 'undefined') {
                            map.removeLayer(buff);
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