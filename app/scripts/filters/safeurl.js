(function () {
	
	'use strict';

	/**
	 * @ngdoc filter
	 * @name angularVideopodcastCnnApp.filter:safeUrl
	 * @function
	 * @description
	 * # safeUrl
	 * Filter in the angularVideopodcastCnnApp.
	 */
	var app= angular.module('angularVideopodcastCnnApp');

	app.filter('safeUrl', ['$sce', safeUrl]);

	//return url sanitized
	function safeUrl($sce) {
	    return function (url) {
	      return $sce.trustAsResourceUrl(url);
	    };
	  }

})();
