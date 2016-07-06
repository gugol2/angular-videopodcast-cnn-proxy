(function () {
  
  'use strict';

  /**
   * @ngdoc service
   * @name angularVideopodcastCnnApp.setFocus
   * @description
   * # setFocus
   * Factory in the angularVideopodcastCnnApp.
   */
  var app=angular.module('angularVideopodcastCnnApp');

  app.factory('setFocus', ['$timeout', setFocus]);

  function setFocus($timeout) {

    var focusSet={
      set:set
    };

    function set(reference) {
        // timeout makes sure that is invoked after any other event has been triggered.
        $timeout(function () {
            var angularElement = angular.element(reference);
            if (angularElement){
                angularElement.focus();
            }
        }, 0);
    }

    return focusSet;
  }

})();



  
  
