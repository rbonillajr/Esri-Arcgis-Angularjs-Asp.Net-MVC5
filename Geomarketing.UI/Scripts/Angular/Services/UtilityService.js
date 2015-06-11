angular
    .module('geomarketing.services')
    .factory('utilityService', ['$q', '$log','$http',
function ($q, $log,$http) {
    var utilityService = {};
    utilityService.arcgisToFeatureCollection = '';
    utilityService.arcgisToFeatureCollection = function (url, callback) {
       
        $http.get(url).
          success(function (data, status, headers, config) {
              callback(null, createGeoJson(data));
              // this callback will be called asynchronously
              // when the response is available
          }).
          error(function (data, status, headers, config) {
              callback(null, null);
          });

        
        createGeoJson = function (json) {
            
            var features = json.features;
            //var idField = response.operationalLayers[0].featureCollection.layers[0].layerDefinition.objectIdField;

            // empty geojson feature collection
            var featureCollection = {
                type: 'FeatureCollection',
                features: []
            };

            for (var i = features.length - 1; i >= 0; i--) {
                // convert ArcGIS Feature to GeoJSON Feature
               
                var feature = {
                    "type": "Feature",
                    "geometry": { "type": "Point", "coordinates": [features[i].geometry.x, features[i].geometry.y] },
                    "properties": features[i].attributes
                };

                // unproject the web mercator coordinates to lat/lng
                var latlng = L.Projection.Mercator.unproject(L.point(feature.geometry.coordinates));
                feature.geometry.coordinates = [latlng.lng, latlng.lat];
              
                featureCollection.features.push(feature);
            }

           return featureCollection
        };

    };



    return utilityService;
}]);