angular
    .module('geomarketing.services')
    .factory('bufferService', ['$q', '$log',
function ($q, $log) {
    var bufferService = {};
    bufferService.get = '';
    bufferService.get = function (radio, unidades, latlng, callback) {
                
        var marker = L.marker(latlng, {});
        var pointMarker = marker.toGeoJSON();
        buffered = turf.buffer(pointMarker, radio, unidades);
               
        callback(buffered);
    };



    return bufferService;
}]);