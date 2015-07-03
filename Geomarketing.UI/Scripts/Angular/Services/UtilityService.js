angular
    .module('geomarketing.services')
    .factory('utilityService', ['$q', '$log','$http',
function ($q, $log,$http) {
    var utilityService = {};
    utilityService.geoJsonToPivot = '';
    utilityService.geoJsonToPivot = function (geoJson, callback) {
       
        //$http.get(url).
        //  success(function (data, status, headers, config) {
        //      callback(null, createGeoJson(data));
        //      // this callback will be called asynchronously
        //      // when the response is available
        //  }).
        //  error(function (data, status, headers, config) {
        //      callback(null, null);
        //  });
        var result=[];
        _.each(geoJson, function (element, index, list) {
            
            result.push({
                Nombre: element.properties.NOMBRE,
                Categoria: element.properties.CATEGORIA_1,
                Provincia: element.properties.PROVINCIA,
                Distrito: element.properties.DISTRITO,
                Corregimiento: element.properties.CORREGIMIENTO,
                Barrio: element.properties.BARRIO,
                Tipo: element.properties.STATUS,
                Mobil: element.properties.MOBIL,
                Shell: element.properties.SHELL,
                Chevron: element.properties.CHEVRON,
                Castrol: element.properties.CASTROL,
                Valvoline: element.properties.VALVOLINE,
                TOM_Mobil: element.properties.TOM_Mobil,
                TOM_Shell: element.properties.TOM_Shell,
                TOM_Chevron: element.properties.TOM_Chevron,
                TOM_Castrol: element.properties.TOM_Castrol,
                TOM_Valvoline: element.properties.TOM_Valvoline,
                EXHIBIDOR_Mobil: element.properties.EXHIBIDOR_MOBIL,
                EXHIBIDOR_Shell: element.properties.EXHIBIDOR_SHELL,
                EXHIBIDOR_Castrol: element.properties.EXHIBIDOR_CASTROL,
                EXHIBIDOR_Valvoline: element.properties.EXHIBIDOR_VALVOLINE,
                EXHIBIDOR_Chevron: element.properties.EXHIBIDOR_CHEVRON,
                RUTA_VENDEDOR: element.properties.RUTA_VENDEDOR,
                ABC: element.properties.ABC
            })
        });

        callback(null, result);
        

    };



    return utilityService;
}]);