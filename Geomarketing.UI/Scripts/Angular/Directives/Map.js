angular.module("geomarketing")
    .directive('esriMap', function ($timeout) {
        return {
            //template: '<div></div>',          
            link: function postLink(scope, element, attrs) {
                //debugger;

                var init = function () {
                    //MapSetting

                    esri.config.defaults.io.proxyUrl = "/proxy/";
                    var startExtent = new esri.geometry.Extent({
                        "xmin": -9146655.03, "ymin": 780775.46,
                        "xmax": -8596308.43, "ymax": 1147673.20,
                        "spatialReference": { "wkid": 102100 }
                    });

                    scope.map = new esri.Map(element[0], {

                        basemap: 'topo',
                        sliderOrientation: "vertical",
                        extent: startExtent,
                        logo: false
                    });
                    require(["esri/arcgis/utils"], function (arcgisUtils) { 


                    });
                    dojo.connect(scope.map, "onLoad", function (map) {
                        debugger;
                        require(["dojo/_base/lang"], function (lang) {
                            lang.hitch(map, function (response) {
                                //map = response.map;
                                var layers = response.itemInfo.itemData.operationalLayers;
                                alert('funciona');
                            });
                        });
                        

                        //BaseMapGallery
                        /*var basemaps = [];
                        basemaps.push(new esri.dijit.Basemap({
                            layers: [new esri.dijit.BasemapLayer({
                                type: 'GoogleMapsHybrid'
                            })],
                            title: "Google Hybrid",
                            id: 'GoogleHybrid',
                            thumbnailUrl: dojo.moduleUrl("agsjs.dijit", "images/googlehybrid.png")
                        }));*/

                        var basemapGallery = new esri.dijit.BasemapGallery({
                            showArcGISBasemaps: true,
                            map: map
                        }, dojo.byId("basemapGallery"));


                        var layer = new esri.dijit.BasemapLayer({

                            url: "http://190.97.161.17/arcgis/rest/services/GEOBI/MAPA_BASE_GEOBI/MapServer/" //colocar dynamic factory
                            //url: "http://190.97.161.17/arcgis/rest/services/DEMOS/MAPA_DE_SECTORIZACION_CSS/MapServer"
                        });
                        var basemap = new esri.dijit.Basemap({
                            layers: [layer],
                            title: "Geoinfo",
                            id: 'Geoinfo',
                            thumbnailUrl: "../Content/Images/GeoBaseMap.png"
                        });

                        basemapGallery.add(basemap);
                        basemapGallery.select('Geoinfo');
                        basemapGallery.startup();

                        //overviewMap
                        overviewMap = new esri.dijit.OverviewMap({ map: map }, dojo.byId("overviewDiv"));

                        basemapGallery.on("load", function () {

                            overviewMap.startup();
                        });
                        //overviewMap's event
                        basemapGallery.on("selection-change", function () {

                            overviewMap.destroy();
                            overviewMap = new esri.dijit.OverviewMap({ map: map }, dojo.byId("overviewDiv"));
                            overviewMap.startup();
                        });
                        basemapGallery.on("error", function (msg) {
                            console.log("basemap gallery error:  ", msg);
                        });

                        //Home Button
                        var homeButton = new esri.dijit.HomeButton({ map: map }, "HomeButton");
                        homeButton.startup();

                        //LocateButton
                        geoLocate = new esri.dijit.LocateButton({
                            map: map
                        }, "LocateButton");
                        geoLocate.startup();

                        //ScaleBar
                        var scalebar = new esri.dijit.Scalebar({
                            map: map,
                            scalebarUnit: "dual"
                        });

                    });

                };
                //dojo.addOnLoad(init);
                dojo.ready(init);

            }
        };
    });