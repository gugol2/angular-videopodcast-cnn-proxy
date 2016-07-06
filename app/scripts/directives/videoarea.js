(function () {

  'use strict';

  /**
   * @ngdoc directive
   * @name angularVideopodcastCnnApp.directive:videoarea
   * @description
   * # videoarea
   */
   var app=angular.module('angularVideopodcastCnnApp');

   app.directive('videoarea', [videoarea]);

   function videoarea() {
    return {
      templateUrl: 'views/videoarea.html',
      restrict: 'E',
      scope:{
        currentItemFeed: '=currentFeedItem',
        startauto: '=',
        noValidLink: '='
      }
    };
  }

})();