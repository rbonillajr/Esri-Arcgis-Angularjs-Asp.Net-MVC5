angular
    .module('geomarketing.services')
    .factory('utilityService', ['$q', '$log','$http',
function ($q, $log,$http) {
    var utilityService = {};
    utilityService.arcgisToFeatureCollection = '';
    utilityService.arcgisToFeatureCollection = function (url, callback) {
       
        //$http.get(url).
        //  success(function (data, status, headers, config) {
        //      callback(null, createGeoJson(data));
        //      // this callback will be called asynchronously
        //      // when the response is available
        //  }).
        //  error(function (data, status, headers, config) {
        //      callback(null, null);
        //  });
       
           
        

    };



    return utilityService;
}]);