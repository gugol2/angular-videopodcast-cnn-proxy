(function () {
  
  'use strict';

  /**
   * @ngdoc service
   * @name angularVideopodcastCnnApp.traceService
   * @description
   * # traceService
   * Factory in the angularVideopodcastCnnApp.
   */
  var app=angular.module('angularVideopodcastCnnApp');

  app.factory('traceService', ['$log', traceService]);

  function traceService($log) {
    
    var serviceTrace = {
      catcher: catcher
    };

    function catcher(message) {
      return function(reason) {
        $log.info(message, reason);
      };
    }

    return serviceTrace;
  }

})();
