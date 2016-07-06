(function () {

  'use strict';

  /**
   * @ngdoc overview
   * @name angularVideopodcastCnnApp
   * @description
   * # angularVideopodcastCnnApp
   *
   * Main module of the application.
   */
  var app=angular
    .module('angularVideopodcastCnnApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'cfp.hotkeys'
    ]);

  app.constant('keyEvents', {
    'KEY_CODES': {
        ENTER: 13,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
    }
  });

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

})();
