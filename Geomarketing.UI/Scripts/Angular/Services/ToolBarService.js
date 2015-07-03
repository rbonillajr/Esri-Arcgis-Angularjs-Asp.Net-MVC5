angular.module('geomarketing.services')
  .factory('toolBarService', ['$rootScope', function (rootScope) {
      return {
          options: {
              items: [
                  { type: "button", text: "Analisis", click: function (e) { alert('hola mundo');} },
                  { type: "button", text: "Buffer"}                  
              ]
          }
          
      };
  }]);

