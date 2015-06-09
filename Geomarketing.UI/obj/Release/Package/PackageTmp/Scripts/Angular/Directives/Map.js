angular.module("geomarketing")
    .directive('esriMap', function ($timeout) {
        return {
            template: "<div id='map'></div>",

            link: function postLink(scope, element, attrs) {
                //debugger;
                scope.buffered = false;
                var map = L.map('map').setView([8.488481600020107, -79.89260990593574], 8);

                var icons = getIcons();
                var stops = L.esri.featureLayer('http://190.97.161.17/arcgis/rest/services/MOBIL/MOBIL/MapServer/0', {
                    pointToLayer: function (geojson, latlng) {

                        return L.marker(latlng, {
                            icon: icons[geojson.properties['MOBIL_HOMOLOGACION_FINAL.STATUS']]
                        });
                    }

                }).addTo(map);

                stops.bindPopup(function (error, identifyResults) {

                    return '<center><strong>' + identifyResults.feature.properties['MOBIL_HOMOLOGACION_FINAL.STATUS'] + '</strong></center><br/>' +
                           'Nombre: ' + identifyResults.feature.properties['MOBIL_HOMOLOGACION_FINAL.NOMBRE'] + '<br/>' +
                           'Provincia: ' + identifyResults.feature.properties['MOBIL_HOMOLOGACION_FINAL.PROVINCIA'] + '<br/>' +
                           'Distrito: ' + identifyResults.feature.properties['MOBIL_HOMOLOGACION_FINAL.DISTRITO'] + '<br/>' +
                           'Corregimiento: ' + identifyResults.feature.properties['MOBIL_HOMOLOGACION_FINAL.CORREGIMIE'] + '<br/>' +
                           'Categoria: ' + identifyResults.feature.properties['MOBIL_HOMOLOGACION_FINAL.CATEGORIA'] + '<br/>' +
                           'Dirección: ' + identifyResults.feature.properties['MOBIL_HOMOLOGACION_FINAL.DIRECCION'] + '<br/>';

                });

                map.on('click', function (e) {
                    debugger;
                    if (scope.buffered) {
                        var marker = L.marker(new L.LatLng(e.latlng.lat, e.latlng.lng), {

                        });
                        var pointMarker = marker.toGeoJSON();
                        buffered = turf.buffer(pointMarker, 50, 'kilometers');
                        buff = L.geoJson(buffered);
                        buff.addTo(map);
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

                scope.setBuffered = function () {
                    debugger;
                    
                }

            }
        };
    });