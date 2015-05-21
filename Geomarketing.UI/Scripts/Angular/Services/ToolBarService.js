angular.module('geomarketing.services')
  .factory('toolBarService', ['$rootScope', function (rootScope) {
      return {
          options: {
              items: [
                  { type: "button", text: "Analisis" },
                  { type: "button", text: "Buffer"},
                  {
                      type: "splitButton",
                      text: "Insert",
                      menuButtons: [
                          { text: "Insert above", icon: "insert-n" },
                          { text: "Insert between", icon: "insert-m" },
                          { text: "Insert below", icon: "insert-s" }
                      ]
                  },                  
                  { type: "separator" },
                  {
                      type: "buttonGroup",
                      buttons: [
                          { spriteCssClass: "k-tool-icon k-justifyLeft", text: "Left", togglable: true, group: "text-align" },
                          { spriteCssClass: "k-tool-icon k-justifyCenter", text: "Center", togglable: true, group: "text-align" },
                          { spriteCssClass: "k-tool-icon k-justifyRight", text: "Right", togglable: true, group: "text-align" }
                      ]
                  },
                  {
                      type: "buttonGroup",
                      buttons: [
                          { spriteCssClass: "k-tool-icon k-bold", text: "Bold", togglable: true, showText: "overflow" },
                          { spriteCssClass: "k-tool-icon k-italic", text: "Italic", togglable: true, showText: "overflow" },
                          { spriteCssClass: "k-tool-icon k-underline", text: "Underline", togglable: true, showText: "overflow" }
                      ]
                  },
                  {
                      type: "button",
                      text: "Action",
                      overflow: "always"
                  },
                  {
                      type: "button",
                      text: "Another Action",
                      overflow: "always"
                  },
                  {
                      type: "button",
                      text: "Something else here",
                      overflow: "always"
                  }
              ]
          }
          
      };
  }]);

