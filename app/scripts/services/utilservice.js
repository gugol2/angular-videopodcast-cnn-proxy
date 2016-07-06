(function () {
  'use strict';

/**
 * @ngdoc service
 * @name angularVideopodcastCnnApp.utilService
 * @description
 * # utilService
 * Factory in the angularVideopodcastCnnApp.
 */
var app= angular.module('angularVideopodcastCnnApp');

app.factory('utilService', [utilService]);


function utilService() {
    // Service logic
    var serviceUtil={
      supportVideoExtension:supportVideoExtension,
      getFileExtension:getFileExtension,
      parseDescription:parseDescription
    };

    /*Checks if a certain value is in an array*/
    function supportVideoExtension(value, array) {
      return array.indexOf(value);
    }


    /*get the extension of the fileName, it returns the whole fileName 
    when there's no dot or no string before the dot*/
    function getFileExtension (fileName) {
      return fileName.substr(fileName.lastIndexOf('.')+1);
    }

    /*parse the description to rule out the html content and also trims the length
    of the plain text. input is a plain text followed by html tags*/
    function parseDescription(input) {
      var pattern = /[^<>]*/;
      var result;
      var len=150;
      var out;
      if ((result = pattern.exec(input)) !== null) {
        if (result.index === pattern.lastIndex) {
          if(result[0].length>len){
            out=result[0].substring(0, len)+'...';
          }else{
            out=result[0];
          }

        }

      }
      return out;
    }

    // Public API exposed
    return serviceUtil;

  }

})();