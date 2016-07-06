(function () {

	'use strict';

	/**
	 * @ngdoc directive
	 * @name angularVideopodcastCnnApp.directive:feedSelector
	 * @description
	 * # feedSelector
	 */
	var app=angular.module('angularVideopodcastCnnApp');

	app.directive('feedSelector', [feedSelector]);

	function feedSelector() {
	 	return {
	 		templateUrl: 'views/feedselector.html',
	 		restrict: 'E'
		};
	}


})();


