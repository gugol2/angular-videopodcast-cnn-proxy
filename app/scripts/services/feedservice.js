(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name angularVideopodcastCnnApp.feedService
   * @description
   * # feedService
   * Factory in the angularVideopodcastCnnApp.
   */
  var app=angular.module('angularVideopodcastCnnApp');

  app.factory('feedService', [ '$http', '$q', 'dataService', feedService]);

  function feedService($http, $q, dataService) {
      // Service logic

      var serviceFeeds={
        parseFeed:parseFeed
      };

      function parseFeed(url){

        var deferred = $q.defer();

        var validToken=dataService.getToken(); 

        var apiUrl=dataService.getApiUrl();
        
        var apiCall=apiUrl+encodeURIComponent(url);

        $http({
          method: 'GET',
          url: apiCall,
          headers:{
            'x-access-token':validToken
          }
        })

        .success(function(response) {
          // The promise is resolved once the HTTP call is successful.
          if(response.responseStatus>=200 && response.responseStatus<400){
            deferred.resolve(response.responseData[0]);
          }else{
            deferred.reject({responseData: response.responseData, responseStatus: response.responseStatus});
          }  
        })

        .error(function(reason) {
          // The promise is rejected if there is an error with the HTTP call.
          if(reason){
            deferred.reject(reason);
            //if we don't get any answers the proxy/api will probably be down
          }else{
            deferred.reject({responseData: 'Gateway Timeout: The proxy/api is probably down', responseStatus: 504});
          }
        });

        // The promise is returned to the caller
        return deferred.promise;

      }
      
      return serviceFeeds;
  }

})();
