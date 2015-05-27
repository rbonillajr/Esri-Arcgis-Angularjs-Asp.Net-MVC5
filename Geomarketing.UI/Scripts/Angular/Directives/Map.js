angular.module("geomarketing")
    .directive('esriMap', function ($timeout) {
        return {
            //template: '<div></div>',          
            link: function postLink(scope, element, attrs) {
                //debugger;

                var init = function () {
                    var startExtent = new esri.geometry.Extent({
                        "xmin": -9146655.03, "ymin": 780775.46,
                        "xmax": -8596308.43, "ymax": 1147673.20,
                        "spatialReference": { "wkid": 102100 }
                    });
                    scope.map = new esri.Map(element[0], {
                        sliderOrientation: "vertical",
                        extent: startExtent,
                        zoom: 8,
                        logo: false
                    });
                    createBasemapGallery()

                    dojo.connect(scope.map, "onLoad", function (map) {

                        featurelayer = new esri.layers.FeatureLayer("http://190.97.161.17/arcgis/rest/services/MOBIL/MOBIL/MapServer/0",
                    {
                        id: "Capa1",
                        visible: true,
                        infoTemplate: new esri.InfoTemplate(" ", "${GENERALES.PDV} <br/> <img src='../Content/Fotos/${GENERALES.fotout}'  height='200' width='200'/>"),
                        outFields: ["*"]
                    });
                        scope.map.addLayer(featurelayer);

                        toc = new agsjs.dijit.TOC({
                            map: map,
                            layerInfos: [{
                                layer: featurelayer,
                                title: featurelayer.id
                            }]
                        }, 'TableOfContents');
                        toc.startup();


                        //overviewMap
                        overviewMap = new esri.dijit.OverviewMap({ map: map }, dojo.byId("overviewDiv"));

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

                        var resizeTimer;
                        dojo.connect(map, 'onLoad', function (theMap) {
                            dojo.connect(dijit.byId('map'), 'resize', function () { //resize the map if the div is resized
                                clearTimeout(resizeTimer);
                                resizeTimer = setTimeout(function () {
                                    map.resize();
                                    map.reposition();
                                }, 500);
                            });
                        });

                    });
                };


                function createBasemapGallery() {
                    
                    var basemaps = [];
                    basemaps.push(new esri.dijit.Basemap({
                        layers: [new esri.dijit.BasemapLayer({
                            url: "http://190.97.161.17/arcgis/rest/services/GEOBI/MAPA_BASE_GEOBI/MapServer/"
                        })],
                        title: "Geoinfo",
                        thumbnailUrl: "../Content/Images/GeoBaseMap.png"
                    }));

                    basemaps.push(new esri.dijit.Basemap({
                        layers: [new esri.dijit.BasemapLayer({
                            url: 'http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer'
                        })],
                        title: "National Geographic",
                        id: 'NatGeo_World_Map',
                        thumbnailUrl: 'http://www.arcgis.com/sharing/rest/content/items/b9b1b422198944fbbd5250b3241691b6/info/thumbnail/natgeo3.jpg'
                    }));

                    basemaps.push(new esri.dijit.Basemap({
                        layers: [new esri.dijit.BasemapLayer({
                            url: 'http://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer'
                        })],
                        title: "Oceans",
                        id: 'World_Oceans',
                        thumbnailUrl: 'http://www.arcgis.com/sharing/rest/content/items/5ae9e138a17842688b0b79283a4353f6/info/thumbnail/oceans_5_0_gulf.jpg'
                    }));

                    var basemapGallery = new esri.dijit.BasemapGallery({
                        showArcGISBasemaps: false,
                        basemaps: basemaps,
                        map: scope.map
                    }, "basemapGallery");
                    basemapGallery.startup();

                    dojo.connect(basemapGallery, "onError", function (error) {
                        console.log(error);
                    });
                };
                
                dojo.ready(init);

            }
        };
    });